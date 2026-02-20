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
      className="my-6 rounded-md border-l-2 py-4 pl-4 pr-4"
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

function InlineVerse({ reference, text }: { reference: string; text: string }) {
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
            className="mb-2 text-xs font-semibold uppercase tracking-wide"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--accent)",
            }}
          >
            {reference}
          </p>
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
            ESV
          </p>
        </div>
      )}
    </span>
  );
}
