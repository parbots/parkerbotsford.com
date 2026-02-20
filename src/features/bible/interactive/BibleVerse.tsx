import * as HoverCard from "@radix-ui/react-hover-card";
import { useCallback, useEffect, useState } from "react";

function esvUrl(reference: string): string {
  return `https://www.esv.org/verses/${encodeURIComponent(reference)}/`;
}

// Lightweight cross-island coordination via custom events.
// When one verse opens, all others close immediately.
const VERSE_OPEN_EVENT = "bible-verse:open";

function emitVerseOpen(ref: string) {
  window.dispatchEvent(new CustomEvent(VERSE_OPEN_EVENT, { detail: { ref } }));
}

function CopyButton({
  text,
  reference,
  className,
}: {
  text: string;
  reference: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const formatted = `"${text}" — ${reference} (ESV)`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Silently fail if clipboard access is denied
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`cursor-pointer text-xs ${className ?? ""}`}
      style={{
        fontFamily: "var(--font-mono)",
        color: "var(--fg-muted)",
      }}
      aria-label={`Copy ${reference}`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

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
    <figure className="not-prose my-6">
      <blockquote
        className="italic"
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
        className="mt-3 flex items-center gap-2 text-sm"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--fg-muted)",
        }}
      >
        <span>
          —{" "}
          <a
            href={esvUrl(reference)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            {reference}
          </a>{" "}
          (
          <a
            href="https://www.esv.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--fg-muted)" }}
          >
            ESV
          </a>
          )
        </span>
        <span style={{ color: "var(--border)" }}>·</span>
        <CopyButton text={text} reference={reference} />
      </figcaption>
    </figure>
  );
}

function InlineVerse({ reference, text }: { reference: string; text: string }) {
  const [open, setOpen] = useState(false);

  // Close this card when a different verse opens
  useEffect(() => {
    function onVerseOpen(e: Event) {
      const detail = (e as CustomEvent<{ ref: string }>).detail;
      if (detail.ref !== reference) {
        setOpen(false);
      }
    }

    window.addEventListener(VERSE_OPEN_EVENT, onVerseOpen);
    return () => window.removeEventListener(VERSE_OPEN_EVENT, onVerseOpen);
  }, [reference]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (next) {
        emitVerseOpen(reference);
      }
      setOpen(next);
    },
    [reference],
  );

  return (
    <HoverCard.Root
      open={open}
      onOpenChange={handleOpenChange}
      openDelay={100}
      closeDelay={80}
    >
      <HoverCard.Trigger asChild>
        <a
          href={esvUrl(reference)}
          target="_blank"
          rel="noopener noreferrer"
          className="not-prose cursor-pointer border-b border-dashed font-semibold"
          style={{
            color: "var(--accent)",
            borderColor: "var(--accent)",
          }}
        >
          {reference}
        </a>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          sideOffset={4}
          className="verse-hovercard z-50 w-80 rounded-md border p-4 shadow-lg"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border)",
            color: "var(--fg)",
          }}
        >
          <div className="mb-2 flex items-center justify-between">
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <a
                href={esvUrl(reference)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
                {reference}
              </a>
            </p>
            <CopyButton text={text} reference={reference} />
          </div>
          <p
            className="mb-2 text-sm italic leading-relaxed"
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
            <a
              href="https://www.esv.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--fg-muted)" }}
            >
              ESV
            </a>
          </p>
          <HoverCard.Arrow
            style={{ fill: "var(--bg-surface)" }}
            className="drop-shadow-sm"
          />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
