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
