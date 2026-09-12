import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import HowItWorks from "@/components/HowItWorks";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4";

/**
 * Root page — full-viewport hero + scrolling content.
 */
export default function Page() {
  return (
    <main
      id="cybershield-hero"
      style={{
        position: "relative",
        minHeight: "100dvh", 
        display: "flex",
        flexDirection: "column",
        background: "#000",
      }}
    >
      {/* ── First Screen (100vh) ── */}
      <div className="relative flex flex-col w-full h-[100dvh] overflow-hidden">
        {/* ── Video + overlays (z: 0, 1, 2) ── */}
        <VideoBackground src={VIDEO_URL} />

        {/* ── Navbar (z: 50) ── */}
        <Navbar />

        {/* ── Hero content (z: 10, flex-1 pushes to bottom) ── */}
        <HeroContent />
      </div>

      {/* ── Scrolling Sections ── */}
      <HowItWorks />
    </main>
  );
}
