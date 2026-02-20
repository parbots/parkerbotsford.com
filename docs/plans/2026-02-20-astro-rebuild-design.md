# Astro Rebuild Design

Personal website rebuild from Next.js to Astro with MDX content, React islands, and wabi-sabi aesthetic.

## Architecture: Feature-Folder Monolith

```
src/
  config.ts                     # site metadata, nav items, social links
  content.config.ts             # Astro content collection schemas
  utils/
    dates.ts
    reading-time.ts
  types/
    index.ts
  components/
    primitives/                 # base UI atoms
      Nav.astro
      Footer.astro
      Link.astro
      Button.astro
      ThemeToggle.tsx            # React island (client:load)
    shared/                     # composite components used across features
      TableOfContents.astro
      TagList.astro
      ImageGallery.tsx
  features/
    home/
      Hero.astro
      RecentPosts.astro
    blog/
      components/
        PostCard.astro
        PostList.astro
      interactive/              # blog-specific MDX islands
        CodePlayground.tsx
        Callout.astro
    writings/
      components/
        WritingCard.astro
        WritingList.astro
      interactive/              # writings-specific MDX islands
        PoemLayout.astro
        Footnote.astro
    projects/
      components/
        ProjectCard.astro
        ProjectList.astro
      interactive/              # projects-specific MDX islands
        Demo.tsx
        TechStack.astro
  layouts/
    Base.astro                  # HTML shell, <head>, global CSS, fonts
    Page.astro                  # Base + Nav + Footer
    Post.astro                  # Page + blog post metadata header
    Writing.astro               # Page + writing metadata header
    Project.astro               # Page + project metadata header
  pages/
    index.astro
    about.astro
    blog/
      index.astro
      [...slug].astro
    writings/
      index.astro
      [...slug].astro
    projects/
      index.astro
      [...slug].astro
  styles/
    global.css                  # reset, typography, theme variables, transitions
```

## Component Tiers

1. **Primitives** (`components/primitives/`) — base UI atoms used everywhere
2. **Shared composites** (`components/shared/`) — higher-level components used across multiple features
3. **Feature-specific** (`features/*/components/` + `features/*/interactive/`) — components and interactive MDX islands unique to each content type

## Tech Stack

- Astro (latest)
- @astrojs/mdx — all content is .mdx
- @astrojs/react — React island hydration
- @astrojs/tailwind + tailwindcss — utility classes
- Global CSS — typography, theme variables, reset

## Content Collections

All content files are `.mdx` for interactive component support.

### Blog

- title, description, date, tags[], draft

### Writings

- title, date, type (poem|story|essay), draft

### Projects

- title, description, url?, repo?, status, tech[]

Drafts filtered in production builds.

## Routing

```
/                  → index.astro (home)
/about             → about.astro
/blog              → blog/index.astro
/blog/[slug]       → blog/[...slug].astro
/writings          → writings/index.astro
/writings/[slug]   → writings/[...slug].astro
/projects          → projects/index.astro
/projects/[slug]   → projects/[...slug].astro
```

Pages are thin routing layers that query content collections and delegate to feature components + layouts.

## Layout Chain

```
Base.astro → Page.astro → Post.astro      (blog)
                        → Writing.astro   (writings)
                        → Project.astro   (projects)
```

## Visual Design: Wabi-Sabi

### Color Palette

| Token        | Light                | Dark                |
| ------------ | -------------------- | ------------------- |
| --bg         | #F5F0EB (cream)      | #1C1917 (chocolate) |
| --bg-surface | #EDE7E0 (stone)      | #262220 (charcoal)  |
| --fg         | #2C2420 (espresso)   | #E7DDD4 (parchment) |
| --fg-muted   | #8C7B6B (warm grey)  | #9C8B7B (dusty)     |
| --accent     | #C4643A (terracotta) | #D4845A (lt terra)  |
| --border     | #D9CFC4 (sand)       | #3D3530 (dk sand)   |

### Typography

- Body/headings: Lora (humanist serif)
- Code/nav/UI: JetBrains Mono
- Scale: fluid clamp(), line-height 1.7 for body

### Motion

- Page load: content fade-in (300ms ease)
- Links: color shift (200ms)
- Cards: subtle translate-y lift (150ms)
- Page transitions: Astro View Transitions (crossfade)
- Respects prefers-reduced-motion

### Layout Principles

- Max content width ~680px
- Generous vertical spacing
- Asymmetric margins where natural
- No visual clutter

### Dark Mode

- ThemeToggle React island in nav
- Respects prefers-color-scheme on first visit
- Preference stored in localStorage
