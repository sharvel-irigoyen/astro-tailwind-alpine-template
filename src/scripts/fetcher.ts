import { z } from 'zod';

interface SafeFetchOptions extends RequestInit {
  /** Tiempo máximo de espera en milisegundos antes de abortar la petición (default: 10000ms) */
  timeoutMs?: number;
  /** Número máximo de reintentos con backoff exponencial (default: 0 = sin reintentos) */
  retries?: number;
}

/**
 * Función genérica de fetch que acepta la URL y un esquema Zod.
 * Proporciona validación en tiempo de ejecución (Runtime validation),
 * timeout configurable y reintentos con backoff exponencial.
 *
 * @param url La URL del recurso a obtener.
 * @param schema El esquema de Zod contra el cual validar la respuesta.
 * @param options Opciones estándar de la API Fetch + timeoutMs y retries.
 * @returns Los datos tipados y validados.
 */
export async function safeFetch<T>(
  url: string,
  schema: z.ZodSchema<T>,
  options?: SafeFetchOptions,
): Promise<T> {
  const { timeoutMs = 10_000, retries = 0, ...fetchOptions } = options ?? {};

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    // Esperar con backoff exponencial antes de reintentar (0ms en el primer intento)
    if (attempt > 0) {
      const delay = Math.min(1000 * 2 ** (attempt - 1), 8000);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Crear un AbortController para controlar el timeout de la petición
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} en ${url}`);
      }

      // Obtenemos el JSON en crudo de la respuesta
      const rawData = await response.json();

      // Zod valida el payload real contra el esquema esperado.
      // Si no coincide, lanza un error de Zod descriptivo (Fail-Fast).
      // Esto previene que errores silenciosos de backend corrompan Alpine.js.
      return schema.parse(rawData);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // No reintentar errores de validación de Zod (son deterministas, no transitorios)
      if (error instanceof z.ZodError) {
        throw error;
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw (
    lastError ??
    new Error(`safeFetch falló después de ${retries + 1} intentos en ${url}`)
  );
}
