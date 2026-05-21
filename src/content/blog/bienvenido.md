---
title: 'Bienvenido al Blog'
description: 'Este es un artículo de ejemplo para demostrar el sistema de blog integrado en la plantilla.'
pubDate: 2026-01-01
author: 'Equipo Editorial'
tags: ['plantilla', 'astro', 'blog']
image: '/og-image.png'
draft: false
---

# Bienvenido al Blog

Este es un artículo de ejemplo incluido en la plantilla. Puedes eliminarlo y crear tus propios artículos en el directorio `src/content/blog/`.

## ¿Cómo crear un nuevo artículo?

1. Crea un archivo `.md` o `.mdx` en `src/content/blog/`
2. Agrega el frontmatter requerido (título, descripción, fecha)
3. Escribe tu contenido en Markdown
4. ¡Listo! Astro generará la página automáticamente

## Características del blog

- **Tipado seguro**: El schema de Zod valida tu frontmatter en tiempo de compilación
- **SEO integrado**: Cada artículo genera automáticamente sus metadatos
- **Soporte MDX**: Puedes usar componentes Astro dentro de tus artículos
- **Borradores**: Marca `draft: true` para ocultar artículos en desarrollo
