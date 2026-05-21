# 🚀 Template Grado Ingeniería: Astro + Tailwind CSS + Alpine.js

Este repositorio es una plantilla base (Starter Template) optimizada para iniciar proyectos web estáticos (SSG) de alto rendimiento, seguros, resilientes y escalables para múltiples PYMEs. Está diseñado aplicando estrictas buenas prácticas de ingeniería de software, arquitectura DRY, despliegues inmutables, herramientas de calidad continua y transiciones visuales premium.

---

## ✨ Características Principales

- **Framework Core:** [Astro 6](https://astro.build) (Configurado por defecto en modo Static Site Generation - SSG).
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) nativamente integrado a través de Vite.
- **Sistema de Blog (Content Layer):** Integración con Astro Content Layer API (`src/content.config.ts`), esquemas de validación Zod y soporte de renderizado con `@tailwindcss/typography` (prose styling).
- **CLI de Configuración (`setup.sh`):** CLI interactivo que permite parametrizar el negocio (nombre, colores, información de contacto) y limpiar datos demo automáticamente.
- **Animaciones Premium (Motion):** Transiciones scroll-reveal de alto rendimiento mediante la API nativa de animaciones web (WAAPI), cargando de forma diferida (lazy load) la biblioteca `motion` sólo al intersectar elementos.
- **Interactividad FAQ Pulida:** Acordeón de preguntas frecuentes implementado con transiciones nativas de CSS Grid (`grid-rows-[0fr] -> grid-rows-[1fr]`), eliminando parpadeos, aplicando estados activos premium y optimizando la indexación SEO.
- **Reactividad Segura (CSP):** Uso de **`@alpinejs/csp`** para eliminar completamente la directiva `unsafe-eval` del CSP y mitigar ataques XSS. La lógica se aísla de forma obligatoria en controladores TypeScript (en `src/scripts/`) y se registra en el `entrypoint` centralizado de Alpine.
- **Resiliencia en Red (Zod):** Cliente de peticiones seguro implementado a través de un wrapper genérico `safeFetch` que valida la respuesta de APIs externas en tiempo de ejecución usando esquemas de **Zod** (patrón Fail-Fast).
- **Observabilidad Global (Sentry):** Monitoreo en tiempo real con `@sentry/astro` y `@sentry/browser`. Captura automática de Core Web Vitals y errores no controlados.
- **Seguridad HTTP Endurecida:** Cabeceras de seguridad estrictas en Nginx incluyendo **HSTS** (Strict-Transport-Security), **CSP**, **X-Frame-Options**, **X-Content-Type-Options** y **Referrer-Policy** redeclaradas en cada bloque `location` para prevenir el bug de herencia.
- **Infraestructura Agnóstica (Docker):** Contenedor multi-stage optimizado sobre Alpine Node y servido mediante un servidor **Nginx** con reglas de caché (activos con hash inmutables de 1 año), Gzip (nivel 6), healthcheck integrado y despliegues con **Cero Caídas (Zero Downtime)**.

---

## 🛠️ Requisitos Previos

- [Node.js](https://nodejs.org/) (v22.12.0 o superior).
- [pnpm](https://pnpm.io/) (v9 recomendado).
- [Docker](https://www.docker.com/) y Docker Compose.

---

## 💻 Desarrollo Local

1. **Clonar e instalar dependencias:**

   ```bash
   pnpm install
   ```

2. **Levantar el servidor de desarrollo:**

   ```bash
   pnpm run dev
   ```

   El proyecto estará disponible en `http://localhost:4321` (desarrollo local Astro) o `http://localhost:8080` si se despliega el contenedor de producción.

3. **Otros comandos útiles:**
   - `pnpm run lint`: Ejecuta el linter (ESLint).
   - `pnpm run format`: Formatea el código de acuerdo a las reglas (Prettier).
   - `pnpm run build`: Genera la compilación optimizada de producción en `/dist/`.

---

## ⚙️ Inicialización de Nuevos Proyectos (CLI Setup)

Para reusar este template en un nuevo proyecto PYME, ejecuta el asistente de configuración interactivo:

```bash
chmod +x setup.sh
./setup.sh
```

**¿Qué realiza el script de inicialización?**

- **Variables de Marca:** Configura interactivamente el nombre comercial, tagline, teléfono, correo y dominio en `src/config/site.ts`.
- **Diseño Cromático:** Modifica los colores de Tailwind (`primary`, `primary-hover`, `accent`) en `src/styles/global.css`.
- **Ajustes de Infraestructura:** Configura la URL del sitio en `astro.config.mjs` para SEO y XML sitemaps.
- **Limpieza del Blog:** Elimina los posts demo y reinicia el histórico de blog.

---

## 🐳 Despliegue en Producción (Docker)

Para levantar y actualizar el entorno de producción con Nginx con **Cero Caídas (Zero Downtime)**, ejecuta el script de despliegue:

```bash
./deploy.sh
```

**¿Qué hace `deploy.sh`?**

1. **Construcción Eficiente:** Compila la nueva versión de la imagen Docker en segundo plano, aprovechando la caché.
2. **Sincronización en Caliente:** Copia de forma atómica los archivos estáticos en el volumen compartido (`astro_web_data`), reemplazando la versión antigua en caliente sin detener el servicio.
3. **Recarga Dinámica:** Ejecuta `nginx -s reload` para aplicar configuraciones de servidor sin downtime.
4. **Limpieza de Recursos:** Purga imágenes colgantes para optimizar el almacenamiento.

---

## 📂 Estructura del Proyecto

```text
/
├── .github/workflows/        # Pipelines CI/CD automatizados
├── nginx/
│   └── nginx.conf            # Configuración de caché, CSP, compresión y seguridad
├── src/
│   ├── assets/               # Recursos multimedia estáticos optimizados
│   ├── components/           # Componentes modulares
│   │   ├── layout/           # Estructura global (Header, Footer, CookieBanner)
│   │   ├── primitives/       # Átomos DRY reutilizables (Button, SectionHeading)
│   │   └── sections/         # Secciones modulares parametrizadas (Hero, Features, Services)
│   ├── config/               # Archivos de configuración de negocio (site.ts)
│   ├── content/              # Colecciones de contenido (blog posts)
│   ├── data/                 # Data limpia y agnóstica para alimentar componentes
│   ├── layouts/              # Plantillas base (BaseLayout, PageLayout)
│   ├── pages/                # Rutas estáticas SSG (index, blog, nosotros, servicios, etc.)
│   ├── scripts/              # Entrypoint y controladores Alpine (TS)
│   │   ├── components/       # Lógica encapsulada de componentes UI
│   │   └── utils/            # Utilidades generales (safeFetch, reveal)
│   ├── styles/               # Directivas globales de Tailwind CSS v4
│   └── types/                # Interfaces TypeScript tipadas de datos del negocio
├── Dockerfile                # Receta Docker multi-stage optimizada
├── setup.sh                  # Script CLI interactivo de inicialización de marca
└── deploy.sh                 # Script CD de despliegue continuo cero caídas
```

---

## 🛡️ Pilares de Ingeniería del Proyecto

### 1. Animaciones Scroll-Reveal con Motion (WAAPI)

El sistema scroll-reveal dinámico evita saturar el hilo principal de la CPU importando la librería `motion` asíncronamente solo cuando el primer elemento entra al viewport:

```html
<!-- Se agrega la clase `.reveal` y atributos data para parametrizar la transición -->
<div
  class="reveal"
  data-reveal-direction="left"
  data-reveal-delay="0.1"
  data-reveal-duration="0.8"
>
  Contenido animado
</div>
```

- **Rendimiento:** Las animaciones se ejecutan en el hilo del compositor de la GPU, manteniendo el rendimiento en Lighthouse al 100%.
- **Accesibilidad y Fallback:** Si JavaScript está desactivado, el diseño utiliza `.js .reveal` para mostrar todo el contenido inmediatamente y evitar FOUC. Respeta la preferencia `prefers-reduced-motion`.

### 2. Acordeón FAQ Optimizado

El componente de acordeón interactivo en `FAQ.astro` utiliza transiciones nativas de CSS Grid para modular su altura sin parpadeos:

```html
<div
  class="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
  x-bind:class="isOpen(index) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
>
  <div class="overflow-hidden">
    <!-- Contenido de la Respuesta -->
  </div>
</div>
```

- **Ventaja SEO:** A diferencia de `x-show` o `v-if` tradicionales, el texto nunca sale del DOM (no se oculta con `display: none`), permitiendo a los buscadores indexar las respuestas siempre.

### 3. Seguridad CSP (Content Security Policy)

Bajo la versión de `@alpinejs/csp`, **no** está permitido programar expresiones directas en el HTML. Todo comportamiento reactivo debe ser extraído a métodos de clases y componentes en `src/scripts/components/`.

```html
<!-- CORRECTO: -->
<button @click="increment">Incrementar</button>
```

### 4. Resiliencia de APIs y Fail-Fast con Zod

El wrapper seguro `safeFetch` valida las respuestas de red contra esquemas Zod antes de propagarlas:

```typescript
import { z } from 'zod';
import { safeFetch } from '../scripts/utils/fetcher';

const UserSchema = z.object({ id: z.number(), name: z.string() });
const user = await safeFetch('https://api.ejemplo.com/user/1', UserSchema);
```

### 5. Observabilidad con Sentry

La integración de Sentry captura Core Web Vitals y excepciones no controladas. El entrypoint de Alpine registra interceptores globales (`error` y `unhandledrejection`) garantizando visibilidad completa ante incidentes en producción.
