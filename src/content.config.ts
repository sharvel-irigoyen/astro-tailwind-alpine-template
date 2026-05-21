import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Colección de artículos del blog.
 *
 * Para agregar un artículo, crea un archivo .md o .mdx en src/content/blog/
 * con el frontmatter que coincida con el schema definido abajo.
 *
 * Ejemplo de frontmatter:
 * ---
 * title: "Mi primer artículo"
 * description: "Descripción breve del artículo para SEO y tarjetas sociales."
 * pubDate: 2026-01-15
 * author: "Nombre del Autor"
 * tags: ["astro", "web"]
 * image: "/og-image.png"
 * draft: false
 * ---
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Equipo Editorial'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
