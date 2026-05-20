# 🚀 Template Grado Ingeniería: Astro + Tailwind CSS + Alpine.js

Este repositorio es una plantilla base (Starter Template) optimizada para iniciar proyectos web estáticos (SSG) de alto rendimiento, seguros, resilientes y escalables. Está diseñado aplicando estrictas buenas prácticas de ingeniería de software, arquitectura DRY, despliegues inmutables y herramientas de calidad continua.

## ✨ Características Principales

- **Framework Core:** [Astro 6](https://astro.build) (Configurado por defecto en modo Static Site Generation - SSG).
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) nativamente integrado a través de Vite.
- **Reactividad Segura (CSP):** Uso de **`@alpinejs/csp`** para bloquear la directiva `unsafe-eval` y mitigar ataques XSS. La lógica se aísla de forma obligatoria en controladores TypeScript (en `src/scripts/`) y se registra en el `entrypoint` centralizado de Alpine.
- **Resiliencia en Red (Zod):** Cliente de peticiones seguro implementado a través de un wrapper genérico `safeFetch` que valida la respuesta de APIs externas en tiempo de ejecución usando esquemas de **Zod** (patrón Fail-Fast).
- **Observabilidad Global (Sentry):** Monitoreo en tiempo real con `@sentry/astro` y `@sentry/browser`. Captura automática de Core Web Vitals, errores en producción del cliente, y rastreo de excepciones internas de Alpine.js mediante interceptores en el entrypoint.
- **Infraestructura Agnóstica (Docker):** Contenedor multi-stage optimizado sobre Alpine Node y servido mediante un servidor **Nginx** de alto rendimiento con reglas estrictas de caché (activos con hash inmutables de 1 año), Gzip (nivel 6) y cabeceras de seguridad actualizadas.
- **Calidad de Código y Git Hooks:**
  - **ESLint** (Flat config recomendado para Astro/TS) y **Prettier** con ordenamiento de clases de Tailwind.
  - **Husky** y **lint-staged** protegiendo cada commit.
  - **Commitlint** forzando el estándar de _Conventional Commits_.
- **CI/CD:** Pipelines de GitHub Actions (`ci.yml` y `cd.yml`) pre-configurados.

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

La infraestructura está definida como código para que cualquier despliegue (local o en un VPS/Cloud) sea idéntico e inmutable. Para levantar el entorno completo de producción con Nginx, simplemente ejecuta el script de despliegue:

```bash
./deploy.sh
```

**¿Qué hace `deploy.sh`?**

1. Reconstruye la imagen Docker multi-stage omitiendo la caché local de compilación.
2. Reinicia los servicios de producción sin tiempo de inactividad visible.
3. Purga imágenes colgantes (Dangling images) para ahorrar espacio en disco.

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

Bajo la versión de `@alpinejs/csp`, **no** está permitido programar expresiones directas en el HTML. Todo comportamiento reactivo debe ser extraído a métodos de clases y componentes registrados en `alpine-entrypoint.ts`. Por ejemplo:

```html
<!-- INCORRECTO (Fallará bajo CSP): -->
<button @click="count++">Incrementar</button>

<!-- CORRECTO: -->
<button @click="increment">Incrementar</button>
```

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

La integración de Sentry capturar de manera temprana Core Web Vitals, excepciones no controladas y fallas lógicas de hidratación en Alpine.js. La página de error `500.astro` actúa puramente como una herramienta liviana de UX de contingencia, exenta de scripts externos pesados para garantizar su disponibilidad aun cuando los servicios de red fallen.
