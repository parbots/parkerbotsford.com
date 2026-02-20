# ESV Bible Verse Integration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add build-time ESV Bible verse fetching with inline/block MDX components, a daily verse homepage widget, a `/verses` aggregation page, and frontmatter verse tagging.

**Architecture:** An Astro integration fetches all referenced verses from the ESV API at build time and writes a JSON cache. Astro components read from this cache for static rendering. A React island handles popover interactivity for inline verse references.

**Tech Stack:** Astro 5, React 19, Tailwind CSS 3, ESV API v3, TypeScript

---

### Task 1: Environment Setup & Verse Data

**Files:**
- Create: `src/data/verses.ts`
- Modify: `.env.example` (create if missing) or document in README
- Modify: `.gitignore`

**Step 1: Add ESV_API_KEY to .env**

Create `.env` at project root (if it doesn't exist):

```
ESV_API_KEY=your_api_key_here
```

**Step 2: Add generated directory to .gitignore**

Add to `.gitignore`:

```
# Generated verse cache
src/data/generated/
```

**Step 3: Create the daily verses data file**

Create `src/data/verses.ts`:

```typescript
export interface VerseRef {
  ref: string;
  category?: string;
}

/**
 * Curated list of daily rotation verses.
 * Day-of-year mod length determines which verse is shown.
 */
export const DAILY_VERSES: VerseRef[] = [
  { ref: "Psalm 118:24" },
  { ref: "Proverbs 3:5-6" },
  { ref: "Philippians 4:13" },
  { ref: "Romans 8:28" },
  { ref: "Isaiah 40:31" },
  { ref: "Jeremiah 29:11" },
  { ref: "Joshua 1:9" },
  { ref: "Psalm 23:1-3" },
  { ref: "Matthew 11:28-30" },
  { ref: "John 3:16" },
  { ref: "Romans 12:2" },
  { ref: "2 Corinthians 5:17" },
  { ref: "Galatians 5:22-23" },
  { ref: "Ephesians 2:8-9" },
  { ref: "Philippians 4:6-7" },
  { ref: "Colossians 3:23" },
  { ref: "2 Timothy 1:7" },
  { ref: "Hebrews 11:1" },
  { ref: "James 1:2-4" },
  { ref: "1 Peter 5:7" },
  { ref: "Psalm 46:10" },
  { ref: "Psalm 119:105" },
  { ref: "Isaiah 41:10" },
  { ref: "Lamentations 3:22-23" },
  { ref: "Micah 6:8" },
  { ref: "Matthew 6:33" },
  { ref: "John 14:27" },
  { ref: "Romans 5:8" },
  { ref: "1 Corinthians 10:13" },
  { ref: "Ephesians 6:10-11" },
];
```

**Step 4: Create generated directory placeholder**

Create `src/data/generated/.gitkeep` (empty file, so the directory exists).

**Step 5: Commit**

```bash
git add src/data/verses.ts src/data/generated/.gitkeep .gitignore
git commit -m "feat: add daily verses data and generated cache directory"
```

---

### Task 2: ESV API Utility

**Files:**
- Create: `src/utils/esv-api.ts`

**Step 1: Create the ESV API fetch utility**

Create `src/utils/esv-api.ts`:

```typescript
export interface VerseData {
  reference: string;
  text: string;
  html: string;
}

const ESV_TEXT_URL = "https://api.esv.org/v3/passage/text/";
const ESV_HTML_URL = "https://api.esv.org/v3/passage/html/";

function getApiKey(): string {
  const key = import.meta.env.ESV_API_KEY ?? process.env.ESV_API_KEY;
  if (!key) {
    throw new Error(
      "ESV_API_KEY is not set. Get one at https://api.esv.org/",
    );
  }
  return key;
}

async function fetchPassageText(ref: string, apiKey: string): Promise<string> {
  const params = new URLSearchParams({
    q: ref,
    "include-passage-references": "false",
    "include-verse-numbers": "true",
    "include-first-verse-numbers": "true",
    "include-footnotes": "false",
    "include-headings": "false",
    "include-short-copyright": "true",
  });

  const res = await fetch(`${ESV_TEXT_URL}?${params}`, {
    headers: { Authorization: `Token ${apiKey}` },
  });

  if (!res.ok) {
    throw new Error(`ESV API error for "${ref}": ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return (data.passages?.[0] ?? "").trim();
}

async function fetchPassageHtml(ref: string, apiKey: string): Promise<string> {
  const params = new URLSearchParams({
    q: ref,
    "include-passage-references": "false",
    "include-verse-numbers": "true",
    "include-first-verse-numbers": "true",
    "include-footnotes": "false",
    "include-headings": "false",
    "include-short-copyright": "true",
    "include-css-link": "false",
    "inline-styles": "false",
    "wrapping-div": "false",
    "include-audio-link": "false",
  });

  const res = await fetch(`${ESV_HTML_URL}?${params}`, {
    headers: { Authorization: `Token ${apiKey}` },
  });

  if (!res.ok) {
    throw new Error(`ESV API error for "${ref}": ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return (data.passages?.[0] ?? "").trim();
}

export async function fetchVerse(ref: string): Promise<VerseData> {
  const apiKey = getApiKey();
  const [text, html] = await Promise.all([
    fetchPassageText(ref, apiKey),
    fetchPassageHtml(ref, apiKey),
  ]);

  return { reference: ref, text, html };
}

export async function fetchVerses(
  refs: string[],
): Promise<Record<string, VerseData>> {
  const results: Record<string, VerseData> = {};

  // Fetch sequentially to respect rate limits (60/min)
  for (const ref of refs) {
    try {
      results[ref] = await fetchVerse(ref);
    } catch (err) {
      console.error(`Failed to fetch verse "${ref}":`, err);
    }
  }

  return results;
}
```

**Step 2: Commit**

```bash
git add src/utils/esv-api.ts
git commit -m "feat: add ESV API fetch utility"
```

---

### Task 3: Astro Integration for Build-time Verse Fetching

**Files:**
- Create: `src/integrations/esv-verses.ts`
- Modify: `astro.config.ts`

**Step 1: Create the Astro integration**

Create `src/integrations/esv-verses.ts`:

```typescript
import type { AstroIntegration } from "astro";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { globSync } from "node:fs";

// Note: We can't use the esv-api util directly in integration context
// because it runs in Node, not Vite. We inline the fetch logic.

interface VerseData {
  reference: string;
  text: string;
  html: string;
}

const ESV_TEXT_URL = "https://api.esv.org/v3/passage/text/";
const ESV_HTML_URL = "https://api.esv.org/v3/passage/html/";

async function fetchPassageText(ref: string, apiKey: string): Promise<string> {
  const params = new URLSearchParams({
    q: ref,
    "include-passage-references": "false",
    "include-verse-numbers": "true",
    "include-first-verse-numbers": "true",
    "include-footnotes": "false",
    "include-headings": "false",
    "include-short-copyright": "true",
  });

  const res = await fetch(`${ESV_TEXT_URL}?${params}`, {
    headers: { Authorization: `Token ${apiKey}` },
  });

  if (!res.ok) {
    throw new Error(`ESV API error for "${ref}": ${res.status}`);
  }

  const data = await res.json();
  return (data.passages?.[0] ?? "").trim();
}

async function fetchPassageHtml(ref: string, apiKey: string): Promise<string> {
  const params = new URLSearchParams({
    q: ref,
    "include-passage-references": "false",
    "include-verse-numbers": "true",
    "include-first-verse-numbers": "true",
    "include-footnotes": "false",
    "include-headings": "false",
    "include-short-copyright": "true",
    "include-css-link": "false",
    "inline-styles": "false",
    "wrapping-div": "false",
    "include-audio-link": "false",
  });

  const res = await fetch(`${ESV_HTML_URL}?${params}`, {
    headers: { Authorization: `Token ${apiKey}` },
  });

  if (!res.ok) {
    throw new Error(`ESV API error for "${ref}": ${res.status}`);
  }

  const data = await res.json();
  return (data.passages?.[0] ?? "").trim();
}

function extractVersesFromFrontmatter(content: string): string[] {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return [];

  const fm = fmMatch[1];
  // Match verses array in YAML frontmatter
  const versesMatch = fm.match(/verses:\s*\n((?:\s+-\s+.*\n?)*)/);
  if (!versesMatch) return [];

  const verses: string[] = [];
  const lines = versesMatch[1].split("\n");
  for (const line of lines) {
    const m = line.match(/^\s+-\s+["']?(.+?)["']?\s*$/);
    if (m) verses.push(m[1]);
  }
  return verses;
}

function extractVersesFromMdxBody(content: string): string[] {
  const verses: string[] = [];
  // Match <BibleVerse ref="..." /> in MDX body
  const regex = /< *BibleVerse[^>]+ref=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    verses.push(match[1]);
  }
  return verses;
}

export default function esvVerses(): AstroIntegration {
  return {
    name: "esv-verses",
    hooks: {
      "astro:config:setup": async ({ logger }) => {
        const apiKey = process.env.ESV_API_KEY;
        if (!apiKey) {
          logger.warn(
            "ESV_API_KEY not set — skipping verse fetching. Verse components will show placeholders.",
          );
          return;
        }

        const rootDir = process.cwd();
        const dataDir = join(rootDir, "src/data");
        const generatedDir = join(dataDir, "generated");

        // Collect all verse references
        const allRefs = new Set<string>();

        // 1. Read daily verses from src/data/verses.ts
        const versesFile = join(dataDir, "verses.ts");
        if (existsSync(versesFile)) {
          const versesContent = readFileSync(versesFile, "utf-8");
          const refMatches = versesContent.matchAll(/ref:\s*["']([^"']+)["']/g);
          for (const m of refMatches) {
            allRefs.add(m[1]);
          }
        }

        // 2. Scan MDX content files for frontmatter verses + inline BibleVerse components
        const contentDirs = ["blog", "writings", "projects"];
        for (const dir of contentDirs) {
          const contentDir = join(dataDir, dir);
          if (!existsSync(contentDir)) continue;

          // Use fs to read directory recursively
          const files = findMdxFiles(contentDir);
          for (const file of files) {
            const content = readFileSync(file, "utf-8");
            for (const ref of extractVersesFromFrontmatter(content)) {
              allRefs.add(ref);
            }
            for (const ref of extractVersesFromMdxBody(content)) {
              allRefs.add(ref);
            }
          }
        }

        if (allRefs.size === 0) {
          logger.info("No verse references found.");
          return;
        }

        logger.info(`Fetching ${allRefs.size} unique verse(s) from ESV API...`);

        // Fetch all verses
        const cache: Record<string, VerseData> = {};
        for (const ref of allRefs) {
          try {
            const [text, html] = await Promise.all([
              fetchPassageText(ref, apiKey),
              fetchPassageHtml(ref, apiKey),
            ]);
            cache[ref] = { reference: ref, text, html };
            logger.info(`  ✓ ${ref}`);
          } catch (err) {
            logger.error(`  ✗ ${ref}: ${err}`);
          }
        }

        // Write cache
        mkdirSync(generatedDir, { recursive: true });
        writeFileSync(
          join(generatedDir, "verse-cache.json"),
          JSON.stringify(cache, null, 2),
        );

        logger.info(
          `Wrote ${Object.keys(cache).length} verse(s) to verse-cache.json`,
        );
      },
    },
  };
}

function findMdxFiles(dir: string): string[] {
  const { readdirSync, statSync } = require("node:fs");
  const results: string[] = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...findMdxFiles(full));
    } else if (entry.endsWith(".mdx")) {
      results.push(full);
    }
  }
  return results;
}
```

**Step 2: Register the integration in astro.config.ts**

In `astro.config.ts`, add the import and register it **before** other integrations:

```typescript
import esvVerses from "./src/integrations/esv-verses";
```

Add to integrations array:

```typescript
integrations: [esvVerses(), react(), mdx(), tailwind(), sitemap()],
```

**Step 3: Verify it builds**

Run: `pnpm build`

Expected: Build succeeds. If ESV_API_KEY is not set, you'll see the warning. If set, you'll see fetch logs.

**Step 4: Commit**

```bash
git add src/integrations/esv-verses.ts astro.config.ts
git commit -m "feat: add Astro integration for build-time ESV verse fetching"
```

---

### Task 4: Verse Cache Reader Utility

**Files:**
- Create: `src/utils/verse-cache.ts`

**Step 1: Create the cache reader**

Create `src/utils/verse-cache.ts`:

```typescript
interface VerseData {
  reference: string;
  text: string;
  html: string;
}

let cache: Record<string, VerseData> | null = null;

function loadCache(): Record<string, VerseData> {
  if (cache) return cache;

  try {
    // Dynamic import of the generated JSON
    const data = import.meta.glob<Record<string, VerseData>>(
      "../data/generated/verse-cache.json",
      { eager: true, import: "default" },
    );

    const entries = Object.values(data);
    cache = entries[0] ?? {};
  } catch {
    cache = {};
  }

  return cache;
}

export function getVerse(ref: string): VerseData | null {
  const c = loadCache();
  return c[ref] ?? null;
}

export function getAllVerses(): Record<string, VerseData> {
  return loadCache();
}

export function getDailyVerse(dailyRefs: string[]): VerseData | null {
  if (dailyRefs.length === 0) return null;

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = dayOfYear % dailyRefs.length;

  return getVerse(dailyRefs[index]);
}
```

**Step 2: Commit**

```bash
git add src/utils/verse-cache.ts
git commit -m "feat: add verse cache reader utility"
```

---

### Task 5: Content Collection Schema Update

**Files:**
- Modify: `src/content.config.ts`

**Step 1: Add verses field to all three collection schemas**

In `src/content.config.ts`, add `verses: z.array(z.string()).default([])` to blog, writings, and projects schemas.

For blog, after the `draft` field:

```typescript
verses: z.array(z.string()).default([]),
```

Same for writings and projects schemas.

**Step 2: Run typecheck**

Run: `pnpm typecheck`

Expected: No errors.

**Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: add verses field to content collection schemas"
```

---

### Task 6: BibleVerse React Island Component

**Files:**
- Create: `src/features/bible/interactive/BibleVerse.tsx`

**Step 1: Create the BibleVerse component**

Create `src/features/bible/interactive/BibleVerse.tsx`:

```tsx
import { useState, useRef, useEffect } from "react";

interface BibleVerseProps {
  reference: string;
  text: string;
  display?: "inline" | "block";
}

export default function BibleVerse({
  reference,
  text,
  display = "inline",
}: BibleVerseProps) {
  if (display === "block") {
    return <BlockVerse reference={reference} text={text} />;
  }

  return <InlineVerse reference={reference} text={text} />;
}

function BlockVerse({ reference, text }: { reference: string; text: string }) {
  return (
    <figure
      className="my-6 rounded-md border-l-2 py-4 pr-4 pl-4"
      style={{
        borderColor: "var(--accent)",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      <blockquote
        className="mb-2 italic"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--fg)",
          fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
          lineHeight: 1.7,
        }}
      >
        {text}
      </blockquote>
      <figcaption
        className="text-sm"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--fg-muted)",
        }}
      >
        — {reference} (ESV)
      </figcaption>
    </figure>
  );
}

function InlineVerse({
  reference,
  text,
}: {
  reference: string;
  text: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Position popover
  useEffect(() => {
    if (!open || !triggerRef.current || !popoverRef.current) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const popover = popoverRef.current;

    // Center below trigger
    const left = trigger.left + trigger.width / 2 - popover.offsetWidth / 2;
    const top = trigger.bottom + 8;

    // Keep within viewport
    const clampedLeft = Math.max(
      8,
      Math.min(left, window.innerWidth - popover.offsetWidth - 8),
    );

    popover.style.left = `${clampedLeft}px`;
    popover.style.top = `${top}px`;
  }, [open]);

  return (
    <span className="relative inline">
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="cursor-pointer border-b border-dashed font-semibold"
        style={{
          color: "var(--accent)",
          borderColor: "var(--accent)",
        }}
        aria-expanded={open}
        aria-label={`${reference} — click or hover to read`}
      >
        {reference}
      </button>

      {open && (
        <div
          ref={popoverRef}
          role="tooltip"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="fixed z-50 max-w-sm rounded-md border p-4 shadow-lg"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border)",
            color: "var(--fg)",
          }}
        >
          <p
            className="mb-2 text-xs font-semibold tracking-wide uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--accent)",
            }}
          >
            {reference}
          </p>
          <p
            className="mb-2 text-sm leading-relaxed italic"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--fg)",
            }}
          >
            {text}
          </p>
          <p
            className="text-xs"
            style={{
              color: "var(--fg-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            ESV
          </p>
        </div>
      )}
    </span>
  );
}
```

**Step 2: Run lint and typecheck**

Run: `pnpm lint && pnpm typecheck`

Expected: No errors.

**Step 3: Commit**

```bash
git add src/features/bible/interactive/BibleVerse.tsx
git commit -m "feat: add BibleVerse React island component with popover and block modes"
```

---

### Task 7: BibleVerse Astro Wrapper

**Files:**
- Create: `src/features/bible/BibleVerseWrapper.astro`

This wrapper reads from the verse cache and passes data to the React island. It's what MDX files import.

**Step 1: Create the wrapper**

Create `src/features/bible/BibleVerseWrapper.astro`:

```astro
---
import BibleVerse from "./interactive/BibleVerse.tsx";
import { getVerse } from "../../utils/verse-cache";

interface Props {
  ref: string;
  display?: "inline" | "block";
}

const { ref, display = "inline" } = Astro.props;
const verse = getVerse(ref);
---

{
  verse ? (
    <BibleVerse
      client:load
      reference={verse.reference}
      text={verse.text}
      display={display}
    />
  ) : (
    <span
      class="text-sm italic"
      style="color: var(--fg-muted); font-family: var(--font-mono);"
    >
      [{ref}]
    </span>
  )
}
```

**Step 2: Commit**

```bash
git add src/features/bible/BibleVerseWrapper.astro
git commit -m "feat: add BibleVerse Astro wrapper for MDX usage"
```

---

### Task 8: DailyVerse Component

**Files:**
- Create: `src/features/bible/DailyVerse.astro`

**Step 1: Create the DailyVerse component**

Create `src/features/bible/DailyVerse.astro`:

```astro
---
import { DAILY_VERSES } from "../../data/verses";
import { getDailyVerse } from "../../utils/verse-cache";

const dailyRefs = DAILY_VERSES.map((v) => v.ref);
const verse = getDailyVerse(dailyRefs);
---

{
  verse && (
    <section class="py-12">
      <h2
        class="mb-4 text-lg"
        style="font-family: var(--font-mono);"
      >
        Verse of the day
      </h2>
      <figure
        class="rounded-md border-l-2 py-4 pr-4 pl-4"
        style={`border-color: var(--accent); background-color: var(--bg-surface);`}
      >
        <blockquote
          class="mb-2 italic"
          style="color: var(--fg); font-size: clamp(1rem, 1.5vw, 1.125rem); line-height: 1.7;"
        >
          {verse.text}
        </blockquote>
        <figcaption
          class="text-sm"
          style="font-family: var(--font-mono); color: var(--fg-muted);"
        >
          — {verse.reference} (ESV)
        </figcaption>
      </figure>
    </section>
  )
}
```

**Step 2: Add DailyVerse to the homepage**

In `src/pages/index.astro`, import and place `<DailyVerse />` after `<RecentPosts />`:

Add import:
```typescript
import DailyVerse from "../features/bible/DailyVerse.astro";
```

Add component after `<RecentPosts />`:
```astro
<DailyVerse />
```

**Step 3: Commit**

```bash
git add src/features/bible/DailyVerse.astro src/pages/index.astro
git commit -m "feat: add DailyVerse component to homepage"
```

---

### Task 9: Verses Aggregation Page

**Files:**
- Create: `src/features/bible/VerseList.astro`
- Create: `src/pages/verses.astro`

**Step 1: Create the VerseList component**

Create `src/features/bible/VerseList.astro`:

```astro
---
import { getCollection } from "astro:content";
import { getVerse } from "../../utils/verse-cache";

interface VerseEntry {
  ref: string;
  text: string;
  sources: { title: string; href: string; collection: string }[];
}

// Gather verses from all collections
const blog = await getCollection("blog", ({ data }) => !data.draft);
const writings = await getCollection("writings", ({ data }) => !data.draft);
const projects = await getCollection("projects");

const verseMap = new Map<string, VerseEntry>();

function addVerses(
  items: { id: string; data: { title: string; verses?: string[] } }[],
  collection: string,
  pathPrefix: string,
) {
  for (const item of items) {
    const verses = item.data.verses ?? [];
    for (const ref of verses) {
      const existing = verseMap.get(ref);
      const source = {
        title: item.data.title,
        href: `${pathPrefix}/${item.id}`,
        collection,
      };
      if (existing) {
        existing.sources.push(source);
      } else {
        const verse = getVerse(ref);
        verseMap.set(ref, {
          ref,
          text: verse?.text ?? "",
          sources: [source],
        });
      }
    }
  }
}

addVerses(blog, "blog", "/blog");
addVerses(writings, "writings", "/writings");
addVerses(projects, "projects", "/projects");

const entries = [...verseMap.values()].sort((a, b) =>
  a.ref.localeCompare(b.ref),
);
---

{
  entries.length > 0 ? (
    <ul class="space-y-8">
      {entries.map((entry) => (
        <li>
          <h3
            class="mb-1 text-base font-semibold"
            style="font-family: var(--font-mono); color: var(--accent);"
          >
            {entry.ref}
          </h3>
          {entry.text && (
            <p
              class="mb-2 text-sm italic leading-relaxed"
              style="color: var(--fg);"
            >
              {entry.text}
            </p>
          )}
          <div class="flex flex-wrap gap-2">
            {entry.sources.map((src) => (
              <a
                href={src.href}
                class="rounded-sm px-2 py-0.5 text-xs"
                style="background-color: var(--bg-surface); color: var(--fg-muted); font-family: var(--font-mono);"
              >
                {src.collection}/{src.title}
              </a>
            ))}
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p style="color: var(--fg-muted);">
      No verse references found across the site yet.
    </p>
  )
}
```

**Step 2: Create the /verses page**

Create `src/pages/verses.astro`:

```astro
---
import Page from "../layouts/Page.astro";
import VerseList from "../features/bible/VerseList.astro";
---

<Page title="Verses" description="Bible verse references across the site">
  <h1 class="mb-2">Verses</h1>
  <p class="mb-8 text-[var(--fg-muted)]">
    All Bible verse references found across the site, from the English Standard
    Version (ESV).
  </p>
  <VerseList />
</Page>
```

**Step 3: Commit**

```bash
git add src/features/bible/VerseList.astro src/pages/verses.astro
git commit -m "feat: add /verses aggregation page"
```

---

### Task 10: Navigation Update & Integration Test

**Files:**
- Modify: `src/config.ts`

**Step 1: Add Verses to navigation**

In `src/config.ts`, add to `NAV_ITEMS`:

```typescript
{ label: "Verses", href: "/verses" },
```

**Step 2: Test with a sample MDX file**

Add `verses` frontmatter and a `<BibleVerse>` component to an existing blog post (e.g., `src/data/blog/hello-world.mdx`) for testing:

In the frontmatter, add:
```yaml
verses:
  - "John 3:16"
  - "Romans 8:28"
```

In the body, add:
```mdx
import BibleVerse from "../../features/bible/BibleVerseWrapper.astro";

As the scripture says, <BibleVerse ref="John 3:16" />, this is good news.

<BibleVerse ref="Romans 8:28" display="block" />
```

**Step 3: Build and verify**

Run: `pnpm build`

Expected: Build succeeds. Verse cache is generated. Pages render correctly.

**Step 4: Run all checks**

Run: `pnpm lint && pnpm format:check && pnpm typecheck`

Expected: All pass.

**Step 5: Commit**

```bash
git add src/config.ts
git commit -m "feat: add Verses to site navigation"
```

---

### Task 11: Final Verification

**Step 1: Run dev server and visually verify**

Run: `pnpm dev`

Check:
- Homepage shows "Verse of the day" section
- `/verses` page lists all referenced verses
- Blog post with `<BibleVerse>` shows popover on hover and block display
- Dark mode works correctly for all verse components
- Mobile layout is responsive

**Step 2: Run full build**

Run: `pnpm build && pnpm preview`

Expected: Production build succeeds, all verse content is statically rendered.

**Step 3: Run all linting/formatting/type checks**

Run: `pnpm lint && pnpm format:check && pnpm typecheck`

Expected: All pass with zero warnings and errors.
