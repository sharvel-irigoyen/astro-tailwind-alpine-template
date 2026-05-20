# 🚀 Template Grado Ingeniería: Astro + Tailwind CSS + Alpine.js

Este repositorio es una plantilla base (Starter Template) optimizada para iniciar proyectos web estáticos (SSG) de alto rendimiento, seguros, resilientes y escalables. Está diseñado aplicando estrictas buenas prácticas de ingeniería de software, arquitectura DRY, despliegues inmutables y herramientas de calidad continua.

## ✨ Características Principales

- **Framework Core:** [Astro 6](https://astro.build) (Configurado por defecto en modo Static Site Generation - SSG).
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) nativamente integrado a través de Vite.
- **Reactividad Segura (CSP):** Uso de **`@alpinejs/csp`** para eliminar completamente la directiva `unsafe-eval` del CSP y mitigar ataques XSS. La lógica se aísla de forma obligatoria en controladores TypeScript (en `src/scripts/`) y se registra en el `entrypoint` centralizado de Alpine.
- **Resiliencia en Red (Zod):** Cliente de peticiones seguro implementado a través de un wrapper genérico `safeFetch` que valida la respuesta de APIs externas en tiempo de ejecución usando esquemas de **Zod** (patrón Fail-Fast).
- **Observabilidad Global (Sentry):** Monitoreo en tiempo real con `@sentry/astro` y `@sentry/browser`. Captura automática de Core Web Vitals, errores no controlados y promesas rechazadas mediante interceptores globales (`error` y `unhandledrejection`) en el entrypoint de Alpine.
- **Seguridad HTTP Endurecida:** Cabeceras de seguridad estrictas en Nginx incluyendo **HSTS** (Strict-Transport-Security), **CSP**, **X-Frame-Options**, **X-Content-Type-Options**, **Referrer-Policy**, **Permissions-Policy** y **X-XSS-Protection**. Todas las cabeceras se redeclaran en los bloques `location` para prevenir el bug de herencia de Nginx.
- **Infraestructura Agnóstica (Docker):** Contenedor multi-stage optimizado sobre Alpine Node y servido mediante un servidor **Nginx** de alto rendimiento con reglas estrictas de caché (activos con hash inmutables de 1 año), Gzip (nivel 6), healthcheck integrado y despliegues con **Cero Caídas (Zero Downtime)**.
- **Calidad de Código y Git Hooks:**
  - **ESLint** (Flat config recomendado para Astro/TS) y **Prettier** con ordenamiento de clases de Tailwind.
  - **Husky** y **lint-staged** protegiendo cada commit.
  - **Commitlint** forzando el estándar de _Conventional Commits_.
- **CI/CD:** Pipelines de GitHub Actions (`ci.yml` y `cd.yml`) pre-configurados. El CD se ejecuta **únicamente** tras el éxito del CI mediante `workflow_run`.

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

   El proyecto estará disponible en `http://localhost:4321`.

3. **Otros comandos útiles:**
   - `pnpm run lint`: Ejecuta el linter (ESLint).
   - `pnpm run format`: Formatea el código de acuerdo a las reglas (Prettier).
   - `pnpm run build`: Genera la compilación optimizada de producción en `/dist/`.

---

## 🐳 Despliegue en Producción (Docker)

La infraestructura está definida como código para que cualquier despliegue (local o en un VPS/Cloud) sea idéntico e inmutable, logrando **Cero Caídas (Zero Downtime)** para el usuario final. Para levantar y actualizar el entorno de producción con Nginx, ejecuta el script de despliegue:

```bash
./deploy.sh
```

**¿Qué hace `deploy.sh`?**

1. **Construcción Eficiente:** Compila una nueva versión de la imagen Docker en segundo plano, aprovechando al máximo la caché para evitar reinstalar dependencias (`pnpm install`) si estas no han cambiado.
2. **Asegurar Disponibilidad:** Garantiza que el contenedor del servidor Nginx (`astro_template_prod`) esté en ejecución.
3. **Sincronización en Caliente:** Copia de forma atómica los nuevos archivos compilados directamente en el volumen compartido (`astro_web_data`), reemplazando la versión antigua instantáneamente en el disco sin detener el servicio.
4. **Recarga Dinámica:** Ejecuta `nginx -s reload` en caliente dentro del contenedor para aplicar cambios en `nginx.conf` sin causar downtime.
5. **Limpieza de Recursos:** Purga imágenes colgantes (Dangling images) para optimizar el almacenamiento del servidor.

---

## 📂 Estructura del Proyecto

```text
/
├── .github/workflows/        # Pipelines CI/CD automatizados
├── nginx/
│   └── nginx.conf            # Configuración de compresión, caché y CSP para Alpine CSP
├── src/
│   ├── assets/               # Recursos multimedia estáticos optimizados
│   ├── components/ui/        # Componentes DRY polimórficos (ej. Button.astro)
│   ├── layouts/              # BaseLayout con soporte SEO global, OpenGraph y noindex condicional
│   ├── pages/                # Rutas estáticas SSG (index, 404, 500)
│   ├── scripts/              # Entrypoint, controladores Alpine (TS) y fetcher seguro
│   └── styles/               # Directivas globales de Tailwind CSS v4
├── .commitlintrc.mjs         # Reglas de Conventional Commits
├── eslint.config.mjs         # Linter Flat config
├── Dockerfile                # Receta Docker multi-stage optimizada
└── deploy.sh                 # Script CD de despliegue continuo
```

---

## 🛡️ Pilares de Ingeniería del Proyecto

### 1. Seguridad CSP (Content Security Policy)

Bajo la versión de `@alpinejs/csp`, **no** está permitido programar expresiones directas en el HTML, eliminando completamente la necesidad de `unsafe-eval` en la política CSP. Todo comportamiento reactivo debe ser extraído a métodos de clases y componentes registrados en `alpine-entrypoint.ts`. Por ejemplo:

```html
<!-- INCORRECTO (Fallará bajo CSP): -->
<button @click="count++">Incrementar</button>

<!-- CORRECTO: -->
<button @click="increment">Incrementar</button>
```

El servidor Nginx aplica cabeceras de seguridad endurecidas que incluyen **HSTS** (`Strict-Transport-Security`) para forzar HTTPS, y **redeclara todas las cabeceras en cada bloque `location`** para prevenir el [bug de herencia de Nginx](https://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header) donde `add_header` en un bloque hijo anula las cabeceras del bloque padre.

### 2. Resiliencia de APIs y Fail-Fast con Zod

Al realizar integraciones externas, el template utiliza `safeFetch` (en `src/scripts/fetcher.ts`). Zod actúa como control de aduanas, invalidando la respuesta en tiempo de ejecución si el servidor envía datos inesperados, protegiendo así el estado del cliente de errores difíciles de diagnosticar.

```typescript
import { z } from 'zod';
import { safeFetch } from '../scripts/fetcher';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Validación en runtime + tipado estricto automático de TypeScript
const user = await safeFetch('https://api.ejemplo.com/user/1', UserSchema);
```

### 3. Observabilidad e Instrumentación

La integración de Sentry captura de manera temprana Core Web Vitals, excepciones no controladas y promesas rechazadas. El `alpine-entrypoint.ts` registra interceptores globales (`error` y `unhandledrejection`) que envían cualquier excepción a Sentry, independientemente de si se origina en Alpine.js u otro módulo. La página de error `500.astro` actúa puramente como una herramienta liviana de UX de contingencia, exenta de scripts externos pesados para garantizar su disponibilidad aun cuando los servicios de red fallen.

Para que Sentry funcione correctamente bajo una política de seguridad estricta, el archivo `nginx/nginx.conf` define reglas CSP específicas:

- `connect-src` para permitir conexiones salientes hacia los servidores de ingesta de Sentry (`*.ingest.sentry.io` y `*.ingest.de.sentry.io`).
- `worker-src` configurado en `blob:` para permitir que Sentry ejecute Web Workers en segundo plano.

### 4. Infraestructura Resiliente

- **Docker Healthcheck:** El contenedor de producción ejecuta verificaciones periódicas con `wget` para confirmar que Nginx está sirviendo tráfico activamente. Si falla 3 veces consecutivas, Docker marca el contenedor como `unhealthy`.
- **CI/CD Secuencial:** El pipeline de CD (`cd.yml`) se activa **exclusivamente** tras el éxito del CI (`ci.yml`) mediante `workflow_run`, evitando despliegues de código no validado.
- **Zero Downtime:** Los despliegues sincronizan archivos estáticos en un volumen compartido y ejecutan `nginx -s reload` sin detener el contenedor.
