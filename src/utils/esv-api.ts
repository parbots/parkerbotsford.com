export interface VerseData {
  reference: string;
  text: string;
}

const ESV_TEXT_URL = "https://api.esv.org/v3/passage/text/";

export async function fetchPassageText(
  ref: string,
  apiKey: string,
): Promise<string> {
  const params = new URLSearchParams({
    q: ref,
    "include-passage-references": "false",
    "include-verse-numbers": "true",
    "include-first-verse-numbers": "true",
    "include-footnotes": "false",
    "include-headings": "false",
    "include-short-copyright": "false",
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
