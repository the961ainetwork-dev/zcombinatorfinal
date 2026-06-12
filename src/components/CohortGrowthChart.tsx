import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Startup } from "../types";
import { TrendingUp, Users, Calendar, ArrowUpRight } from "lucide-react";

interface CohortGrowthChartProps {
  startups: Startup[];
}

interface ChartDataPoint {
  month: string;
  count: number;
  label: string;
}

export default function CohortGrowthChart({ startups }: CohortGrowthChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 260 });
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number } | null>(null);

  // Setup responsive observer
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width } = entries[0].contentRect;
      // Maintain an elegant proportional height, capping width at comfortable container sizes
      setDimensions({
        width: Math.max(width, 280),
        height: 250,
      });
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Compute monthly cohort data
  // Baseline static registrations + real-time additions to June 2026 cohort
  const chartData: ChartDataPoint[] = [
    { month: "Jan 2026", count: 12, label: "Jan Cohort" },
    { month: "Feb 2026", count: 19, label: "Feb Cohort" },
    { month: "Mar 2026", count: 15, label: "Mar Cohort" },
    { month: "Apr 2026", count: 27, label: "Apr Cohort" },
    { month: "May 2026", count: 34, label: "May Cohort" },
    { month: "Jun 2026", count: 41 + startups.length, label: "June (Active) Cohort" },
  ];

  // Total ecosystem registration count
  const totalRegistrations = chartData.reduce((acc, curr) => acc + curr.count, 0);
  const activeMonthCount = chartData[chartData.length - 1].count;
  const previousMonthCount = chartData[chartData.length - 2].count;
  const growthRate = (((activeMonthCount - previousMonthCount) / previousMonthCount) * 100).toFixed(1);

  // SVG parameters
  const margin = { top: 25, right: 35, bottom: 40, left: 45 };
  const width = dimensions.width;
  const height = dimensions.height;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // D3 Scales matching the theme
  const xScale = d3
    .scalePoint()
    .domain(chartData.map((d) => d.month))
    .range([0, innerWidth]);

  const maxVal = d3.max(chartData, (d) => d.count) || 50;
  const yScale = d3
    .scaleLinear()
    .domain([0, Math.ceil(maxVal * 1.15)])
    .range([innerHeight, 0]);

  // Line Generator
  const lineGenerator = d3
    .line<ChartDataPoint>()
    .x((d) => xScale(d.month) || 0)
    .y((d) => yScale(d.count))
    .curve(d3.curveMonotoneX);

  // Path definitions for line
  const linePath = lineGenerator(chartData) || "";

  // Grid tick counts
  const yTicks = yScale.ticks(5);

  return (
    <div className="border-4 border-black bg-white dark:bg-zinc-950 p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.95)] transition-all flex flex-col md:flex-row gap-6 items-stretch" id="cohort_registrations_analytics">
      {/* Left Column: Stats Cards */}
      <div className="flex flex-row md:flex-col justify-between md:justify-center gap-4 shrink-0 w-full md:w-52 border-b-2 md:border-b-0 md:border-r-2 border-black pb-4 md:pb-0 md:pr-4">
        <div className="space-y-1 text-left flex-1 md:flex-none">
          <span className="bg-orange-600 text-white font-mono text-[8px] font-black uppercase px-1.5 py-0.5 rounded-none border border-black inline-block tracking-wider">
            ANALYTICS ENGINE
          </span>
          <h4 className="font-syne font-black text-sm uppercase text-black dark:text-white mt-1">
            Cohort Registrations
          </h4>
          <p className="text-[10px] font-mono text-zinc-500 uppercase">
            Trajectory & growth multipliers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 flex-1 md:flex-none mt-2">
          {/* Stat 1 */}
          <div className="bg-neutral-50 dark:bg-zinc-905 p-3 border-2 border-black bento-shadow-sm flex items-center gap-3">
            <div className="p-1.5 bg-orange-100 dark:bg-zinc-800 border border-black">
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <span className="block text-[8px] font-mono text-zinc-500 uppercase font-black leading-none">
                GROWTH TREND
              </span>
              <span className="text-sm font-black font-syne text-black dark:text-white flex items-center gap-1">
                +{growthRate}% <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-neutral-50 dark:bg-zinc-905 p-3 border-2 border-black bento-shadow-sm flex items-center gap-3">
            <div className="p-1.5 bg-orange-100 dark:bg-zinc-800 border border-black">
              <Users className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <span className="block text-[8px] font-mono text-zinc-500 uppercase font-black leading-none">
                CUMULATIVE BUILDERS
              </span>
              <span className="text-sm font-black font-mono text-orange-600">
                {totalRegistrations} UNITS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Interactive D3 SVG Line Chart */}
      <div ref={containerRef} className="relative flex-1 min-h-[250px] w-full mt-2 md:mt-0" id="registration_chart_stage">
        <svg
          width={width}
          height={height}
          className="overflow-visible select-none pointer-events-auto"
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Background horizontal grid lines */}
            {yTicks.map((tickValue) => (
              <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
                <line
                  x1={0}
                  x2={innerWidth}
                  className="stroke-zinc-200 dark:stroke-zinc-800"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
                <text
                  x={-10}
                  dy="0.32em"
                  className="fill-zinc-500 font-mono text-[9px] text-right font-black"
                  textAnchor="end"
                >
                  {tickValue}
                </text>
              </g>
            ))}

            {/* X Axis vertical lines */}
            {chartData.map((d) => {
              const xValue = xScale(d.month) || 0;
              return (
                <g key={d.month} transform={`translate(${xValue}, 0)`}>
                  <line
                    y1={0}
                    y2={innerHeight}
                    className="stroke-zinc-200 dark:stroke-zinc-800"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                  <text
                    y={innerHeight + 18}
                    dy="0.32em"
                    className="fill-zinc-650 dark:fill-zinc-350 font-mono text-[9px] font-black uppercase"
                    textAnchor="middle"
                  >
                    {d.month.split(" ")[0]}
                  </text>
                </g>
              );
            })}

            {/* Left and Bottom Axis Borders */}
            <line
              x1={0}
              y1={innerHeight}
              x2={innerWidth}
              y2={innerHeight}
              className="stroke-black dark:stroke-white"
              strokeWidth={2}
            />
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={innerHeight}
              className="stroke-black dark:stroke-white"
              strokeWidth={2}
            />

            {/* Glowing / Bold stroke underlay for the Trend Line */}
            <path
              d={linePath}
              className="fill-none stroke-orange-600/20"
              strokeWidth={8}
            />

            {/* The main Neobrutalist line */}
            <path
              d={linePath}
              className="fill-none stroke-orange-600 dark:stroke-orange-500"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Nodes / Data Points */}
            {chartData.map((d, index) => {
              const cx = xScale(d.month) || 0;
              const cy = yScale(d.count);
              const isHovered = hoveredPoint?.month === d.month;
              const isLastNode = index === chartData.length - 1;

              return (
                <g key={d.month} className="cursor-pointer">
                  {/* Outer glowing pulsing ring for active last node or hovered node */}
                  {(isLastNode || isHovered) && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 12 : 8}
                      className="fill-orange-600/10 stroke-orange-600/30 dark:stroke-orange-500/30 animate-pulse"
                      strokeWidth={1.5}
                    />
                  )}

                  {/* Neobrutalist outline circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 7 : 5}
                    className="fill-white dark:fill-black stroke-black dark:stroke-white"
                    strokeWidth={2}
                  />

                  {/* Inner neon core dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 4 : 2}
                    className="fill-orange-600 dark:fill-orange-500"
                  />

                  {/* Tooltip intercept zone */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={24}
                    className="fill-transparent stroke-none cursor-pointer"
                    onMouseEnter={(e) => {
                      setHoveredPoint(d);
                      const rect = e.currentTarget.getBoundingClientRect();
                      const parentRect = containerRef.current?.getBoundingClientRect();
                      if (parentRect) {
                        setHoverCoords({
                          x: rect.left - parentRect.left + rect.width / 2,
                          y: rect.top - parentRect.top - 55,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredPoint(null);
                      setHoverCoords(null);
                    }}
                  />
                </g>
              );
            })}
          </g>
        </svg>

        {/* Dynamic Neobrutalist Hover Tooltip */}
        {hoveredPoint && hoverCoords && (
          <div
            className="absolute z-10 pointer-events-none transform -translate-x-1/2 p-2 bg-black text-white border-2 border-white dark:border-black shadow-[3px_3px_0px_0px_rgba(255,102,0,1)] text-[10px] uppercase font-mono rounded-none"
            style={{ left: hoverCoords.x, top: hoverCoords.y }}
            id="chart_tooltip_bubble"
          >
            <div className="font-bold flex items-center gap-1.5 border-b border-zinc-700 pb-1 mb-1 text-orange-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{hoveredPoint.label}</span>
            </div>
            <div className="flex items-center gap-2 font-black text-xs text-white">
              <span>{hoveredPoint.count} Registered</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
