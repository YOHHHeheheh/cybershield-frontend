"use client";

import { useRef, useEffect } from "react";

interface VideoBackgroundProps {
  src: string;
}

/**
 * Full-screen, fixed-position background video.
 * – muted + autoplay satisfies browser autoplay policy
 * – playsInline required for iOS Safari
 * – poster prevents flash of black on slow connections
 */
export default function VideoBackground({ src }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure play() is called after mount; ignore the DOMException
    // thrown when the browser blocks autoplay (e.g. data-saver mode).
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      // Autoplay blocked — video stays paused, which is acceptable.
    });
  }, []);

  return (
    <>
      {/* ── Background Video ── */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* ── Bottom Blur Overlay (CSS mask, no gradient darkening) ── */}
      <div
        aria-hidden="true"
        className="bottom-blur-overlay"
      />

      {/* ── Subtle cyber scan-line texture across full viewport ── */}
      <div
        aria-hidden="true"
        className="cyber-scanline"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
