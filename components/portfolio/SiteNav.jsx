import { useEffect, useState } from "react";
import { navigation, profile } from "../../lib/portfolio";
import Icon from "./Icons";
import { useTheme } from "../ThemeContext";

const links = navigation.filter((item) => !item.cta);
const talk = navigation.find((item) => item.cta);

export default function SiteNav({ activeSection, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleClick = (id, event) => {
    setOpen(false);
    onNavigate(id, event);
  };

  return (
    <header className={`site-header ${scrolled || open ? "scrolled" : ""}`}>
      <div className="header-border" />
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6" aria-label="Primary">
        <a
          href="#profile"
          id="nav-logo-link"
          onClick={(event) => handleClick("profile", event)}
          className="font-display group flex items-center gap-3 text-2xl font-bold tracking-tight"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 text-xs text-white shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110">
            {profile.monogram}
          </span>
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden="true" className="gradient-text hidden sm:inline">
            Naija
          </span>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium uppercase lg:flex">
          {links.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                id={`nav-${item.id}-link`}
                onClick={(event) => handleClick(item.id, event)}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            className="theme-toggle glass-card group flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 md:h-11 md:w-11"
            aria-label="Toggle night mode"
            title="Toggle theme"
            onClick={toggleTheme}
          >
            <Icon name="moon" className="icon-moon h-5 w-5 text-indigo-400 transition-transform group-hover:rotate-12" />
            <Icon name="sun" className="icon-sun h-5 w-5 text-yellow-500 transition-transform group-hover:rotate-45" />
          </button>

          {talk && (
            <a
              href={`#${talk.id}`}
              id="nav-contact-link"
              onClick={(event) => handleClick(talk.id, event)}
              className="hidden items-center rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-tertiary)] px-7 py-3 text-sm font-semibold tracking-wider text-white uppercase transition-all hover:scale-105 active:scale-95 sm:flex"
            >
              {talk.label}
            </a>
          )}

          <button
            type="button"
            className="glass-card flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-primary)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={`fixed inset-0 top-[4.5rem] z-[-1] flex items-center justify-center bg-[var(--bg-main)] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="font-display flex flex-col items-center gap-8 text-2xl font-bold">
          {navigation.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => handleClick(item.id, event)}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={item.cta ? "gradient-text" : "hover:text-[var(--accent-primary)]"}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
