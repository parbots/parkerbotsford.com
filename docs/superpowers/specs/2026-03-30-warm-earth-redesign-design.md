# Warm Earth Frontend Redesign

Personal website redesign for parkerbotsford.com. Replaces the current styling and layout with a warm, earthy, playful aesthetic inspired by seanhalpin.xyz and joshwcomeau.com.

## Goals

- Warm, inviting, friendly visual identity using earth tones
- Playful micro-interactions (bouncy hovers, sliding nav, parallax)
- Minimal UI chrome with generous padding and whitespace
- Accessible by default (Atkinson Hyperlegible, font switcher, reduced motion)
- Consistent content-type color coding across homepage cards and content page headers

## Non-Goals

- No full framework migration (stays on Astro + React islands + Tailwind v4)
- No content restructuring (same collections: blog, writings, projects, verses)
- No new pages or routes
- No server-side features or API changes

## Typography

**Migration note:** The current site uses Lora as the body font (`--font-body`). This redesign switches the default body font to Atkinson Hyperlegible Next for better accessibility. Lora remains available via the font switcher.

### Font Stack

| Role | Font | Source | Weights |
|------|------|--------|---------|
| Display (headings, nav, hero) | Nunito | Google Fonts | 400, 600, 700, 800 |
| Body (default) | Atkinson Hyperlegible Next | Google Fonts | 400, 600, italic |
| Code | JetBrains Mono | Google Fonts (existing) | 400, 500 |

### CSS Variables

```css
--font-display: "Nunito", sans-serif;
--font-body: "Atkinson Hyperlegible Next", sans-serif;
--font-mono: "JetBrains Mono", monospace;
```

### Display Font Application

The new `--font-display` variable is applied to all headings and display-context elements:

```css
h1, h2, h3, h4 {
  font-family: var(--font-display);
}
```

Nav links, hero text, card titles, and section labels also use `--font-display`. Body text, meta, descriptions, and prose content use `--font-body`.

### Font Switcher

A popup menu next to the theme toggle allows visitors to change the body font. Three options:

- Atkinson Hyperlegible Next (default) -- optimized for legibility
- Lora (400, 600, italic 400) -- warm serif for a more literary feel
- Inter (400, 500, 600) -- clean sans-serif alternative

Implementation: an "Aa" button in the nav triggers a small dropdown. Selection persists to `localStorage` under a `font-preference` key. The chosen font is applied by setting a CSS class on `<html>` (e.g., `.font-lora`, `.font-inter`) which overrides `--font-body`.

**Font loading strategy:** All three body fonts are preloaded via Google Fonts `<link>` tags in `Base.astro` to avoid FOUT (flash of unstyled text) when switching. This adds ~20KB for the two optional fonts but ensures instant switching and correct behavior with Astro's `ClientRouter` (view transitions). The font-preference script runs inline before render (same pattern as the existing theme script) to avoid flashes on page load.

## Color Palette

### Base Colors (kept from current design)

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#f5f0eb` (warm cream) | `#1c1917` (dark chocolate) |
| `--bg-surface` | `#ede7e0` | `#262220` |
| `--fg` | `#2c2420` | `#e7ddd4` |
| `--fg-muted` | `#8c7b6b` | `#9c8b7b` |
| `--accent` | `#c4643a` (burnt sienna) | `#d4845a` |
| `--border` | `#d9cfc4` | `#3d3530` |

### Content-Type Card Colors

| Content Type | Card Background | Card Foreground | Semantic Meaning |
|-------------|----------------|----------------|------------------|
| Blog | Clay `#b8967a` | `#2e1f14` | Earthy, grounded ideas |
| Writing | Olive `#8a9e82` | `#1e2a1a` | Nature, ink, reflection |
| Project | Copper `#c9956e` | `#3a2312` | Making, building, forge |
| Verse | Sand `#c4b09a` | `#332618` | Desert calm, grounding |

### Contrast Ratios (Light Mode)

| Content Type | FG | BG | Ratio | WCAG AA |
|-------------|----|----|-------|---------|
| Blog | `#2e1f14` | `#b8967a` | 5.3:1 | Pass |
| Writing | `#1e2a1a` | `#8a9e82` | 5.5:1 | Pass |
| Project | `#3a2312` | `#c9956e` | 5.0:1 | Pass |
| Verse | `#332618` | `#c4b09a` | 5.1:1 | Pass |

## Layout

### Global

- Max content width: `--content-width: 680px` (38rem) for prose
- Generous fluid spacing scale inspired by seanhalpin.xyz
- Mobile-first responsive design
- Single breakpoint at `md` (768px) for major layout shifts

### Navigation (All Pages)

Pill-shaped floating nav bar, centered at the top of every page.

**Structure:**
```
[ Blog  Writings  Projects  Verses  About  |  Aa  🌙 ]
```

The site name ("Parker Botsford") is not in the nav pill -- it lives in the hero on the homepage and is not needed as a persistent element since the pill nav includes all sections. Clicking the logo area or a small "PB" monogram to the left of the pill (visible on desktop only) navigates home. Update `NAV_ITEMS` in `config.ts` accordingly (no "Home" entry needed -- the monogram handles it).

- Container: `border-radius: 99px`, subtle border, surface background
- Links: body font, muted color, with rounded pill hover/active states
- Active indicator: a background pill that slides between nav items with a smooth transition (like seanhalpin.xyz's `.tab` element)
- Right side: font switcher ("Aa" button) and theme toggle
- Mobile: collapses to hamburger menu (existing MobileNav pattern)

### Homepage

**Hero section:**
- Centered layout
- Large Nunito heading: "👋 Parker Botsford" (waving hand emoji with CSS animation)
- Tagline below in body font, muted color
- Generous vertical padding (4-5rem top, 2-3rem bottom)

**Content cards (clean stagger):**
- Four cards: latest blog post, latest writing, most recent project (sorted by title, first in list), daily verse
- Each card: ~70-75% width on desktop, **full width on mobile** (below `md` breakpoint)
- Alternating left/right alignment (`align-self: flex-start` / `flex-end`) on desktop; stacked vertically on mobile
- No overlap, generous gaps (~1rem) between cards
- Cards contain: type label (uppercase, small, tracked), title, description, meta
- Dot pattern decorative element in top-right corner: a 3x2 grid of small circles, `currentColor` at 15% opacity, implemented as inline HTML `<span>` elements (no SVG or image)
- Arrow indicator that slides in on hover

**Daily verse card:** Uses `getDailyVerse()` from `src/utils/verse-cache.ts` with the `DAILY_VERSES` array from `src/data/verses.ts` (existing pattern from `DailyVerse.astro`). Links to `/verses`.

**Card hover behavior:**
- `transform: translateY(-4px)` with bouncy easing `cubic-bezier(0.175, 0.885, 0.32, 1.275)` over 0.5s
- `box-shadow: 0 20px 60px -15px rgba(0,0,0,0.15)`
- Arrow slides in from left

### Content Pages (Blog Posts, Writings, Projects)

**Header card:**
- Wide colored card matching content type (wider than prose column, ~44rem max-width)
- `border-radius: 20px`, generous padding (2.25rem 2.5rem)
- Contains: type label, title (2rem, Nunito 800), date/meta, tags (pill-shaped)
- Dot pattern decorative element
- Centered horizontally with more vertical margin (2rem top/bottom)

**Prose content:**
- Standard prose column (38rem max-width, centered)
- Clean reading experience: generous line-height (1.8), comfortable font size
- Subheadings in Nunito display font
- Code blocks: surface background, rounded corners (10px), border
- Blockquotes: left accent border, italic, muted color
- Images: rounded corners, full prose width

### Index Pages (Blog List, Writings List, Projects List)

- Page title as a `ContentHeaderCard` matching the section type (same component as content pages, with the section name as title and a brief description)
- Content items listed below as `ContentCard` components (same as homepage cards but full-width, stacked vertically with gaps)
- Each item shows: title, description/excerpt, date, and relevant meta
- Same bouncy hover behavior as homepage cards

### Other Pages

- **About** (`/about`): uses new typography and spacing, no structural changes. No colored card header -- just a clean page with the standard prose column.
- **Verses** (`/verses`): same treatment as About -- new typography/spacing applied, existing `VerseList.astro` component updated with new styling.
- **404** (`/404`): update typography and spacing to match. Keep existing structure.

### Footer

- Minimal: copyright line, centered
- Top border separator
- Generous top margin to breathe

## Animations & Interactions

### Bouncy Card Hovers

All interactive cards (homepage, index pages, content headers on hover):

```css
transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
            box-shadow 0.5s ease;
```

- Hover: `translateY(-4px)` + deeper shadow
- Active/click: reset transform (snap back)

### Sliding Nav Indicator

The active nav item has a background pill behind it that slides to the new position when navigating:

- Background: `rgba(255, 255, 255, 0.5)` in light mode, `rgba(255, 255, 255, 0.08)` in dark mode. `border-radius: 99px`
- Transition: `left` and `width` animate with `0.3s ease-in-out`
- Implementation: a positioned `<span>` element whose `left` and `width` are updated via JS when the active route changes

### Subtle Parallax / Float

The dot pattern decorations on cards shift slightly based on mouse position, creating a subtle depth effect:

- Mouse-based: dot patterns shift 2-5px based on cursor position relative to the card center
- Implementation: a small inline `<script>` on the homepage listens for `mousemove` and updates a CSS custom property (`--mouse-x`, `--mouse-y`) on each card, which the dot pattern uses via `transform: translate(calc(var(--mouse-x) * 3px), calc(var(--mouse-y) * 3px))`
- Keep movement subtle (max 5px displacement)
- Desktop only (no touch events needed)

### Waving Hand Animation

The emoji in the hero section has a looping wave animation:

```css
@keyframes wave-hand {
  0%, 100% { transform: rotate(0deg); }
  15% { transform: rotate(14deg); }
  30% { transform: rotate(-8deg); }
  45% { transform: rotate(14deg); }
  60% { transform: rotate(-4deg); }
  75% { transform: rotate(10deg); }
}
```

### View Transitions

Already using Astro's `ClientRouter` for view transitions between pages. Maintain this for smooth page-to-page navigation.

### Reduced Motion

All animations wrapped in `@media (prefers-reduced-motion: no-preference)`. When reduced motion is preferred:

- Card hovers still change shadow but skip transform
- Nav indicator teleports instead of sliding
- Parallax disabled entirely
- Waving hand animation disabled

## Component Changes Summary

### Modified Components

| Component | Changes |
|-----------|---------|
| `Base.astro` | Update font preloads (Nunito, Atkinson Hyperlegible Next), add font-preference script |
| `Page.astro` | No structural changes, spacing adjustments |
| `Post.astro` | Replace header with wide colored card |
| `Project.astro` | Replace header with wide colored card (copper) |
| `Writing.astro` | Replace header with wide colored card (olive) |
| `Nav.astro` | Redesign as centered pill nav with sliding indicator |
| `ThemeToggle.tsx` | Keep, integrate into new nav pill |
| `MobileNav.tsx` | Update styling to match new nav design |
| `Footer.astro` | Simplify, add spacing |
| `Hero.astro` | Redesign with large centered Nunito heading + wave emoji |
| `RecentPosts.astro` | Replace with staggered card layout showing all content types |
| `PostCard.astro` | Redesign as earth-tone colored card with bouncy hover |
| `WritingCard.astro` | Redesign as earth-tone colored card |
| `ProjectCard.astro` | Redesign as earth-tone colored card |
| `global.css` | Update CSS variables, typography, spacing scale, animations. **Important:** The current wildcard `html *` transition rule (for theme transitions) must be scoped more narrowly -- move it to specific elements (bg, text, borders) or use `transition-property` instead of shorthand, so it does not conflict with card hover `transform` transitions. |

### New Components

| Component | Purpose |
|-----------|---------|
| `FontSwitcher.tsx` | React island: "Aa" popup menu for body font selection |
| `StaggeredCards.astro` | Homepage layout: alternating left/right card container |
| `ContentCard.astro` | Shared colored card component with type-based styling |
| `ContentHeaderCard.astro` | Wide colored header card for content pages |
| `NavIndicator.astro` | Astro component with inline `<script>`: sliding pill behind active nav item. Uses vanilla JS to measure nav link positions and update a positioned `<span>` via CSS transitions. Avoids React hydration cost for a purely visual effect. Re-initializes on `astro:after-swap` for view transition compatibility. |

### Removed Components

None. All existing components are modified in place or wrapped.

## File Structure

No new directories. New components go in existing locations:

- `src/components/primitives/FontSwitcher.tsx`
- `src/components/primitives/NavIndicator.astro`
- `src/components/shared/ContentCard.astro`
- `src/components/shared/ContentHeaderCard.astro`
- `src/features/home/StaggeredCards.astro`

## Dark Mode

Existing dark mode approach (`.dark` class on `<html>`) is maintained. Card colors in dark mode use darker, desaturated variants:

| Content Type | Dark BG | Dark FG | Ratio | WCAG AA |
|-------------|---------|---------|-------|---------|
| Blog (Clay) | `#5c4b3d` | `#e2d5c8` | 5.4:1 | Pass |
| Writing (Olive) | `#3d4a38` | `#d4e0cf` | 5.6:1 | Pass |
| Project (Copper) | `#654a37` | `#e8d5c4` | 5.2:1 | Pass |
| Verse (Sand) | `#62584d` | `#e2d8cc` | 5.1:1 | Pass |

## Accessibility

- Atkinson Hyperlegible as default body font (designed for low vision)
- Font switcher for user preference
- All animations respect `prefers-reduced-motion`
- Skip link maintained
- Focus-visible outlines maintained (accent color)
- Card color contrast ratios meet WCAG AA for both light and dark modes
- Semantic HTML structure unchanged

## Performance

- Nunito, Atkinson Hyperlegible Next, Lora, and Inter all preloaded via Google Fonts with `display=swap` (see Font loading strategy in Typography section)
- Parallax uses `requestAnimationFrame` and `will-change: transform` for GPU acceleration
- Nav indicator uses CSS transitions (no JS animation loop)
- No new JS dependencies beyond what exists
