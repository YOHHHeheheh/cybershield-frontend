"use client";

import React from "react";
import { Crosshair, Network, Zap, ShieldCheck } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="relative z-10 w-full bg-black/90 backdrop-blur-md border-t border-slate-800 py-24 px-4 sm:px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">How It Works</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            SpiderNet is built to be dead simple. Just give us a starting point, and the AI does the heavy lifting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40 mb-6">
              <Crosshair className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">1. Enter a Target</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              You upload a starting piece of evidence. This could be a <strong>Phone Number</strong>, a <strong>Bank Account</strong>, an <strong>Email</strong>, or an <strong>FIR Number</strong>. That's all you need to start.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40 mb-6">
              <Zap className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">2. Hit Initialize</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Click the 'Initialize Trace' button. SpiderNet immediately queries the massive criminal database in real-time to find exactly who that target belongs to.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/40 mb-6">
              <Network className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">3. Map the Web</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We don't just stop at the target. We instantly map out everyone they have ever called, every bank account they sent money to, and all their criminal associates out to 4 degrees of separation.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-red-500/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/40 mb-6">
              <ShieldCheck className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">4. Flag Chokepoints</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              With the map drawn, hit 'Flag Chokepoints'. Our AI highlights the critical "Middlemen" (the red nodes). If you arrest these middlemen, the entire criminal network collapses.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
