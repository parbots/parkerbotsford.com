# Warm Earth Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign parkerbotsford.com with warm earth-tone colors, Nunito + Atkinson Hyperlegible typography, playful seanhalpin-inspired layout with staggered cards, pill nav, and bouncy interactions.

**Architecture:** Bottom-up approach: foundation layer (CSS variables, fonts, global styles) first, then shared components (cards, nav), then page-level integration (homepage, content pages, index pages). Each task produces a buildable, visually verifiable result.

**Tech Stack:** Astro 6, React 19, Tailwind CSS v4, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-30-warm-earth-redesign-design.md`

**Verification after each task:** `pnpm build && pnpm lint && pnpm typecheck`

---

## Chunk 1: Foundation (CSS, Fonts, Base Layout)

### Task 1: Update Global CSS Variables and Typography

**Files:**
- Modify: `src/styles/global.css`

This task updates the CSS foundation: font variables, card color tokens, font-display application, theme transition scoping, and card animation keyframes.

- [ ] **Step 1: Update font variables and add card color tokens**

In `src/styles/global.css`, replace the first `:root { ... }` variable block (the one containing `--bg`, `--font-body`, etc.) with:

```css
:root {
  --bg: #f5f0eb;
  --bg-surface: #ede7e0;
  --fg: #2c2420;
  --fg-muted: #8c7b6b;
  --accent: #c4643a;
  --border: #d9cfc4;

  --font-display: "Nunito", sans-serif;
  --font-body: "Atkinson Hyperlegible Next", sans-serif;
  --font-mono: "JetBrains Mono", "Courier New", monospace;

  --content-width: 680px;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 8rem;

  /* Content-type card colors */
  --card-blog-bg: #b8967a;
  --card-blog-fg: #2e1f14;
  --card-writing-bg: #8a9e82;
  --card-writing-fg: #1e2a1a;
  --card-project-bg: #c9956e;
  --card-project-fg: #3a2312;
  --card-verse-bg: #c4b09a;
  --card-verse-fg: #332618;

  /* Nav indicator */
  --nav-indicator-bg: rgba(255, 255, 255, 0.5);
}
```

- [ ] **Step 2: Update dark mode variables**

Replace the first `.dark { ... }` block (the one containing `--bg`, `--accent`, etc.) with:

```css
.dark {
  --bg: #1c1917;
  --bg-surface: #262220;
  --fg: #e7ddd4;
  --fg-muted: #9c8b7b;
  --accent: #d4845a;
  --border: #3d3530;

  --card-blog-bg: #5c4b3d;
  --card-blog-fg: #e2d5c8;
  --card-writing-bg: #3d4a38;
  --card-writing-fg: #d4e0cf;
  --card-project-bg: #654a37;
  --card-project-fg: #e8d5c4;
  --card-verse-bg: #62584d;
  --card-verse-fg: #e2d8cc;

  --nav-indicator-bg: rgba(255, 255, 255, 0.08);
}
```

- [ ] **Step 3: Update base HTML font-family and heading rules**

Change `html` block to use `--font-body` and update heading rules to use `--font-display`:

```css
html {
  font-family: var(--font-body);
  background-color: var(--bg);
  color: var(--fg);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}
```

Update the `h1, h2, h3, h4` heading rule block to:

```css
h1,
h2,
h3,
h4 {
  font-family: var(--font-display);
  line-height: 1.3;
  font-weight: 600;
}
```

- [ ] **Step 4: Add font-switcher CSS classes**

After the `.dark` block, add:

```css
/* ===== Font Switcher ===== */
.font-lora {
  --font-body: "Lora", Georgia, serif;
}

.font-inter {
  --font-body: "Inter", system-ui, sans-serif;
}
```

- [ ] **Step 5: Scope theme transitions to avoid card hover conflicts**

Inside the first `@media (prefers-reduced-motion: no-preference)` block (the "Theme Transitions" section), replace the `html * { transition: ... }` rule with longhand properties:

```css
  html * {
    transition-property: background-color, color, border-color;
    transition-duration: 500ms;
    transition-timing-function: ease;
  }
```

Keep this inside the `@media` block so theme transitions are still suppressed for reduced-motion users. The longhand `transition-property` prevents this wildcard from overriding card hover `transform` transitions.

- [ ] **Step 6: Add card animation styles and waving hand keyframes**

Add inside the second `@media (prefers-reduced-motion: no-preference)` block (the "Motion" section, the one containing `.fade-in` and `@keyframes fadeIn`), after the `fadeIn` keyframes closing brace but before the `@media` block's closing brace:

```css
  /* ===== Card Hover ===== */
  .card-hover {
    transition:
      transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      box-shadow 0.5s ease;
  }

  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.15);
  }

  .card-hover:active {
    transform: translateY(0);
    box-shadow: none;
  }

  /* ===== Waving Hand ===== */
  .wave-hand {
    display: inline-block;
    animation: waveHand 1.5s ease-in-out infinite;
    transform-origin: 70% 70%;
  }

  @keyframes waveHand {
    0%,
    100% {
      transform: rotate(0deg);
    }
    15% {
      transform: rotate(14deg);
    }
    30% {
      transform: rotate(-8deg);
    }
    45% {
      transform: rotate(14deg);
    }
    60% {
      transform: rotate(-4deg);
    }
    75% {
      transform: rotate(10deg);
    }
  }
```

Wrap the card-hover and wave-hand styles inside the existing `@media (prefers-reduced-motion: no-preference)` block. Add a reduced-motion fallback for card-hover outside the block:

```css
/* Card hover fallback for reduced motion */
.card-hover {
  transition: box-shadow 0.3s ease;
}

.card-hover:hover {
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.1);
}
```

- [ ] **Step 7: Update prose styles for new typography**

Update `.prose pre` border-radius from `0.375rem` to `0.625rem` (10px) and `.prose img` border-radius from `0.375rem` to `0.5rem` to match the softer, rounder design language. Update `.prose p` line-height to `1.8`.

- [ ] **Step 8: Verify build**

Run: `pnpm build && pnpm lint && pnpm typecheck`
Expected: All pass. The site will look slightly different (new font references not yet loaded) but should build cleanly.

- [ ] **Step 9: Commit**

```bash
git add src/styles/global.css
git commit -m "style: update CSS foundation with earth-tone tokens and new typography"
```

---

### Task 2: Update Font Loading in Base.astro

**Files:**
- Modify: `src/layouts/Base.astro`

Update the Google Fonts link to load Nunito, Atkinson Hyperlegible Next, Lora, and Inter. Add the font-preference inline script.

- [ ] **Step 1: Replace the Google Fonts link**

Replace the existing Google Fonts `<link>` tag (the `fonts.googleapis.com` link in `<head>`) with:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,600;1,400&family=Nunito:wght@400;600;700;800&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 2: Add font-preference inline script**

Add immediately after the existing theme `<script is:inline>` block (the one that calls `applyTheme()`), before `</head>`:

```html
<script is:inline>
  function applyFont() {
    const pref = localStorage.getItem("font-preference");
    document.documentElement.classList.remove("font-lora", "font-inter");
    if (pref === "lora") document.documentElement.classList.add("font-lora");
    if (pref === "inter") document.documentElement.classList.add("font-inter");
  }
  applyFont();
  document.addEventListener("astro:after-swap", applyFont);
</script>
```

- [ ] **Step 3: Verify build**

Run: `pnpm build && pnpm lint && pnpm typecheck`
Expected: All pass. Fonts now load but aren't visually applied to all components yet.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: load new font stack and add font-preference script"
```

---

### Task 3: Update Footer

**Files:**
- Modify: `src/components/primitives/Footer.astro`

Simplify footer with new typography and generous spacing.

- [ ] **Step 1: Rewrite Footer.astro**

Replace the entire file with:

```astro
---
const year = new Date().getFullYear();
---

<footer class="mx-auto w-full max-w-[var(--content-width)] px-6 py-12">
  <div class="border-t border-[var(--border)] pt-8 text-center">
    <p class="text-sm text-[var(--fg-muted)]">
      &copy; {year} Parker Botsford
    </p>
  </div>
</footer>
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/primitives/Footer.astro
git commit -m "style: simplify footer with centered layout and generous spacing"
```

---

## Chunk 2: Navigation System

### Task 4: Create NavIndicator Component

**Files:**
- Create: `src/components/primitives/NavIndicator.astro`

Astro component with inline script that creates a sliding pill behind the active nav link.

- [ ] **Step 1: Create NavIndicator.astro**

```astro
---
---

<span
  id="nav-indicator"
  class="pointer-events-none absolute rounded-full"
  style="background: var(--nav-indicator-bg); height: 32px; transition: left 0.3s ease-in-out, width 0.3s ease-in-out, opacity 0.3s ease-in-out; opacity: 0;"
></span>

<script is:inline>
  function updateNavIndicator() {
    const nav = document.querySelector("[data-nav-pill]");
    const indicator = document.getElementById("nav-indicator");
    if (!nav || !indicator) return;

    const activeLink = nav.querySelector("[data-active]");
    if (!activeLink) {
      indicator.style.opacity = "0";
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    indicator.style.left = linkRect.left - navRect.left + "px";
    indicator.style.width = linkRect.width + "px";
    indicator.style.top =
      linkRect.top - navRect.top + (linkRect.height - 32) / 2 + "px";
    indicator.style.opacity = "1";
  }

  updateNavIndicator();
  window.addEventListener("resize", updateNavIndicator);
  document.addEventListener("astro:after-swap", () => {
    requestAnimationFrame(updateNavIndicator);
  });
</script>
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Pass (component is created but not yet used).

- [ ] **Step 3: Commit**

```bash
git add src/components/primitives/NavIndicator.astro
git commit -m "feat: add NavIndicator component with sliding pill animation"
```

---

### Task 5: Create FontSwitcher Component

**Files:**
- Create: `src/components/primitives/FontSwitcher.tsx`

React island that renders an "Aa" button opening a dropdown to switch body fonts.

- [ ] **Step 1: Create FontSwitcher.tsx**

```tsx
import { useState, useRef, useEffect } from "react";

const FONTS = [
  { id: "default", label: "Atkinson Hyperlegible", className: "" },
  { id: "lora", label: "Lora", className: "font-lora" },
  { id: "inter", label: "Inter", className: "font-inter" },
] as const;

export default function FontSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("default");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pref = localStorage.getItem("font-preference");
    if (pref === "lora" || pref === "inter") setCurrent(pref);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function selectFont(id: string) {
    setCurrent(id);
    setOpen(false);

    document.documentElement.classList.remove("font-lora", "font-inter");
    if (id === "lora") {
      document.documentElement.classList.add("font-lora");
      localStorage.setItem("font-preference", "lora");
    } else if (id === "inter") {
      document.documentElement.classList.add("font-inter");
      localStorage.setItem("font-preference", "inter");
    } else {
      localStorage.removeItem("font-preference");
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change font"
        aria-expanded={open}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-xs font-semibold text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
      >
        Aa
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-1.5 shadow-lg">
          {FONTS.map((font) => (
            <button
              key={font.id}
              onClick={() => selectFont(font.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
                current === font.id
                  ? "bg-[var(--bg-surface)] font-semibold text-[var(--fg)]"
                  : "text-[var(--fg-muted)] hover:bg-[var(--bg-surface)]"
              }`}
            >
              <span>{font.label}</span>
              {current === font.id && (
                <span className="text-[var(--accent)]">&#10003;</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build && pnpm lint && pnpm typecheck`
Expected: All pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/primitives/FontSwitcher.tsx
git commit -m "feat: add FontSwitcher component with Aa popup menu"
```

---

### Task 6: Redesign Nav.astro as Pill Nav

**Files:**
- Modify: `src/components/primitives/Nav.astro`
- Modify: `src/components/primitives/MobileNav.tsx`

Redesign desktop nav as a centered pill with sliding indicator, font switcher, and theme toggle. Update mobile nav styling.

- [ ] **Step 1: Rewrite Nav.astro**

Replace the entire file with:

```astro
---
import { NAV_ITEMS } from "../../config";
import ThemeToggle from "./ThemeToggle";
import FontSwitcher from "./FontSwitcher";
import MobileNav from "./MobileNav";
import NavIndicator from "./NavIndicator.astro";

const currentPath = Astro.url.pathname;
---

<nav class="relative z-50 flex w-full justify-center px-6 py-6">
  {/* Desktop: PB monogram */}
  <a
    href="/"
    class="absolute left-6 top-1/2 hidden -translate-y-1/2 text-sm font-bold text-[var(--fg-muted)] no-underline hover:text-[var(--accent)] md:block"
    style="font-family: var(--font-display);"
  >
    PB
  </a>

  {/* Desktop pill nav */}
  <div
    data-nav-pill
    class="relative hidden items-center gap-0.5 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-1.5 py-1 md:flex"
  >
    <NavIndicator />
    {
      NAV_ITEMS.map((item) => {
        const isActive =
          currentPath === item.href ||
          (item.href !== "/" && currentPath.startsWith(item.href));
        return (
          <a
            href={item.href}
            data-active={isActive ? "" : undefined}
            class:list={[
              "relative z-10 rounded-full px-3.5 py-1.5 text-sm no-underline transition-colors duration-200",
              isActive
                ? "font-semibold text-[var(--fg)]"
                : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
            ]}
          >
            {item.label}
          </a>
        );
      })
    }
    <div
      class="ml-1.5 flex items-center gap-1 border-l border-[var(--border)] pl-2"
    >
      <FontSwitcher client:load />
      <ThemeToggle client:load />
    </div>
  </div>

  {/* Mobile nav */}
  <div class="flex w-full items-center justify-between md:hidden">
    <a
      href="/"
      class="text-sm font-bold text-[var(--fg-muted)] no-underline hover:text-[var(--accent)]"
      style="font-family: var(--font-display);"
    >
      PB
    </a>
    <div class="flex items-center gap-3">
      <FontSwitcher client:load />
      <ThemeToggle client:load />
      <MobileNav client:load items={[...NAV_ITEMS]} />
    </div>
  </div>
</nav>
```

- [ ] **Step 2: Update MobileNav.tsx styling**

In `src/components/primitives/MobileNav.tsx`, update the overlay nav links to use the display font instead of mono. Find `style={{ fontFamily: "var(--font-mono)" }}` on the nav link elements and change to `style={{ fontFamily: "var(--font-display)" }}`. Also update the link className to use `font-semibold` instead of default weight.

- [ ] **Step 3: Verify build**

Run: `pnpm build && pnpm lint && pnpm typecheck`
Expected: All pass. Nav now renders as a centered pill on desktop.

- [ ] **Step 4: Commit**

```bash
git add src/components/primitives/Nav.astro src/components/primitives/MobileNav.tsx
git commit -m "feat: redesign nav as centered pill with sliding indicator and font switcher"
```

---

## Chunk 3: Shared Card Components

### Task 7: Create ContentCard Component

**Files:**
- Create: `src/components/shared/ContentCard.astro`

A shared colored card used on the homepage (staggered) and index pages (full-width). Supports all four content types via a `type` prop.

- [ ] **Step 1: Create ContentCard.astro**

```astro
---
interface Props {
  type: "blog" | "writing" | "project" | "verse";
  title: string;
  description?: string;
  href: string;
  meta?: string;
  class?: string;
}

const { type, title, description, href, meta, class: className } = Astro.props;

const colorMap = {
  blog: "bg-[var(--card-blog-bg)] text-[var(--card-blog-fg)]",
  writing: "bg-[var(--card-writing-bg)] text-[var(--card-writing-fg)]",
  project: "bg-[var(--card-project-bg)] text-[var(--card-project-fg)]",
  verse: "bg-[var(--card-verse-bg)] text-[var(--card-verse-fg)]",
};

const labelMap = {
  blog: "Blog Post",
  writing: "Writing",
  project: "Project",
  verse: "Daily Verse",
};
---

<a
  href={href}
  class:list={[
    "card-hover group relative block overflow-hidden rounded-3xl p-6 no-underline md:p-7",
    colorMap[type],
    className,
  ]}
>
  {/* Dot pattern decoration */}
  <div
    class="pointer-events-none absolute right-5 top-5 grid grid-cols-3 gap-1 opacity-15"
    style="will-change: transform;"
    aria-hidden="true"
  >
    {Array.from({ length: 6 }).map(() => (
      <span class="h-1 w-1 rounded-full bg-current" />
    ))}
  </div>

  <div class="relative z-10 flex min-h-[120px] flex-col justify-between">
    <div>
      <span
        class="mb-2 block text-[0.65rem] font-semibold uppercase tracking-widest opacity-70"
      >
        {labelMap[type]}
      </span>
      <h3
        class="mb-1 text-xl font-bold leading-tight"
        style="font-family: var(--font-display);"
      >
        {title}
      </h3>
      {description && (
        <p class="text-sm leading-relaxed opacity-80">{description}</p>
      )}
      <slot />
    </div>
    {meta && (
      <span
        class="mt-auto block pt-3 text-[0.65rem] opacity-55"
        style="font-family: var(--font-mono);"
      >
        {meta}
      </span>
    )}
  </div>

  {/* Arrow indicator */}
  <span
    class="absolute bottom-5 right-6 text-xl opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-60 md:-translate-x-2"
    aria-hidden="true"
  >
    &rarr;
  </span>
</a>
```

- [ ] **Step 2: Verify build**

Run: `pnpm build && pnpm lint && pnpm typecheck`
Expected: All pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/ContentCard.astro
git commit -m "feat: add shared ContentCard component with earth-tone colors"
```

---

### Task 8: Create ContentHeaderCard Component

**Files:**
- Create: `src/components/shared/ContentHeaderCard.astro`

Wide colored card used at the top of content pages and index pages.

- [ ] **Step 1: Create ContentHeaderCard.astro**

```astro
---
interface Props {
  type: "blog" | "writing" | "project" | "verse";
  title: string;
  meta?: string;
  tags?: string[];
}

const { type, title, meta, tags = [] } = Astro.props;

const colorMap = {
  blog: "bg-[var(--card-blog-bg)] text-[var(--card-blog-fg)]",
  writing: "bg-[var(--card-writing-bg)] text-[var(--card-writing-fg)]",
  project: "bg-[var(--card-project-bg)] text-[var(--card-project-fg)]",
  verse: "bg-[var(--card-verse-bg)] text-[var(--card-verse-fg)]",
};

const labelMap = {
  blog: "Blog Post",
  writing: "Writing",
  project: "Project",
  verse: "Verses",
};
---

<div
  class:list={[
    "relative mx-auto my-8 max-w-[44rem] overflow-hidden rounded-2xl px-8 py-7 md:px-10 md:py-9",
    colorMap[type],
  ]}
>
  {/* Dot pattern decoration */}
  <div
    class="pointer-events-none absolute right-5 top-5 grid grid-cols-3 gap-1 opacity-15"
    aria-hidden="true"
  >
    {Array.from({ length: 6 }).map(() => (
      <span class="h-1 w-1 rounded-full bg-current" />
    ))}
  </div>

  <span
    class="mb-2 block text-[0.65rem] font-semibold uppercase tracking-widest opacity-70"
  >
    {labelMap[type]}
  </span>
  <h1
    class="text-2xl font-extrabold leading-tight md:text-3xl"
    style="font-family: var(--font-display);"
  >
    {title}
  </h1>
  {meta && <p class="mt-1.5 text-sm opacity-70">{meta}</p>}
  <slot />
  {
    tags.length > 0 && (
      <div class="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            class="rounded-full px-2.5 py-0.5 text-xs opacity-80"
            style="background: rgba(0,0,0,0.08); font-family: var(--font-mono);"
          >
            {tag}
          </span>
        ))}
      </div>
    )
  }
</div>
```

- [ ] **Step 2: Verify build**

Run: `pnpm build && pnpm lint && pnpm typecheck`
Expected: All pass.

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/ContentHeaderCard.astro
git commit -m "feat: add ContentHeaderCard component for content page headers"
```

---

## Chunk 4: Homepage Redesign

### Task 9: Create StaggeredCards Component

**Files:**
- Create: `src/features/home/StaggeredCards.astro`

The homepage layout that fetches latest content from all types and renders them as alternating left/right cards.

- [ ] **Step 1: Create StaggeredCards.astro**

```astro
---
import { getCollection } from "astro:content";
import { DAILY_VERSES } from "../../data/verses";
import { getDailyVerse } from "../../utils/verse-cache";
import { formatDate } from "../../utils/dates";
import ContentCard from "../../components/shared/ContentCard.astro";

// Latest blog post
const posts = (await getCollection("blog", ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
const latestPost = posts[0];

// Latest writing
const writings = (await getCollection("writings", ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
const latestWriting = writings[0];

// First project (sorted by title)
const projects = (await getCollection("projects"))
  .sort((a, b) => a.data.title.localeCompare(b.data.title));
const firstProject = projects[0];

// Daily verse
const dailyRefs = DAILY_VERSES.map((v) => v.ref);
const verse = getDailyVerse(dailyRefs);
---

<section class="mx-auto flex max-w-[46rem] flex-col gap-4 px-6 py-8">
  {
    latestPost && (
      <ContentCard
        type="blog"
        title={latestPost.data.title}
        description={latestPost.data.description}
        href={`/blog/${latestPost.id}`}
        meta={`${formatDate(latestPost.data.date)}`}
        class="w-full self-end md:w-3/4"
      />
    )
  }
  {
    latestWriting && (
      <ContentCard
        type="writing"
        title={latestWriting.data.title}
        description={`A ${latestWriting.data.type}`}
        href={`/writings/${latestWriting.id}`}
        meta={formatDate(latestWriting.data.date)}
        class="w-full self-start md:w-[68%]"
      />
    )
  }
  {
    firstProject && (
      <ContentCard
        type="project"
        title={firstProject.data.title}
        description={firstProject.data.description}
        href={`/projects/${firstProject.id}`}
        meta={firstProject.data.status}
        class="w-full self-end md:w-3/4"
      />
    )
  }
  {
    verse && (
      <ContentCard
        type="verse"
        title="Verse of the Day"
        href="/verses"
        class="w-full self-start md:w-[70%]"
      >
        <p class="mt-2 text-sm italic leading-relaxed opacity-90">
          &ldquo;{verse.text}&rdquo;
        </p>
        <span
          class="mt-1 block text-xs opacity-70"
          style="font-family: var(--font-mono);"
        >
          {verse.reference}
        </span>
      </ContentCard>
    )
  }
</section>
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Pass.

- [ ] **Step 3: Commit**

```bash
git add src/features/home/StaggeredCards.astro
git commit -m "feat: add StaggeredCards homepage component with all content types"
```

---

### Task 10: Redesign Hero and Homepage

**Files:**
- Modify: `src/features/home/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Rewrite Hero.astro**

Replace the entire file with:

```astro
---
import { SITE } from "../../config";
---

<section class="px-6 pb-8 pt-16 text-center md:pb-12 md:pt-24">
  <h1
    class="mb-3 text-4xl font-extrabold tracking-tight md:text-6xl"
    style="font-family: var(--font-display); letter-spacing: -1.5px; line-height: 1.05;"
  >
    <span class="wave-hand">&#128075;</span> {SITE.author}
  </h1>
  <p
    class="mx-auto max-w-md text-base text-[var(--fg-muted)] md:text-lg"
    style="line-height: 1.6;"
  >
    Engineer, writer, and maker of things. Building software, writing poems, and
    exploring faith.
  </p>
</section>
```

- [ ] **Step 2: Rewrite index.astro**

Replace the entire file with:

```astro
---
import Base from "../layouts/Base.astro";
import Nav from "../components/primitives/Nav.astro";
import Footer from "../components/primitives/Footer.astro";
import Hero from "../features/home/Hero.astro";
import StaggeredCards from "../features/home/StaggeredCards.astro";
import { SITE } from "../config";
---

<Base title={SITE.title} description={SITE.description}>
  <div class="flex min-h-svh flex-col">
    <a href="#main" class="skip-link">Skip to content</a>
    <Nav />
    <main id="main" class="fade-in flex-1">
      <Hero />
      <StaggeredCards />
    </main>
    <Footer />
  </div>
</Base>
```

- [ ] **Step 3: Remove dead code**

`RecentPosts.astro` and `DailyVerse.astro` are no longer imported by the homepage (replaced by `StaggeredCards.astro` which handles both). Delete these files:

```bash
rm src/features/home/RecentPosts.astro
```

Note: `DailyVerse.astro` is still referenced by `StaggeredCards.astro` indirectly through the verse utility functions, but the component itself (`src/features/bible/DailyVerse.astro`) is no longer used as a standalone component. Keep it for now since it's in the bible feature directory and may be useful later.

- [ ] **Step 4: Verify build**

Run: `pnpm build && pnpm lint && pnpm typecheck`
Expected: All pass.

- [ ] **Step 5: Commit**

```bash
git add src/features/home/Hero.astro src/pages/index.astro src/features/home/RecentPosts.astro
git commit -m "feat: redesign homepage with centered hero and staggered content cards"
```

---

## Chunk 5: Content Pages and Layouts

### Task 11: Update Content Page Layouts

**Files:**
- Modify: `src/layouts/Post.astro`
- Modify: `src/layouts/Writing.astro`
- Modify: `src/layouts/Project.astro`

Replace the plain headers with `ContentHeaderCard` components.

- [ ] **Step 1: Rewrite Post.astro**

```astro
---
import Page from "./Page.astro";
import ContentHeaderCard from "../components/shared/ContentHeaderCard.astro";
import CodeBlockToolbar from "../components/shared/CodeBlockToolbar.astro";
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
    <ContentHeaderCard
      type="blog"
      title={title}
      meta={`${formatDate(date)}`}
      tags={tags}
    />
    <div class="prose mx-auto max-w-[var(--content-width)]">
      <slot />
    </div>
  </article>
  <CodeBlockToolbar />
</Page>
```

- [ ] **Step 2: Rewrite Writing.astro**

```astro
---
import Page from "./Page.astro";
import ContentHeaderCard from "../components/shared/ContentHeaderCard.astro";
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
    <ContentHeaderCard
      type="writing"
      title={title}
      meta={`${formatDate(date)} · ${type}`}
    />
    <div class="prose mx-auto max-w-[var(--content-width)]">
      <slot />
    </div>
  </article>
</Page>
```

- [ ] **Step 3: Rewrite Project.astro**

```astro
---
import Page from "./Page.astro";
import ContentHeaderCard from "../components/shared/ContentHeaderCard.astro";

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
    <ContentHeaderCard type="project" title={title} meta={status} tags={tech}>
      {
        (url || repo) && (
          <div class="mt-3 flex items-center gap-4 text-sm">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center gap-1 underline opacity-80 hover:opacity-100"
              >
                Visit &rarr;
              </a>
            )}
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center gap-1 underline opacity-80 hover:opacity-100"
              >
                Source &rarr;
              </a>
            )}
          </div>
        )
      }
    </ContentHeaderCard>
    <div class="prose mx-auto max-w-[var(--content-width)]">
      <slot />
    </div>
  </article>
</Page>
```

- [ ] **Step 4: Verify build**

Run: `pnpm build && pnpm lint && pnpm typecheck`
Expected: All pass. Content pages now show colored header cards.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Post.astro src/layouts/Writing.astro src/layouts/Project.astro
git commit -m "feat: add colored ContentHeaderCard to all content page layouts"
```

---

### Task 12: Update Index Pages

**Files:**
- Modify: `src/pages/blog/index.astro`
- Modify: `src/pages/writings/index.astro`
- Modify: `src/pages/projects/index.astro`
- Modify: `src/features/blog/components/PostList.astro`
- Modify: `src/features/blog/components/PostCard.astro`
- Modify: `src/features/writings/components/WritingList.astro`
- Modify: `src/features/writings/components/WritingCard.astro`
- Modify: `src/features/projects/components/ProjectList.astro`
- Modify: `src/features/projects/components/ProjectCard.astro`

Replace the plain list styles with ContentHeaderCard page headers and ContentCard list items.

- [ ] **Step 1: Update blog index page**

Replace `src/pages/blog/index.astro`:

```astro
---
import Page from "../../layouts/Page.astro";
import ContentHeaderCard from "../../components/shared/ContentHeaderCard.astro";
import PostList from "../../features/blog/components/PostList.astro";
---

<Page title="Blog" description="Posts on code and other things.">
  <ContentHeaderCard
    type="blog"
    title="Blog"
    meta="Posts on code and other things."
  />
  <PostList />
</Page>
```

- [ ] **Step 2: Update PostCard.astro to use ContentCard**

Replace `src/features/blog/components/PostCard.astro`:

```astro
---
import ContentCard from "../../../components/shared/ContentCard.astro";
import { formatDate } from "../../../utils/dates";

interface Props {
  title: string;
  description: string;
  date: Date;
  href: string;
  tags?: string[];
}

const { title, description, date, href, tags = [] } = Astro.props;
const meta = `${formatDate(date)}${tags.length > 0 ? ` · ${tags.join(", ")}` : ""}`;
---

<ContentCard type="blog" {title} {description} {href} {meta} />
```

- [ ] **Step 3: Update PostList.astro to use vertical stack layout**

Replace `src/features/blog/components/PostList.astro`:

```astro
---
import { getCollection } from "astro:content";
import PostCard from "./PostCard.astro";

const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime(),
);
---

<div class="mx-auto flex max-w-[44rem] flex-col gap-4 py-4">
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

- [ ] **Step 4: Update writings index page**

Replace `src/pages/writings/index.astro`:

```astro
---
import Page from "../../layouts/Page.astro";
import ContentHeaderCard from "../../components/shared/ContentHeaderCard.astro";
import WritingList from "../../features/writings/components/WritingList.astro";
---

<Page title="Writings" description="Poems, stories, and essays.">
  <ContentHeaderCard
    type="writing"
    title="Writings"
    meta="Poems, stories, and essays."
  />
  <WritingList />
</Page>
```

- [ ] **Step 5: Update WritingCard.astro to use ContentCard**

Replace `src/features/writings/components/WritingCard.astro`:

```astro
---
import ContentCard from "../../../components/shared/ContentCard.astro";
import { formatDate } from "../../../utils/dates";

interface Props {
  title: string;
  date: Date;
  type: string;
  href: string;
}

const { title, date, type, href } = Astro.props;
---

<ContentCard
  type="writing"
  {title}
  description={`A ${type}`}
  {href}
  meta={formatDate(date)}
/>
```

- [ ] **Step 6: Update WritingList.astro layout**

Replace `src/features/writings/components/WritingList.astro`:

```astro
---
import { getCollection } from "astro:content";
import WritingCard from "./WritingCard.astro";

const writings = (
  await getCollection("writings", ({ data }) => !data.draft)
).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<div class="mx-auto flex max-w-[44rem] flex-col gap-4 py-4">
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

- [ ] **Step 7: Update projects index page**

Replace `src/pages/projects/index.astro`:

```astro
---
import Page from "../../layouts/Page.astro";
import ContentHeaderCard from "../../components/shared/ContentHeaderCard.astro";
import ProjectList from "../../features/projects/components/ProjectList.astro";
---

<Page title="Projects" description="Things I'm building.">
  <ContentHeaderCard
    type="project"
    title="Projects"
    meta="Things I'm building."
  />
  <ProjectList />
</Page>
```

- [ ] **Step 8: Update ProjectCard.astro to use ContentCard**

Replace `src/features/projects/components/ProjectCard.astro`:

```astro
---
import ContentCard from "../../../components/shared/ContentCard.astro";

interface Props {
  title: string;
  description: string;
  status: string;
  tech: string[];
  href: string;
}

const { title, description, status, tech, href } = Astro.props;
const meta = `${status}${tech.length > 0 ? ` · ${tech.join(", ")}` : ""}`;
---

<ContentCard type="project" {title} {description} {href} {meta} />
```

- [ ] **Step 9: Update ProjectList.astro layout**

Replace `src/features/projects/components/ProjectList.astro`:

```astro
---
import { getCollection } from "astro:content";
import ProjectCard from "./ProjectCard.astro";

const projects = (await getCollection("projects")).sort((a, b) =>
  a.data.title.localeCompare(b.data.title),
);
---

<div class="mx-auto flex max-w-[44rem] flex-col gap-4 py-4">
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

- [ ] **Step 10: Verify build**

Run: `pnpm build && pnpm lint && pnpm typecheck`
Expected: All pass.

- [ ] **Step 11: Commit**

```bash
git add src/pages/blog/index.astro src/pages/writings/index.astro src/pages/projects/index.astro \
  src/features/blog/components/PostCard.astro src/features/blog/components/PostList.astro \
  src/features/writings/components/WritingCard.astro src/features/writings/components/WritingList.astro \
  src/features/projects/components/ProjectCard.astro src/features/projects/components/ProjectList.astro
git commit -m "feat: redesign all index pages with ContentHeaderCard and ContentCard components"
```

---

## Chunk 6: Remaining Pages, Parallax, and Cleanup

### Task 13: Update Other Pages (About, 404, Verses)

**Files:**
- Modify: `src/pages/404.astro`
- Modify: `src/pages/verses.astro`

Apply new typography to remaining pages. Note: `about.astro` requires no changes -- it inherits the new typography from global CSS automatically.

- [ ] **Step 1: Update 404.astro**

Replace `src/pages/404.astro`:

```astro
---
import Base from "../layouts/Base.astro";
import Nav from "../components/primitives/Nav.astro";
import Footer from "../components/primitives/Footer.astro";
---

<Base title="Not Found">
  <div class="flex min-h-svh flex-col">
    <a href="#main" class="skip-link">Skip to content</a>
    <Nav />
    <main
      id="main"
      class="fade-in mx-auto flex w-full max-w-[var(--content-width)] flex-1 flex-col items-center justify-center px-6"
    >
      <p
        class="text-6xl font-extrabold text-[var(--fg-muted)]"
        style="font-family: var(--font-display);"
      >
        404
      </p>
      <p class="mt-4 text-[var(--fg-muted)]">This page doesn't exist.</p>
      <a
        href="/"
        class="mt-8 text-sm"
        style="font-family: var(--font-display);">Go home</a
      >
    </main>
    <Footer />
  </div>
</Base>
```

- [ ] **Step 2: Update verses.astro**

Replace `src/pages/verses.astro`:

```astro
---
import Page from "../layouts/Page.astro";
import ContentHeaderCard from "../components/shared/ContentHeaderCard.astro";
import VerseList from "../features/bible/VerseList.astro";
---

<Page title="Verses" description="Bible verse references across the site">
  <ContentHeaderCard
    type="verse"
    title="Verses"
    meta="All Bible verse references found across the site, from the ESV."
  />
  <div class="mx-auto max-w-[var(--content-width)]">
    <VerseList />
    <footer
      class="mt-12 border-t pt-6 text-xs leading-relaxed"
      style="border-color: var(--border); color: var(--fg-muted);"
    >
      Scripture quotations are from the
      <a href="https://www.esv.org" target="_blank" rel="noopener noreferrer"
        >ESV<sup>&reg;</sup> Bible</a
      >
      (The Holy Bible, English Standard Version<sup>&reg;</sup>), &copy; 2001 by
      Crossway, a publishing ministry of Good News Publishers. Used by
      permission. All rights reserved. The ESV text may not be quoted in any
      publication made available to the public by a Creative Commons license. The
      ESV may not be translated into any other language.
    </footer>
  </div>
</Page>
```

- [ ] **Step 3: Verify build**

Run: `pnpm build && pnpm lint && pnpm typecheck`
Expected: All pass.

- [ ] **Step 4: Commit**

```bash
git add src/pages/404.astro src/pages/verses.astro
git commit -m "style: update 404 and verses pages with new typography and card headers"
```

---

### Task 14: Add Parallax Dot Pattern Effect

**Files:**
- Modify: `src/features/home/StaggeredCards.astro`

Add an inline script for subtle mouse-based parallax on the dot patterns.

- [ ] **Step 1: Add parallax script to StaggeredCards.astro**

Add at the bottom of `StaggeredCards.astro`, after the closing `</section>`. This script checks for fine pointer (desktop) and reduced motion preference, then uses `requestAnimationFrame` for GPU-efficient parallax:

```html
<script is:inline>
  if (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const cards = document.querySelectorAll(".card-hover");
    cards.forEach((card) => {
      let rafId = 0;
      card.addEventListener("mousemove", (e) => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          const dots = card.querySelector("[aria-hidden]");
          if (dots) {
            dots.style.transform = "translate(" + (x * 3) + "px, " + (y * 3) + "px)";
          }
        });
      });
      card.addEventListener("mouseleave", () => {
        cancelAnimationFrame(rafId);
        const dots = card.querySelector("[aria-hidden]");
        if (dots) {
          dots.style.transform = "translate(0, 0)";
          dots.style.transition = "transform 0.3s ease";
          setTimeout(function () { dots.style.transition = ""; }, 300);
        }
      });
    });
  }
</script>
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Pass.

- [ ] **Step 3: Commit**

```bash
git add src/features/home/StaggeredCards.astro
git commit -m "feat: add subtle mouse-based parallax to homepage dot patterns"
```

---

### Task 15: Update Page.astro to Widen Max-Width

**Files:**
- Modify: `src/layouts/Page.astro`

The `ContentHeaderCard` uses `max-w-[44rem]` (704px) and index page lists use the same. The current `--content-width: 680px` on `<main>` would clip these. Widen `<main>` to `max-w-3xl` (48rem / 768px) so wider components can breathe, while prose and cards still control their own narrower max-widths internally.

- [ ] **Step 1: Update Page.astro**

Replace `src/layouts/Page.astro`:

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
    <a href="#main" class="skip-link">Skip to content</a>
    <Nav />
    <main id="main" class="fade-in mx-auto w-full max-w-3xl flex-1 px-6 py-8">
      <slot />
    </main>
    <Footer />
  </div>
</Base>
```

- [ ] **Step 2: Verify build**

Run: `pnpm build && pnpm lint && pnpm typecheck`
Expected: All pass.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Page.astro
git commit -m "style: adjust Page layout spacing"
```

---

### Task 16: Final Verification and Lint/Format Fix

**Files:**
- All modified files

- [ ] **Step 1: Run full verification suite**

```bash
pnpm build && pnpm lint && pnpm typecheck
```

Expected: All pass.

- [ ] **Step 2: Run formatting check**

```bash
pnpm format:check
```

If there are new formatting issues in files we modified, fix them:

```bash
pnpm format
```

- [ ] **Step 3: Fix any issues**

Address any lint, type, or format errors found. Re-run verification after each fix.

- [ ] **Step 4: Commit any format fixes**

```bash
git add -u
git commit -m "style: auto-format updated files with Prettier"
```

- [ ] **Step 5: Visual review**

Run `pnpm dev` and manually verify:
- Homepage: centered pill nav, hero with waving hand, staggered colored cards
- Blog index: clay card header, full-width blog cards
- Blog post: wide clay header card, clean prose below
- Writings/Projects: same pattern with olive/copper colors
- Verses: sand card header
- 404: updated typography
- Dark mode: all card colors shift correctly
- Mobile: pill nav hidden, hamburger works, cards go full-width
- Font switcher: "Aa" button works, Lora/Inter switch correctly
- Hover cards: bouncy animation works
- Nav indicator: slides between items

---

## Chunk 7: Documentation Update

### Task 17: Update Project Documentation

**Files:**
- Modify: `docs/styling.md`
- Modify: `docs/architecture.md`

- [ ] **Step 1: Update docs/styling.md**

Update to reflect new font stack (Nunito display, Atkinson Hyperlegible body), card color tokens, and animation system.

- [ ] **Step 2: Update docs/architecture.md**

Add new components to the architecture doc: `FontSwitcher.tsx`, `NavIndicator.astro`, `ContentCard.astro`, `ContentHeaderCard.astro`, `StaggeredCards.astro`.

- [ ] **Step 3: Commit**

```bash
git add docs/styling.md docs/architecture.md
git commit -m "docs: update styling and architecture docs for warm earth redesign"
```
