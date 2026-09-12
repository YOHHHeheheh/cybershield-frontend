"use client";

import {
  Play,
  ChevronLeft,
  ChevronRight,
  Globe,
  Clock,
  Activity,
  AlertTriangle,
} from "lucide-react";

const THREAT_TICKER = [
  "🔴 APT-41 lateral movement detected — APAC region",
  "🟠 CVE-2026-1337 zero-day exploited in the wild",
  "🟡 Brute-force campaign targeting /api/auth — 3.2K attempts/min",
  "🔴 Data exfiltration attempt blocked — EU-WEST-2",
  "🟠 Ransomware signature matched — endpoint quarantined",
  "🟡 Suspicious DNS tunnelling — outbound C2 traffic flagged",
];

interface HeroContentProps {
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function HeroContent({ onPrevious, onNext }: HeroContentProps) {
  return (
    <section
      aria-label="Hero section"
      style={{ position: "relative", zIndex: 10 }}
      className="flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16"
    >
      {/* ── Live Threat Ticker ── */}
      <div
        className="animate-blur-fade-up mb-6 md:mb-8 overflow-hidden"
        style={{ animationDelay: "200ms" }}
        aria-label="Live threat feed ticker"
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 flex items-center gap-1.5 bg-red-500/20 border border-red-500/40 rounded-full px-3 py-1 text-xs font-medium text-red-400 uppercase tracking-wider">
            <span className="status-dot w-1.5 h-1.5 rounded-full bg-red-400 inline-block" aria-hidden="true" />
            Live
          </span>
          <div className="overflow-hidden flex-1 mask-r">
            <div className="ticker-track flex gap-12 whitespace-nowrap text-xs text-white/50">
              {[...THREAT_TICKER, ...THREAT_TICKER].map((item, i) => (
                <span key={i} className="flex-shrink-0">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Flex Row ── */}
      <div className="flex flex-col md:flex-row items-end gap-8">

        {/* ════ LEFT — Content ════ */}
        <div className="flex-1">

          {/* Metadata row */}
          <div
            className="animate-blur-fade-up flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm text-white/70"
            style={{ animationDelay: "300ms" }}
          >
            <span className="flex items-center gap-1.5">
              <AlertTriangle
                size={16}
                className="sm:w-5 sm:h-5 text-red-400 fill-red-400/20"
                aria-hidden="true"
              />
              <span className="font-medium text-white">CRITICAL</span>
            </span>

            <span className="flex items-center gap-1.5">
              <Activity size={16} className="sm:w-5 sm:h-5" aria-hidden="true" />
              <span>99.9% Uptime</span>
            </span>

            <span className="flex items-center gap-1.5">
              <Clock size={16} className="sm:w-5 sm:h-5" aria-hidden="true" />
              <span>&lt;2ms Detection</span>
            </span>

            <span className="flex items-center gap-1.5">
              <Globe size={16} className="sm:w-5 sm:h-5" aria-hidden="true" />
              <span>Global Coverage</span>
            </span>
          </div>

          {/* Hero Title */}
          <h1
            className="animate-blur-fade-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-4 md:mb-6"
            style={{
              animationDelay: "400ms",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Defend.{" "}
            <span className="text-emerald-400">Detect.</span>{" "}
            <br className="hidden sm:block" />
            Dominate.
          </h1>

          {/* Description */}
          <p
            className="animate-blur-fade-up text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl leading-relaxed"
            style={{ animationDelay: "500ms" }}
          >
            Real-time threat intelligence across your entire attack surface.
            AI-powered detection that never sleeps — so your team can.
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-blur-fade-up flex flex-wrap gap-3 sm:gap-4"
            style={{ animationDelay: "600ms" }}
          >
            {/* Primary CTA */}
            <button
              id="hero-launch-dashboard-btn"
              type="button"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              className="flex items-center gap-2 bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base cursor-pointer"
              aria-label="Launch the security dashboard"
            >
              <Play size={18} className="fill-black" aria-hidden="true" />
              Launch Dashboard
            </button>

            {/* Secondary CTA */}
            <button
              id="hero-threat-map-btn"
              type="button"
              className="animate-blur-fade-up liquid-glass flex items-center gap-2 rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-white text-sm sm:text-base cursor-pointer"
              style={{ animationDelay: "700ms" }}
              aria-label="View live global threat map"
            >
              <Globe size={18} aria-hidden="true" />
              Threat Map
            </button>
          </div>
        </div>

        {/* ════ RIGHT — Navigation Arrows ════ */}
        <div
          className="flex items-center gap-3 md:flex-col md:items-end"
          aria-label="Slide navigation"
        >
          <button
            id="hero-prev-btn"
            type="button"
            className="animate-blur-fade-up liquid-glass flex items-center gap-2 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-white text-sm cursor-pointer"
            style={{ animationDelay: "800ms" }}
            onClick={onPrevious}
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <button
            id="hero-next-btn"
            type="button"
            className="animate-blur-fade-up liquid-glass flex items-center gap-2 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-white text-sm cursor-pointer"
            style={{ animationDelay: "900ms" }}
            onClick={onNext}
            aria-label="Next slide"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
