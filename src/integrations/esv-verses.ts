import type { AstroIntegration } from "astro";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
  statSync,
} from "node:fs";
import { join } from "node:path";

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
    throw new Error(
      `ESV API error for "${ref}": ${res.status} ${res.statusText}`,
    );
  }

  const data = (await res.json()) as { passages?: string[] };
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
    throw new Error(
      `ESV API error for "${ref}": ${res.status} ${res.statusText}`,
    );
  }

  const data = (await res.json()) as { passages?: string[] };
  return (data.passages?.[0] ?? "").trim();
}

function extractVersesFromFrontmatter(content: string): string[] {
  const match = content.match(/verses:\s*\n((?:\s+-\s+.*\n?)*)/);
  if (!match) return [];

  return [...match[1].matchAll(/\s+-\s+(.*)/g)].map((m) => m[1].trim());
}

function extractVersesFromMdxBody(content: string): string[] {
  return [...content.matchAll(/< *BibleVerse[^>]+ref=["']([^"']+)["']/g)].map(
    (m) => m[1],
  );
}

function findMdxFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];

  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
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

export default function esvVerses(): AstroIntegration {
  return {
    name: "esv-verses",
    hooks: {
      "astro:config:setup": async ({ logger }) => {
        const apiKey = process.env.ESV_API_KEY;

        if (!apiKey || apiKey === "your_api_key_here") {
          logger.warn(
            "ESV_API_KEY is not set — skipping verse pre-fetch. " +
              "Get a key at https://api.esv.org/",
          );
          return;
        }

        const srcDir = join(process.cwd(), "src");
        const refs = new Set<string>();

        // 1. Extract refs from verses.ts
        const versesFile = join(srcDir, "data", "verses.ts");
        if (existsSync(versesFile)) {
          const versesContent = readFileSync(versesFile, "utf-8");
          for (const match of versesContent.matchAll(
            /ref:\s*["']([^"']+)["']/g,
          )) {
            refs.add(match[1]);
          }
        }

        // 2. Extract refs from MDX files
        const mdxDirs = [
          join(srcDir, "data", "blog"),
          join(srcDir, "data", "writings"),
          join(srcDir, "data", "projects"),
        ];

        for (const dir of mdxDirs) {
          for (const file of findMdxFiles(dir)) {
            const content = readFileSync(file, "utf-8");
            for (const ref of extractVersesFromFrontmatter(content)) {
              refs.add(ref);
            }
            for (const ref of extractVersesFromMdxBody(content)) {
              refs.add(ref);
            }
          }
        }

        if (refs.size === 0) {
          logger.info("No verse references found — nothing to fetch.");
          return;
        }

        logger.info(`Found ${refs.size} unique verse reference(s). Fetching…`);

        // 3. Fetch all verses sequentially to respect rate limits
        const results: Record<string, VerseData> = {};

        for (const ref of refs) {
          try {
            const [text, html] = await Promise.all([
              fetchPassageText(ref, apiKey),
              fetchPassageHtml(ref, apiKey),
            ]);
            results[ref] = { reference: ref, text, html };
            logger.info(`  ✓ ${ref}`);
          } catch (err) {
            logger.warn(
              `  ✗ Failed to fetch "${ref}": ${err instanceof Error ? err.message : String(err)}`,
            );
          }
        }

        // 4. Write cache
        const outDir = join(srcDir, "data", "generated");
        if (!existsSync(outDir)) {
          mkdirSync(outDir, { recursive: true });
        }

        const outPath = join(outDir, "verse-cache.json");
        writeFileSync(outPath, JSON.stringify(results, null, 2) + "\n");
        logger.info(
          `Wrote ${Object.keys(results).length} verse(s) to ${outPath}`,
        );
      },
    },
  };
}
