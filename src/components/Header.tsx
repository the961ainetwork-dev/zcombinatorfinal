import React, { useState } from "react";
import { Briefcase, Landmark, MessageSquare, Newspaper, Sparkles, TrendingUp, ShieldCheck, Scale, Search, X, Home, BookOpen, AlertCircle, FileSpreadsheet, HelpCircle } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setTab: (tab: any) => void;
  stats: {
    startupsCount: number;
    jobsCount: number;
  };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ currentTab, setTab, stats, searchQuery, setSearchQuery }: HeaderProps) {
  
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
      {/* ================= TIER 1: SECOND TOP NAV MENU ON TOP OF ALL ================= */}
      <div className="bg-[#121212] text-zinc-300 font-mono text-[10px] sm:text-xs border-b-2 border-black py-2.5 z-40 transition-all select-none" id="tier1_top_nav">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Top Menu Links */}
          <nav className="flex flex-wrap items-center gap-x-1 gap-y-1.5 text-[11px] font-bold uppercase tracking-wider" id="tier1_navbar">
            <button
              onClick={() => handleTabClick("prospectus")}
              className={`px-2.5 py-1 transition-all cursor-pointer hover:text-white flex items-center gap-1 border border-transparent ${
                currentTab === "prospectus"
                  ? "bg-zinc-800 text-white border-zinc-700"
                  : "text-zinc-400"
              }`}
              id="top_tab_prospectus"
            >
              <Home className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Prospectus</span>
            </button>

            <span className="text-zinc-700 hidden sm:inline">|</span>

            <button
              onClick={() => handleTabClick("news")}
              className={`px-2.5 py-1 transition-all cursor-pointer hover:text-white flex items-center gap-1 border border-transparent ${
                currentTab === "news"
                  ? "bg-zinc-800 text-white border-zinc-700"
                  : "text-zinc-400"
              }`}
              id="top_tab_news"
            >
              <Newspaper className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Ecosystem News</span>
            </button>

            <span className="text-zinc-700 hidden sm:inline">|</span>

            <button
              onClick={() => handleTabClick("ask")}
              className={`px-2.5 py-1 transition-all cursor-pointer hover:text-white flex items-center gap-1 border border-transparent ${
                currentTab === "ask"
                  ? "bg-zinc-800 text-white border-zinc-700"
                  : "text-zinc-400"
              }`}
              id="top_tab_ask"
            >
              <MessageSquare className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Ask 961</span>
            </button>

            <span className="text-zinc-700 hidden sm:inline">|</span>

            <button
              onClick={() => handleTabClick("show")}
              className={`px-2.5 py-1 transition-all cursor-pointer hover:text-white flex items-center gap-1 border border-transparent ${
                currentTab === "show"
                  ? "bg-zinc-800 text-white border-zinc-700"
                  : "text-zinc-400"
              }`}
              id="top_tab_show"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Show 961</span>
            </button>

            <span className="text-zinc-700 hidden sm:inline">|</span>

            <button
              onClick={() => handleTabClick("policy")}
              className={`px-2.5 py-1 transition-all cursor-pointer hover:text-white flex items-center gap-1 border border-transparent ${
                currentTab === "policy"
                  ? "bg-zinc-800 text-white border-zinc-700"
                  : "text-zinc-400"
              }`}
              id="top_tab_policy"
            >
              <Landmark className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Policy & Framework</span>
            </button>

            <span className="text-zinc-700 hidden sm:inline">|</span>

            <button
              onClick={() => handleTabClick("values")}
              className={`px-2.5 py-1 transition-all cursor-pointer hover:text-white flex items-center gap-1 border border-transparent ${
                currentTab === "values"
                  ? "bg-zinc-800 text-white border-zinc-700"
                  : "text-zinc-400"
              }`}
              id="top_tab_values"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Core Values</span>
            </button>

            <span className="text-zinc-700 hidden sm:inline">|</span>

            <button
              onClick={() => handleTabClick("resources")}
              className={`px-2.5 py-1 transition-all cursor-pointer hover:text-white flex items-center gap-1 border border-transparent ${
                currentTab === "resources"
                  ? "bg-zinc-800 text-white border-zinc-700"
                  : "text-zinc-400"
              }`}
              id="top_tab_resources"
            >
              <BookOpen className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Resource Papers</span>
            </button>

            <span className="text-zinc-700 hidden sm:inline">|</span>

            <button
              onClick={() => handleTabClick("faq")}
              className={`px-2.5 py-1 transition-all cursor-pointer hover:text-white flex items-center gap-1 border border-transparent ${
                currentTab === "faq"
                  ? "bg-zinc-800 text-white border-zinc-700"
                  : "text-zinc-400"
              }`}
              id="top_tab_faq"
            >
              <HelpCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>FAQ</span>
            </button>
          </nav>

          {/* Integrated Search Bar on the Right side of Top Nav */}
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700 px-2.5 py-1 text-xs font-mono w-full lg:w-64 shrink-0 focus-within:border-zinc-400 transition-all" id="tier1_search_container">
            <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <input
              id="global_search_input"
              type="text"
              placeholder={getSearchPlaceholder()}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-[10px] bg-transparent outline-none w-full text-white placeholder-zinc-550 font-mono uppercase font-black"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="text-zinc-450 hover:text-white p-0.5 cursor-pointer"
                title="Clear Search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          
        </div>
      </div>

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

            {/* NEW: NDA Registration Page Link */}
            <button
              id="tab_btn_nda"
              onClick={() => handleTabClick("nda")}
              className={`px-3 py-1.5 border-2 border-black font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTab === "nda"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              <span>NDA Registration</span>
            </button>

            {/* NEW: TOR Terms & Participation Link */}
            <button
              id="tab_btn_tor"
              onClick={() => handleTabClick("tor")}
              className={`px-3 py-1.5 border-2 border-black font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTab === "tor"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              }`}
            >
              <span>TOR Rules</span>
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
          </nav>

          {/* Quick Context Indicator on lower nav right */}
          <div className="hidden md:flex items-center gap-2 font-mono text-[9px] text-gray-500 font-extrabold uppercase bg-zinc-50 border border-zinc-200 px-2 py-1 select-none">
            <span>z961 | NCEI LEBANON</span>
          </div>

        </div>
      </div>
    </header>
  );
}
