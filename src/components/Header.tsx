import React, { useState, useEffect, useRef } from "react";
import { Briefcase, Landmark, Lightbulb, MessageSquare, Newspaper, PlusCircle, Sparkles, TrendingUp, ChevronDown, Award, FileText, CheckCircle2, Shield, Search, X } from "lucide-react";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isZ961Active = ["prospectus", "policy", "values", "resources"].includes(currentTab);

  const handleTabClick = (tabName: string) => {
    setTab(tabName);
    setDropdownOpen(false);
  };

  const getSearchPlaceholder = () => {
    if (["news", "ask", "show"].includes(currentTab)) {
      return "SEARCH TECH NEWS & ARTICLES...";
    } else if (currentTab === "startups") {
      return "SEARCH STARTUPS & FOUNDERS...";
    } else if (currentTab === "jobs") {
      return "SEARCH JOBS & SKILLS (+961)...";
    }
    return "SEARCH 961 COMBINATOR...";
  };

  return (
    <header className="bg-white text-black border-b-4 border-black sticky top-0 z-40 py-4" id="main_header_961">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-4">
        {/* Row 1: Logo & Live Marketplace Ticker */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabClick("news")} id="header_logo_comb">
            <div className="bg-[#FF6600] text-white font-display font-black text-xl w-12 h-12 flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] tracking-tighter">
              961
            </div>
            <div>
              <h1 className="font-display font-black text-2xl uppercase tracking-tighter leading-none flex items-center gap-1.5 text-black">
                Combinator <span className="text-xs bg-black text-[#FF6600] px-1.5 py-0.5 font-mono tracking-normal font-bold lowercase">xyz</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-wider font-bold">Lebanese Startup Hub & Tech News (+961)</p>
            </div>
          </div>

          {/* Live Marketplace Ticker */}
          <div className="hidden lg:flex items-center gap-3 text-[10px] font-mono bg-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" id="header_live_ticker">
            <div className="flex items-center gap-1 font-bold text-black">
              <span className="w-2.5 h-2.5 bg-[#FF6600] border border-black inline-block animate-pulse"></span>
              <span>ECO CLEARANCE: FRESH CLEARING LIVE</span>
            </div>
            <div className="border-l-2 border-black h-3.5"></div>
            <div className="flex items-center gap-1 font-bold text-gray-700">
              <TrendingUp className="w-3.5 h-3.5 text-[#FF6600] stroke-[3]" />
              <span>SALARY INDEX: $2,850/MO AVG</span>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t-2 border-black my-0.5"></div>

        {/* Row 2: Tabs & Integrated Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Tab Links */}
          <nav className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase z-30" id="header_navbar_tabs">
            <button
              id="tab_btn_news"
              onClick={() => handleTabClick("news")}
              className={`px-3 py-1.5 border-2 border-black font-bold transition-all ${
                currentTab === "news"
                  ? "bg-[#FF6600] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-[#F6F6EF] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              }`}
            >
              <span>News</span>
            </button>

            <button
              id="tab_btn_ask"
              onClick={() => handleTabClick("ask")}
              className={`px-3 py-1.5 border-2 border-black font-bold transition-all ${
                currentTab === "ask"
                  ? "bg-[#FF6600] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-[#F6F6EF] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              }`}
            >
              <span>Ask 961</span>
            </button>

            <button
              id="tab_btn_show"
              onClick={() => handleTabClick("show")}
              className={`px-3 py-1.5 border-2 border-black font-bold transition-all ${
                currentTab === "show"
                  ? "bg-[#FF6600] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-[#F6F6EF] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              }`}
            >
              <span>Show 961</span>
            </button>

            <button
              id="tab_btn_startups"
              onClick={() => handleTabClick("startups")}
              className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-black font-bold transition-all ${
                currentTab === "startups"
                  ? "bg-[#FF6600] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-[#F6F6EF] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              }`}
            >
              <span>Startups</span>
              <span className="text-[10px] bg-black text-white px-1.5 py-0.2 border border-black font-mono">
                {stats.startupsCount}
              </span>
            </button>

            <button
              id="tab_btn_jobs"
              onClick={() => handleTabClick("jobs")}
              className={`flex items-center gap-1.5 px-3 py-1.5 border-2 border-black font-bold transition-all ${
                currentTab === "jobs"
                  ? "bg-[#FF6600] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-white text-black hover:bg-[#F6F6EF] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              }`}
            >
              <span>Jobs</span>
              <span className="text-[10px] bg-black text-white px-1.5 py-0.2 border border-black font-mono">
                {stats.jobsCount}
              </span>
            </button>

            <button
              id="tab_btn_pitch"
              onClick={() => handleTabClick("pitch-lab")}
              className={`px-3 py-1.5 border-2 border-black font-black transition-all ${
                currentTab === "pitch-lab"
                  ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
                  : "bg-[#FFF9E6] text-black hover:bg-[#FFEAA7] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              }`}
            >
              <span>Pitch Lab (AI)</span>
            </button>

            <button
              id="tab_btn_sandbox"
              onClick={() => handleTabClick("sandbox")}
              className={`px-3 py-1.5 border-2 border-black font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTab === "sandbox"
                  ? "bg-black text-[#FF6600] shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
                  : "bg-[#FFF9E6] text-black hover:bg-[#FFEAA7] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              }`}
            >
              <Shield className="w-4 h-4 text-[#FF6600]" />
              <span>Sandbox</span>
            </button>

            {/* New 961 Combinator Program Menu Dropdown */}
            <div className="relative inline-block text-left" id="dropdown_z961_menu_container" ref={dropdownRef}>
              <button
                id="tab_btn_z961_dropdown"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 border-2 border-black font-black transition-all cursor-pointer ${
                  isZ961Active
                    ? "bg-[#FF6600] text-white shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-[#FFF9E6] text-black hover:bg-[#ffeaa7] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                <span>961 Combinator</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black z-50 text-[11px]"
                  id="dropdown_z961_items"
                >
                  <div className="divide-y-2 divide-black">
                    <button
                      onClick={() => handleTabClick("prospectus")}
                      className={`w-full text-left px-3 py-2 hover:bg-[#FFF9E6] font-black uppercase flex items-center justify-between ${
                        currentTab === "prospectus" ? "bg-[#FFF9E6] text-[#FF6600]" : ""
                      }`}
                    >
                      <span>Prospectus</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#FF6600]" />
                    </button>

                    <button
                      onClick={() => handleTabClick("policy")}
                      className={`w-full text-left px-3 py-2 hover:bg-[#FFF9E6] font-black uppercase flex items-center justify-between ${
                        currentTab === "policy" ? "bg-[#FFF9E6] text-[#FF6600]" : ""
                      }`}
                    >
                      <span>Policy & Framework</span>
                      <Landmark className="w-3.5 h-3.5 text-black" />
                    </button>

                    <button
                      onClick={() => handleTabClick("values")}
                      className={`w-full text-left px-3 py-2 hover:bg-[#FFF9E6] font-black uppercase flex items-center justify-between ${
                        currentTab === "values" ? "bg-[#FFF9E6] text-[#FF6600]" : ""
                      }`}
                    >
                      <span>Core Values</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </button>

                    <button
                      onClick={() => handleTabClick("resources")}
                      className={`w-full text-left px-3 py-2 hover:bg-[#FFF9E6] font-black uppercase flex items-center justify-between ${
                        currentTab === "resources" ? "bg-[#FFF9E6] text-[#FF6600]" : ""
                      }`}
                    >
                      <span>Resource Papers</span>
                      <FileText className="w-3.5 h-3.5 text-black" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Premium Search input component */}
          <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-within:ring-2 focus-within:ring-[#FF6600] transition-shadow text-xs font-mono w-full md:w-72" id="global_search_container">
            <Search className="w-4 h-4 text-[#FF6600] shrink-0" />
            <input
              id="global_search_input"
              type="text"
              placeholder={getSearchPlaceholder()}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-transparent outline-none w-full text-black placeholder-gray-500 font-mono uppercase font-bold"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="text-black hover:text-[#FF6600] p-0.5 cursor-pointer"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
