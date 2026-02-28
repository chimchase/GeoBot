"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Card } from "@/components/ui/card";
import type { SiteMap } from "@/lib/types";

interface SpiderWebProps {
  siteMap: SiteMap;
}

function scoreColor(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100;
  if (pct >= 80) return "#22c55e";
  if (pct >= 60) return "#eab308";
  if (pct >= 40) return "#f97316";
  return "#ef4444";
}

export function SpiderWeb({ siteMap }: SpiderWebProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !siteMap) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = 400;
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    interface SimNode extends d3.SimulationNodeDatum {
      id: string;
      label: string;
      score: number;
      max_score: number;
    }

    interface SimLink extends d3.SimulationLinkDatum<SimNode> {
      source: string | SimNode;
      target: string | SimNode;
    }

    const simNodes: SimNode[] = siteMap.nodes.map((n) => ({ ...n }));
    const simLinks: SimLink[] = siteMap.links.map((l) => ({
      source: l.source,
      target: l.target,
    }));

    const simulation = d3
      .forceSimulation(simNodes)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(simLinks)
      .join("line")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6);

    const node = svg
      .append("g")
      .selectAll<SVGGElement, SimNode>("g")
      .data(simNodes)
      .join("g")
      .call(
        d3
          .drag<SVGGElement, SimNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append("circle")
      .attr("r", (d) => (d.id === "home" ? 24 : 18))
      .attr("fill", (d) => scoreColor(d.score, d.max_score))
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .attr("opacity", 0.9);

    node
      .append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", (d) => (d.id === "home" ? 36 : 30))
      .attr("font-size", "11px")
      .attr("font-weight", "500")
      .attr("fill", "#64748b");

    node
      .append("text")
      .text((d) => `${d.score}`)
      .attr("text-anchor", "middle")
      .attr("dy", "4px")
      .attr("font-size", (d) => (d.id === "home" ? "12px" : "10px"))
      .attr("font-weight", "700")
      .attr("fill", "#fff");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as SimNode).x!)
        .attr("y1", (d) => (d.source as SimNode).y!)
        .attr("x2", (d) => (d.target as SimNode).x!)
        .attr("y2", (d) => (d.target as SimNode).y!);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [siteMap]);

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        Visual Site Map
      </h3>
      <p className="mb-4 text-sm text-slate-500">
        Page-level GEO scores. Node color reflects AI visibility. Drag to explore.
      </p>
      <svg ref={svgRef} className="h-[400px] w-full" />
    </Card>
  );
}
