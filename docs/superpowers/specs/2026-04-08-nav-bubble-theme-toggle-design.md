# Nav Bubble Animation + Theme Toggle Restyle

## Summary

Two UI adjustments to the site header:

1. Restyle the theme toggle button to match the font menu button's circular bordered appearance
2. Add an animated nav bubble that smoothly slides between nav items on page navigation, plus a new "Home" link

## 1. Theme Toggle — Match Font Menu Button

**Current state:** The ThemeToggle renders a bare icon with only a color transition on hover (`duration-300`). The FontSwitcher trigger is a `size-8 rounded-full` circle with border, background, and `duration-200`.

**Change:** Apply matching styles to the ThemeToggle button:

```
flex size-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] transition-colors duration-200
```

Align transition duration to `duration-200` to match FontSwitcher. Keep existing icon size (16px) and toggle logic unchanged.

**File:** `src/components/primitives/ThemeToggle.tsx`

## 2. Home Link in Nav

**Change:** Add `{ label: "Home", href: "/" }` as the first entry in `NAV_ITEMS`.

The existing nav rendering loop in `Nav.astro` and mobile nav pick this up automatically. The `isActive` check already handles exact path matching (`currentPath === item.href`). The `startsWith("//")` case for child pages won't false-match, so Home is only active on `/` exactly.

Child pages (e.g. `/blog/some-post`) will match the parent nav item (e.g. "Blog") via the `currentPath.startsWith(item.href + "/")` check.

**Redundancy:** The standalone "PB" monogram on desktop and mobile currently links to `/`. With "Home" in the nav pill, the desktop monogram becomes redundant — remove it. On mobile, the "PB" monogram stays since the mobile nav has a different layout (PB on left, hamburger on right), but "Home" will also appear in the mobile menu overlay.

**File:** `src/config.ts`, `src/components/primitives/Nav.astro` (remove desktop PB monogram)

## 3. Animated Nav Bubble via View Transitions

**Current state:** `NavIndicator.astro` renders an absolutely-positioned `<span>` that calculates its position from the `[data-active]` link on each page load. It listens to `astro:after-swap` and recalculates, but the DOM swap means the indicator resets rather than animating smoothly between pages.

**Change:** Add `transition:name="nav-indicator"` to the indicator `<span>`. Astro's View Transition API (via `ClientRouter`) will morph the element between the old and new page, interpolating its bounding box (position and size) automatically.

**JS repositioning interaction:** Change the event listener from `astro:after-swap` to `astro:page-load`. The `after-swap` event fires during the transition and would conflict with the view transition animation. `page-load` fires after the transition completes, ensuring the JS repositioning doesn't fight the browser's animation. The JS is still needed to set the correct final position — the view transition handles the smooth interpolation between old and new positions.

The existing JS remains for:
- Initial positioning on page load
- Window resize handling
- Final position after view transition (via `astro:page-load`)

**File:** `src/components/primitives/NavIndicator.astro`

## Files Changed

| File | Change |
|------|--------|
| `src/config.ts` | Add `{ label: "Home", href: "/" }` to start of `NAV_ITEMS` |
| `src/components/primitives/NavIndicator.astro` | Add `transition:name`, change event to `astro:page-load` |
| `src/components/primitives/ThemeToggle.tsx` | Add circular button styling to match FontSwitcher |
| `src/components/primitives/Nav.astro` | Remove desktop PB monogram (redundant with Home link) |

## Files Unchanged

- `src/components/primitives/FontSwitcher.tsx` — no changes
- `src/components/primitives/MobileNav.tsx` — no changes (picks up Home from config automatically)
- Theme toggle logic — unchanged, visual restyle only
