import { glob } from 'astro/loaders'
import { ObsidianMdLoader } from 'astro-loader-obsidian'
import { defineCollection, z } from 'astro:content'
import { POSTS_CONFIG } from '~/config'
import type { CoverLayout, PostType } from '~/types'

const posts = defineCollection({
  loader: ObsidianMdLoader({
    base: './src/content/vault',
    url: 'posts',
  }),
  schema: () =>
    z
      .object({
        // Required Obsidian fields
        title: z.string(),
        slug: z.string(),
        permalink: z.string(),
        created: z.date(),
        updated: z.date(),
        // Optional Obsidian fields
        description: z.string().optional(),
        tags: z.array(z.string()).nullish(),
        aliases: z.array(z.string()).nullish(),
        publish: z.boolean().optional(),
        author: z.string().optional(),
        cover: z.string().optional(),
        image: z.string().optional(),
        links: z.array(z.any()).optional(),
        images: z.array(z.any()).optional(),
        cssClass: z.array(z.string()).nullish(),
        cssclasses: z.array(z.string()).nullish(),
        order: z.number().optional(),
        zettelkasten: z.any().optional(),
        // Litos-specific fields (optional in Obsidian)
        recommend: z.boolean().default(false),
        postType: z.custom<PostType>().optional(),
        coverLayout: z.custom<CoverLayout>().optional(),
        pinned: z.boolean().default(false),
        draft: z.boolean().default(false),
        license: z.string().optional(),
      })
      .transform((data) => ({
        ...data,
        // Map Obsidian fields to Litos expected fields
        pubDate: data.created,
        updatedDate: data.updated,
        description: data.description || '',
        author: data.author || POSTS_CONFIG.author,
        tags: data.tags || [],
        draft: data.publish === false ? true : (data.draft || false),
        ogImage: undefined as any,
        cover: undefined as any,
      })),
})

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/projects',
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      githubUrl: z.string(),
      website: z.string(),
      type: z.string(),
      icon: image().optional(),
      imageClass: z.string().optional(),
      star: z.number(),
      fork: z.number(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { posts, projects }
