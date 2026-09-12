"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const CytoscapeComponent = dynamic(() => import("react-cytoscapejs"), { ssr: false });
import cytoscape from "cytoscape";

interface GraphViewerProps {
  elements: any[];
  onNodeDoubleClick?: (nodeId: string) => void;
}

export default function GraphViewer({ elements, onNodeDoubleClick }: GraphViewerProps) {
  const cyRef = useRef<cytoscape.Core | null>(null);

  const stylesheet: cytoscape.Stylesheet[] = [
    {
      selector: "node",
      style: {
        "background-color": "#111827",
        "border-width": 2,
        "border-color": "#0ea5e9", // neon blue
        "label": "data(label)",
        "color": "#e2e8f0",
        "font-size": 10,
        "font-family": "Inter, sans-serif",
        "text-valign": "bottom",
        "text-halign": "center",
        "text-margin-y": 6,
        "shape": "ellipse",
        "width": 30,
        "height": 30,
      } as any,
    },
    {
      selector: "node[type = 'Person']",
      style: {
        "border-color": "#f59e0b", // amber
        "shape": "hexagon",
        "width": 40,
        "height": 40,
      } as any,
    },
    {
      selector: "node[risk_level = 'CRITICAL']",
      style: {
        "border-color": "#ef4444", // neon red for chokepoints
        "background-color": "#450a0a",
        "border-width": 3,
        "width": 45,
        "height": 45,
      } as any,
    },
    {
      selector: "edge",
      style: {
        "width": 1.5,
        "line-color": "#334155",
        "target-arrow-color": "#334155",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
        "opacity": 0.6,
      } as any,
    },
    {
      selector: "edge[label = 'TRANSFERRED_FUNDS']",
      style: {
        "line-color": "#10b981", // green for money
        "target-arrow-color": "#10b981",
        "opacity": 0.8,
      } as any,
    },
    {
      selector: ":selected",
      style: {
        "border-color": "#facc15",
        "border-width": 4,
      } as any,
    }
  ];

  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current;
      
      // Re-run layout when elements change
      cy.layout({
        name: "cose",
        animate: true,
        animationDuration: 800,
        nodeRepulsion: () => 4000,
        idealEdgeLength: () => 60,
        edgeElasticity: () => 0.1,
      }).run();

      // Setup event listeners once
      cy.on('dblclick', 'node', (evt) => {
        const node = evt.target;
        if (onNodeDoubleClick) {
          onNodeDoubleClick(node.id());
        }
      });
    }
  }, [elements, onNodeDoubleClick]);

  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 z-10">
        <CytoscapeComponent
          elements={elements}
          stylesheet={stylesheet}
          style={{ width: "100%", height: "100%" }}
          cy={(cy) => { cyRef.current = cy; }}
          wheelSensitivity={0.2}
        />
      </div>
    </div>
  );
}
