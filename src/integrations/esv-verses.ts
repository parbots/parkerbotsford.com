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
import { loadEnv } from "vite";
import type { VerseData } from "../utils/esv-api";
import { fetchPassageText } from "../utils/esv-api";

function extractVersesFromFrontmatter(content: string): string[] {
  const match = content.match(/verses:\s*\n((?:\s+-\s+.*\n?)*)/);
  if (!match) return [];

  return [...match[1].matchAll(/\s+-\s+(.*)/g)].map((m) =>
    m[1].trim().replace(/^["']|["']$/g, ""),
  );
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
        const env = loadEnv("production", process.cwd(), "ESV_");
        const apiKey = env.ESV_API_KEY;

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

        // 3. Load existing cache so we only fetch missing verses
        const outDir = join(srcDir, "data", "generated");
        const outPath = join(outDir, "verse-cache.json");
        let cached: Record<string, VerseData> = {};

        if (existsSync(outPath)) {
          try {
            cached = JSON.parse(readFileSync(outPath, "utf-8"));
          } catch {
            cached = {};
          }
        }

        const missing = [...refs].filter((ref) => !cached[ref]);

        if (missing.length === 0) {
          logger.info(
            `All ${refs.size} verse(s) already cached — skipping fetch.`,
          );
          return;
        }

        logger.info(
          `Found ${refs.size} verse(s), ${missing.length} not cached. Fetching…`,
        );

        // 4. Fetch only missing verses sequentially to respect rate limits
        let fetched = 0;

        for (const ref of missing) {
          try {
            const text = await fetchPassageText(ref, apiKey);
            cached[ref] = { reference: ref, text };
            fetched++;
            logger.info(`  ✓ ${ref}`);
          } catch (err) {
            logger.warn(
              `  ✗ Failed to fetch "${ref}": ${err instanceof Error ? err.message : String(err)}`,
            );
          }
        }

        // 5. Write cache (only if we fetched something new)
        if (fetched > 0) {
          if (!existsSync(outDir)) {
            mkdirSync(outDir, { recursive: true });
          }
          writeFileSync(outPath, JSON.stringify(cached, null, 2) + "\n");
        }

        logger.info(
          `Cache now has ${Object.keys(cached).length} verse(s) (${fetched} newly fetched).`,
        );
      },
    },
  };
}
