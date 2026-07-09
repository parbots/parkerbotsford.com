# Beza-Language Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle parkerbotsford.com in the beza design language — bone/sandstone palette, Fraunces display type, revealed-corner cards, mono micro-labels — per the approved spec at `docs/superpowers/specs/2026-07-08-beza-redesign-design.md`, preserving all existing widgets and interaction code.

**Architecture:** Primitives-first migration. Task 1 swaps design tokens in `src/styles/global.css` and font loading in `src/layouts/Base.astro` (site instantly re-themes because every component reads CSS variables). Task 2 adds six new static `.astro` primitives. Later tasks rebuild the two card choke points (`ContentCard`, `ContentHeaderCard`) on the new primitives — which restyles every card on the site — then the hero, footer, and small pages. Every task leaves the site deployable.

**Tech Stack:** Astro 5, Tailwind CSS v4 (`@theme`), CSS custom properties, Google Fonts (Fraunces variable), MDX content collections. No new dependencies, no new React islands.

**Testing note:** This repo has no JS test infrastructure, and the changes are visual/static. The verification loop for every task is the repo's required gate — `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm build` (fix errors _and_ warnings) — plus a dev-server visual check in **both themes** (`pnpm dev`, toggle via the sun/moon button in the nav). TDD steps are replaced by these verify steps.

**Rules (from CLAUDE.md):** work on the `dev` branch; never push; never commit/merge to `main`; atomic conventional commits.

**Spec deviations (documented):**

- The spec says the hero "Latest:" line draws from blog/writings/projects. The `projects` collection has no `date` or `draft` fields (`src/content.config.ts:28-39`), so the line draws from **blog + writings only**. Do not add fields to the projects schema (out of scope).
- Spec §3 lists "VerseList cards" for rebuild, but `src/features/bible/VerseList.astro` renders a plain list, not cards — it re-themes automatically via tokens. No changes to it.
- Spec §5 mentions list-page "accent word" titles and "reading time" metadata. List titles are single words ("Blog", "Projects") with no natural accent word, and the site has no reading-time utility — both are deliberately skipped. Do not invent them.

---

## Chunk 1: Foundation — tokens, fonts, primitives

### Task 1: Design tokens + Fraunces loading

**Files:**

- Modify: `src/styles/global.css` (theme variable blocks, base heading rules, prose `hr`, Shiki vars)
- Modify: `src/layouts/Base.astro:41` (Google Fonts URL)

- [ ] **Step 1: Swap the Google Fonts URL in `src/layouts/Base.astro`**

Replace the `href` on line 41 (drops `Nunito`, adds variable `Fraunces` with italics; other families unchanged):

```
https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:ital,wght@0,400;0,600;1,400&family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap
```

- [ ] **Step 2: Replace the `:root` palette block in `src/styles/global.css`**

Replace lines 8-28 (from `:root {` through the last `--card-verse-fg` line — do NOT touch `--nav-indicator-bg` on line 30 or `--content-width` on line 32; they stay) with the following. **Keep** the `--card-blog-bg`…`--card-verse-fg` variables for now (ContentCard still reads them until Task 5; they're deleted in Task 9):

```css
:root {
  --bg: #faf7f2;
  --bg-surface: #ffffff;
  --fg: #070606;
  --fg-muted: #6a5f50;
  --accent: #a8542b;
  --border: #e8e2d6;

  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Atkinson Hyperlegible Next", sans-serif;
  --font-mono: "JetBrains Mono", "Courier New", monospace;

  /* Per-type tone colors — card detailing only (reveal layer, labels) */
  --tone-blog: #b0714a;
  --tone-writing: #7d9070;
  --tone-project: #c08b52;
  --tone-verse: #b3a273;

  /* Live dot (beza) */
  --live: #4ade80;

  /* Legacy card fills — still read by ContentCard/ContentHeaderCard; removed in Task 9 */
  --card-blog-bg: #b8967a;
  --card-blog-fg: #2e1f14;
  --card-writing-bg: #8a9e82;
  --card-writing-fg: #1e2a1a;
  --card-project-bg: #c9956e;
  --card-project-fg: #3a2312;
  --card-verse-bg: #c4b09a;
  --card-verse-fg: #332618;
```

- [ ] **Step 3: Update the `:root` shadcn semantic tokens (same file, directly below)**

Replace lines 34-60 (the `/* shadcn semantic tokens ... */` comment through the `:root` closing brace `}`) with:

```css
  --background: #faf7f2;
  --foreground: #070606;
  --card: #ffffff;
  --card-foreground: #070606;
  --popover: #ffffff;
  --popover-foreground: #070606;
  --primary: #a8542b;
  --primary-foreground: #faf7f2;
  --secondary: #f1ebe1;
  --secondary-foreground: #070606;
  --muted: #f1ebe1;
  --muted-foreground: #6a5f50;
  --accent-foreground: #070606;
  --destructive: oklch(0.577 0.245 27.325);
  --input: #e8e2d6;
  --ring: #a8542b;
  --radius: 0.75rem;
  --sidebar: #f1ebe1;
  --sidebar-foreground: #070606;
  --sidebar-primary: #a8542b;
  --sidebar-primary-foreground: #faf7f2;
  --sidebar-accent: #f1ebe1;
  --sidebar-accent-foreground: #070606;
  --sidebar-border: #e8e2d6;
  --sidebar-ring: #a8542b;
}
```

(`--radius` moves 0.625rem → 0.75rem so shadcn radii track the new 12px card radius; `--nav-indicator-bg` and `--content-width` stay unchanged.)

- [ ] **Step 4: Update the `.dark` block**

Replace the `.dark` custom-value lines, keeping the same structure. Changed values only — everything not listed stays as-is:

```css
.dark {
  --bg: #1c1917;
  --bg-surface: #262220;
  --fg: #ede5da;
  --fg-muted: #9c8b7b;
  --accent: #d98a4f;
  --border: #3d3530;

  --tone-blog: #c98a5e;
  --tone-writing: #93a886;
  --tone-project: #d3a066;
  --tone-verse: #c2b188;

  /* legacy --card-* dark values: keep current ones (deleted in Task 9) */
  /* shadcn: */
  --foreground: #ede5da;
  --card-foreground: #ede5da;
  --popover-foreground: #ede5da;
  --primary: #d98a4f;
  --secondary-foreground: #ede5da;
  --muted-foreground: #9c8b7b;
  --accent-foreground: #ede5da;
  --ring: #d98a4f;
  --sidebar-foreground: #ede5da;
  --sidebar-primary: #d98a4f;
  --sidebar-accent-foreground: #ede5da;
  --sidebar-ring: #d98a4f;
}
```

(`--background: #1c1917`, `--card/--popover/--secondary/--muted/--sidebar: #262220`, `--input/--sidebar-border: #3d3530`, `--primary-foreground/--sidebar-primary-foreground: #1c1917`, `--nav-indicator-bg`, and `--destructive` are already correct — leave them.)

- [ ] **Step 5: Update base heading rules**

In `@layer base`, replace the `h1, h2, h3, h4` rule:

```css
h1,
h2,
h3,
h4 {
  font-family: var(--font-display);
  font-weight: 450;
  letter-spacing: -0.02em;
  line-height: 1.15;
}
```

- [ ] **Step 6: Dashed prose `hr`**

Replace the `.prose hr` rule:

```css
.prose hr {
  border: none;
  height: 1px;
  background: repeating-linear-gradient(
    90deg,
    var(--fg) 0 4px,
    transparent 4px 12px
  );
  opacity: 0.25;
  margin: 2rem 0;
}
```

- [ ] **Step 7: Re-tune Shiki keyword vars to sandstone**

In the `:root` Shiki block change only: `--astro-code-token-keyword: #a8542b;`. In the `.dark` Shiki block change only: `--astro-code-token-keyword: #d98a4f;`. All other Shiki values stay.

- [ ] **Step 8: Verify**

Run: `pnpm typecheck && pnpm build && pnpm lint && pnpm format:check`
Expected: all pass (run `pnpm format` / `pnpm lint:fix` if needed).
Then `pnpm dev`: whole site wears bone/sandstone in light and re-accented chocolate in dark; every heading renders in Fraunces; code blocks keep toolbar/line numbers.

- [ ] **Step 9: Commit**

```bash
git add src/styles/global.css src/layouts/Base.astro
git commit -m "feat(theme): adopt bone/sandstone palette and Fraunces display type"
```

### Task 2: New primitives

**Files (all Create):**

- `src/components/primitives/RevealCard.astro`
- `src/components/primitives/Eyebrow.astro`
- `src/components/primitives/MonoLabel.astro`
- `src/components/primitives/HatchDivider.astro`
- `src/components/primitives/DashedRule.astro`
- `src/components/primitives/AccentHeading.astro`

- [ ] **Step 1: Create `RevealCard.astro`**

```astro
---
/**
 * Quiet surface card with a tone-colored under-layer.
 * Active variant: "reveal" — bottom-left corner radius opens on
 * hover/focus to expose the tone color.
 * Dormant variants (deliberate, kept for later use — see spec):
 * "edge-bar", "chip", "wash".
 */
interface Props {
  tone?: "blog" | "writing" | "project" | "verse" | "neutral";
  variant?: "reveal" | "edge-bar" | "chip" | "wash";
  href?: string;
  class?: string;
}

const {
  tone = "neutral",
  variant = "reveal",
  href,
  class: className,
} = Astro.props;

const Tag = href ? "a" : "div";
---

<Tag
  href={href}
  class:list={[
    "reveal-card",
    `tone-${tone}`,
    `variant-${variant}`,
    href && "card-hover no-underline",
    className,
  ]}
>
  <span class="under" aria-hidden="true"></span>
  <span class="surface">
    <slot />
  </span>
</Tag>

<style>
  .reveal-card {
    position: relative;
    display: block;
    border-radius: 12px;
    color: var(--fg);
  }
  .tone-blog {
    --reveal-color: var(--tone-blog);
  }
  .tone-writing {
    --reveal-color: var(--tone-writing);
  }
  .tone-project {
    --reveal-color: var(--tone-project);
  }
  .tone-verse {
    --reveal-color: var(--tone-verse);
  }
  .tone-neutral {
    --reveal-color: var(--accent);
  }
  .under {
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: var(--reveal-color);
  }
  .surface {
    position: relative;
    display: block;
    height: 100%;
    padding: 1.75rem;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
  }
  @media (min-width: 768px) {
    .surface {
      padding: 2.25rem;
    }
  }

  /* --- reveal (active variant) --- */
  .variant-reveal .surface {
    border-bottom-left-radius: 12px;
  }
  .variant-reveal:hover .surface,
  .variant-reveal:focus-within .surface,
  .variant-reveal.card-hover:focus .surface {
    border-bottom-left-radius: 30px;
  }
  @media (prefers-reduced-motion: no-preference) {
    /* Also re-declare the global theme-fade properties: this scoped rule
       out-specifies the global `html *` transition, and without them the
       card surface would snap on theme toggle while the page fades. */
    .variant-reveal .surface {
      transition:
        border-bottom-left-radius 300ms ease,
        background-color 500ms ease,
        border-color 500ms ease;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    /* Static sliver, always visible — no animation */
    .variant-reveal .surface {
      border-bottom-left-radius: 30px;
    }
  }

  /* --- dormant variants --- */
  .variant-edge-bar .under {
    display: none;
  }
  .variant-edge-bar .surface {
    border-left: 3px solid var(--reveal-color);
  }
  .variant-chip .under {
    display: none;
  }
  /* chip: exposes --reveal-color for a tinted label chip in the slot */
  .variant-wash .under {
    display: none;
  }
  .variant-wash .surface {
    background: color-mix(in srgb, var(--reveal-color) 8%, var(--bg-surface));
  }
</style>
```

- [ ] **Step 2: Create `Eyebrow.astro`**

```astro
---
interface Props {
  class?: string;
}

const { class: className } = Astro.props;
---

<span class:list={["eyebrow", className]}>
  <slot />
</span>

<style>
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .eyebrow::before {
    content: "";
    display: inline-block;
    height: 1px;
    width: 1rem;
    background: var(--accent);
  }
</style>
```

- [ ] **Step 3: Create `MonoLabel.astro`**

```astro
---
interface Props {
  live?: boolean;
  class?: string;
}

const { live = false, class: className } = Astro.props;
---

<span class:list={["mono-label", className]}>
  {live && <span class="live-dot" aria-hidden="true" />}
  <slot />
</span>

<style>
  .mono-label {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1.6;
    color: var(--fg-muted);
  }
  .live-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-right: 6px;
    border-radius: 50%;
    background: var(--live);
    vertical-align: middle;
  }
</style>
```

- [ ] **Step 4: Create `HatchDivider.astro`**

```astro
---
interface Props {
  class?: string;
}

const { class: className } = Astro.props;

const HEIGHTS = [30, 60, 100, 75, 45, 20];
const ACCENT_INDEX = 3;
---

<div class:list={["hatch", className]} aria-hidden="true">
  {
    HEIGHTS.map((h, i) => (
      <span
        class:list={["tick", i === ACCENT_INDEX && "tick-accent"]}
        style={`height: ${h}%;`}
      />
    ))
  }
</div>

<style>
  .hatch {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    height: 2.75rem;
  }
  .tick {
    width: 3px;
    background: var(--fg);
  }
  .tick-accent {
    background: var(--accent);
  }
</style>
```

- [ ] **Step 5: Create `DashedRule.astro`**

```astro
---
interface Props {
  class?: string;
}

const { class: className } = Astro.props;
---

<div class:list={["dashed-rule", className]} aria-hidden="true"></div>

<style>
  .dashed-rule {
    height: 1px;
    background: repeating-linear-gradient(
      90deg,
      var(--fg) 0 4px,
      transparent 4px 12px
    );
    opacity: 0.25;
  }
</style>
```

- [ ] **Step 6: Create `AccentHeading.astro`**

```astro
---
/**
 * Heading with beza's [[word]] convention: the marked word renders as an
 * italic accent-colored word. e.g. text="Maker of [[things]]"
 */
interface Props {
  text: string;
  level?: 1 | 2 | 3;
  class?: string;
}

const { text, level = 1, class: className } = Astro.props;
const parts = text.split(/\[\[(.+?)\]\]/);
const Tag = `h${level}` as "h1" | "h2" | "h3";
---

<Tag class:list={[className]}>
  {
    parts.map((part, i) =>
      i % 2 === 1 ? <em class="accent-word">{part}</em> : part,
    )
  }
</Tag>

<style>
  .accent-word {
    font-style: italic;
    font-weight: 400;
    color: var(--accent);
  }
</style>
```

- [ ] **Step 7: Verify**

Run: `pnpm typecheck && pnpm build && pnpm lint && pnpm format:check`
Expected: all pass. (Astro doesn't warn on unused components; nothing renders them yet.)

- [ ] **Step 8: Commit**

```bash
git add src/components/primitives/
git commit -m "feat(ui): add beza-language primitives (RevealCard, Eyebrow, MonoLabel, HatchDivider, DashedRule, AccentHeading)"
```

---

## Chunk 2: Home — hero and cards

### Task 3: `now.ts` + statement hero

**Files:**

- Create: `src/data/now.ts`
- Modify: `src/features/home/Hero.astro` (full rewrite)

- [ ] **Step 1: Create `src/data/now.ts`**

```ts
/** Hand-curated status line shown in the homepage hero anchor. */
export const NOW = "Building quietly";
```

- [ ] **Step 2: Rewrite `src/features/home/Hero.astro`**

```astro
---
import { getCollection } from "astro:content";
import Eyebrow from "../../components/primitives/Eyebrow.astro";
import AccentHeading from "../../components/primitives/AccentHeading.astro";
import MonoLabel from "../../components/primitives/MonoLabel.astro";
import DashedRule from "../../components/primitives/DashedRule.astro";
import { SITE } from "../../config";
import { NOW } from "../../data/now";

// Newest published entry across dated collections (projects have no date).
const posts = await getCollection("blog", ({ data }) => !data.draft);
const writings = await getCollection("writings", ({ data }) => !data.draft);
const dated = [
  ...posts.map((e) => ({ title: e.data.title, date: e.data.date })),
  ...writings.map((e) => ({ title: e.data.title, date: e.data.date })),
].sort((a, b) => b.date.getTime() - a.date.getTime());
const latest = dated[0];
const latestDate = latest?.date.toLocaleDateString("en-US", {
  month: "short",
  year: "numeric",
});
---

<section class="relative mx-auto max-w-4xl px-8 pt-16 pb-10 md:px-12 md:pt-24">
  <DashedRule class="absolute top-0 right-8 left-8 md:right-12 md:left-12" />
  <Eyebrow>{SITE.author}</Eyebrow>
  <AccentHeading
    text="Engineer, writer, and maker of [[things]]"
    class="mt-5 max-w-[16ch] text-5xl leading-[1.02] md:text-7xl"
  />
  <p class="mt-6 max-w-xl text-base text-[var(--fg-muted)] md:text-lg">
    Building software, writing poems, and exploring faith.
  </p>
  <div class="mt-10 text-right md:absolute md:right-12 md:bottom-6 md:mt-0">
    <MonoLabel live class="block">Now: {NOW}</MonoLabel>
    {
      latest && (
        <MonoLabel class="block max-w-[40ch] truncate">
          Latest: {latest.title} &middot; {latestDate}
        </MonoLabel>
      )
    }
  </div>
</section>
```

- [ ] **Step 3: Verify**

Run: `pnpm typecheck && pnpm build && pnpm lint && pnpm format:check`
Then `pnpm dev`: home hero is left-aligned Fraunces statement with italic sandstone "things", eyebrow "Parker Botsford", dashed hairline on top, two mono anchor lines (live dot on the "Now:" line) bottom-right on desktop / below lede on mobile. Check both themes.

- [ ] **Step 4: Commit**

```bash
git add src/data/now.ts src/features/home/Hero.astro
git commit -m "feat(home): statement hero with dynamic now/latest anchor"
```

### Task 4: Home section framing

**Files:**

- Modify: `src/pages/index.astro`
- Modify: `src/features/home/StaggeredCards.astro`

- [ ] **Step 1: Add hatch divider + eyebrow between hero and cards**

In `src/pages/index.astro`, import the primitives and frame `StaggeredCards`:

```astro
---
import Base from "../layouts/Base.astro";
import Nav from "../components/primitives/Nav.astro";
import Footer from "../components/primitives/Footer.astro";
import HatchDivider from "../components/primitives/HatchDivider.astro";
import Eyebrow from "../components/primitives/Eyebrow.astro";
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
      <div class="mx-auto max-w-3xl px-8 md:px-12">
        <HatchDivider />
        <Eyebrow class="mt-6">Latest from the site</Eyebrow>
      </div>
      <StaggeredCards />
    </main>
    <Footer />
  </div>
</Base>
```

- [ ] **Step 2: Remove the dot-parallax script from `StaggeredCards.astro`**

Delete the entire `<script is:inline>` block (lines 90-124) — it animates the dot-pattern decoration that Task 5 removes from `ContentCard`. Also change the section's `py-12` to `pt-6 pb-12` so it sits closer to the new eyebrow.

- [ ] **Step 3: Verify**

Run: `pnpm typecheck && pnpm build && pnpm lint && pnpm format:check`
Then `pnpm dev`: hatch divider + "Latest from the site" eyebrow sit between hero and the staggered cards (cards still old style until Task 5).

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro src/features/home/StaggeredCards.astro
git commit -m "feat(home): frame card section with hatch divider and eyebrow"
```

### Task 5: Rebuild `ContentCard` on `RevealCard`

This is the choke point: `PostCard`, `WritingCard`, `ProjectCard`, `StaggeredCards`, and the DailyVerse home card all render through `ContentCard`, so this one rewrite restyles every list card on the site. The Props API is unchanged — no caller changes needed.

**Files:**

- Modify: `src/components/shared/ContentCard.astro` (full rewrite)

- [ ] **Step 1: Rewrite `src/components/shared/ContentCard.astro`**

```astro
---
import RevealCard from "../primitives/RevealCard.astro";

interface Props {
  type: "blog" | "writing" | "project" | "verse";
  title: string;
  description?: string;
  href: string;
  meta?: string;
  class?: string;
}

const { type, title, description, href, meta, class: className } = Astro.props;

const labelMap = {
  blog: "Blog Post",
  writing: "Writing",
  project: "Project",
  verse: "Daily Verse",
};
---

<RevealCard tone={type} href={href} class={className}>
  <span class="type-label" style={`color: var(--tone-${type});`}>
    {labelMap[type]}
  </span>
  <h3 class="mt-2 mb-1 text-xl leading-tight">
    {title}
  </h3>
  {
    description && (
      <p class="mt-1 text-sm leading-relaxed text-[var(--fg-muted)]">
        {description}
      </p>
    )
  }
  <slot />
  {
    meta && (
      <span class="type-meta mt-4 block text-[var(--fg-muted)]">{meta}</span>
    )
  }
</RevealCard>

<style>
  .type-label {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.5625rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .type-meta {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
</style>
```

(Deliberately dropped from the old card: the dot-pattern decoration, the hover arrow, and the colored full-card fill — the design's quiet-card decision. The `min-h-[120px]` flex scaffolding is unnecessary with real content.)

- [ ] **Step 2: Verify**

Run: `pnpm typecheck && pnpm build && pnpm lint && pnpm format:check`
Then `pnpm dev`, check in **both themes**:

- Home: four staggered quiet cards; hovering (or keyboard-focusing) a card opens the bottom-left corner into a tone-colored rounded sliver; card lift (`card-hover`) still works.
- `/blog`, `/writings`, `/projects`: list cards all quiet + reveal.
- With DevTools emulating `prefers-reduced-motion: reduce`: sliver is visible statically, nothing animates.
- Contrast spot-check: verify each `.type-label` tone color against `--bg-surface` in both themes (e.g. paste pairs into a WCAG contrast checker). Small mono uppercase labels should meet AA; if a dark tone fails, lighten it (spec §1 marks dark tones as nudgeable starting points).

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/ContentCard.astro
git commit -m "feat(cards): rebuild ContentCard on RevealCard with corner reveal"
```

---

## Chunk 3: Chrome, content layouts, cleanup

### Task 6: Footer + nav polish

**Files:**

- Modify: `src/components/primitives/Footer.astro` (full rewrite)

(Nav needs no code change: its pill/bubble reads tokens, and the mobile "PB" mark already uses `--font-display` → now Fraunces. Verify only.)

- [ ] **Step 1: Rewrite `src/components/primitives/Footer.astro`**

```astro
---
import DashedRule from "./DashedRule.astro";
import MonoLabel from "./MonoLabel.astro";

const year = new Date().getFullYear();
---

<footer class="mx-auto w-full max-w-4xl px-8 py-16 md:px-12">
  <DashedRule />
  <div class="flex items-center justify-between pt-6">
    <MonoLabel>&copy; {year} Parker Botsford</MonoLabel>
    <MonoLabel live>
      Atlanta, GA &middot; <a href="/rss.xml" class="hover:text-[var(--accent)]"
        >RSS</a
      >
    </MonoLabel>
  </div>
</footer>
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck && pnpm build && pnpm lint && pnpm format:check`
Then `pnpm dev`: footer shows dashed rule + two mono labels with live dot; nav pill, bubble indicator, ThemeToggle, FontSwitcher, and MobileNav all behave exactly as before in both themes.

- [ ] **Step 3: Commit**

```bash
git add src/components/primitives/Footer.astro
git commit -m "feat(nav): dashed-rule footer with mono micro-labels"
```

### Task 7: Rebuild `ContentHeaderCard`

Second choke point: restyles the header of every list page and every post/writing/project detail page. Props API unchanged.

**Files:**

- Modify: `src/components/shared/ContentHeaderCard.astro` (full rewrite)

- [ ] **Step 1: Rewrite `src/components/shared/ContentHeaderCard.astro`**

```astro
---
import RevealCard from "../primitives/RevealCard.astro";
import Eyebrow from "../primitives/Eyebrow.astro";
import MonoLabel from "../primitives/MonoLabel.astro";

interface Props {
  type: "blog" | "writing" | "project" | "verse";
  title: string;
  meta?: string;
  tags?: string[];
}

const { type, title, meta, tags = [] } = Astro.props;

const labelMap = {
  blog: "Blog Post",
  writing: "Writing",
  project: "Project",
  verse: "Verses",
};
---

<div class="mx-auto my-10 max-w-3xl">
  <RevealCard tone={type}>
    <Eyebrow>{labelMap[type]}</Eyebrow>
    <h1 class="mt-3 text-3xl leading-tight md:text-4xl">{title}</h1>
    {meta && <MonoLabel class="mt-3 block">{meta}</MonoLabel>}
    <slot />
    {
      tags.length > 0 && (
        <div class="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              class="tag-chip"
              style={`color: var(--tone-${type}); border-color: color-mix(in srgb, var(--tone-${type}) 45%, transparent); background: color-mix(in srgb, var(--tone-${type}) 10%, var(--bg-surface));`}
            >
              {tag}
            </span>
          ))}
        </div>
      )
    }
  </RevealCard>
</div>

<style>
  .tag-chip {
    display: inline-block;
    padding: 0.125rem 0.625rem;
    border: 1px solid;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
  }
</style>
```

- [ ] **Step 2: Verify**

Run: `pnpm typecheck && pnpm build && pnpm lint && pnpm format:check`
Then `pnpm dev`, both themes: `/blog`, `/writings`, `/projects`, `/verses` page headers and one detail page of each type (post shows tags as tone chips; project header keeps Visit/Source links via slot; prose renders Fraunces `h2`/`h3` and dashed `hr`; code blocks keep toolbar + line numbers).

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/ContentHeaderCard.astro
git commit -m "feat(content): rebuild ContentHeaderCard on RevealCard with eyebrow and mono meta"
```

### Task 8: About page accent

**Files:**

- Modify: `src/pages/about.astro:5-6`

- [ ] **Step 1: Use `AccentHeading` for the page title**

Replace `<h1 class="mb-8">About Me</h1>` with:

```astro
<AccentHeading text="About [[me]]" class="mb-8 text-4xl" />
```

and add the import in frontmatter:

```astro
import AccentHeading from "../components/primitives/AccentHeading.astro";
```

(404 needs no change — it inherits Fraunces + new tokens.)

- [ ] **Step 2: Verify**

Run: `pnpm typecheck && pnpm build && pnpm lint && pnpm format:check`
Then check `/about` and `/404` in both themes.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat(pages): accent heading on about page"
```

### Task 9: Cleanup + docs

**Files:**

- Modify: `src/styles/global.css` (delete legacy vars)
- Modify: `docs/styling.md`
- Modify: `CLAUDE.md` (only if stale)

- [ ] **Step 1: Delete legacy card variables**

Remove the eight `--card-*-bg`/`--card-*-fg` lines from **both** `:root` and `.dark` in `src/styles/global.css`, and the "Legacy card fills" comment. Confirm nothing references them:

Run: `grep -rn "card-blog-\|card-writing-\|card-project-\|card-verse-" src/`
Expected: no matches (covers both `-bg` and `-fg` names).

- [ ] **Step 2: Confirm Nunito is fully gone**

Run: `grep -rn "Nunito" src/`
Expected: no matches.

- [ ] **Step 3: Rewrite `docs/styling.md`**

```markdown
# Styling & Theming

Tailwind CSS utilities + CSS custom properties in `global.css`.

## Theme

`.dark` class on `<html>` toggled by ThemeToggle React island.

- **Light mode:** bone (`--bg: #faf7f2`, `--accent: #a8542b` sandstone)
- **Dark mode:** warm chocolate (`--bg: #1c1917`, `--accent: #d98a4f`)
- **Per-type tones** (`--tone-blog/writing/project/verse`): card detailing
  only (corner reveal, labels, chips) — never full card fills.

## Fonts

- **Display/headings:** Fraunces (variable; italic accent words via
  `AccentHeading` and its `[[word]]` convention)
- **Body:** Atkinson Hyperlegible Next (FontSwitcher offers Lora, Inter)
- **Code/micro-labels:** JetBrains Mono

## Design language (beza-derived)

Primitives in `src/components/primitives/`: `RevealCard` (quiet card,
hover/focus corner reveal in tone color; dormant variants `edge-bar`,
`chip`, `wash` are deliberate — do not remove), `Eyebrow`, `MonoLabel`,
`HatchDivider`, `DashedRule`, `AccentHeading`.

Spec: `docs/superpowers/specs/2026-07-08-beza-redesign-design.md`
```

- [ ] **Step 4: Check `CLAUDE.md` for staleness**

Read `CLAUDE.md`; nothing in it names fonts or colors, so likely no change. Update only if a claim it makes is now false.

- [ ] **Step 5: Full verification gate**

Run: `pnpm lint && pnpm format:check && pnpm typecheck && pnpm build`
Expected: all pass, zero warnings.
Then a final `pnpm dev` sweep of every route (`/`, `/blog`, one post, `/writings`, one writing/poem, `/projects`, one project, `/verses`, `/about`, a bad URL for 404) in **both themes**, plus:

- FontSwitcher (Lora/Inter/default) and theme transition (no tone-color flash on the card under-layers).
- Reduced-motion emulation; keyboard tab through cards (focus opens reveal).
- **AA contrast check** (spec §7): `--accent` on `--bg`, tone label colors on `--bg-surface`, in both themes; nudge dark tone values if any pair fails.
- **Verse hover-card**: hover a Bible verse reference inside a post — popover renders correctly on the new palette and its open/close animation is intact.
- Footer RSS link: legible mono style, no odd underline from global anchor rules.

- [ ] **Step 6: Commit**

```bash
git add src/styles/global.css docs/styling.md CLAUDE.md
git commit -m "chore: drop legacy card tokens and document beza design language"
```
