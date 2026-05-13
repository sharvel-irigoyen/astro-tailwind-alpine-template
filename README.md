# 🚀 Template Grado Ingeniería: Astro + Tailwind CSS + Alpine.js

Este repositorio es una plantilla base (Starter Template) optimizada para iniciar proyectos web estáticos (SSG) de alto rendimiento, seguros y escalables. Está diseñado aplicando estrictas buenas prácticas de ingeniería de software, arquitectura DRY, despliegues inmutables y herramientas de calidad continua.

## ✨ Características Principales

- **Framework Core:** [Astro 5](https://astro.build) (Configurado por defecto en modo Static Site Generation - SSG).
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) nativamente integrado.
- **Reactividad:** [Alpine.js](https://alpinejs.dev/). Lógica aislada en TypeScript y tipada, importada a través del `entrypoint` oficial de Astro para evitar acoplamiento en HTML.
- **Infraestructura Agnóstica (Docker):** Contenedor multi-stage construido en base a Alpine Node, y servido eficientemente con **Nginx** (incluye GZIP, compresión y caché de recursos).
- **Validación de Entorno (Fail-Fast):** Uso de `astro:env` (Zod) para validación estricta de variables en tiempo de compilación.
- **Seguridad (CSP):** Cabeceras HTTP pre-configuradas en Nginx (XSS, HSTS, SAMEORIGIN, CSP adaptado a Alpine.js).
- **Calidad de Código y Git Hooks:**
  - **ESLint** (Flat config) y **Prettier**.
  - **Husky** y **lint-staged** protegiendo los commits.
  - **Commitlint** forzando los estándares de _Conventional Commits_.
- **CI/CD:** Pipelines de GitHub Actions (`ci.yml` y `cd.yml`) pre-configurados.

---

## 🛠️ Requisitos Previos

- [Node.js](https://nodejs.org/) (v22.12.0 o superior).
- [pnpm](https://pnpm.io/) (v9 recomendado).
- [Docker](https://www.docker.com/) y Docker Compose (Para pruebas locales y despliegue).

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
   - `pnpm run format`: Formatea el código (Prettier).
   - `pnpm run build`: Genera la build de producción en la carpeta `/dist/`.

---

## 🐳 Despliegue en Producción (Docker)

La infraestructura está definida como código para que cualquier despliegue (local o en un VPS/Cloud) sea idéntico e inmutable.

Para levantar el entorno completo de producción (Nginx sirviendo el build de Astro), simplemente ejecuta el script de despliegue:

```bash
./deploy.sh
```

**¿Qué hace `deploy.sh`?**

1. _(Opcional)_ Descarga los últimos cambios del repositorio.
2. Construye la imagen multi-stage esquivando la caché local de Docker.
3. Reinicia los contenedores sin tiempo de inactividad visible.
4. Purga y limpia el disco del servidor eliminando las imágenes colgantes (Dangling images).

El contenedor final estará disponible localmente o en tu servidor apuntando al puerto `8080` (ej. `http://localhost:8080`).

---

## 📂 Estructura del Proyecto

```text
/
├── .github/workflows/        # Pipelines CI/CD automatizados
├── nginx/
│   └── nginx.conf            # Configuración estricta de servidor y seguridad
├── src/
│   ├── components/ui/        # Componentes DRY (ej. Button.astro)
│   ├── layouts/              # Plantillas maestras de HTML
│   ├── pages/                # Rutas SSG (index, 404, 500)
│   ├── scripts/              # Lógica de Alpine extraída y tipada (TS)
│   └── styles/               # Entradas globales de Tailwind
├── .commitlintrc.mjs         # Estandarización de Commits
├── eslint.config.mjs         # Reglas de linting
├── Dockerfile                # Receta de empaquetado multi-stage
├── docker-compose.prod.yml   # Orquestador del servicio Nginx
└── deploy.sh                 # Entrypoint de integración continua (CD)
```

---

## 🔒 Manejo de Errores y Telemetría

- **Errores de Red:** Las vistas `404.astro` y `500.astro` ya están creadas.
- **Telemetría:** La página `500.astro` contiene indicaciones precisas de donde instanciar clientes de monitoreo (como Sentry o Datadog) para rastrear fallos críticos del sistema en un futuro.
- **Fail-Fast de Variables:** Si agregas variables en el objeto `schema` de `astro.config.mjs` y estas no se encuentran al hacer el build, el proceso se abortará de forma segura evitando inconsistencias.
