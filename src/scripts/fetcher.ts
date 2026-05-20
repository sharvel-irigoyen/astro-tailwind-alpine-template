import { z } from 'zod';

/**
 * Función genérica de fetch que acepta la URL y un esquema Zod.
 * Proporciona validación en tiempo de ejecución (Runtime validation).
 *
 * @param url La URL del recurso a obtener.
 * @param schema El esquema de Zod contra el cual validar la respuesta.
 * @param options Opciones estándar de la API Fetch.
 * @returns Los datos tipados y validados.
 */
export async function safeFetch<T>(
  url: string,
  schema: z.ZodSchema<T>,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status} en ${url}`);
  }

  // Obtenemos el JSON en crudo de la respuesta
  const rawData = await response.json();

  // Zod valida el payload real contra el esquema esperado.
  // Si no coincide, lanza un error de Zod descriptivo (Fail-Fast).
  // Esto previene que errores silenciosos de backend corrompan Alpine.js.
  const parsedData = schema.parse(rawData);

  return parsedData;
}
