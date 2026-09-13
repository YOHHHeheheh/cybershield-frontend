"use client";

import React, { useState } from "react";
import { Search, Activity, Network, ShieldAlert, ShieldCheck, Crosshair, Loader2 } from "lucide-react";
import GraphViewer from "@/components/GraphViewer";
import VideoBackground from "@/components/VideoBackground";
import { graphApi } from "@/lib/api";
import clsx from "clsx";

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("9313090380"); // default to kingpin
  const [depth, setDepth] = useState(2);
  const [elements, setElements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<{ nodes: number; edges: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const cleanQuery = searchQuery.trim();
      const data = await graphApi.search(cleanQuery, depth);
      setElements([...data.elements.nodes, ...data.elements.edges]);
      setMeta({ nodes: data.meta.total_nodes, edges: data.meta.total_edges });
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "Failed to fetch graph");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeChokepoints = async () => {
    if (elements.length === 0) return;
    setIsLoading(true);
    try {
      // Re-construct the elements format expected by the API
      const payload = {
        nodes: elements.filter(e => !e.data.source),
        edges: elements.filter(e => e.data.source)
      };
      const data = await graphApi.analyzeChokepoints(payload);
      setElements([...data.elements.nodes, ...data.elements.edges]);
    } catch (err: any) {
      setError("Failed to run analytics");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNodeDoubleClick = async (nodeId: string) => {
    // Expand Node!
    setIsLoading(true);
    try {
      const currentIds = elements.filter(e => !e.data.source).map(n => n.data.id);
      const data = await graphApi.expandNode(nodeId, currentIds);
      
      // Append new elements
      setElements(prev => [...prev, ...data.elements.nodes, ...data.elements.edges]);
      setMeta(prev => prev ? { 
        nodes: prev.nodes + data.meta.total_nodes, 
        edges: prev.edges + data.meta.total_edges 
      } : null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-slate-200 overflow-hidden font-sans">
      
      {/* ── Liquid Glass Sidebar ── */}
      <aside className="w-80 h-full flex flex-col z-20 backdrop-blur-xl bg-slate-900/40 border-r border-slate-700/50 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50 flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <ShieldAlert className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <a href="/" className="hover:opacity-80 transition-opacity block">
              <h1 className="text-xl font-bold tracking-tight text-white">SpiderNet</h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest">LE-S Core Engine</p>
            </a>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 p-6 overflow-y-auto space-y-8">
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Seed Target</label>
              <div className="relative group">
                <Crosshair className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Phone, UPI, FIR..."
                  className="w-full bg-black/50 border border-slate-700/50 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex justify-between">
                <span>Traversal Depth</span>
                <span className="text-blue-400">{depth} Hops</span>
              </label>
              <input 
                type="range" 
                min="1" max="4" 
                value={depth} 
                onChange={(e) => setDepth(Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800 rounded-full h-1.5 appearance-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full relative group overflow-hidden rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 transition-all py-2.5 flex items-center justify-center space-x-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-blue-400" /> : <Search className="w-4 h-4 text-blue-400" />}
              <span className="text-sm font-medium text-blue-100">Initialize Trace</span>
            </button>
            {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
          </form>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

          {/* Analytics Actions */}
          <div className="space-y-4">
             <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tactical Analytics</label>
             <button 
                onClick={handleAnalyzeChokepoints}
                disabled={isLoading || elements.length === 0}
                className={clsx(
                  "w-full rounded-lg border transition-all py-2.5 flex items-center justify-center space-x-2",
                  elements.length === 0 ? "bg-slate-800/20 border-slate-700/30 text-slate-600" : "bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400 hover:border-red-400/50 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                )}
              >
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">Flag Chokepoints</span>
              </button>
          </div>

        </div>

        {/* Footer Stats */}
        <div className="p-4 border-t border-slate-700/50 bg-black/40">
           <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Nodes Captured:</span>
              <span className="font-mono text-blue-400 font-semibold">{meta?.nodes || 0}</span>
           </div>
           <div className="flex justify-between items-center text-xs mt-1">
              <span className="text-slate-500">Transactions:</span>
              <span className="font-mono text-amber-400 font-semibold">{meta?.edges || 0}</span>
           </div>
        </div>

      </aside>

      {/* ── Main Canvas ── */}
      <main className="flex-1 relative bg-black">
        
        {elements.length === 0 && !isLoading && !hasSearched ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 z-20 pointer-events-none drop-shadow-2xl">
            <Network className="w-16 h-16 mb-4 opacity-70" />
            <p className="text-sm uppercase tracking-widest font-semibold opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Awaiting Target Input</p>
          </div>
        ) : null}

        {elements.length === 0 && !isLoading && hasSearched ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-400 z-20 pointer-events-none drop-shadow-2xl bg-black/60 backdrop-blur-sm">
            <ShieldCheck className="w-20 h-20 mb-4 opacity-90 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
            <h2 className="text-2xl font-bold tracking-widest uppercase mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">Target Clean</h2>
            <p className="text-sm text-emerald-200/70 uppercase tracking-widest font-semibold max-w-md text-center">No criminal linkages found in the database for this entity. Zero nodes resolved.</p>
          </div>
        ) : null}

        <GraphViewer elements={elements} onNodeDoubleClick={handleNodeDoubleClick} />

        {/* Floating Scanner UI Element */}
        <div className="absolute top-6 right-6 z-20 flex space-x-2">
            <div className="px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-md text-[10px] uppercase tracking-widest text-emerald-400 flex items-center space-x-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span>Socket Connected</span>
            </div>
        </div>

        {/* ── Right Sidebar: Trace Results (Appears after search) ── */}
        {hasSearched && elements.length > 0 && (
          <aside className="absolute right-0 top-0 bottom-0 w-80 z-30 backdrop-blur-xl bg-slate-900/70 border-l border-slate-700/50 shadow-[-8px_0_32px_rgba(0,0,0,0.6)] animate-slide-in-right flex flex-col pointer-events-auto">
            <div className="p-6 border-b border-slate-700/50">
              <h2 className="text-lg font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Trace Complete
              </h2>
              <p className="text-xs text-slate-400 mt-2 tracking-wide">Intelligence Summary</p>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
               {/* Summary Stats */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-black/40 border border-slate-700/50 rounded-lg text-center shadow-inner">
                    <div className="text-2xl font-mono text-blue-400">{meta?.nodes || 0}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Entities</div>
                  </div>
                  <div className="p-3 bg-black/40 border border-slate-700/50 rounded-lg text-center shadow-inner">
                    <div className="text-2xl font-mono text-amber-400">
                      {elements.filter(e => e.data && e.data.type === 'Person').length}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Suspects</div>
                  </div>
               </div>

               {/* Critical Targets */}
               <div>
                 <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">High-Risk Targets</h3>
                 <div className="space-y-2">
                    {elements.filter(e => e.data && e.data.risk_level === 'CRITICAL' && !e.data.source).slice(0, 5).map(node => (
                      <div key={node.data.id} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-between">
                         <span className="text-sm font-mono text-red-100 truncate pr-2">{node.data.label}</span>
                         <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold tracking-widest uppercase rounded">Critical</span>
                      </div>
                    ))}
                    {elements.filter(e => e.data && e.data.risk_level === 'CRITICAL' && !e.data.source).length === 0 && (
                      <div className="text-xs text-slate-500 italic p-3 border border-slate-700/30 rounded-lg bg-black/20 text-center">
                        No critical targets flagged yet.<br/>Run Tactical Analytics.
                      </div>
                    )}
                 </div>
               </div>
               
               {/* Action Prompt */}
               <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                 <p className="text-xs text-blue-200/90 leading-relaxed relative z-10">
                   Double-click any node on the canvas to deeply expand its localized network, or run <strong className="text-blue-300">Tactical Analytics</strong> to identify hidden chokepoints.
                 </p>
               </div>
            </div>
          </aside>
        )}

      </main>

    </div>
  );
}
