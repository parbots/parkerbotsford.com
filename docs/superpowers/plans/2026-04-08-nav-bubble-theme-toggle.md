# Nav Bubble Animation + Theme Toggle Restyle — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the theme toggle to match the font menu button, add a Home nav link, and animate the nav bubble smoothly between pages using Astro View Transitions.

**Architecture:** Three small, independent changes to the header: (1) className update on ThemeToggle, (2) config + Nav.astro change for Home link, (3) two attributes on NavIndicator for view transition animation. All changes are in existing files.

**Tech Stack:** Astro (View Transitions / ClientRouter), React, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-04-08-nav-bubble-theme-toggle-design.md`

---

## Chunk 1: All Tasks

### Task 1: Restyle ThemeToggle button

**Files:**

- Modify: `src/components/primitives/ThemeToggle.tsx:31-34`

- [ ] **Step 1: Update ThemeToggle className**

Replace the current button className:

```tsx
// OLD (line 34)
className =
  "text-[var(--fg-muted)] transition-colors duration-300 hover:text-[var(--accent)]";

// NEW
className =
  "flex size-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--accent)]";
```

- [ ] **Step 2: Visual check**

Run: `pnpm dev`

Open localhost:4321. Verify the theme toggle now appears as a circular bordered button matching the "Aa" font menu button beside it. Toggle dark/light to confirm both states look correct.

- [ ] **Step 3: Commit**

```bash
git add src/components/primitives/ThemeToggle.tsx
git commit -m "style: restyle theme toggle to match font menu button"
```

---

### Task 2: Add Home link and remove desktop PB monogram

**Files:**

- Modify: `src/config.ts:9-15`
- Modify: `src/components/primitives/Nav.astro:14-21`

- [ ] **Step 1: Add Home to NAV_ITEMS**

In `src/config.ts`, add Home as the first entry:

```ts
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Writings", href: "/writings" },
  { label: "Projects", href: "/projects" },
  { label: "Verses", href: "/verses" },
  { label: "About", href: "/about" },
] as const;
```

- [ ] **Step 2: Remove desktop PB monogram**

In `src/components/primitives/Nav.astro`, remove the desktop PB monogram block (lines 14-20):

```astro
{/* Desktop: PB monogram */}
<a
  href="/"
  class="absolute left-6 hidden text-base font-bold text-[var(--fg-muted)] no-underline hover:text-[var(--accent)] md:block"
  style="font-family: var(--font-display);"
>
  PB
</a>
```

- [ ] **Step 3: Visual check**

Run: `pnpm dev`

Verify:

- Desktop: "Home" appears as the first nav item in the pill. PB monogram is gone. Clicking Home navigates to `/`. The bubble indicator sits on "Home" when on the homepage.
- Mobile: "PB" monogram still shows on left. "Home" appears in the hamburger menu overlay.
- Navigate to `/blog` — "Blog" is highlighted, not "Home".

- [ ] **Step 4: Commit**

```bash
git add src/config.ts src/components/primitives/Nav.astro
git commit -m "feat: add Home nav link and remove redundant desktop PB monogram"
```

---

### Task 3: Animate nav bubble with View Transitions

**Files:**

- Modify: `src/components/primitives/NavIndicator.astro:5-8` (span element)
- Modify: `src/components/primitives/NavIndicator.astro:35-37` (event listener)

- [ ] **Step 1: Add transition:name to the indicator span**

In `src/components/primitives/NavIndicator.astro`, add `transition:name="nav-indicator"` to the `<span>`:

```astro
<span
  id="nav-indicator"
  class="pointer-events-none absolute rounded-full"
  transition:name="nav-indicator"
  style="background: var(--nav-indicator-bg); height: 32px; transition: left 0.3s ease-in-out, width 0.3s ease-in-out, opacity 0.3s ease-in-out; opacity: 0;"
></span>
```

- [ ] **Step 2: Change event listener from astro:after-swap to astro:page-load**

Replace line 35-37:

```js
// OLD
document.addEventListener("astro:after-swap", () => {
  requestAnimationFrame(updateNavIndicator);
});

// NEW
document.addEventListener("astro:page-load", updateNavIndicator);
```

Note: `astro:page-load` also fires on initial page load, but `updateNavIndicator()` is already called directly on line 33, so this is harmless (idempotent positioning).

- [ ] **Step 3: Visual check**

Run: `pnpm dev`

Navigate between pages and verify:

- The bubble smoothly slides from one nav item to another during page transitions (not jumping/resetting).
- On initial load, the bubble appears on the correct nav item.
- Resizing the window still repositions the bubble correctly.
- Navigating to a child page (e.g. a blog post) highlights the parent section.

- [ ] **Step 4: Commit**

```bash
git add src/components/primitives/NavIndicator.astro
git commit -m "feat: animate nav bubble across pages via View Transitions"
```

---

### Task 4: Final verification

- [ ] **Step 1: Run lint, format check, and typecheck**

```bash
pnpm lint && pnpm format:check && pnpm typecheck
```

Fix any issues found.

- [ ] **Step 2: Run production build**

```bash
pnpm build
```

Verify clean build with no errors or warnings.

- [ ] **Step 3: Commit any fixes**

If lint/format/type fixes were needed, commit them:

```bash
git commit -m "style: fix lint and format issues"
```
