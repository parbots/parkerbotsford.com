import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

interface Props {
  items: NavItem[];
}

export default function MobileNav({ items }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors duration-300 md:hidden"
      >
        {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
      </button>

      {open && (
        <div
          className="fixed inset-0 top-0 z-40 flex flex-col bg-[var(--bg)] md:hidden"
          style={{ paddingTop: '4.5rem' }}
        >
          <nav className="flex flex-col items-center gap-8 pt-12">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg text-[var(--fg-muted)] no-underline hover:text-[var(--accent)] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
