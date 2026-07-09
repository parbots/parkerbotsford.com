import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    verses: z.array(z.string()).default([]),
  }),
});

const writings = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/writings" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(["poem", "story", "essay"]),
    draft: z.boolean().default(false),
    verses: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().optional(),
    repo: z.string().optional(),
    status: z.string(),
    tech: z.array(z.string()).default([]),
    verses: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, writings, projects };
