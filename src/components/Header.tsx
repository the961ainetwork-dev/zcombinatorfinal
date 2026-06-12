import React, { useState } from "react";
import { Briefcase, Landmark, MessageSquare, Newspaper, Sparkles, TrendingUp, ShieldCheck, Scale, Search, X, Home, BookOpen, AlertCircle, FileSpreadsheet, HelpCircle, Flame, Rocket } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setTab: (tab: any) => void;
  stats: {
    startupsCount: number;
    jobsCount: number;
  };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  theme: "light" | "night";
  toggleTheme: () => void;
}

export default function Header({ currentTab, setTab, stats, searchQuery, setSearchQuery, theme, toggleTheme }: HeaderProps) {
  
  const handleTabClick = (tabName: string) => {
    setTab(tabName);
  };

  const getSearchPlaceholder = () => {
    if (["news", "ask", "show"].includes(currentTab)) {
      return "SEARCH TECH NEWS...";
    } else if (currentTab === "startups") {
      return "SEARCH STARTUPS...";
    } else if (currentTab === "jobs") {
      return "SEARCH JOBS (+961)...";
    }
    return "SEARCH 961 COMBINATOR...";
  };

  return (
    <header className="bg-white text-black sticky top-0 z-40 font-sans border-b-4 border-black" id="main_header_two_tier">


      {/* ================= TIER 2: PRIMARY LOGO & NAVIGATION MENU BELOW ================= */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4" id="tier2_main_nav">
        {/* Row 1: Brand Identifier & Live Marketplace Indicator */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo Brand section */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => handleTabClick("prospectus")} id="header_logo_comb">
            <div className="bg-black text-white font-syne font-black text-xl w-12 h-12 flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] tracking-tighter">
              961
            </div>
            <div>
              <h1 className="font-syne font-black text-2xl uppercase tracking-tighter leading-none flex items-center gap-1.5 text-black">
                Combinator <span className="text-[10px] bg-black text-white px-1.5 py-0.5 font-mono tracking-normal font-bold lowercase">xyz</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-wider font-bold">
                Lebanese Sandbox Hub • July 2026
              </p>
            </div>
          </div>

          {/* Real-time Ticker */}
          <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono bg-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none" id="header_live_ticker">
            <div className="flex items-center gap-1 font-bold text-black">
              <span className="w-2.5 h-2.5 bg-black border border-black inline-block animate-pulse"></span>
              <span>ECO CLEARANCE: FRESH CLEARING LIVE</span>
            </div>
            <div className="border-l-2 border-black h-3.5"></div>
            <div className="flex items-center gap-1 font-bold text-black bg-zinc-100 px-1.5 py-0.5 border border-black">
              <TrendingUp className="w-3.5 h-3.5 text-black stroke-[3]" />
              <span>SALARY INDEX: $2,850/MO AVG</span>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t-2 border-black my-0.5"></div>

        {/* Row 2: Secondary Tab Links (Startups, Jobs, Pitch Lab, Sandbox, NDA, TOR) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          <nav className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase z-30" id="tier2_navbar_tabs">
            <button
              id="tab_btn_get_started"
              onClick={() => handleTabClick("get-started")}
              className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-black font-black transition-all cursor-pointer ${
                currentTab === "get-started"
                  ? "bg-amber-500 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              <Rocket className="w-4 h-4 text-black animate-pulse" />
              <span>Get Started</span>
            </button>

            <button
              id="tab_btn_startups"
              onClick={() => handleTabClick("startups")}
              className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-black font-black transition-all cursor-pointer ${
                currentTab === "startups"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              <span>Startups</span>
              <span className={`text-[10px] px-1.5 py-0.2 border font-mono ${
                currentTab === "startups" ? "bg-white text-black border-white" : "bg-black text-white border-black"
              }`}>
                {stats.startupsCount}
              </span>
            </button>

            <button
              id="tab_btn_jobs"
              onClick={() => handleTabClick("jobs")}
              className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-black font-black transition-all cursor-pointer ${
                currentTab === "jobs"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              <span>Jobs</span>
              <span className={`text-[10px] px-1.5 py-0.2 border font-mono ${
                currentTab === "jobs" ? "bg-white text-black border-white" : "bg-black text-white border-black"
              }`}>
                {stats.jobsCount}
              </span>
            </button>

            <button
              id="tab_btn_pitch"
              onClick={() => handleTabClick("pitch-lab")}
              className={`px-3 py-1.5 border-2 border-black font-black transition-all cursor-pointer ${
                currentTab === "pitch-lab"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-zinc-50 text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              <span>Pitch Lab (AI)</span>
            </button>

            <button
              id="tab_btn_sandbox"
              onClick={() => handleTabClick("sandbox")}
              className={`px-3 py-1.5 border-2 border-black font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTab === "sandbox"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-zinc-50 text-black hover:bg-zinc-150 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              <AlertCircle className="w-4 h-4 text-black" fill="currentColor" />
              <span>Sandbox</span>
            </button>

            {/* NEW: FAQ Help Center Link */}
            <button
              id="tab_btn_faq"
              onClick={() => handleTabClick("faq")}
              className={`px-3 py-1.5 border-2 border-black font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTab === "faq"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              <HelpCircle className="w-4 h-4 text-black" />
              <span>FAQ</span>
            </button>

            {/* NEW: THE MAG Magazine Portal Link */}
            <button
              id="tab_btn_mag"
              onClick={() => handleTabClick("mag")}
              className={`px-3 py-1.5 border-2 border-black font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTab === "mag"
                  ? "bg-orange-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-orange-50 text-orange-950 hover:bg-orange-100 shadow-[2px_2px_0px_0px_rgba(249,115,22,0.4)] hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              <Flame className="w-4 h-4 text-orange-600 fill-orange-400 group-hover:animate-bounce" />
              <span>THE MAG</span>
              <span className="text-[9px] bg-red-600 text-white font-mono px-1 border border-black uppercase font-bold animate-pulse">NEW</span>
            </button>

            {/* NEW: Institutional Engagement Questionnaire Link */}
            <button
              id="tab_btn_institutional"
              onClick={() => handleTabClick("institutional")}
              className={`px-3 py-1.5 border-2 border-black font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === "institutional"
                  ? "bg-amber-500 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-amber-50/50 text-amber-950 hover:bg-amber-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              <Landmark className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Partners Desk</span>
            </button>

            {/* NEW: Onboarding Startup Registration Questionnaire Link */}
            <button
              id="tab_btn_register"
              onClick={() => handleTabClick("register")}
              className={`px-3 py-1.5 border-2 border-black font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === "register"
                  ? "bg-amber-500 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-amber-50 text-amber-950 hover:bg-amber-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Startup Register</span>
            </button>

            {/* NEW: Admin Panel Link */}
            <button
              id="tab_btn_admin"
              onClick={() => handleTabClick("admin")}
              className={`px-3 py-1.5 border-2 border-black font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === "admin"
                  ? "bg-rose-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-rose-50 text-rose-950 hover:bg-rose-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              <ShieldCheck className="w-4.5 h-4.5 text-rose-800 shrink-0" />
              <span>Admin Desk</span>
            </button>
          </nav>

          {/* Quick Context Indicator on lower nav right with High-Contrast Night Mode Toggle & Search */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] font-extrabold uppercase select-none" id="tier2_right_controls">
            {/* Integrated Search Bar */}
            <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-300 px-2 py-1 text-xs font-mono w-full sm:w-44 focus-within:border-black transition-all" id="tier2_search_container">
              <Search className="w-3 h-3 text-gray-400 shrink-0" />
              <input
                id="global_search_input"
                type="text"
                placeholder={getSearchPlaceholder()}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-[9px] bg-transparent outline-none w-full text-black placeholder-gray-400 font-mono uppercase font-black"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="text-gray-400 hover:text-black p-0.5 cursor-pointer font-sans"
                  title="Clear Search"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
            </div>

            <div className="hidden xl:flex items-center gap-2 text-gray-500 bg-zinc-50 border border-zinc-200 px-2 py-1">
              <span>z961 | NCEI LEBANON</span>
            </div>

            <button
              id="theme_toggle_btn"
              onClick={toggleTheme}
              className="px-2.5 py-1 border border-black bg-white text-black hover:bg-zinc-150 transition-all font-mono text-[10px] uppercase font-black tracking-wider flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none hover:translate-x-[0.5px] cursor-pointer"
              title="Toggle High-Contrast Night Mode"
            >
              {theme === "light" ? "🌙 Night" : "☀️ Light"}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
