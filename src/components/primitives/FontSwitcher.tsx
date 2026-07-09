import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

const FONTS = [
  { id: "default", label: "Atkinson Hyperlegible" },
  { id: "lora", label: "Lora" },
  { id: "inter", label: "Inter" },
] as const;

export default function FontSwitcher() {
  const [current, setCurrent] = useState(() => {
    if (typeof window === "undefined") return "default";
    const pref = localStorage.getItem("font-preference");
    return pref === "lora" || pref === "inter" ? pref : "default";
  });

  function selectFont(id: string) {
    setCurrent(id);
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
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change font"
        className="flex size-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-xs font-semibold text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
      >
        Aa
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Body font</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={current} onValueChange={selectFont}>
            {FONTS.map((font) => (
              <DropdownMenuRadioItem key={font.id} value={font.id}>
                {font.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
