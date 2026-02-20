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
    throw new Error("ESV_API_KEY is not set. Get one at https://api.esv.org/");
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
    throw new Error(
      `ESV API error for "${ref}": ${res.status} ${res.statusText}`,
    );
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
    throw new Error(
      `ESV API error for "${ref}": ${res.status} ${res.statusText}`,
    );
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
