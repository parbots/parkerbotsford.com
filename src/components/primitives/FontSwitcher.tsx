import { useState, useRef, useEffect } from "react";

const FONTS = [
  { id: "default", label: "Atkinson Hyperlegible" },
  { id: "lora", label: "Lora" },
  { id: "inter", label: "Inter" },
] as const;

export default function FontSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(() => {
    if (typeof window === "undefined") return "default";
    const pref = localStorage.getItem("font-preference");
    return pref === "lora" || pref === "inter" ? pref : "default";
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function selectFont(id: string) {
    setCurrent(id);
    setOpen(false);

    document.documentElement.classList.remove("font-lora", "font-inter");
    if (id === "lora") {
      document.documentElement.classList.add("font-lora");
      localStorage.setItem("font-preference", "lora");
    } else if (id === "inter") {
      document.documentElement.classList.add("font-inter");
      localStorage.setItem("font-preference", "inter");
    } else {
      localStorage.removeItem("font-preference");
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change font"
        aria-expanded={open}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-xs font-semibold text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
      >
        Aa
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-1.5 shadow-lg">
          {FONTS.map((font) => (
            <button
              key={font.id}
              onClick={() => selectFont(font.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
                current === font.id
                  ? "bg-[var(--bg-surface)] font-semibold text-[var(--fg)]"
                  : "text-[var(--fg-muted)] hover:bg-[var(--bg-surface)]"
              }`}
            >
              <span>{font.label}</span>
              {current === font.id && (
                <span className="text-[var(--accent)]">&#10003;</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
