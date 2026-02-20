# Astro Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild parkerbotsford.com from Next.js to Astro with MDX content collections, React islands, Tailwind + global CSS, and a wabi-sabi visual design.

**Architecture:** Feature-folder monolith. Shared primitives in `src/components/primitives/`, shared composites in `src/components/shared/`, feature-specific components in `src/features/{blog,writings,projects}/`. Content collections for all content types using `.mdx`. Layouts chain: Base → Page → Post/Writing/Project. See `docs/plans/2026-02-20-astro-rebuild-design.md` for full design.

**Tech Stack:** Astro 5, @astrojs/mdx, @astrojs/react, @astrojs/tailwind, Tailwind CSS 4, TypeScript

---

### Task 1: Scaffold Astro Project

Remove the existing Next.js source and initialize a fresh Astro project in-place.

**Files:**

- Delete: `src/` (entire Next.js source)
- Delete: `next.config.js`, `.eslintrc.json`
- Create: fresh Astro project files

**Step 1: Clean out Next.js files**

```bash
rm -rf src/ next.config.js .eslintrc.json
```

**Step 2: Initialize Astro**

```bash
npm create astro@latest . -- --template minimal --typescript strict --install --no-git
```

Accept overwrite prompts. This creates `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, etc.

**Step 3: Add integrations**

```bash
npx astro add react mdx tailwind
```

Accept all prompts. This installs `@astrojs/react`, `@astrojs/mdx`, `@astrojs/tailwind` and configures `astro.config.mjs`.

**Step 4: Verify it builds**

```bash
npm run build
```

Expected: Build succeeds with the minimal template.

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project with React, MDX, Tailwind"
```

---

### Task 2: Create Directory Structure

Set up the feature-folder architecture. Empty directories with placeholder files.

**Files:**

- Create: all directories per design doc

**Step 1: Create directory tree**

```bash
mkdir -p src/components/primitives
mkdir -p src/components/shared
mkdir -p src/features/home
mkdir -p src/features/blog/components
mkdir -p src/features/blog/interactive
mkdir -p src/features/writings/components
mkdir -p src/features/writings/interactive
mkdir -p src/features/projects/components
mkdir -p src/features/projects/interactive
mkdir -p src/layouts
mkdir -p src/styles
mkdir -p src/utils
mkdir -p src/types
mkdir -p src/data/blog
mkdir -p src/data/writings
mkdir -p src/data/projects
mkdir -p src/pages/blog
mkdir -p src/pages/writings
mkdir -p src/pages/projects
```

**Step 2: Commit**

```bash
git add -A
git commit -m "chore: create feature-folder directory structure"
```

---

### Task 3: Global Styles and Theme Variables

Create the CSS foundation: reset, theme variables, typography, motion.

**Files:**

- Create: `src/styles/global.css`

**Step 1: Write global.css**

```css
/* ===== Reset ===== */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ===== Theme Variables ===== */
:root {
  --bg: #f5f0eb;
  --bg-surface: #ede7e0;
  --fg: #2c2420;
  --fg-muted: #8c7b6b;
  --accent: #c4643a;
  --border: #d9cfc4;

  --font-body: "Lora", Georgia, serif;
  --font-mono: "JetBrains Mono", "Courier New", monospace;

  --content-width: 680px;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 8rem;
}

.dark {
  --bg: #1c1917;
  --bg-surface: #262220;
  --fg: #e7ddd4;
  --fg-muted: #9c8b7b;
  --accent: #d4845a;
  --border: #3d3530;
}

/* ===== Base ===== */
html {
  font-family: var(--font-body);
  background-color: var(--bg);
  color: var(--fg);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

body {
  min-height: 100svh;
}

/* ===== Typography ===== */
h1,
h2,
h3,
h4 {
  line-height: 1.3;
  font-weight: 600;
}

h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
}
h2 {
  font-size: clamp(1.375rem, 3vw, 1.875rem);
}
h3 {
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
}

p {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
}

code,
pre {
  font-family: var(--font-mono);
  font-size: 0.9em;
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color 200ms ease;
}

a:hover {
  color: var(--fg);
}

/* ===== Motion ===== */
@media (prefers-reduced-motion: no-preference) {
  .fade-in {
    animation: fadeIn 300ms ease both;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

**Step 2: Verify build**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global styles with wabi-sabi theme variables"
```

---

### Task 4: Site Config and Utilities

Create the centralized config and utility functions.

**Files:**

- Create: `src/config.ts`
- Create: `src/utils/dates.ts`
- Create: `src/utils/reading-time.ts`
- Create: `src/types/index.ts`

**Step 1: Write src/config.ts**

```typescript
export const SITE = {
  title: "Parker Botsford",
  description:
    "IT engineer and programmer with a passion for designing, building, and maintaining innovative technology solutions.",
  url: "https://parkerbotsford.com",
  author: "Parker Botsford",
} as const;

export const NAV_ITEMS = [
  { label: "Blog", href: "/blog" },
  { label: "Writings", href: "/writings" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
] as const;
```

**Step 2: Write src/utils/dates.ts**

```typescript
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
```

**Step 3: Write src/utils/reading-time.ts**

```typescript
export function readingTime(text: string): string {
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}
```

**Step 4: Write src/types/index.ts**

```typescript
export type NavItem = {
  label: string;
  href: string;
};
```

**Step 5: Verify build**

```bash
npm run build
```

**Step 6: Commit**

```bash
git add src/config.ts src/utils/ src/types/
git commit -m "feat: add site config, date/reading-time utils, types"
```

---

### Task 5: Base and Page Layouts

Create the layout chain: Base.astro (HTML shell) and Page.astro (Nav + Footer wrapper).

**Files:**

- Create: `src/layouts/Base.astro`
- Create: `src/layouts/Page.astro`

**Step 1: Write Base.astro**

This is the HTML shell. Loads fonts, global CSS, view transitions, and injects a theme script to avoid flash.

```astro
---
import { ClientRouter } from "astro:transitions";
import "../styles/global.css";

interface Props {
  title: string;
  description?: string;
}

const { title, description = "" } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <title>{title}</title>
    <ClientRouter />
    <script is:inline>
      const theme =
        localStorage.getItem("theme") ??
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      document.documentElement.classList.toggle("dark", theme === "dark");
    </script>
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Step 2: Write Page.astro**

Wraps content with Nav and Footer. Used by all pages except the homepage (which may want a different layout).

```astro
---
import Base from "./Base.astro";
import Nav from "../components/primitives/Nav.astro";
import Footer from "../components/primitives/Footer.astro";

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<Base title={title} description={description}>
  <div class="flex min-h-svh flex-col">
    <Nav />
    <main
      class="fade-in mx-auto w-full max-w-[var(--content-width)] flex-1 px-6 py-12"
    >
      <slot />
    </main>
    <Footer />
  </div>
</Base>
```

**Step 3: Verify build**

```bash
npm run build
```

Expected: May warn about missing Nav/Footer components — that's fine, we build those next.

**Step 4: Commit**

```bash
git add src/layouts/
git commit -m "feat: add Base and Page layouts with fonts, theme, view transitions"
```

---

### Task 6: Primitive Components

Build the shared UI atoms: Nav, Footer, Link, Button, ThemeToggle.

**Files:**

- Create: `src/components/primitives/Nav.astro`
- Create: `src/components/primitives/Footer.astro`
- Create: `src/components/primitives/Link.astro`
- Create: `src/components/primitives/ThemeToggle.tsx`

**Step 1: Write Nav.astro**

```astro
---
import { NAV_ITEMS } from "../../config";
import ThemeToggle from "./ThemeToggle";
---

<nav
  class="mx-auto flex w-full max-w-[var(--content-width)] items-center justify-between px-6 py-6"
>
  <a
    href="/"
    class="font-mono text-sm tracking-wide text-[var(--fg)] no-underline hover:text-[var(--accent)]"
    style="font-family: var(--font-mono);"
  >
    Parker Botsford
  </a>
  <div class="flex items-center gap-6">
    {
      NAV_ITEMS.map((item) => (
        <a
          href={item.href}
          class="text-sm text-[var(--fg-muted)] no-underline hover:text-[var(--accent)]"
          style="font-family: var(--font-mono);"
        >
          {item.label}
        </a>
      ))
    }
    <ThemeToggle client:load />
  </div>
</nav>
```

**Step 2: Write Footer.astro**

```astro
---
const year = new Date().getFullYear();
---

<footer class="mx-auto w-full max-w-[var(--content-width)] px-6 py-8">
  <div class="border-t border-[var(--border)] pt-6">
    <p
      class="text-sm text-[var(--fg-muted)]"
      style="font-family: var(--font-mono);"
    >
      &copy; {year} Parker Botsford
    </p>
  </div>
</footer>
```

**Step 3: Write Link.astro**

Smart link — internal uses regular anchor, external adds target/rel.

```astro
---
interface Props {
  href: string;
  external?: boolean;
  class?: string;
}

const { href, external = false, class: className = "" } = Astro.props;
const attrs = external ? { target: "_blank", rel: "noreferrer" } : {};
---

<a href={href} class={className} {...attrs}>
  <slot />
</a>
```

**Step 4: Write ThemeToggle.tsx**

React island for dark mode toggle.

```tsx
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{ fontFamily: "var(--font-mono)" }}
      className="text-sm text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
    >
      {dark ? "light" : "dark"}
    </button>
  );
}
```

**Step 5: Verify build**

```bash
npm run build
```

**Step 6: Commit**

```bash
git add src/components/primitives/
git commit -m "feat: add primitive components (Nav, Footer, Link, ThemeToggle)"
```

---

### Task 7: Content Collections Config

Define the three content collections with Zod schemas.

**Files:**

- Create: `src/content.config.ts`

**Step 1: Write content.config.ts**

```typescript
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
  }),
});

const writings = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/writings" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(["poem", "story", "essay"]),
    draft: z.boolean().default(false),
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
  }),
});

export const collections = { blog, writings, projects };
```

**Step 2: Add a sample blog post for testing**

Create `src/data/blog/hello-world.mdx`:

```mdx
---
title: Hello World
description: A first post to test the blog.
date: 2026-02-20
tags: [meta]
---

This is the first post. Just testing that content collections work.
```

**Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds, content collection is recognized.

**Step 4: Commit**

```bash
git add src/content.config.ts src/data/blog/hello-world.mdx
git commit -m "feat: add content collection schemas and sample blog post"
```

---

### Task 8: Homepage

Build the homepage with Hero and RecentPosts feature components.

**Files:**

- Create: `src/features/home/Hero.astro`
- Create: `src/features/home/RecentPosts.astro`
- Modify: `src/pages/index.astro`

**Step 1: Write Hero.astro**

```astro
---
import { SITE } from "../../config";
---

<section class="py-24 md:py-32">
  <h1 class="mb-4">Hi, I'm Parker.</h1>
  <p class="max-w-lg text-[var(--fg-muted)]">{SITE.description}</p>
  <nav class="mt-8 flex gap-6" style="font-family: var(--font-mono);">
    <a href="/blog" class="text-sm">/blog</a>
    <a href="/writings" class="text-sm">/writings</a>
    <a href="/projects" class="text-sm">/projects</a>
    <a href="/about" class="text-sm">/about</a>
  </nav>
</section>
```

**Step 2: Write RecentPosts.astro**

```astro
---
import { getCollection } from "astro:content";
import { formatDate } from "../../utils/dates";

const posts = (await getCollection("blog", ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 3);
---

{
  posts.length > 0 && (
    <section class="py-12">
      <h2 class="mb-6 text-lg" style="font-family: var(--font-mono);">
        Recent posts
      </h2>
      <ul class="space-y-4">
        {posts.map((post) => (
          <li>
            <a href={`/blog/${post.id}`} class="group block">
              <span class="text-[var(--fg)] transition-colors duration-200 group-hover:text-[var(--accent)]">
                {post.data.title}
              </span>
              <span
                class="ml-3 text-sm text-[var(--fg-muted)]"
                style="font-family: var(--font-mono);"
              >
                {formatDate(post.data.date)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

**Step 3: Write index.astro**

```astro
---
import Base from "../layouts/Base.astro";
import Nav from "../components/primitives/Nav.astro";
import Footer from "../components/primitives/Footer.astro";
import Hero from "../features/home/Hero.astro";
import RecentPosts from "../features/home/RecentPosts.astro";
import { SITE } from "../config";
---

<Base title={SITE.title} description={SITE.description}>
  <div class="flex min-h-svh flex-col">
    <Nav />
    <main
      class="fade-in mx-auto w-full max-w-[var(--content-width)] flex-1 px-6"
    >
      <Hero />
      <RecentPosts />
    </main>
    <Footer />
  </div>
</Base>
```

**Step 4: Verify build and dev server**

```bash
npm run build
npm run dev
```

Open `http://localhost:4321` — homepage should render with Hero + recent posts.

**Step 5: Commit**

```bash
git add src/features/home/ src/pages/index.astro
git commit -m "feat: add homepage with Hero and RecentPosts"
```

---

### Task 9: Blog Feature (List + Detail Pages)

Build the blog list page, PostCard, PostList, and dynamic slug page.

**Files:**

- Create: `src/features/blog/components/PostCard.astro`
- Create: `src/features/blog/components/PostList.astro`
- Create: `src/layouts/Post.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[...slug].astro`

**Step 1: Write PostCard.astro**

```astro
---
import { formatDate } from "../../../utils/dates";

interface Props {
  title: string;
  description: string;
  date: Date;
  href: string;
  tags?: string[];
}

const { title, description, date, href, tags = [] } = Astro.props;
---

<article class="group py-4">
  <a href={href} class="block no-underline">
    <h3
      class="text-[var(--fg)] transition-colors duration-200 group-hover:text-[var(--accent)]"
    >
      {title}
    </h3>
    <p class="mt-1 text-sm text-[var(--fg-muted)]">{description}</p>
    <div
      class="mt-2 flex items-center gap-3 text-xs text-[var(--fg-muted)]"
      style="font-family: var(--font-mono);"
    >
      <time>{formatDate(date)}</time>
      {tags.length > 0 && <span>{tags.join(", ")}</span>}
    </div>
  </a>
</article>
```

**Step 2: Write PostList.astro**

```astro
---
import { getCollection } from "astro:content";
import PostCard from "./PostCard.astro";

const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime(),
);
---

<div class="divide-y divide-[var(--border)]">
  {
    posts.map((post) => (
      <PostCard
        title={post.data.title}
        description={post.data.description}
        date={post.data.date}
        href={`/blog/${post.id}`}
        tags={post.data.tags}
      />
    ))
  }
</div>
```

**Step 3: Write Post.astro layout**

```astro
---
import Page from "./Page.astro";
import { formatDate } from "../utils/dates";

interface Props {
  title: string;
  description: string;
  date: Date;
  tags?: string[];
}

const { title, description, date, tags = [] } = Astro.props;
---

<Page title={title} description={description}>
  <article>
    <header class="mb-12">
      <h1 class="mb-3">{title}</h1>
      <div
        class="flex items-center gap-3 text-sm text-[var(--fg-muted)]"
        style="font-family: var(--font-mono);"
      >
        <time>{formatDate(date)}</time>
        {tags.length > 0 && <span>&middot; {tags.join(", ")}</span>}
      </div>
    </header>
    <div class="prose">
      <slot />
    </div>
  </article>
</Page>
```

**Step 4: Write blog/index.astro**

```astro
---
import Page from "../../layouts/Page.astro";
import PostList from "../../features/blog/components/PostList.astro";
---

<Page title="Blog" description="Posts on code and other things.">
  <h1 class="mb-8">Blog</h1>
  <PostList />
</Page>
```

**Step 5: Write blog/[...slug].astro**

```astro
---
import { getCollection, render } from "astro:content";
import Post from "../../layouts/Post.astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<Post
  title={post.data.title}
  description={post.data.description}
  date={post.data.date}
  tags={post.data.tags}
>
  <Content />
</Post>
```

**Step 6: Verify build and test navigation**

```bash
npm run build
npm run dev
```

Visit `/blog` and `/blog/hello-world`. Both should render.

**Step 7: Commit**

```bash
git add src/features/blog/ src/layouts/Post.astro src/pages/blog/
git commit -m "feat: add blog feature with list page and dynamic post pages"
```

---

### Task 10: Writings Feature

Build the writings section — mirrors blog structure but with its own layout and components.

**Files:**

- Create: `src/features/writings/components/WritingCard.astro`
- Create: `src/features/writings/components/WritingList.astro`
- Create: `src/layouts/Writing.astro`
- Create: `src/pages/writings/index.astro`
- Create: `src/pages/writings/[...slug].astro`
- Create: `src/data/writings/sample-poem.mdx` (test content)

**Step 1: Write WritingCard.astro**

```astro
---
import { formatDate } from "../../../utils/dates";

interface Props {
  title: string;
  date: Date;
  type: string;
  href: string;
}

const { title, date, type, href } = Astro.props;
---

<article class="group py-4">
  <a href={href} class="block no-underline">
    <div class="flex items-baseline justify-between gap-4">
      <h3
        class="text-[var(--fg)] transition-colors duration-200 group-hover:text-[var(--accent)]"
      >
        {title}
      </h3>
      <span
        class="shrink-0 text-xs text-[var(--fg-muted)]"
        style="font-family: var(--font-mono);"
      >
        {type}
      </span>
    </div>
    <time
      class="mt-1 block text-xs text-[var(--fg-muted)]"
      style="font-family: var(--font-mono);"
    >
      {formatDate(date)}
    </time>
  </a>
</article>
```

**Step 2: Write WritingList.astro**

```astro
---
import { getCollection } from "astro:content";
import WritingCard from "./WritingCard.astro";

const writings = (
  await getCollection("writings", ({ data }) => !data.draft)
).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<div class="divide-y divide-[var(--border)]">
  {
    writings.map((writing) => (
      <WritingCard
        title={writing.data.title}
        date={writing.data.date}
        type={writing.data.type}
        href={`/writings/${writing.id}`}
      />
    ))
  }
</div>
```

**Step 3: Write Writing.astro layout**

```astro
---
import Page from "./Page.astro";
import { formatDate } from "../utils/dates";

interface Props {
  title: string;
  date: Date;
  type: string;
}

const { title, date, type } = Astro.props;
---

<Page title={title}>
  <article>
    <header class="mb-12">
      <h1 class="mb-3">{title}</h1>
      <div
        class="flex items-center gap-3 text-sm text-[var(--fg-muted)]"
        style="font-family: var(--font-mono);"
      >
        <time>{formatDate(date)}</time>
        <span>&middot; {type}</span>
      </div>
    </header>
    <div class="prose">
      <slot />
    </div>
  </article>
</Page>
```

**Step 4: Write pages/writings/index.astro**

```astro
---
import Page from "../../layouts/Page.astro";
import WritingList from "../../features/writings/components/WritingList.astro";
---

<Page title="Writings" description="Poems, stories, and essays.">
  <h1 class="mb-8">Writings</h1>
  <WritingList />
</Page>
```

**Step 5: Write pages/writings/[...slug].astro**

```astro
---
import { getCollection, render } from "astro:content";
import Writing from "../../layouts/Writing.astro";

export async function getStaticPaths() {
  const writings = await getCollection("writings");
  return writings.map((writing) => ({
    params: { slug: writing.id },
    props: { writing },
  }));
}

const { writing } = Astro.props;
const { Content } = await render(writing);
---

<Writing
  title={writing.data.title}
  date={writing.data.date}
  type={writing.data.type}
>
  <Content />
</Writing>
```

**Step 6: Add sample content**

Create `src/data/writings/sample-poem.mdx`:

```mdx
---
title: First Light
date: 2026-02-20
type: poem
---

Morning comes slowly here,
through curtains of warm dust.
```

**Step 7: Verify build**

```bash
npm run build
npm run dev
```

Visit `/writings` and `/writings/sample-poem`.

**Step 8: Commit**

```bash
git add src/features/writings/ src/layouts/Writing.astro src/pages/writings/ src/data/writings/
git commit -m "feat: add writings feature with list page and dynamic detail pages"
```

---

### Task 11: Projects Feature

Build the projects section with its own layout and components.

**Files:**

- Create: `src/features/projects/components/ProjectCard.astro`
- Create: `src/features/projects/components/ProjectList.astro`
- Create: `src/layouts/Project.astro`
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/projects/[...slug].astro`
- Create: `src/data/projects/parkerbotsford-com.mdx` (test content)

**Step 1: Write ProjectCard.astro**

```astro
---
interface Props {
  title: string;
  description: string;
  status: string;
  tech: string[];
  href: string;
}

const { title, description, status, tech, href } = Astro.props;
---

<article class="group py-4">
  <a href={href} class="block no-underline">
    <div class="flex items-baseline justify-between gap-4">
      <h3
        class="text-[var(--fg)] transition-colors duration-200 group-hover:text-[var(--accent)]"
      >
        {title}
      </h3>
      <span
        class="shrink-0 text-xs text-[var(--fg-muted)]"
        style="font-family: var(--font-mono);"
      >
        {status}
      </span>
    </div>
    <p class="mt-1 text-sm text-[var(--fg-muted)]">{description}</p>
    {
      tech.length > 0 && (
        <div class="mt-2 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              class="rounded bg-[var(--bg-surface)] px-2 py-0.5 text-xs text-[var(--fg-muted)]"
              style="font-family: var(--font-mono);"
            >
              {t}
            </span>
          ))}
        </div>
      )
    }
  </a>
</article>
```

**Step 2: Write ProjectList.astro**

```astro
---
import { getCollection } from "astro:content";
import ProjectCard from "./ProjectCard.astro";

const projects = (await getCollection("projects")).sort((a, b) =>
  a.data.title.localeCompare(b.data.title),
);
---

<div class="divide-y divide-[var(--border)]">
  {
    projects.map((project) => (
      <ProjectCard
        title={project.data.title}
        description={project.data.description}
        status={project.data.status}
        tech={project.data.tech}
        href={`/projects/${project.id}`}
      />
    ))
  }
</div>
```

**Step 3: Write Project.astro layout**

```astro
---
import Page from "./Page.astro";

interface Props {
  title: string;
  description: string;
  status: string;
  tech: string[];
  url?: string;
  repo?: string;
}

const { title, description, status, tech, url, repo } = Astro.props;
---

<Page title={title} description={description}>
  <article>
    <header class="mb-12">
      <h1 class="mb-3">{title}</h1>
      <p class="text-[var(--fg-muted)]">{description}</p>
      <div
        class="mt-4 flex flex-wrap items-center gap-4 text-sm"
        style="font-family: var(--font-mono);"
      >
        <span class="text-[var(--fg-muted)]">{status}</span>
        {
          url && (
            <a href={url} target="_blank" rel="noreferrer">
              visit
            </a>
          )
        }
        {
          repo && (
            <a href={repo} target="_blank" rel="noreferrer">
              source
            </a>
          )
        }
      </div>
      {
        tech.length > 0 && (
          <div class="mt-3 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                class="rounded bg-[var(--bg-surface)] px-2 py-0.5 text-xs text-[var(--fg-muted)]"
                style="font-family: var(--font-mono);"
              >
                {t}
              </span>
            ))}
          </div>
        )
      }
    </header>
    <div class="prose">
      <slot />
    </div>
  </article>
</Page>
```

**Step 4: Write pages/projects/index.astro**

```astro
---
import Page from "../../layouts/Page.astro";
import ProjectList from "../../features/projects/components/ProjectList.astro";
---

<Page title="Projects" description="Things I'm building.">
  <h1 class="mb-8">Projects</h1>
  <ProjectList />
</Page>
```

**Step 5: Write pages/projects/[...slug].astro**

```astro
---
import { getCollection, render } from "astro:content";
import Project from "../../layouts/Project.astro";

export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);
---

<Project
  title={project.data.title}
  description={project.data.description}
  status={project.data.status}
  tech={project.data.tech}
  url={project.data.url}
  repo={project.data.repo}
>
  <Content />
</Project>
```

**Step 6: Add sample content**

Create `src/data/projects/parkerbotsford-com.mdx`:

```mdx
---
title: parkerbotsford.com
description: My personal website and portfolio.
url: https://parkerbotsford.com
repo: https://github.com/parbots/parkerbotsford.com
status: active
tech: [Astro, React, Tailwind, MDX]
---

This website! Built with Astro and lots of love.
```

**Step 7: Verify build**

```bash
npm run build
npm run dev
```

Visit `/projects` and `/projects/parkerbotsford-com`.

**Step 8: Commit**

```bash
git add src/features/projects/ src/layouts/Project.astro src/pages/projects/ src/data/projects/
git commit -m "feat: add projects feature with list page and dynamic detail pages"
```

---

### Task 12: About Page

Build the about page.

**Files:**

- Create: `src/pages/about.astro`

**Step 1: Write about.astro**

```astro
---
import Page from "../layouts/Page.astro";
---

<Page title="About" description="About Parker Botsford.">
  <h1 class="mb-8">About Me</h1>
  <div class="space-y-4 text-[var(--fg-muted)]">
    <p>I'm Parker Botsford, an IT engineer and programmer.</p>
    <p>I currently live near the Atlanta area.</p>
    <p>
      I enjoy building websites and tools that help software developers and IT
      technicians work smarter.
    </p>
    <p>I love working with and maintaining open source projects!</p>
    <p>
      For more, check out <a href="/projects">my projects</a> or <a href="/blog"
        >read my blog</a
      >.
    </p>
  </div>
</Page>
```

**Step 2: Verify build**

```bash
npm run build
npm run dev
```

Visit `/about`.

**Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add about page"
```

---

### Task 13: Prose Styles for MDX Content

Add styling for rendered MDX content (headings, lists, code blocks, etc. inside `.prose`).

**Files:**

- Modify: `src/styles/global.css`

**Step 1: Add prose styles to global.css**

Append to the end of `src/styles/global.css`:

```css
/* ===== Prose (MDX content) ===== */
.prose h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.prose h3 {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose p {
  margin-bottom: 1.25rem;
}

.prose ul,
.prose ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose pre {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1.25rem;
}

.prose code:not(pre code) {
  background: var(--bg-surface);
  border-radius: 0.25rem;
  padding: 0.125rem 0.375rem;
}

.prose blockquote {
  border-left: 2px solid var(--accent);
  padding-left: 1rem;
  color: var(--fg-muted);
  margin-bottom: 1.25rem;
}

.prose img {
  max-width: 100%;
  border-radius: 0.375rem;
  margin-bottom: 1.25rem;
}

.prose hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2rem 0;
}
```

**Step 2: Verify build**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add prose styles for MDX content rendering"
```

---

### Task 14: Starter Interactive Components

Add one interactive component per feature to establish the pattern.

**Files:**

- Create: `src/features/blog/interactive/Callout.astro`
- Create: `src/features/writings/interactive/PoemLayout.astro`
- Create: `src/features/projects/interactive/TechStack.astro`

**Step 1: Write blog Callout.astro**

```astro
---
interface Props {
  type?: "info" | "warning" | "tip";
}

const { type = "info" } = Astro.props;
const borderColor = {
  info: "var(--accent)",
  warning: "#D97706",
  tip: "#059669",
}[type];
---

<aside
  class="my-6 rounded-r border-l-2 bg-[var(--bg-surface)] px-4 py-3"
  style={`border-color: ${borderColor};`}
>
  <slot />
</aside>
```

**Step 2: Write writings PoemLayout.astro**

```astro
---
interface Props {
  centered?: boolean;
}

const { centered = false } = Astro.props;
---

<div class:list={["my-8 italic leading-loose", { "text-center": centered }]}>
  <slot />
</div>
```

**Step 3: Write projects TechStack.astro**

```astro
---
interface Props {
  items: { name: string; role: string }[];
}

const { items } = Astro.props;
---

<div class="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
  {
    items.map((item) => (
      <div class="rounded border border-[var(--border)] bg-[var(--bg-surface)] p-3">
        <span class="block text-sm font-semibold text-[var(--fg)]">
          {item.name}
        </span>
        <span class="text-xs text-[var(--fg-muted)]">{item.role}</span>
      </div>
    ))
  }
</div>
```

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/features/blog/interactive/ src/features/writings/interactive/ src/features/projects/interactive/
git commit -m "feat: add starter interactive components (Callout, PoemLayout, TechStack)"
```

---

### Task 15: Update CLAUDE.md

Update CLAUDE.md to reflect the new Astro project.

**Files:**

- Modify: `CLAUDE.md`

**Step 1: Rewrite CLAUDE.md for the Astro project**

Replace contents with updated commands, architecture, and conventions reflecting the new Astro setup.

**Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for Astro rebuild"
```

---

### Task 16: Final Verification

End-to-end build and navigation check.

**Step 1: Clean build**

```bash
rm -rf dist/
npm run build
```

Expected: Build succeeds with no errors.

**Step 2: Dev server smoke test**

```bash
npm run dev
```

Visit each route and verify:

- `/` — homepage with hero + recent posts
- `/about` — about page
- `/blog` — blog list with sample post
- `/blog/hello-world` — blog detail page
- `/writings` — writings list with sample
- `/writings/sample-poem` — writing detail page
- `/projects` — projects list with sample
- `/projects/parkerbotsford-com` — project detail page
- Dark mode toggle works
- View transitions work between pages

**Step 3: Commit any fixes from verification**

```bash
git add -A
git commit -m "fix: address issues found during verification"
```
