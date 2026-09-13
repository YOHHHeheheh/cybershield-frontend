"use client";

import { useState } from "react";
import {
  Search,
  User,
  Menu,
  X,
  Shield,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Dashboard",    href: "/dashboard" },
  { label: "Threats",      href: "#threats"   },
  { label: "Incidents",    href: "#incidents"  },
  { label: "Assets",       href: "#assets"     },
  { label: "Reports",      href: "#reports"    },
  { label: "Intel Feed",   href: "#intel"      },
];

const STAGGER_BASE = 100; // ms

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════ */}
      <nav
        style={{ position: "relative", zIndex: 50 }}
        className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <a
          href="/"
          className="flex items-center gap-2 animate-blur-fade-up"
          style={{ animationDelay: "0ms" }}
          aria-label="CyberShield home"
        >
          <Shield
            size={22}
            className="text-emerald-400"
            aria-hidden="true"
          />
          <span
            className="text-white font-semibold tracking-widest text-sm md:text-base uppercase"
            style={{ letterSpacing: "0.2em" }}
          >
            CyberShield
          </span>
        </a>

        {/* ── Desktop Nav Links ── */}
        <ul
          className="hidden lg:flex items-center gap-6 xl:gap-8 list-none m-0 p-0"
          role="list"
        >
          {NAV_LINKS.map(({ label, href }, i) => (
            <li key={label}>
              <a
                href={href}
                className="animate-blur-fade-up text-sm text-white/80 hover:text-white transition-colors duration-200"
                style={{ animationDelay: `${STAGGER_BASE + i * 50}ms` }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right Controls ── */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search — hidden below sm */}
          <button
            id="nav-search-btn"
            className="hidden sm:flex animate-blur-fade-up items-center gap-2 liquid-glass rounded-full px-4 md:px-6 py-2 text-sm text-white/90 cursor-pointer"
            style={{ animationDelay: "350ms" }}
            aria-label="Open search"
            type="button"
          >
            <Search size={18} aria-hidden="true" />
            <span>Search</span>
          </button>

          {/* User profile — hidden below sm */}
          <button
            id="nav-profile-btn"
            className="hidden sm:flex animate-blur-fade-up items-center justify-center liquid-glass w-10 h-10 rounded-full cursor-pointer text-white/90"
            style={{ animationDelay: "400ms" }}
            aria-label="Open profile"
            type="button"
          >
            <User size={18} aria-hidden="true" />
          </button>

          {/* Hamburger — visible below lg */}
          <button
            id="nav-hamburger-btn"
            className="flex lg:hidden animate-blur-fade-up items-center justify-center liquid-glass w-10 h-10 rounded-full cursor-pointer text-white/90"
            style={{ animationDelay: "350ms" }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className="absolute transition-all duration-500 ease-out"
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "rotate(180deg) scale(0.5)" : "rotate(0deg) scale(1)",
              }}
              aria-hidden="true"
            >
              <Menu size={18} />
            </span>
            <span
              className="absolute transition-all duration-500 ease-out"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "rotate(0deg) scale(1)" : "rotate(-180deg) scale(0.5)",
              }}
              aria-hidden="true"
            >
              <X size={18} />
            </span>
          </button>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          MOBILE MENU DROPDOWN
      ════════════════════════════════════════ */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className="lg:hidden absolute left-0 right-0"
        style={{
          top: "72px",
          zIndex: 40,
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-1rem)",
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
        <div className="bg-gray-900/95 border-t border-b border-gray-800 shadow-2xl"
          style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>

          {/* Nav Links */}
          <ul className="flex flex-col px-4 pt-4 pb-2 list-none m-0 p-0" role="list">
            {NAV_LINKS.map(({ label, href }, i) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 px-3 rounded-lg text-sm text-white/90 hover:bg-gray-800/50 transition-colors duration-200 menu-link-enter"
                  style={{
                    animationDelay: menuOpen ? `${i * 50}ms` : "0ms",
                    animationPlayState: menuOpen ? "running" : "paused",
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Search + Profile (visible below sm) */}
          <div className="sm:hidden flex items-center gap-3 px-7 py-4 border-t border-gray-800">
            <button
              id="mobile-search-btn"
              className="flex-1 flex items-center justify-center gap-2 liquid-glass rounded-full py-2.5 text-sm text-white/90 cursor-pointer"
              type="button"
              aria-label="Search"
            >
              <Search size={16} aria-hidden="true" />
              <span>Search</span>
            </button>
            <button
              id="mobile-profile-btn"
              className="flex items-center justify-center liquid-glass w-10 h-10 rounded-full cursor-pointer text-white/90"
              type="button"
              aria-label="Profile"
            >
              <User size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
