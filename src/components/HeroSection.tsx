import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Cpu, Lock, Award, ChevronLeft, ChevronRight, Activity, TrendingUp, Sparkles, FolderKanban } from "lucide-react";

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = 5;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 9000); // Cycle every 9 seconds
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div 
      className="bg-black text-white border-4 border-black relative overflow-hidden flex flex-col justify-between mb-8 select-none"
      id="hero_up_section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Subtle Accent Grids (Swiss/Editorial styling) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-difference z-0">
        <div className="w-full h-full border-r border-b border-white grid grid-cols-6 grid-rows-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-t border-l border-white"></div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSlide === 0 && (
          <motion.div
            key="slide0"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-10 lg:p-12 relative z-10 w-full min-h-[460px] flex items-center bg-black overflow-hidden"
            id="hero_slide_combinator_premium"
          >
            {/* Background Subtle Column Grid Dividers matching the uploaded design */}
            <div className="absolute inset-0 grid grid-cols-6 pointer-events-none z-0 divide-x divide-zinc-900/50 opacity-60">
              <div></div><div></div><div></div><div></div><div></div><div></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full relative z-10">
              {/* LEFT COLUMN: Large stark overlapping typography */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full select-none text-left" id="hero_left_stack_premium">
                <div className="space-y-0 tracking-tighter leading-none font-black text-white">
                  <div className="text-7xl md:text-8xl xl:text-[8.5rem] font-syne uppercase select-none opacity-95" style={{ letterSpacing: "-0.05em" }}>
                    Z961
                  </div>
                  <div className="text-6xl md:text-7xl xl:text-[6.5rem] font-serif font-light tracking-normal italic text-white/95 select-none -mt-4">
                    COMB
                  </div>
                  <div className="text-7xl md:text-8xl xl:text-[8.5rem] font-syne uppercase select-none opacity-95 -mt-4" style={{ letterSpacing: "-0.05em" }}>
                    Z961
                  </div>
                  <div className="text-5xl md:text-6xl xl:text-[5.5rem] font-serif tracking-normal leading-[0.9] select-none font-bold uppercase text-white -mt-1">
                    COMBINATOR
                  </div>
                </div>

                <div className="mt-8 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-zinc-400 font-extrabold" id="investments_caption">
                  WHERE INNOVATION MEETS INVESTMENTS
                </div>
              </div>

              {/* CENTER COLUMN: Interactive 3D cad mechanical engine tablet graphics */}
              <div className="lg:col-span-3 flex items-center justify-center relative py-4 lg:py-0" id="hero_center_image_premium_container">
                <div className="w-full max-w-[240px] lg:max-w-none bg-zinc-950 border border-zinc-800 p-2 shadow-[0px_0px_30px_rgba(255,255,255,0.03)] relative overflow-visible">
                  
                  {/* Outer Frame Border matching CAD tablet */}
                  <div className="border border-white/20 p-1 bg-black aspect-[3/4] relative w-full overflow-hidden flex items-center justify-center">
                    
                    {/* Tablet CAD Screen Image */}
                    <img
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                      alt="961 Combinator Engine CAD tablet"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale opacity-80 contrast-125"
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-black/35 pointer-events-none mix-blend-multiply"></div>

                    {/* Blue Tech Grid overlay */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

                    {/* Active Screen Frame Info Overlay */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center text-[7.5px] font-mono text-cyan-400 font-extrabold uppercase tracking-wider z-15 bg-black/80 px-2 py-1 border border-cyan-950">
                      <span>ENGINE MODE: ONLINE</span>
                      <span>SECURE SANDBOX</span>
                    </div>
                  </div>

                  {/* HIGH FIDELITY NEON BLUE FLOATING CAD TAGS OVERLAY */}
                  {/* Torque Equation Tag (Left overlay pointing to engine) */}
                  <div className="absolute top-10 -left-12 z-20 hidden sm:flex items-center" id="cad_overlay_torque">
                    <div className="bg-zinc-950/95 border border-cyan-500/50 px-2 py-1 text-[8.5px] font-mono text-cyan-400 font-bold uppercase shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                      TORQUE = r × F
                    </div>
                    {/* Connecting line */}
                    <div className="w-6 h-[1px] bg-cyan-500/70 border-t border-dashed border-cyan-400/50"></div>
                  </div>

                  {/* Acceleration Equation Tag (Bottom-left overlay pointing to screen data) */}
                  <div className="absolute bottom-16 -left-14 z-20 hidden sm:flex flex-col items-end" id="cad_overlay_acceleration">
                    <div className="bg-zinc-950/95 border border-cyan-500/50 px-2 py-1 text-[8px] font-mono text-cyan-400 font-bold uppercase shadow-[0_2px_10px_rgba(0,0,0,0.5)] space-y-0.5">
                      <div>F = m a</div>
                      <div className="text-[7px] text-cyan-500 font-medium">F = m · dv / dt</div>
                    </div>
                    {/* Angled leader line */}
                    <svg className="w-8 h-4 text-cyan-400/70 overflow-visible" viewBox="0 0 32 16">
                      <line x1="32" y1="0" x2="16" y2="16" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="16" y1="16" x2="0" y2="16" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Editorial summary & link */}
              <div className="lg:col-span-4 flex flex-col justify-center h-full pt-4 lg:pt-0 text-left relative" id="hero_right_editorial_premium">
                <div className="space-y-6 max-w-sm">
                  <h3 className="font-serif italic text-xl md:text-2xl text-white tracking-wide leading-tight">
                    961 Combinator: Fusion of Data and Form
                  </h3>
                  
                  <div className="h-[1.5px] bg-zinc-800 w-full"></div>
                  
                  <div className="space-y-4">
                    <p className="text-[11px] md:text-xs text-zinc-400 leading-relaxed font-sans font-medium text-justify normal-case">
                      Algorithmic synthesis and procedural generation are the core principles of the 961 Combinator. The system leverages advanced artificial intelligence models and micro-operational frameworks to blend functional elegance with persistent offshore capital.
                    </p>
                    
                    <p className="text-[11px] md:text-xs text-zinc-400 leading-relaxed font-sans font-medium text-justify normal-case">
                      Our dedication to robust execution informs every single combination, creating a new borderless language of design and financial sovereignty for Lebanon’s premium tech-builders.
                    </p>
                  </div>

                  <div className="pt-2">
                    <a 
                      href="#dropdown_z961_menu_container"
                      className="inline-flex items-center gap-2 text-[10px] font-mono font-black tracking-[0.2em] uppercase text-white hover:text-orange-400 transition-all hover:translate-x-1"
                    >
                      LEARN MORE <span className="text-sm font-sans">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* BIG SPINNING 8-POINT ROTATOR STAR AT THE BOTTOM RIGHT OF CONTAINER */}
            <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-10 shrink-0 hidden md:block" id="spinning_accent_star">
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-white animate-[spin_30s_linear_infinite]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="10" strokeLinecap="square" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="white" strokeWidth="10" strokeLinecap="square" />
                <line x1="21.72" y1="21.72" x2="78.28" y2="78.28" stroke="white" strokeWidth="10" strokeLinecap="square" />
                <line x1="21.72" y1="78.28" x2="78.28" y2="21.72" stroke="white" strokeWidth="10" strokeLinecap="square" />
              </svg>
            </div>
          </motion.div>
        )}

        {activeSlide === 1 && (
          <motion.div
            key="slide1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-10 lg:p-12 relative z-10 w-full"
            id="hero_slide_lets_talk"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Stack: Dynamic Content matching the user's uploaded layout */}
              <div className="lg:col-span-7 space-y-6 text-left" id="slide1_left">
                {/* Aligned Badge */}
                <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-zinc-300 font-black tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1.5 w-fit uppercase">
                  <Shield className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  <span>UNDP / ESCWA ALIGNED TRANSNATIONAL SANDBOX</span>
                </div>

                {/* Overlapping Stark Display Typography */}
                <div className="space-y-1">
                  <h1 className="text-6xl md:text-8xl font-syne font-black uppercase tracking-tighter leading-none select-none text-white">
                    Let's Talk!
                  </h1>
                  <h2 className="text-xl md:text-3xl font-serif italic font-light tracking-wide text-zinc-250 select-none">
                    Local innovation. Global capital.
                  </h2>
                </div>

                {/* Ecosystem shift highlight text */}
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans max-w-xl font-medium tracking-normal select-text">
                  No cap, this is the biggest shift in the Lebanese ecosystem yet. Coupling offshore capital with the fresh revenue generated by remote engineers.
                </p>

                {/* Three precise feature items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-900" id="slide1_features">
                  {/* Smart Matching */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-zinc-900 border border-zinc-800 text-white shrink-0">
                        <Cpu className="w-4.5 h-4.5 text-zinc-200" />
                      </div>
                      <span className="font-mono text-xs font-black tracking-wide uppercase text-white">Smart Matching</span>
                    </div>
                    <p className="text-[11px] text-zinc-450 leading-relaxed font-sans font-medium">
                      AI semantic matching analyzes startup readiness profiles against investor mandates.
                    </p>
                  </div>

                  {/* Data Rooms */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-zinc-900 border border-zinc-800 text-white shrink-0">
                        <Lock className="w-4.5 h-4.5 text-zinc-200" />
                      </div>
                      <span className="font-mono text-xs font-black tracking-wide uppercase text-white">Data Rooms</span>
                    </div>
                    <p className="text-[11px] text-zinc-450 leading-relaxed font-sans font-medium">
                      Institutional-grade document vaults. Role-based access. Full audit trails.
                    </p>
                  </div>

                  {/* Readiness Audit */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-zinc-900 border border-zinc-800 text-white shrink-0">
                        <Award className="w-4.5 h-4.5 text-zinc-200" />
                      </div>
                      <span className="font-mono text-xs font-black tracking-wide uppercase text-white">Readiness Audit</span>
                    </div>
                    <p className="text-[11px] text-zinc-450 leading-relaxed font-sans font-medium">
                      Traction, TAM, Team, Exit Strategy. Human verification. Institutional seal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Stack: Creative Vector Grids */}
              <div className="lg:col-span-5 h-full flex items-center justify-center relative" id="slide1_right">
                <div className="grid grid-cols-2 gap-3 w-full max-w-[380px] lg:max-w-none bg-zinc-950 border-2 border-zinc-850 p-4 shadow-[0px_0px_25px_rgba(255,255,255,0.03)] selection:bg-white selection:text-black">
                  {/* Mockup magazine card 1 */}
                  <div className="border border-zinc-800 p-2.5 bg-[#121212] aspect-[4/3] flex flex-col justify-between hover:border-zinc-500 transition-all">
                    <div className="flex justify-between items-center text-[7px] font-mono text-zinc-500">
                      <span>MOCKUP ENGINE v2</span>
                      <span>ISSUE #41</span>
                    </div>
                    <div>
                      <h4 className="font-serif italic text-xs tracking-wide text-zinc-300">SIGNATURE TOUCH</h4>
                      <p className="text-[8px] font-mono text-zinc-500 mt-1 uppercase">Aesthetic Synthesis</p>
                    </div>
                    <div className="h-6 border-t border-dashed border-zinc-800 flex items-center justify-between text-[7px] font-mono mt-2">
                       <span>FORM / PATTERN</span>
                      <span>01</span>
                    </div>
                  </div>

                  {/* Mockup magazine card 2 */}
                  <div className="border border-zinc-800 p-2.5 bg-zinc-900 aspect-[4/3] flex flex-col justify-between hover:border-zinc-500 transition-all">
                    <div className="flex justify-between items-center text-[7px] font-mono text-zinc-400">
                      <span>SOMNI EDITORIAL</span>
                      <span>● ACTIVE</span>
                    </div>
                    <div>
                      <h4 className="font-syne font-black text-xs leading-none text-white tracking-widest uppercase">SOMNI</h4>
                      <p className="text-[8px] font-sans text-emerald-400 mt-1 uppercase font-semibold">ECO SYSTEM LINK</p>
                    </div>
                    <div className="h-1 bg-zinc-800 w-full rounded-none">
                      <div className="h-full bg-zinc-400 w-2/3"></div>
                    </div>
                  </div>

                  {/* Mockup magazine card 3 */}
                  <div className="border border-zinc-800 p-2.5 bg-zinc-900 aspect-[4/3] flex flex-col justify-between hover:border-zinc-500 transition-all">
                    <div className="flex justify-between items-center text-[7px] font-mono text-zinc-500">
                      <span>GAUCHERE COUTURE</span>
                      <span>BYBLOS CLUSTER</span>
                    </div>
                    <div>
                      <h4 className="font-serif italic text-xs text-zinc-300">GAUCHERE</h4>
                      <p className="text-[8px] font-mono text-zinc-500 mt-0.5 uppercase">Diaspora Network</p>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-855 text-zinc-455 p-1 font-mono text-[7px] text-center uppercase">
                      NCEI ENDORSED NODE
                    </div>
                  </div>

                  {/* Mockup magazine card 4 */}
                  <div className="border border-zinc-800 p-2.5 bg-[#121212] aspect-[4/3] flex flex-col justify-between hover:border-zinc-500 transition-all">
                    <div className="flex justify-between items-center text-[7px] font-mono text-zinc-500">
                      <span>COLLECTION 2026</span>
                      <span>(+961) HUB</span>
                    </div>
                    <div>
                      <h4 className="font-syne font-black text-xs text-zinc-200 uppercase tracking-tighter">FALL WINTER</h4>
                      <p className="text-[8px] font-mono text-zinc-400 mt-0.5 font-bold">STABILIZATION CODE</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white"></span>
                      <span className="text-[7px] font-mono text-zinc-455">SECURE DISPATCH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSlide === 2 && (
          <motion.div
            key="slide2_matchoreneur"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-10 lg:p-12 relative z-10 w-full min-h-[460px] flex flex-col justify-center bg-zinc-950 overflow-hidden"
            id="hero_slide_matchoreneur_flow"
          >
            {/* Background glowing horizon scene as depicted in the image */}
            <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
              {/* Radial gradient background representing the glowing horizon */}
              <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-zinc-400/10 blur-[120px] rounded-full"></div>
              {/* Star-like dots overlay */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
              
              {/* Glowing Mesh Spheres at the Horizon (replicating image center) */}
              <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex items-end justify-center gap-2 opacity-35">
                <div className="w-48 h-24 rounded-t-full bg-slate-900 border-t border-zinc-650 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.2),transparent_70%)]"></div>
                  <div className="w-full h-[1px] bg-zinc-500 absolute bottom-0"></div>
                </div>
                <div className="w-64 h-32 rounded-t-full bg-slate-900 border-t-2 border-zinc-500 flex items-center justify-center relative overflow-hidden -mx-10 scale-110">
                  <div className="absolute inset-3 rounded-t-full border border-dashed border-zinc-400 opacity-50"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.3),transparent_70%)]"></div>
                  <div className="w-full h-[1px] bg-zinc-450 absolute bottom-0"></div>
                </div>
                <div className="w-48 h-24 rounded-t-full bg-slate-900 border-t border-zinc-650 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.2),transparent_70%)]"></div>
                  <div className="w-full h-[1px] bg-zinc-500 absolute bottom-0"></div>
                </div>
              </div>

              {/* Digital landscape horizon wire lines */}
              <div className="absolute bottom-0 inset-x-0 h-16 border-t border-zinc-800/60 bg-gradient-to-t from-zinc-950 to-transparent flex flex-col justify-end">
                <div className="w-full h-[1px] bg-zinc-900/80"></div>
              </div>
            </div>

            {/* Overarching Header for the slide to ground it in Lebanon Startups context */}
            <div className="relative z-10 text-left mb-6 space-y-1 max-w-4xl">
              <span className="text-[10px] sm:text-xs font-mono font-extrabold text-amber-400 tracking-[0.2em] uppercase bg-black px-2.5 py-1 border border-zinc-850">
                MATCHORENEUR PROVEN FLOW
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3.5xl font-syne font-black uppercase text-white leading-tight tracking-tight">
                z961combinator A Matchpreneur Linkage Program with Investors Capital
              </h2>
            </div>

            {/* 4 Cards Grid exactly as shown in the picture */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full relative z-10" id="matchoreneur_process_grid">
              
              {/* Card 1 */}
              <div className="bg-white text-black p-5 border-3 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] flex flex-col justify-between text-left relative overflow-hidden hover:scale-[1.01] transition-transform min-h-[300px]" id="step_card_1">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-syne font-black text-2xl tracking-tighter">01</span>
                    <span className="w-1.5 h-1.5 bg-black"></span>
                  </div>
                  <h3 className="font-syne font-black text-[13px] sm:text-[14px] uppercase tracking-wider border-b border-black pb-1 mb-2 text-black">
                    APPLY & SUBMIT
                  </h3>
                  <p className="text-[11px] text-zinc-800 font-bold leading-normal">
                    Founders submit readiness profiles, business plans, and feasibility studies. Full transparency required.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="border-t border-zinc-300 my-2"></div>
                  <span className="font-mono text-[9px] font-black text-zinc-500 uppercase block mb-1 tracking-wider">Required</span>
                  <ul className="grid grid-cols-1 gap-1 text-[11px] font-extrabold text-zinc-950">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Financial projections</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Market analysis</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Team credentials</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Exit strategy</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white text-black p-5 border-3 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] flex flex-col justify-between text-left relative overflow-hidden hover:scale-[1.01] transition-transform min-h-[300px]" id="step_card_2">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-syne font-black text-2xl tracking-tighter">02</span>
                    <span className="w-1.5 h-1.5 bg-black"></span>
                  </div>
                  <h3 className="font-syne font-black text-[13px] sm:text-[14px] uppercase tracking-wider border-b border-black pb-1 mb-2 text-black">
                    AI ANALYSIS
                  </h3>
                  <p className="text-[11px] text-zinc-800 font-bold leading-normal">
                    Automated readiness scoring. Vector embeddings for semantic matching. Pattern recognition. Instant feedback.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="border-t border-zinc-300 my-2"></div>
                  <span className="font-mono text-[9px] font-black text-zinc-500 uppercase block mb-1 tracking-wider">Metrics</span>
                  <ul className="grid grid-cols-1 gap-1 text-[11px] font-extrabold text-zinc-950">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Readiness Score (0-100)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>TAM Analysis</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Competitive Position</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Risk Assessment</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white text-black p-5 border-3 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] flex flex-col justify-between text-left relative overflow-hidden hover:scale-[1.01] transition-transform min-h-[300px]" id="step_card_3">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-syne font-black text-2xl tracking-tighter">03</span>
                    <span className="w-1.5 h-1.5 bg-black"></span>
                  </div>
                  <h3 className="font-syne font-black text-[13px] sm:text-[14px] uppercase tracking-wider border-b border-black pb-1 mb-2 text-black">
                    NCEI VERIFICATION
                  </h3>
                  <p className="text-[11px] text-zinc-800 font-bold leading-normal">
                    Expert review. Human-in-the-loop validation. Institutional credibility seal. NCEI certified.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="border-t border-zinc-300 my-2"></div>
                  <span className="font-mono text-[9px] font-black text-zinc-500 uppercase block mb-1 tracking-wider">Approval</span>
                  <ul className="grid grid-cols-1 gap-1 text-[11px] font-extrabold text-zinc-950">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Expert panel review</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Due diligence</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>NCEI certification</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Ready to pitch</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white text-black p-5 border-3 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] flex flex-col justify-between text-left relative overflow-hidden hover:scale-[1.01] transition-transform min-h-[300px]" id="step_card_4">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-syne font-black text-2xl tracking-tighter">04</span>
                    <span className="w-1.5 h-1.5 bg-black"></span>
                  </div>
                  <h3 className="font-syne font-black text-[13px] sm:text-[14px] uppercase tracking-wider border-b border-black pb-1 mb-2 text-black">
                    MATCH & CONNECT
                  </h3>
                  <p className="text-[11px] text-zinc-800 font-bold leading-normal">
                    Push to investor dashboards. Facilitate introductions. Secure deal negotiation. Close funding.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="border-t border-zinc-300 my-2"></div>
                  <span className="font-mono text-[9px] font-black text-zinc-500 uppercase block mb-1 tracking-wider">Outcome</span>
                  <ul className="grid grid-cols-1 gap-1 text-[11px] font-extrabold text-zinc-950">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Investor introductions</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Secure data rooms</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Negotiation support</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-black"></span>
                      <span>Deal closure</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {activeSlide === 3 && (
          <motion.div
            key="slide3_fresh_usd"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-10 lg:p-12 relative z-10 w-full"
            id="hero_slide_remittance_sovereignty"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Stack: Tech Infrastructure details */}
              <div className="lg:col-span-7 space-y-6 text-left" id="slide2_left">
                <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs text-emerald-400 font-extrabold tracking-widest bg-zinc-950 border border-emerald-950 px-3 py-1.5 w-fit uppercase">
                  <TrendingUp className="w-4.5 h-4.5 text-emerald-400" />
                  <span>Fresh Revenue Optimization Desk</span>
                </div>

                <div className="space-y-1">
                  <h1 className="text-5xl md:text-7xl font-syne font-black uppercase tracking-tighter leading-none text-white">
                    $180M Fresh USD
                  </h1>
                  <h2 className="text-lg md:text-2xl font-serif italic text-zinc-300 tracking-wide font-light">
                    Annual developer offshore value generated inside Lebanon
                  </h2>
                </div>

                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans max-w-xl font-medium tracking-normal select-text">
                  Remote contracts bypass local structural liquidity hurdles. Combinator operates as an institutional clearance mechanism providing diaspora trustees direct and fully auditable access to vetted ventures, micro-grids, and AgTech pipelines.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-zinc-900" id="slide2_stats">
                  <div className="p-3 bg-zinc-950 border border-zinc-800">
                    <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wider block">Average Salary</span>
                    <span className="text-base font-mono font-black text-white">$2,850/mo</span>
                  </div>
                  <div className="p-3 bg-zinc-950 border border-zinc-800">
                    <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wider block">Growth Velocity</span>
                    <span className="text-base font-mono font-black text-emerald-400">+34% YoY</span>
                  </div>
                  <div className="p-3 bg-zinc-950 border border-zinc-800">
                    <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wider block">Sandbox Capacity</span>
                    <span className="text-base font-mono font-black text-white">$3.2M Active</span>
                  </div>
                  <div className="p-3 bg-zinc-950 border border-zinc-800">
                    <span className="text-gray-400 text-[9px] font-mono uppercase tracking-wider block">Staff Engineers</span>
                    <span className="text-base font-mono font-black text-white">450+ Engaged</span>
                  </div>
                </div>
              </div>

              {/* Right Stack: Interactive Vector Graph representing flow of fresh currency */}
              <div className="lg:col-span-5 h-full flex items-center justify-center" id="slide2_right">
                <div className="w-full max-w-[340px] lg:max-w-none border-2 border-zinc-800 bg-zinc-950 p-5 space-y-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] text-left font-mono">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                    <span className="text-[9px] font-black text-white uppercase flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      USD FLOW MATRIX
                    </span>
                    <span className="text-[9px] text-zinc-500">BDL 165 CLEARANCE</span>
                  </div>

                  {/* Flow chart simulation */}
                  <div className="space-y-3 text-[10px] font-bold">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span>Diaspora Trust Capital</span>
                      <span className="text-white">→ AUDIT STAGE →</span>
                    </div>
                    <div className="h-2 bg-zinc-900 border border-zinc-805 relative overflow-hidden">
                      <div className="h-full bg-emerald-500 w-3/4 animate-pulse"></div>
                    </div>

                    <div className="flex items-center justify-between text-zinc-300">
                      <span>Interactive Sandbox Matches</span>
                      <span className="text-emerald-400">→ NCEI APPROVED</span>
                    </div>
                    <div className="h-2 bg-zinc-900 border border-zinc-805 relative overflow-hidden">
                      <div className="h-full bg-emerald-400 w-1/2"></div>
                    </div>

                    <div className="flex items-center justify-between text-zinc-300">
                      <span>Direct Salary Clearings</span>
                      <span className="text-white">→ FRESH DOLLARS (+961)</span>
                    </div>
                    <div className="h-2 bg-zinc-900 border border-zinc-505 relative overflow-hidden">
                      <div className="h-full bg-zinc-200 w-full"></div>
                    </div>
                  </div>

                  <div className="bg-zinc-900 p-2.5 text-[8.5px] border border-zinc-800 text-zinc-400 leading-normal font-sans normal-case">
                    Capital deployed into smart agricultural drip systems in Beqaa, decentralized solar microgrids in Tripoli, and fintech card clearing APIs in Beirut.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSlide === 4 && (
          <motion.div
            key="slide4_ncei"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-10 lg:p-12 relative z-10 w-full bg-zinc-950"
            id="hero_slide_ncei_creative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Big stark typography + the circular rotating NCEI logo badge card overlay */}
              <div className="lg:col-span-7 relative flex flex-col md:flex-row items-center gap-6 text-left" id="slide3_left">
                {/* Big bold background text */}
                <div className="space-y-0.5 tracking-tighter leading-none font-sans font-black text-white shrink-0">
                  <div className="text-[2.75rem] sm:text-[4.75rem] md:text-[5.5rem] font-syne uppercase select-none text-white tracking-widest leading-none">
                    UNLEASH
                  </div>
                  <div className="text-[2.25rem] sm:text-[4rem] md:text-[4.75rem] font-serif font-light tracking-wide italic text-zinc-300 leading-none">
                    YOUR INNER
                  </div>
                  <div className="text-[2.75rem] sm:text-[4.75rem] md:text-[5.5rem] font-syne uppercase select-none text-white tracking-widest leading-none flex items-center gap-2">
                    MODEL <span className="text-orange-500 font-serif leading-none font-light animate-[spin_10s_linear_infinite]">*</span>
                  </div>
                </div>

                {/* High Fidelity NCEI Circular Badge Card Overlay */}
                <div className="relative w-44 h-44 md:w-52 md:h-52 bg-black rounded-full border-4 border-zinc-800 flex flex-col justify-center items-center shadow-[0_0_30px_rgba(249,115,22,0.2)] overflow-hidden shrink-0 mx-auto md:mx-0" id="slide3_ncei_logo_circle">
                  {/* Segmented orange/white tachometer styling border */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-orange-500 animate-[spin_40s_linear_infinite]" />
                  <div className="absolute inset-1 rounded-full border-2 border-stone-800 border-t-orange-500 border-r-orange-500" />
                  
                  <div className="relative z-10 text-center px-4 space-y-1 select-none">
                    <div className="font-mono text-[9px] text-orange-500 font-extrabold tracking-widest uppercase">LEBANON</div>
                    <div className="text-2xl md:text-3xl font-syne font-black tracking-tight text-white leading-none">NCEI</div>
                    <div className="h-0.5 bg-orange-500 w-12 mx-auto my-1"></div>
                    <div className="text-[7.5px] md:text-[8.5px] font-mono text-zinc-300 font-extrabold uppercase leading-tight tracking-wider">
                      The National Council<br/>for Entrepreneurship<br/>& Innovation
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: S Modernity sidebar guidelines & descriptive program info */}
              <div className="lg:col-span-5 flex flex-col justify-between pt-4 lg:pt-0 text-left" id="slide3_right_editorial">
                <div className="space-y-4 max-w-sm">
                  <div className="border-b border-zinc-800 pb-2 space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-orange-500 block">
                      S MODERNITY • BLENDING NATIVE DESIGN
                    </span>
                    <h3 className="font-serif italic text-lg text-zinc-200 tracking-wide font-light leading-snug">
                      Integrating regional constraints with world-class procedural frameworks.
                    </h3>
                  </div>
                  
                  <p className="text-[11px] text-zinc-450 leading-relaxed font-sans font-medium text-justify normal-case text-zinc-400">
                    The National Council for Entrepreneurship & Innovation (NCEI Lebanon) acts as a neutral institutional mediator and trust broker. We validate participant credentials and digital documentation files within the 961 Combinator sandbox.
                  </p>
                  
                  <p className="text-[11px] text-zinc-450 leading-relaxed font-sans font-medium text-justify normal-case text-zinc-400">
                    This active coordination bypasses common structural bottlenecks, unlocking reliable offshore salary clearings, active investor matchings, and borderless remote contract compliance.
                  </p>

                  {/* NCEI Interactive Status Container */}
                  <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-3" id="slide3_interactive_status">
                    <div className="w-8 h-8 rounded-full bg-orange-950/40 border border-orange-500 flex items-center justify-center shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-zinc-455 block uppercase font-bold">NCEI ACTIVE TRUST AGENT</span>
                      <span className="text-[10px] text-zinc-200 font-sans block font-semibold">Institutional Sandbox Certified Node</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Caption Banner representing "Nurtured by..." precisely */}
            <div className="w-full text-center mt-8 pt-4 border-t border-zinc-900 font-mono text-[10px] sm:text-xs tracking-wider uppercase text-zinc-400 select-text" id="slide3_footer_caption">
              Nurtured by <span className="text-white font-extrabold hover:text-orange-400 transition-colors cursor-pointer">The National Council for Entrepreneurship & Innovation (NCEI Lebanon)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Navigation Controls */}
      <div 
        className="border-t-2 border-zinc-900 bg-zinc-950 px-6 py-3.5 flex items-center justify-between relative z-25 text-xs font-mono font-bold"
        id="hero_slider_controls_bar"
      >
        <div className="flex items-center gap-3" id="hero_slider_dots_left">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-7 h-2 transition-all cursor-pointer ${
                activeSlide === i 
                  ? "bg-white border border-white" 
                  : "bg-zinc-800 hover:bg-zinc-650 border border-zinc-850"
              }`}
              title={`Go to slide ${i+1}`}
            />
          ))}
        </div>

        {/* Active Index Counter Display */}
        <div className="text-zinc-400 uppercase text-[10px] tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1 z-30" id="hero_slider_index_indicator">
          SLIDE <span className="text-white font-black">0{activeSlide + 1}</span> / 0{totalSlides}
        </div>

        {/* Stark Neo-Brutalist Previous / Next Navigation Buttons */}
        <div className="flex items-center gap-1.5" id="hero_slider_arrow_controls">
          <button
            onClick={handlePrev}
            className="w-8 h-8 bg-zinc-900 hover:bg-white text-zinc-400 hover:text-black border border-zinc-800 hover:border-black flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 bg-zinc-900 hover:bg-white text-zinc-400 hover:text-black border border-zinc-800 hover:border-black flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="Next Slide"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
