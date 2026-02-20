interface VerseData {
  reference: string;
  text: string;
  html: string;
}

let cache: Record<string, VerseData> | null = null;

function loadCache(): Record<string, VerseData> {
  if (cache) return cache;

  try {
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
