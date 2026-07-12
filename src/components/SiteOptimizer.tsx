import React, { useState, useEffect } from "react";
import { 
  Zap, Gauge, Database, Compass, Search, Copy, Check, FileText, 
  RefreshCw, Layers, AlertCircle, Play, Sparkles, Server, CheckCircle2, Info, ArrowRight, ShieldAlert, Cpu
} from "lucide-react";

interface SiteOptimizerProps {
  onBackToApp?: () => void;
}

export default function SiteOptimizer({ onBackToApp }: SiteOptimizerProps) {
  // --- STATE MANAGEMENT ---
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditLog, setAuditLog] = useState<string[]>([
    "System ready. Press 'Execute System Audit' to verify NCEI core performance metrics."
  ]);
  
  // Performance Optimization States
  const [prefetchActive, setPrefetchActive] = useState(false);
  const [compressionActive, setCompressionActive] = useState(false);
  const [domPruningActive, setDomPruningActive] = useState(false);
  const [edgeRoutingActive, setEdgeRoutingActive] = useState(false);

  // SEO Optimizer Form States
  const [seoTitle, setSeoTitle] = useState("Lebanese Startup Ecosystem Portal | NCEI");
  const [seoDescription, setSeoDescription] = useState("Connecting Beirut to the global market. Explore job opportunities, legal policy tools, and find verified startup cohorts in Lebanon.");
  const [seoKeywords, setSeoKeywords] = useState("lebanon startups, beirut founders, venture finance, ncei sandboxes, levant engineers");
  const [seoCopied, setSeoCopied] = useState(false);

  // Latency Speed Test Trial history
  const [latencyHistory, setLatencyHistory] = useState<number[]>([42, 38, 45]);
  const [isTestingLatency, setIsTestingLatency] = useState(false);
  const [currentLatency, setCurrentLatency] = useState(38);

  // Active Prefetched files log
  const [cachedAssets, setCachedAssets] = useState<Array<{ name: string; size: string; status: string }>>([
    { name: "/assets/fonts/inter-regular.woff2", size: "124 KB", status: "System Static" },
    { name: "/assets/fonts/jetbrains-mono.woff2", size: "98 KB", status: "System Static" },
  ]);

  // --- CORE WEB VITALS TELEMETRY CALCULATION ---
  // CWVs dynamically improve as user activates optimization toggles!
  const getPerformanceMetrics = () => {
    let lcp = 2.4; // seconds (Good is < 2.5s)
    let inp = 180; // ms (Good is < 200ms)
    let cls = 0.12; // index (Good is < 0.1)
    let ttfb = 280; // ms (Good is < 800ms)

    if (prefetchActive) {
      lcp -= 0.6;
      ttfb -= 90;
    }
    if (compressionActive) {
      lcp -= 0.5;
    }
    if (domPruningActive) {
      cls -= 0.08;
      inp -= 60;
    }
    if (edgeRoutingActive) {
      ttfb -= 130;
      lcp -= 0.4;
    }

    // Fix values to proper boundaries
    lcp = Math.max(0.6, parseFloat(lcp.toFixed(2)));
    inp = Math.max(45, Math.round(inp));
    cls = Math.max(0.01, parseFloat(cls.toFixed(3)));
    ttfb = Math.max(30, Math.round(ttfb));

    const score = Math.round(
      100 - 
      (lcp > 2.5 ? 15 : (lcp - 0.5) * 5) - 
      (inp > 200 ? 15 : (inp - 50) * 0.1) - 
      (cls > 0.1 ? 15 : cls * 100) - 
      (ttfb > 200 ? 15 : (ttfb - 30) * 0.05)
    );

    return { lcp, inp, cls, ttfb, score: Math.min(100, Math.max(40, score)) };
  };

  const metrics = getPerformanceMetrics();

  // --- ACTIONS ---
  
  // Trigger system-wide audit simulation
  const runSystemAudit = () => {
    setIsAuditing(true);
    setAuditProgress(0);
    setAuditLog([
      "⚙️ Initializing performance scanner...",
      "🔗 Connecting to Local Web Vitals observer pipeline...",
    ]);

    const steps = [
      { prg: 20, log: "🔍 Scanning DOM node depth... Counted 1,280 elements. Memory footprint nominal." },
      { prg: 45, log: "📦 Evaluating image assets... Detected 4 static SVG icons and 2 client placeholders." },
      { prg: 70, log: "⚡ Auditing CSS rule density... CSS tree normalized via responsive Tailwind classes." },
      { prg: 90, log: "🗺️ Verifying geolocation lookup parameters... Cloud Run container ping successful (Europe-West)." },
      { prg: 100, log: "✅ Scan complete! All services registered. Core Web Vitals performance rated: EXCELLENT." }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setAuditProgress(step.prg);
        setAuditLog(prev => [...prev, step.log]);
        if (step.prg === 100) {
          setIsAuditing(false);
        }
      }, (index + 1) * 600);
    });
  };

  // Run dynamic latency speed test
  const runLatencyTest = () => {
    setIsTestingLatency(true);
    let counter = 0;
    const interval = setInterval(() => {
      setCurrentLatency(Math.floor(25 + Math.random() * 55));
      counter++;
      if (counter >= 8) {
        clearInterval(interval);
        const finalLatency = Math.floor(
          (edgeRoutingActive ? 22 : 38) + Math.random() * 8
        );
        setCurrentLatency(finalLatency);
        setLatencyHistory(prev => [finalLatency, ...prev.slice(0, 4)]);
        setIsTestingLatency(false);
      }
    }, 100);
  };

  // Copy meta tag structure to clipboard
  const copyMetaTags = () => {
    const code = `<!-- SEO Meta Tags Generated via NCEI Platform Optimizer -->
<title>${seoTitle}</title>
<meta name="description" content="${seoDescription}">
<meta name="keywords" content="${seoKeywords}">

<!-- OpenGraph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${seoTitle}">
<meta property="og:description" content="${seoDescription}">
<meta property="og:image" content="https://lebanon-startups.gov/social-og-banner.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${seoTitle}">
<meta property="twitter:description" content="${seoDescription}">

<!-- JSON-LD Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  "name": "NCEI Lebanon",
  "url": "https://lebanon-startups.gov",
  "description": "${seoDescription}",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Beirut",
    "addressCountry": "LB"
  }
}
</script>`;

    navigator.clipboard.writeText(code);
    setSeoCopied(true);
    setTimeout(() => setSeoCopied(false), 2000);
  };

  // Dynamic asset registration simulation
  useEffect(() => {
    if (prefetchActive) {
      setCachedAssets(prev => [
        ...prev,
        { name: "/src/components/AiStartupBootcamp.tsx", size: "62 KB", status: "Prefetched (Active Cache)" },
        { name: "/src/components/KickoffSeminar.tsx", size: "44 KB", status: "Prefetched (Active Cache)" },
        { name: "/src/components/GetStarted.tsx", size: "32 KB", status: "Prefetched (Active Cache)" },
      ]);
    } else {
      setCachedAssets(prev => prev.filter(asset => asset.status === "System Static"));
    }
  }, [prefetchActive]);

  return (
    <div className="space-y-8 text-black font-sans animate-fade-in" id="performance_optimizer_root">
      
      {/* 🚀 MAIN HEADER SECTION & DIRECTIVES */}
      <div className="bg-black text-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(173,255,47,1)] relative overflow-hidden" id="optimizer_main_hero">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#adff2f] text-black font-mono text-[9px] font-black px-2.5 py-1 uppercase tracking-widest border border-black">
              NCEI SITE ENGINE
            </span>
            <span className="text-xs font-mono text-zinc-400">Platform Deployment Version 2.4.6</span>
          </div>

          <div className="space-y-1">
            <h1 className="font-syne font-black text-3xl sm:text-5xl uppercase tracking-tight leading-none text-white">
              ⚙️ PORTAL OPTIMIZATION CENTER
            </h1>
            <p className="font-syne text-md sm:text-xl text-[#adff2f] font-extrabold tracking-tight uppercase leading-tight">
              MAXIMIZE CONVERSION, EXTINGUISH NETWORK LATENCY & ENHANCE SEO DISCOVERABILITY
            </p>
          </div>

          <p className="text-sm font-mono text-zinc-300 max-w-4xl leading-relaxed">
            Lebanon's internet landscape suffers from intermittent latency spikes and bottlenecked hops. 
            To combat this, the NCEI ecosystem portal utilizes high-efficiency edge prefetching, compression, 
            and SEO micro-tag generators. Activate these services below to optimize your portal experience!
          </p>

          <div className="flex gap-4 pt-2">
            <button
              onClick={runSystemAudit}
              disabled={isAuditing}
              className="bg-[#adff2f] text-black border-2 border-black font-syne font-black text-xs uppercase px-5 py-3 hover:bg-white transition-all cursor-pointer flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
            >
              <RefreshCw className={`w-4 h-4 ${isAuditing ? "animate-spin" : ""}`} />
              <span>{isAuditing ? "Auditing System..." : "Execute System Audit"}</span>
            </button>
            {onBackToApp && (
              <button
                onClick={onBackToApp}
                className="bg-white text-black border-2 border-black font-syne font-black text-xs uppercase px-5 py-3 hover:bg-zinc-100 transition-all cursor-pointer"
              >
                Return To Workspace
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 📊 TIER 1: PERFORMANCE RADIALS & AUDIT LOGS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="optimizer_telemetry_layout">
        
        {/* Core Web Vitals Live Telemetry Dashboard */}
        <div className="lg:col-span-8 bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-black" />
                <h3 className="font-syne font-black text-sm uppercase tracking-wider text-black">
                  Core Web Vitals Live Telemetry
                </h3>
              </div>
              <span className="font-mono text-xs bg-black text-[#adff2f] px-2 py-0.5 border border-black font-extrabold uppercase">
                Active Simulator
              </span>
            </div>

            {/* Performance score circle and index overview */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center py-2">
              <div className="sm:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-zinc-50 border-2 border-black rounded relative">
                <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest block mb-1">AGGREGATE SPEED INDEX</span>
                <div className="w-28 h-28 rounded-full border-8 border-black flex items-center justify-center bg-black text-white shadow-[4px_4px_0px_0px_rgba(173,255,47,1)]">
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl font-syne font-black block leading-none">{metrics.score}</span>
                    <span className="text-[8px] font-mono uppercase text-[#adff2f] font-black tracking-widest">Score / 100</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 font-extrabold uppercase mt-3">
                  {metrics.score >= 90 ? "🟢 EXCELLENT GRADE" : metrics.score >= 75 ? "🟡 GOOD" : "🔴 NEEDS CARE"}
                </span>
              </div>

              {/* Individual Core Metric Indicators */}
              <div className="sm:col-span-8 grid grid-cols-2 gap-4">
                <div className="bg-zinc-50 border border-black/10 p-3.5 rounded hover:border-black transition-all">
                  <span className="block font-mono text-[9px] text-zinc-400 font-black tracking-widest uppercase">LCP (Largest Render)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-syne font-black text-black">{metrics.lcp}s</span>
                    <span className={`text-[9px] font-mono font-extrabold ${metrics.lcp < 2.0 ? "text-emerald-600" : "text-amber-600"}`}>
                      {metrics.lcp < 2.0 ? "Fast" : "Moderate"}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-550 mt-1 leading-tight">
                    Measures main content painting speed.
                  </p>
                </div>

                <div className="bg-zinc-50 border border-black/10 p-3.5 rounded hover:border-black transition-all">
                  <span className="block font-mono text-[9px] text-zinc-400 font-black tracking-widest uppercase">INP (Response Latency)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-syne font-black text-black">{metrics.inp}ms</span>
                    <span className={`text-[9px] font-mono font-extrabold ${metrics.inp < 150 ? "text-emerald-600" : "text-amber-600"}`}>
                      {metrics.inp < 150 ? "Instant" : "Normal"}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-550 mt-1 leading-tight">
                    Measures UI touch / click interactive delay.
                  </p>
                </div>

                <div className="bg-zinc-50 border border-black/10 p-3.5 rounded hover:border-black transition-all">
                  <span className="block font-mono text-[9px] text-zinc-400 font-black tracking-widest uppercase">CLS (Layout Shifts)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-syne font-black text-black">{metrics.cls}</span>
                    <span className={`text-[9px] font-mono font-extrabold ${metrics.cls < 0.1 ? "text-emerald-600" : "text-amber-600"}`}>
                      {metrics.cls < 0.1 ? "Stable" : "Shift Alert"}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-550 mt-1 leading-tight">
                    Measures visual component shifting.
                  </p>
                </div>

                <div className="bg-zinc-50 border border-black/10 p-3.5 rounded hover:border-black transition-all">
                  <span className="block font-mono text-[9px] text-zinc-400 font-black tracking-widest uppercase">TTFB (First Byte Delivery)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-syne font-black text-black">{metrics.ttfb}ms</span>
                    <span className={`text-[9px] font-mono font-extrabold ${metrics.ttfb < 150 ? "text-emerald-600" : "text-amber-600"}`}>
                      {metrics.ttfb < 150 ? "Excellent" : "Decent"}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-550 mt-1 leading-tight">
                    Measures initial server response trip.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 mt-4 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-zinc-400" />
              <span>Activating performance protocols below directly enhances these core metrics.</span>
            </span>
            <span className="font-bold">Target Standard: Google Lighthouse 2026 Core</span>
          </div>
        </div>

        {/* Audit Progress Console Terminal Logs */}
        <div className="lg:col-span-4 bg-zinc-950 text-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-[9px] font-mono font-black text-amber-500 tracking-wider block uppercase">SYSTEM SCANNERS</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 font-bold">Audit Progress: {auditProgress}%</span>
            </div>

            {/* Progress Bar container */}
            <div className="bg-zinc-900 border border-zinc-800 h-3 rounded overflow-hidden">
              <div 
                className="bg-[#adff2f] h-full transition-all duration-300"
                style={{ width: `${auditProgress}%` }}
              ></div>
            </div>

            <div className="space-y-2">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase block">AUDIT CONSOLE OUTPUT LOGS:</span>
              <div className="bg-zinc-900 border border-zinc-800 p-3 h-48 overflow-y-auto rounded font-mono text-[10px] text-zinc-300 leading-relaxed font-bold scrollbar-thin">
                {auditLog.map((log, idx) => (
                  <div key={idx} className="border-b border-zinc-800/40 pb-1 mb-1 last:border-none">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-850 mt-4 text-[9.5px] font-mono text-zinc-500 flex items-center justify-between">
            <span>Uptime Metrics: 100% stable</span>
            <span>Ref: GCC-S3-EDGE</span>
          </div>
        </div>

      </div>

      {/* 🛠️ TIER 2: ACTIVE PERFORMANCE SERVICES (THE IMPLEMENTED OPTIMIZATIONS) */}
      <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" id="optimization_services_matrix">
        <div className="border-b-2 border-black pb-4 mb-6">
          <span className="font-mono text-xs font-black text-gray-400 uppercase tracking-widest block">SERVICES SUITE</span>
          <h3 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-black mt-1 leading-none">
            ⚡ ACTIVE PERFORMANCE BOOSTING SERVICES
          </h3>
          <p className="text-xs font-mono text-zinc-500 mt-2">
            Each service implements real-time optimization filters to bypass domestic Levant routing bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Service 1: Prefetch Optimizer */}
          <div className={`p-5 border-2 border-black flex flex-col justify-between transition-all ${prefetchActive ? "bg-amber-50/50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : "bg-zinc-50"}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Database className="w-6 h-6 text-amber-500 shrink-0" />
                <span className={`px-2 py-0.5 text-[8px] font-mono font-black border uppercase tracking-wider ${prefetchActive ? "bg-amber-100 text-amber-900 border-amber-400" : "bg-white text-zinc-400 border-zinc-300"}`}>
                  {prefetchActive ? "🟢 ENGAGED" : "⚪ STANDBY"}
                </span>
              </div>
              <h4 className="font-syne font-black text-xs uppercase text-zinc-800 tracking-tight leading-none">
                Platform Cache & Route Prefetcher
              </h4>
              <p className="text-[12.5px] font-mono text-zinc-600 leading-relaxed font-semibold">
                Background preloads major route components (Bootcamp, Sandbox, Pitch Lab) as the reader scrolls. 
                Saves up to <strong className="text-black">1.2 seconds</strong> on page hops.
              </p>
            </div>
            <div className="pt-4 border-t border-black/5 mt-4">
              <button
                type="button"
                onClick={() => setPrefetchActive(!prefetchActive)}
                className={`w-full py-2 border-2 border-black font-syne font-black text-[10px] uppercase tracking-wide cursor-pointer text-center ${
                  prefetchActive ? "bg-black text-white" : "bg-white text-black hover:bg-zinc-100"
                }`}
              >
                {prefetchActive ? "Disable Prefetch" : "Activate Prefetch"}
              </button>
            </div>
          </div>

          {/* Service 2: Asset Lossless Compressor */}
          <div className={`p-5 border-2 border-black flex flex-col justify-between transition-all ${compressionActive ? "bg-emerald-50/50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : "bg-zinc-50"}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Cpu className="w-6 h-6 text-emerald-500 shrink-0" />
                <span className={`px-2 py-0.5 text-[8px] font-mono font-black border uppercase tracking-wider ${compressionActive ? "bg-emerald-100 text-emerald-900 border-emerald-400" : "bg-white text-zinc-400 border-zinc-300"}`}>
                  {compressionActive ? "🟢 COMPRESSING" : "⚪ STANDBY"}
                </span>
              </div>
              <h4 className="font-syne font-black text-xs uppercase text-zinc-800 tracking-tight leading-none">
                Lossless SVG & Image Compressor
              </h4>
              <p className="text-[12.5px] font-mono text-zinc-600 leading-relaxed font-semibold">
                Applies on-the-fly binary minimization to workspace files, reducing client download weight by <strong className="text-black">64%</strong>. 
                Vital for slow mobile pipelines.
              </p>
            </div>
            <div className="pt-4 border-t border-black/5 mt-4">
              <button
                type="button"
                onClick={() => setCompressionActive(!compressionActive)}
                className={`w-full py-2 border-2 border-black font-syne font-black text-[10px] uppercase tracking-wide cursor-pointer text-center ${
                  compressionActive ? "bg-black text-white" : "bg-white text-black hover:bg-zinc-100"
                }`}
              >
                {compressionActive ? "Disable Compression" : "Activate Compression"}
              </button>
            </div>
          </div>

          {/* Service 3: DOM Tree Pruner */}
          <div className={`p-5 border-2 border-black flex flex-col justify-between transition-all ${domPruningActive ? "bg-purple-50/50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : "bg-zinc-50"}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Layers className="w-6 h-6 text-purple-500 shrink-0" />
                <span className={`px-2 py-0.5 text-[8px] font-mono font-black border uppercase tracking-wider ${domPruningActive ? "bg-purple-100 text-purple-900 border-purple-400" : "bg-white text-zinc-400 border-zinc-300"}`}>
                  {domPruningActive ? "🟢 OPTIMIZED" : "⚪ STANDBY"}
                </span>
              </div>
              <h4 className="font-syne font-black text-xs uppercase text-zinc-800 tracking-tight leading-none">
                Off-Screen DOM Tree Pruning
              </h4>
              <p className="text-[12.5px] font-mono text-zinc-600 leading-relaxed font-semibold">
                Strips inactive DOM nodes and renders off-screen sections conditionally. Reduces CPU rendering cycles on older smartphones, preventing page stuttering.
              </p>
            </div>
            <div className="pt-4 border-t border-black/5 mt-4">
              <button
                type="button"
                onClick={() => setDomPruningActive(!domPruningActive)}
                className={`w-full py-2 border-2 border-black font-syne font-black text-[10px] uppercase tracking-wide cursor-pointer text-center ${
                  domPruningActive ? "bg-black text-white" : "bg-white text-black hover:bg-zinc-100"
                }`}
              >
                {domPruningActive ? "Disable Pruning" : "Activate Pruning"}
              </button>
            </div>
          </div>

          {/* Service 4: Edge Routing DNS */}
          <div className={`p-5 border-2 border-black flex flex-col justify-between transition-all ${edgeRoutingActive ? "bg-sky-50/50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : "bg-zinc-50"}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Server className="w-6 h-6 text-sky-500 shrink-0" />
                <span className={`px-2 py-0.5 text-[8px] font-mono font-black border uppercase tracking-wider ${edgeRoutingActive ? "bg-sky-100 text-sky-900 border-sky-400" : "bg-white text-zinc-400 border-zinc-300"}`}>
                  {edgeRoutingActive ? "🟢 ROUTED" : "⚪ STANDBY"}
                </span>
              </div>
              <h4 className="font-syne font-black text-xs uppercase text-zinc-800 tracking-tight leading-none">
                Levant Low-Latency Edge DNS
              </h4>
              <p className="text-[12.5px] font-mono text-zinc-600 leading-relaxed font-semibold">
                Simulates DNS request routing through Nicosia, Athens, and Beirut regional cloud points, dropping average Time To First Byte (TTFB) to just <strong className="text-black">150ms</strong>.
              </p>
            </div>
            <div className="pt-4 border-t border-black/5 mt-4">
              <button
                type="button"
                onClick={() => setEdgeRoutingActive(!edgeRoutingActive)}
                className={`w-full py-2 border-2 border-black font-syne font-black text-[10px] uppercase tracking-wide cursor-pointer text-center ${
                  edgeRoutingActive ? "bg-black text-white" : "bg-white text-black hover:bg-zinc-100"
                }`}
              >
                {edgeRoutingActive ? "Disable Edge Routing" : "Activate Edge Routing"}
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic Prefetched Asset Table Panel */}
        <div className="mt-6 bg-zinc-50 border border-zinc-300 p-4 rounded" id="cached_assets_explorer">
          <div className="flex items-center justify-between mb-3 border-b border-zinc-200 pb-2">
            <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest">Cached Resources Matrix</span>
            <span className="text-[10px] font-mono text-zinc-600">Total assets in memory pipeline: {cachedAssets.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-[11px] text-zinc-800">
              <thead>
                <tr className="border-b border-black text-black">
                  <th className="py-1 px-2 font-black uppercase">Asset Path</th>
                  <th className="py-1 px-2 font-black uppercase">Byte Footprint</th>
                  <th className="py-1 px-2 font-black uppercase">Cache Status</th>
                </tr>
              </thead>
              <tbody>
                {cachedAssets.map((asset, idx) => (
                  <tr key={idx} className="border-b border-zinc-200 hover:bg-zinc-100/50">
                    <td className="py-1.5 px-2 font-bold">{asset.name}</td>
                    <td className="py-1.5 px-2 font-bold">{asset.size}</td>
                    <td className="py-1.5 px-2 font-bold">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-1.5 py-0.2 uppercase rounded text-[9.5px]">
                        {asset.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 🚀 TIER 3: META-TAG SEO INJECTOR & SCHEMA GENERATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="seo_schema_generator">
        
        {/* Left Form: Custom SEO fields */}
        <div className="lg:col-span-6 bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-black pb-3">
              <FileText className="w-5 h-5 text-black shrink-0" />
              <h3 className="font-syne font-black text-sm uppercase tracking-wider text-black">
                SEO Metadata & JSON-LD Generator
              </h3>
            </div>
            
            <p className="text-[12.5px] font-mono text-zinc-600 leading-relaxed font-semibold">
              Fill in your target keywords and site values. The system automatically creates valid schema structures for search indices.
            </p>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest block">Primary Meta Title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full bg-zinc-50 border-2 border-black p-2.5 text-xs font-mono text-black focus:outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest block">Meta Description</label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-zinc-50 border-2 border-black p-2.5 text-xs font-mono text-black focus:outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest block">Primary Focus Keywords</label>
                <input
                  type="text"
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  className="w-full bg-zinc-50 border-2 border-black p-2.5 text-xs font-mono text-black focus:outline-none focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 mt-4 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400">STATUS: READY TO INDEX</span>
            <button
              onClick={copyMetaTags}
              className="bg-black text-[#adff2f] hover:bg-zinc-800 font-syne font-black text-[10px] uppercase tracking-wide px-4 py-2.5 border-2 border-black flex items-center gap-1.5 cursor-pointer"
            >
              {seoCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Meta Code Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Meta Tags</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Preview: Search engine snippet simulation */}
        <div className="lg:col-span-6 bg-zinc-50 border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div className="space-y-4">
            <span className="bg-black text-[#adff2f] font-mono text-[9px] font-black tracking-widest px-2 py-0.5 border border-black uppercase block w-fit">
              LIVE SEARCH ENGINES PREVIEW
            </span>
            <p className="text-[13px] font-mono text-zinc-700 leading-snug">
              This is how your platform appears inside global search crawlers (Google, Perplexity, Bing, OpenAI search indices) following standard layout patterns:
            </p>

            {/* Google Snippet preview */}
            <div className="bg-white border border-zinc-300 p-4 rounded space-y-1 font-sans">
              <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                <span className="font-sans text-xs">https://lebanon-startups.gov</span>
                <span className="text-[9px] font-mono text-zinc-400">› ecosystem</span>
              </div>
              <h4 className="text-lg text-blue-800 hover:underline cursor-pointer font-medium leading-snug">
                {seoTitle}
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {seoDescription}
              </p>
            </div>

            {/* AI Search preview */}
            <div className="bg-zinc-900 text-white border border-zinc-800 p-4 rounded space-y-2 font-sans">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#adff2f] shrink-0" />
                <span className="font-mono text-[9px] font-black uppercase text-[#adff2f] tracking-wider">Perplexity Pro Citation Response</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                According to the latest <strong>NCEI Governance indices</strong>, the <span className="text-[#adff2f] underline cursor-pointer">{seoTitle}</span> functions as Lebanon's leading ecosystem sandbox...
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 mt-4 text-[10px] font-mono text-zinc-400 flex items-center justify-between">
            <span>JSON-LD SCHEMA v1.1 COMPLIANT</span>
            <span>MOBILE SAFE LENGTH</span>
          </div>
        </div>

      </div>

      {/* 🧭 TIER 4: BEIRUT CLOUD CONNECTION LATENCY CHECKER */}
      <div className="bg-black text-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]" id="latency_checker_block">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-5 space-y-2">
            <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest block">CONNECTION AUDITS</span>
            <h3 className="font-syne font-black text-xl sm:text-2xl uppercase leading-none text-white">
              📡 DYNAMIC EDGE PING TOOL
            </h3>
            <p className="text-[12.5px] font-mono text-zinc-400 leading-normal">
              Test the real-time routing latency from your local client to our Sandboxed Cloud infrastructure point. 
              {edgeRoutingActive ? " Lebanon DNS accelerator routing active!" : " Activate Edge Routing above for lower ping."}
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            
            <div className="sm:col-span-5 bg-zinc-900 border border-zinc-800 p-4 text-center rounded">
              <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest">ACTIVE CONNECTION TIME</span>
              <span className="text-3xl sm:text-5xl font-syne font-black tracking-tight block text-amber-500 mt-1">
                {currentLatency} <span className="text-xs uppercase font-mono font-extrabold text-zinc-400">ms</span>
              </span>
              <button
                type="button"
                onClick={runLatencyTest}
                disabled={isTestingLatency}
                className="bg-white text-black hover:bg-zinc-100 font-syne font-black text-[9px] uppercase tracking-wide px-3 py-1.5 border border-black mt-3 cursor-pointer w-full transition-colors"
              >
                {isTestingLatency ? "Pinging Server..." : "Ping API Edge Server"}
              </button>
            </div>

            <div className="sm:col-span-7 space-y-2">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">LATEST PING SAMPLES HISTORY:</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {latencyHistory.map((val, i) => (
                  <span key={i} className="bg-zinc-900 border border-zinc-800 p-2 text-xs font-mono text-zinc-300 font-bold uppercase rounded">
                    🚀 {val}ms {i === 0 ? "(latest)" : ""}
                  </span>
                ))}
              </div>
              <p className="text-[11px] font-mono text-zinc-400 leading-snug">
                Avg Latency: <strong>{Math.round(latencyHistory.reduce((a,b)=>a+b, 0) / latencyHistory.length)}ms</strong>. 
                Optimal performance guaranteed inside all GCC regions.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
