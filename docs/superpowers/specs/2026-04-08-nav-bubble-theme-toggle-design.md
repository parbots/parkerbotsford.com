# Nav Bubble Animation + Theme Toggle Restyle

## Summary

Two UI adjustments to the site header:

1. Restyle the theme toggle button to match the font menu button's circular bordered appearance
2. Add an animated nav bubble that smoothly slides between nav items on page navigation, plus a new "Home" link

## 1. Theme Toggle — Match Font Menu Button

**Current state:** The ThemeToggle renders a bare icon with only a color transition on hover. The FontSwitcher trigger is a `size-8 rounded-full` circle with border and background.

**Change:** Apply matching styles to the ThemeToggle button:

```
size-8 rounded-full border border-[var(--border)] bg-[var(--bg)]
flex items-center justify-center
```

Keep the existing icon size (16px), color transitions, and toggle logic unchanged.

**File:** `src/components/primitives/ThemeToggle.tsx`

## 2. Home Link in Nav

**Change:** Add `{ label: "Home", href: "/" }` as the first entry in `NAV_ITEMS`.

The existing nav rendering loop in `Nav.astro` and mobile nav pick this up automatically. The `isActive` check already handles exact path matching (`currentPath === item.href`).

Child pages (e.g. `/blog/some-post`) will match the parent nav item (e.g. "Blog") via the `currentPath.startsWith(item.href + "/")` check.

**File:** `src/config.ts`

## 3. Animated Nav Bubble via View Transitions

**Current state:** `NavIndicator.astro` renders an absolutely-positioned `<span>` that calculates its position from the `[data-active]` link on each page load. It listens to `astro:after-swap` and recalculates, but the DOM swap means the indicator resets rather than animating smoothly between pages.

**Change:** Add `transition:name="nav-indicator"` to the indicator `<span>`. Astro's View Transition API will morph the element between the old and new page, interpolating its position (left, width) automatically. This produces a smooth sliding animation without custom JS.

The existing JS remains for:
- Initial positioning on page load
- Window resize handling
- Fallback after swap (via `astro:after-swap` + `requestAnimationFrame`)

**File:** `src/components/primitives/NavIndicator.astro`

## Files Changed

| File | Change |
|------|--------|
| `src/config.ts` | Add `{ label: "Home", href: "/" }` to start of `NAV_ITEMS` |
| `src/components/primitives/NavIndicator.astro` | Add `transition:name="nav-indicator"` to span |
| `src/components/primitives/ThemeToggle.tsx` | Add circular button styling to match FontSwitcher |

## Files Unchanged

- `src/components/primitives/FontSwitcher.tsx` — no changes
- `src/components/primitives/Nav.astro` — no changes (picks up config automatically)
- `src/components/primitives/MobileNav.tsx` — no changes (picks up config automatically)
- Theme toggle logic — unchanged, visual restyle only
