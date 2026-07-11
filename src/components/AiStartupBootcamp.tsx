import React, { useState } from "react";
import { 
  Sparkles, ArrowRight, Cpu, Workflow, Database, Award, CheckCircle,
  TrendingUp, Info, Clock, LayoutGrid, List, SlidersHorizontal, ChevronRight,
  ShieldCheck, Lock, Unlock, DollarSign, Send, RefreshCw, BarChart2, Users, FileText
} from "lucide-react";

interface AiStartupBootcampProps {
  onJoinEcosystem?: () => void;
}

export default function AiStartupBootcamp({ onJoinEcosystem }: AiStartupBootcampProps) {
  // Navigation for weeks
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  
  // Interactive Simulation state (turning on AI Teams)
  const [activeAiTeams, setActiveAiTeams] = useState<string[]>([
    "marketing", "support"
  ]);

  // Cohort Register form state
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [startupIdea, setStartupIdea] = useState("");
  const [targetIndustry, setTargetIndustry] = useState("SaaS");
  const [registeredBootcamp, setRegisteredBootcamp] = useState<any>(() => {
    try {
      const cached = localStorage.getItem("Z961_bootcamp_pass");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  // Simulated AI run state logs
  const [activeAgentLog, setActiveAgentLog] = useState<string>("Click any AI agent team on the right to simulate their daily operations pipeline!");
  const [isSimulating, setIsSimulating] = useState(false);

  // Bonus locker password/unlock state
  const [bonusUnlocked, setBonusUnlocked] = useState(false);
  const [unlockFeedback, setUnlockFeedback] = useState("");

  const weeksData = [
    {
      week: 1,
      title: "BUILD YOUR AI MARKETING MACHINE",
      subtitle: "Create 30 Days Of Content In A Single Weekend",
      vibe: "Discover how modern founders use AI to produce more content than entire marketing teams.",
      lessons: [
        "AI Prompt Engineering at scale",
        "Brand Voice & Persona Creation",
        "Viral Content Frameworks & Copywriting",
        "Social Media Scheduler Automation",
        "AI Graphics, Visual Design & Video hooks",
        "AI Pitch Deck & Presentation Generation"
      ],
      tools: ["ChatGPT Plus", "Claude 3.5 Sonnet", "Midjourney v6", "Canva AI", "Advanced Prompt Libraries"],
      outcomes: [
        "A Complete 30-Day Marketing Calendar",
        "Custom Built AI Brand Voice Engine",
        "Active Ready-To-Publish Content Pipeline"
      ],
      bgAccent: "bg-amber-50 border-amber-400 text-amber-950",
      accentBadge: "from-amber-400 to-amber-600 text-black"
    },
    {
      week: 2,
      title: "BUILD YOUR AI EMPLOYEE WORKFORCE",
      subtitle: "Let AI Handle Customer Support While You Sleep",
      vibe: "Create intelligent, high-fidelity AI agents trained specifically on your product data.",
      lessons: [
        "AI Chatbot & Knowledge Base creation",
        "Interactive Customer Support Automation",
        "AI Lead Qualification & scoring systems",
        "Smart CRM updates & tagging (HubSpot)",
        "Multi-Agent collaboration Workflows",
        "Automated Intelligent Follow-Up sequences"
      ],
      tools: ["Chatbase", "Voiceflow", "Zapier Core", "Make.com Nodes", "HubSpot AI"],
      outcomes: [
        "Live AI Website Assistant deployed",
        "Automated Prospect Lead Pipeline",
        "Continuous 24/7 Support Agent"
      ],
      bgAccent: "bg-sky-50 border-sky-400 text-sky-950",
      accentBadge: "from-sky-400 to-sky-600 text-white"
    },
    {
      week: 3,
      title: "TURN DATA INTO MONEY",
      subtitle: "Make Smarter Decisions With AI-Powered Intelligence",
      vibe: "Stop guessing. Transform raw analytics and sector dynamic files into predictive cash flow channels.",
      lessons: [
        "Financial forecasting & budget automation",
        "Competitor monitoring & scraping alerts",
        "Automated customer feedback analysis",
        "Dynamic Pricing models & conversion optimization",
        "Industry-Specific AI implementations"
      ],
      tracks: [
        {
          name: "🛒 E-Commerce Track",
          details: "AI Product Descriptions, Product Mockups, Localized SEO at scale, Dynamic Price Adjustments"
        },
        {
          name: "💻 SaaS & Tech Track",
          details: "AI Onboarding workflows, User sentiment churn predictions, Auto documentation generation"
        },
        {
          name: "🏥 Healthcare Track",
          details: "Smart appointment scheduling automation, HIPAA-aligned workflows, Patient paperwork pre-fills"
        },
        {
          name: "🌾 Food & Agriculture Track",
          details: "Supply chain intelligence, inventory monitoring trackers, distributor invoice matches"
        }
      ],
      tools: ["Advanced GPT Data Analyst", "Perplexity Pro", "Drizzle & custom code integrations", "Google Sheets AI plugins"],
      outcomes: [
        "AI-Powered Market Opportunity Analysis report",
        "Real-Time Business Intelligence Analytics Dashboard",
        "Industry-Specific automation flow maps"
      ],
      bgAccent: "bg-emerald-50 border-emerald-400 text-emerald-950",
      accentBadge: "from-emerald-400 to-emerald-600 text-black"
    },
    {
      week: 4,
      title: "BUILD LIKE A PRO. SCALE LIKE A PRO.",
      subtitle: "Protect Your Data. Future-Proof Your Business.",
      vibe: "AI is powerful, but elite founders know that governance, security, and IP safeguards keep venture values safe.",
      lessons: [
        "Enterprise AI Security & Data privacy rules",
        "Intellectual property protection for generated systems",
        "Custom AI Governance Framework models",
        "Configuring Human-in-the-Loop safeguard systems",
        "Enterprise readiness & regional GCC compliance metrics"
      ],
      tools: ["OpenAI Enterprise Console", "Hugging Face Privates", "Deep Dive Risk Templates", "NCEI Audit standard sheets"],
      outcomes: [
        "Founder-level AI Governance Framework SOP",
        "Startup AI Security Blueprint checklist",
        "Graduation Capstone operational live demonstration"
      ],
      bgAccent: "bg-purple-50 border-purple-400 text-purple-950",
      accentBadge: "from-purple-400 to-purple-600 text-white"
    }
  ];

  const aiTeamDictionary: any = {
    marketing: {
      name: "🤖 AI Marketing Team",
      role: "Produces endless content, writes copy, maps social campaigns, and designs deck outlines.",
      costSaved: 1200,
      hoursSaved: 15,
      simLog: "[AGENT ACTION: Marketing Specialist] Scraped product keywords, analyzed viral hooks on MENA Twitter/LinkedIn, drafted 15 distinct multi-channel posts, formatted a complete Canva design blueprint, and scheduled output to buffer hubs. Status: Live. Speed Multiplier: 10x"
    },
    support: {
      name: "🤖 AI Customer Support Team",
      role: "Trained on your docs. Triages questions, qualifies buyers, handles 90% of basic ticketing.",
      costSaved: 950,
      hoursSaved: 18,
      simLog: "[AGENT ACTION: Support Triage Node] Deployed Voiceflow widget to chat canvas, processed 47 inbound user queries matching FAQ schemas, successfully handed over 2 warm leads to live calendar links, and saved all details to the CRM. Status: Sleep Mode Active. Uptime: 100%"
    },
    research: {
      name: "🤖 AI Research Department",
      role: "Competitor intelligence scraper, Google Search context locator, and market opportunity map maker.",
      costSaved: 1400,
      hoursSaved: 12,
      simLog: "[AGENT ACTION: Intelligence Analyst] Deep researched 4 new SaaS projects emerging in Saudi Arabia, compiled a detailed spreadsheet showing their feature pricing, detected gaps in their enterprise SLAs, and generated a pdf brief. Status: Finished."
    },
    sales: {
      name: "🤖 AI Sales Assistant",
      role: "Automates sales email follow-ups, writes customized outbound pitches, and indexes corporate contacts.",
      costSaved: 1100,
      hoursSaved: 14,
      simLog: "[AGENT ACTION: Sales Outreach Agent] Matched 50 high-level GCC enterprise partners from database, parsed their bios using LLM rules, customized an outbound Levant-to-Gulf pitch for each, and queued automated follow-up intervals. Status: Standing by."
    },
    analyst: {
      name: "🤖 AI Business Analyst",
      role: "Calculates real-time Unit Economics: CAC, LTV, churn rate predictions, and cash runway sheets.",
      costSaved: 1600,
      hoursSaved: 10,
      simLog: "[AGENT ACTION: Finance Analyst] Connected data feeds from Stripe sandbox, calculated month-over-month LTV:CAC ratios, flagged a 2.4% rise in early churn indicators, and output direct recommendations to trim operating costs. Status: Solved."
    },
    ops: {
      name: "🤖 AI Operations Manager",
      role: "Auto-documents standard operating procedures (SOPs), coordinates workflows, keeps backups updated.",
      costSaved: 1300,
      hoursSaved: 16,
      simLog: "[AGENT ACTION: Operations Coordinator] Drafted 4 major SOPs for user registration, configured secondary backup servers for edge failover, and verified global Wise pipeline connection triggers. Status: Protected."
    }
  };

  // Toggle active AI departments
  const handleToggleTeam = (key: string) => {
    if (activeAiTeams.includes(key)) {
      if (activeAiTeams.length > 1) { // keep at least 1
        setActiveAiTeams(activeAiTeams.filter(t => t !== key));
      }
    } else {
      setActiveAiTeams([...activeAiTeams, key]);
    }
    // Update live simulator log
    setActiveAgentLog(aiTeamDictionary[key].simLog);
  };

  // Run full simulation sweep
  const triggerSimulationSweep = () => {
    setIsSimulating(true);
    setActiveAgentLog("🔄 Initializing unified AI workforce cluster... Linking multi-agent protocols...");
    
    setTimeout(() => {
      const logs = activeAiTeams.map(key => `\n👉 ${aiTeamDictionary[key].name}: Running. Saved ${aiTeamDictionary[key].hoursSaved}hrs today.`);
      setActiveAgentLog("📡 MULTI-AGENT SWEEP COMPLETED SUCCESSFULLY!" + logs.join("") + "\n\n💥 Total Team Speed Index: 100% Autonomous.");
      setIsSimulating(false);
    }, 1500);
  };

  // Compute stats based on selected departments
  const totalHoursSavedWeekly = activeAiTeams.reduce((acc, key) => acc + aiTeamDictionary[key].hoursSaved, 0);
  const totalWeeklyOverheadSaved = activeAiTeams.reduce((acc, key) => acc + aiTeamDictionary[key].costSaved, 0);

  // Form registration action
  const handleBootcampSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !emailAddress.trim()) {
      alert("Name and email are required to register.");
      return;
    }

    const pass = {
      id: "AI-EMPIRE-" + Math.floor(1000 + Math.random() * 9000),
      fullName,
      emailAddress,
      startupIdea: startupIdea ? startupIdea : "Autonomous Agent Enterprise",
      targetIndustry,
      cohortDate: "JULY 2026",
      passCode: "Z961-AI-" + Math.floor(10000 + Math.random() * 90000)
    };

    localStorage.setItem("Z961_bootcamp_pass", JSON.stringify(pass));
    setRegisteredBootcamp(pass);
  };

  const handleLeaveBootcamp = () => {
    localStorage.removeItem("Z961_bootcamp_pass");
    setRegisteredBootcamp(null);
    setFullName("");
    setEmailAddress("");
    setStartupIdea("");
  };

  // Test code unlock password
  const testUnlockBonus = (e: React.FormEvent) => {
    e.preventDefault();
    setBonusUnlocked(true);
    setUnlockFeedback("Access granted! The Founder's toolkit library has been fully unlocked in your local session cache.");
  };

  return (
    <div className="space-y-8 text-black font-sans animate-fade-in" id="ai_startup_bootcamp_root_page">
      
      {/* 🚀 1. HERO BANNER LAUNCH */}
      <div className="bg-black text-white border-4 border-black p-6 sm:p-12 shadow-[8px_8px_0px_0px_rgba(245,158,11,1)] relative overflow-hidden" id="bootcamp_main_hero_panel">
        <div className="absolute top-2 right-2 bg-amber-500 text-black font-mono text-[9px] font-black px-3 py-1 uppercase tracking-widest border border-black z-10 animate-bounce">
          🔥 ECOSYSTEM COHORT 1 NOW RECRUITING
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-color-dodge bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-black font-mono text-[10px] font-black px-2.5 py-1 uppercase tracking-widest border border-black">
              Summer Acceleration Series
            </span>
            <span className="hidden sm:inline-block font-mono text-zinc-400 text-xs">Duration: 4 Intensive Weeks • No Coding Required</span>
          </div>

          <div className="space-y-3">
            <h1 className="font-syne font-black text-3xl sm:text-6xl uppercase tracking-tight leading-none text-white">
              🚀 AI STARTUP BOOTCAMP
            </h1>
            <p className="font-syne text-xl sm:text-3xl text-amber-400 font-extrabold tracking-tight uppercase leading-tight">
              BUILD YOUR AI EMPIRE IN 4 WEEKS
            </p>
          </div>

          <p className="text-[16px] sm:text-[18px] font-mono text-zinc-300 max-w-4xl leading-relaxed">
            Stop Doing Everything Yourself. Start Running Your Startup Like a Team of 50. 
            Welcome to the most practical, results-driven AI implementation program ever engineered for founders, creators, startups, freelancers, and ambitious innovators across the MENA region.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-800 text-center">
            <div className="bg-zinc-900 border border-zinc-800 p-3">
              <span className="block font-syne text-lg sm:text-2xl font-black text-white leading-none">0$</span>
              <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider mt-1">Salaries Needed</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-3">
              <span className="block font-syne text-lg sm:text-2xl font-black text-amber-500 leading-none">100%</span>
              <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider mt-1">No-Code Guided</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-3">
              <span className="block font-syne text-lg sm:text-2xl font-black text-white leading-none">24/7/365</span>
              <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider mt-1">Agent Reliability</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-3">
              <span className="block font-syne text-lg sm:text-2xl font-black text-amber-500 leading-none">JULY 17</span>
              <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider mt-1">Cohort Start Date</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#bootcamp_registration_desk"
              className="bg-amber-500 text-black border-2 border-black font-syne font-black text-xs uppercase px-6 py-4 text-center shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Secure Your Seats Now</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
            </a>
            <a
              href="#bootcamp_curriculum_timeline"
              className="bg-white text-black border-2 border-black font-syne font-black text-xs uppercase px-6 py-4 text-center hover:bg-zinc-100 transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <span>Inspect 4-Week Schedule</span>
            </a>
          </div>
        </div>
      </div>

      {/* 🤖 2. INTERACTIVE WORKFORCE SIMULATOR & ROI ESTIMATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="bootcamp_roi_simulation_panel">
        
        {/* Left Side: Interactive Selector */}
        <div className="lg:col-span-8 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-zinc-900 text-white font-mono text-[9px] px-2 py-0.5 tracking-wider uppercase font-black">
                Interactive Operational Tool
              </span>
              <h2 className="font-syne font-black text-sm uppercase tracking-wide text-zinc-500">
                AI Agent Department Customizer
              </h2>
            </div>

            <div className="space-y-1">
              <h3 className="font-syne font-black text-xl sm:text-3xl text-black uppercase leading-none">
                Start Running Your Startup Like a Team of 50.
              </h3>
              <p className="text-[14px] font-mono text-zinc-650 leading-relaxed font-semibold">
                Toggle the different autonomous departments below. Watch your speed index swell up and see how many hours of manual overhead we wipe out together. Click an agent to verify their program script:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              {Object.keys(aiTeamDictionary).map((key) => {
                const team = aiTeamDictionary[key];
                const isActive = activeAiTeams.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleToggleTeam(key)}
                    className={`text-left p-3.5 border-2 border-black cursor-pointer transition-all flex flex-col justify-between ${
                      isActive 
                        ? "bg-[#adff2f] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" 
                        : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-syne font-black text-xs uppercase tracking-tight">{team.name}</span>
                      <span className={`text-[8.5px] font-mono px-1.5 py-0.2 border border-black uppercase font-black ${isActive ? "bg-black text-[#adff2f]" : "bg-white text-zinc-400"}`}>
                        {isActive ? "✓ CONNECTED" : "+ ACTIVATE"}
                      </span>
                    </div>
                    <p className="text-[13px] font-mono mt-2 leading-tight font-bold text-zinc-800">
                      {team.role}
                    </p>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-black/10 text-[10px] font-mono text-zinc-600">
                      <span>⚡ {team.hoursSaved} hrs saved/wk</span>
                      <span className="font-black text-black">${team.costSaved}/mo yield value</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t-2 border-zinc-150 mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-zinc-50 p-4 border border-black/20">
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-zinc-400 font-extrabold uppercase block tracking-wider">LIVE AGENT TELEMETRY TESTING</span>
              <p className="text-[12px] font-mono text-zinc-800 font-extrabold flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                <span>Active Channels Connected: {activeAiTeams.length} of 6 Multi-Agents</span>
              </p>
            </div>
            
            <button
              onClick={triggerSimulationSweep}
              disabled={isSimulating}
              className="bg-black text-white hover:bg-zinc-800 font-syne font-black text-[10px] uppercase tracking-wide px-5 py-3 border-2 border-black flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-500 ${isSimulating ? "animate-spin" : ""}`} />
              <span>{isSimulating ? "Simulating Cluster Sweep..." : "Run Unified Sweep Cycle"}</span>
            </button>
          </div>
        </div>

        {/* Right Side: ROI Output Metrics Dashboard */}
        <div className="lg:col-span-4 bg-zinc-950 text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between relative overflow-hidden" id="simulation_metrics_dashboard">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 opacity-5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-850">
              <span className="text-[9px] font-mono font-black text-amber-500 tracking-wider block uppercase mb-1">REAL-TIME FORECAST INSIGHT</span>
              <h3 className="font-syne font-black text-base uppercase text-white tracking-widest">
                AUTOMATION INDEX YIELD
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">ESTIMATED WEEKLY TIME SAVED</span>
                <span className="text-3xl sm:text-5xl font-syne font-black tracking-tight text-white block mt-0.5">
                  {totalHoursSavedWeekly} <span className="text-xs uppercase font-mono font-extrabold text-zinc-400">Hours / wk</span>
                </span>
                <p className="text-[12px] font-mono text-zinc-400 italic mt-1 leading-snug">
                  Equivalent to hiring 1.5 full-time operators doing repetitive busy work!
                </p>
              </div>

              <div>
                <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">MONTHLY SALARY SAVED & OPTIMIZED</span>
                <span className="text-3xl sm:text-5xl font-syne font-black tracking-tight text-amber-400 block mt-0.5">
                  ${totalWeeklyOverheadSaved.toLocaleString()} <span className="text-xs uppercase font-mono font-extrabold text-[#adff2f]">Fresh USD</span>
                </span>
                <p className="text-[12px] font-mono text-zinc-400 leading-tight mt-1">
                  Absolute overhead saved on basic support, manual analysis, copywriting & graphic tools. No salaries. No compliance fatigue.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-850">
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase block mb-1">SIMULATION OUTPUT CONSOLE LOG:</span>
              <div className="bg-zinc-900 border border-zinc-800 p-3 h-32 overflow-y-auto rounded font-mono text-[10.5px] text-zinc-300 leading-relaxed font-bold scrollbar-thin">
                {activeAgentLog}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-850 text-center text-[10px] font-mono text-zinc-400 space-y-1">
            <p className="uppercase font-extrabold tracking-wider text-[#adff2f]">🔥 Build Smarter. Move Faster.</p>
            <p>100% Verified Playbook Outcomes for startups.</p>
          </div>
        </div>
      </div>

      {/* 🔥 3. WHAT YOU WILL BUILD & WHY FOUNDERS JOIN BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="bootcamp_bento_focus">
        
        {/* Left Bento: What you will build */}
        <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-black">
              <Workflow className="w-5 h-5 text-amber-500 stroke-[2.5]" />
              <h3 className="font-syne font-black text-lg uppercase tracking-tight text-orange-600">
                ⚡ WHAT YOU WILL BUILD
              </h3>
            </div>
            <p className="text-[15px] font-mono text-zinc-800 font-extrabold leading-snug">
              By the end of this 4-week intensive experience, you will launch actual, high-fidelity AI components customized directly for your corporate model:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans font-bold text-[14px] text-zinc-700">
              {[
                { label: "AI Content Engines", desc: "Write, pair, and schedule 30 days of output" },
                { label: "AI Customer Support Agents", desc: "No-code trained chatbots with CRM ties" },
                { label: "AI Lead Generation Systems", desc: "Instantly capture, route, and score prospects" },
                { label: "AI Market Research Teams", desc: "Automatic scraping on competitors' pricing" },
                { label: "AI Sales Workflows", desc: "Custom outreach briefs ready for GCC markets" },
                { label: "AI Business Dashboards", desc: "Real-time visibility into LTV, CAC, and cash flows" },
                { label: "AI Knowledge Bases", desc: "Clean internal documents searchable in seconds" },
                { label: "AI Startup Operating Systems", desc: "Consolidate all pipelines into one hub" }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2 bg-zinc-50 border border-zinc-300 p-2.5 rounded hover:bg-zinc-100/50 transition-colors">
                  <span className="text-amber-500 font-mono mt-0.5 shrink-0">✅</span>
                  <div>
                    <span className="block text-black font-extrabold text-[12px] uppercase">{item.label}</span>
                    <span className="block text-[11px] font-mono text-zinc-500 mt-0.5 leading-tight">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-zinc-200 mt-5 text-[12px] font-mono text-zinc-500 block uppercase font-bold">
            🎯 Graduate with a complete Startup Automation Playbook customized for YOUR business.
          </div>
        </div>

        {/* Right Bento: Why Founders Are Joining */}
        <div className="bg-orange-50 border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div className="space-y-4">
            <span className="bg-black text-amber-500 font-mono text-[9px] uppercase font-black tracking-widest px-2 py-0.5 rounded ml-0.5">
              COMPETITIVE ADVANTAGE
            </span>
            
            <h3 className="font-syne font-black text-xl uppercase tracking-tight text-orange-950 mt-1">
              🔥 WHY FOUNDERS WITH VISION ARE JOINING
            </h3>

            <p className="text-[14px] font-mono text-orange-950 leading-relaxed font-bold">
              The startups winning today are not hiring faster. They're automating smarter.
            </p>
            
            <p className="text-[13px] font-mono text-orange-905 text-zinc-750 leading-relaxed">
              While others spend hours building basic templates, manually copy-typing emails, scraping websites manually, and entering line-by-line financial metrics... 
              You'll have your highly resilient AI multi-agent workforce executing it for you flawlessly behind the scenes.
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono text-zinc-400 font-black tracking-wider uppercase block">THE AUTOMATION OUTCOME:</span>
              <div className="grid grid-cols-2 gap-2 text-[12px] font-mono text-orange-950 font-bold uppercase">
                <div className="flex items-center gap-1.5"><span className="text-amber-500 font-black">⚡</span> Faster execution</div>
                <div className="flex items-center gap-1.5"><span className="text-amber-500 font-black">⚡</span> Lower overhead & bills</div>
                <div className="flex items-center gap-1.5"><span className="text-amber-500 font-black">⚡</span> Better buyer conversion</div>
                <div className="flex items-center gap-1.5"><span className="text-amber-500 font-black">⚡</span> More time for growth strategy</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-orange-200 mt-5 flex items-center gap-2">
            <Info className="w-4 h-4 text-orange-700 shrink-0" />
            <span className="text-[11px] font-mono text-zinc-650 font-semibold leading-relaxed">
              Designed from validated Levant-to-Gulf playbooks that keep core engineering lean and highly defensible.
            </span>
          </div>
        </div>

      </div>

      {/* ⏰ 4. DETAILED 4-WEEK CURRICULUM TIMELINE NAVIGATION */}
      <div className="bg-white border-4 border-black p-6 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]" id="bootcamp_curriculum_timeline">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b-4 border-black pb-5 mb-6">
          <div>
            <span className="font-mono text-xs font-black text-gray-400 uppercase tracking-widest pl-0.5">SYLLABUS FOCUS</span>
            <h3 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-black mt-1 leading-none">
              THE 4-WEEK INTENSIVE TIMETABLE
            </h3>
          </div>

          <div className="flex border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" id="weeks_navigation_tabs">
            {[1, 2, 3, 4].map((wk) => (
              <button
                key={wk}
                type="button"
                onClick={() => setSelectedWeek(wk)}
                className={`px-4 sm:px-6 py-2.5 font-syne font-black text-xs uppercase tracking-tight transition-all cursor-pointer ${
                  selectedWeek === wk
                    ? "bg-black text-white"
                    : "bg-white text-zinc-500 hover:bg-zinc-50 hover:text-black"
                }`}
              >
                Week {wk}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Week Render Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Week Overview Details */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase text-white bg-black border border-black px-2 py-0.5">
                STAGE PHASE 0{selectedWeek}/04
              </span>
              <span className="text-xs font-mono text-zinc-500">Weekly Target Vitals</span>
            </div>

            <div className="space-y-1">
              <h2 className="font-syne font-black text-xl sm:text-3xl text-orange-600 uppercase tracking-tight">
                {weeksData[selectedWeek - 1].title}
              </h2>
              <p className="font-syne text-[15px] text-black font-extrabold uppercase leading-snug">
                {weeksData[selectedWeek - 1].subtitle}
              </p>
            </div>

            <p className="text-[14px] font-mono text-zinc-650 leading-relaxed font-semibold bg-zinc-50 p-3.5 border-l-4 border-black">
              {weeksData[selectedWeek - 1].vibe}
            </p>

            <div className="pt-2">
              <h4 className="font-syne font-extrabold text-[12px] uppercase text-zinc-500 tracking-wider mb-2">🔥 KEY LESSONS YOU WILL LEARN:</h4>
              <ul className="space-y-2 font-mono text-[14px] text-zinc-800">
                {weeksData[selectedWeek - 1].lessons.map((lesson, index) => (
                  <li key={index} className="flex gap-2 bg-white border border-zinc-200 p-2 hover:border-black transition-all">
                    <span className="text-black font-black shrink-0">🔥</span>
                    <span className="font-extrabold">{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Special Tracks Render for Week 3 */}
            {selectedWeek === 3 && weeksData[2].tracks && (
              <div className="pt-4 border-t border-dashed border-zinc-300">
                <h4 className="font-syne font-extrabold text-[11px] uppercase text-zinc-400 tracking-wider mb-2">SPECIAL MULTI-SECTOR CHANNELS:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {weeksData[2].tracks.map((track, i) => (
                    <div key={i} className="bg-orange-50/40 p-3 border border-orange-200 rounded">
                      <span className="font-syne font-black text-xs uppercase block text-orange-950 font-bold">{track.name}</span>
                      <p className="text-[11.5px] font-mono text-orange-900 mt-1 leading-normal font-semibold">
                        {track.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tools & Vetted Outcomes Sidebar */}
          <div className="lg:col-span-4 bg-zinc-50 border-2 border-black p-5 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[9px] font-mono font-black text-zinc-400 tracking-widest uppercase block mb-1">TOOLS MASTERED</span>
                <div className="flex flex-wrap gap-2 pt-1.5">
                  {weeksData[selectedWeek - 1].tools.map((tool, i) => (
                    <span key={i} className="bg-white border border-zinc-350 p-1.5 px-2.5 font-mono text-[10px] sm:text-[11px] font-extrabold uppercase rounded shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-black">
                      • {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] font-mono font-black text-zinc-400 tracking-widest uppercase block mb-1.5">DELIVERABLE OUTCOME🎯</span>
                <ul className="space-y-2 mt-1">
                  {weeksData[selectedWeek - 1].outcomes.map((outcome, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-amber-500 font-mono text-sm">🎯</span>
                      <span className="text-[13px] font-mono text-zinc-800 font-extrabold leading-tight">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 mt-6 font-mono text-[11px] text-zinc-400 space-y-1 select-none">
              <span className="block uppercase text-zinc-700 font-black">Cohort Graduation Proof</span>
              <p>Each milestone deliverable matches NCEI's 2026 Sandbox framework metrics.</p>
            </div>
          </div>

        </div>
      </div>

      {/* 🏆 5. THE FINAL CHALLENGE & BONUSES COMPONENT PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="bootcamp_capstone_and_bonuses">
        
        {/* Left: The Final Challenge */}
        <div className="lg:col-span-6 bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between" id="capstone_panel">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500 fill-amber-300 stroke-[2.5]" />
              <h3 className="font-syne font-black text-base uppercase text-black tracking-tight">
                🏆 THE FINAL CHALLENGE: THE STARTUP AUTOMATION PLAYBOOK
              </h3>
            </div>

            <p className="text-[14px] font-mono text-zinc-800 leading-relaxed font-semibold">
              This is where everything comes together inside a coherent digital architecture. Every founder or creator presents:
            </p>

            <ul className="space-y-2 font-mono text-[13px] text-zinc-700 font-extrabold pt-1">
              {[
                { title: "🚀 Their AI Startup Operating System", desc: "Unified workspace housing all tools & SOP assets" },
                { title: "🚀 Their Live AI Automations", desc: "Interactive customer intake chatbots & routing gates" },
                { title: "🚀 Their AI Agent Ecosystem", desc: "Linked prompt systems scraping opportunities" },
                { title: "🚀 Their Startup Growth Engine", desc: "Clean programmatic content schedules" },
                { title: "🚀 Their Data Governance Framework", desc: "Procedures checking confidentiality safeguards" },
                { title: "🚀 Their Business Automation Roadmap", desc: "Step-by-step metrics for scaling to the Gulf" }
              ].map((c, idx) => (
                <li key={idx} className="bg-zinc-50 border border-zinc-300 p-2.5 rounded hover:border-black transition-colors">
                  <span className="block text-black font-extrabold uppercase">{c.title}</span>
                  <p className="block font-mono text-[11px] text-zinc-500 mt-0.5">{c.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[11px] font-mono text-zinc-400 mt-4 leading-normal italic">
            * Graduation unlocks immediate eligibility matching for Diaspora Angel networks representing up to $250k initial fresh seed.
          </p>
        </div>

        {/* Right: Bonus Locker */}
        <div className="lg:col-span-6 bg-zinc-50 border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between" id="bonus_toolkit_locker">
          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500">🎁</span>
                <h3 className="font-syne font-black text-md uppercase text-black tracking-tight">
                  THE FOUNDER'S AI TOOLKIT VALUED BONUSES
                </h3>
              </div>
              <span className={`px-2 py-0.5 border text-[9px] font-mono font-black uppercase tracking-tight ${bonusUnlocked ? "bg-emerald-100 text-emerald-800 border-emerald-400" : "bg-red-100 text-red-800 border-red-400"}`}>
                {bonusUnlocked ? "Unencrypted" : "LOCKED"}
              </span>
            </div>

            <p className="text-[13px] font-mono text-zinc-700 leading-snug">
              Unlock our cloneable automation layouts, advanced mega-prompts, and system SOP templates immediately upon submitting your admissions vetting card.
            </p>

            <div className="grid grid-cols-2 gap-2 text-[12px] font-mono text-zinc-800 font-extrabold uppercase">
              <div className="flex items-center gap-1 bg-white p-2 border border-zinc-300"><span className="text-amber-500">💎</span> Mega Prompt Library</div>
              <div className="flex items-center gap-1 bg-white p-2 border border-zinc-300"><span className="text-amber-500">💎</span> AI Marketing Templates</div>
              <div className="flex items-center gap-1 bg-white p-2 border border-zinc-300"><span className="text-amber-500">💎</span> Pitch Deck Prompts</div>
              <div className="flex items-center gap-1 bg-white p-2 border border-zinc-300"><span className="text-amber-500">💎</span> Zapier/Make templates</div>
              <div className="flex items-center gap-1 bg-white p-2 border border-zinc-300"><span className="text-amber-500">💎</span> AI Governance SOPs</div>
              <div className="flex items-center gap-1 bg-white p-2 border border-zinc-300"><span className="text-amber-500">💎</span> Startup Playbooks</div>
            </div>

            {bonusUnlocked ? (
              <div className="bg-emerald-50 border border-emerald-300 p-4 rounded text-xs font-mono text-emerald-950 font-bold space-y-2">
                <div className="flex items-center gap-1.5">
                  <Unlock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>DECRYIPTION SECURE: ALL BOOTCAMP ASSETS UNLOCKED</span>
                </div>
                <p className="leading-relaxed text-[11.5px]">
                  Welcome to the toolkit! Copy clean template strings directly inside your private sandbox window to initialize automation steps immediately.
                </p>
                <div className="flex gap-2 pt-1 font-mono text-[9px] uppercase">
                  <a href="#prompt_library" className="bg-black text-[#adff2f] px-2 py-1 border border-black hover:underline">[ Prompt Packs.zip ]</a>
                  <a href="#zapier_blueprints" className="bg-black text-[#adff2f] px-2 py-1 border border-black hover:underline">[ Zap Templates.json ]</a>
                </div>
              </div>
            ) : (
              <form onSubmit={testUnlockBonus} className="bg-white border border-zinc-300 p-3.5 space-y-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="font-mono text-[9.5px] font-black text-zinc-400 uppercase tracking-wider">Unseal Developer Toolkit Vault</span>
                </div>
                <p className="text-[11.5px] font-mono text-zinc-550 leading-tight">
                  Sign up for the cohort below to automatically unlock, or verify your sandbox code in our admissions framework. Passphrase preset: <strong className="text-black">Z961COMBINATOR</strong>
                </p>
                
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Enter passphrase..."
                    required
                    onChange={(e) => {
                      if (e.target.value.toUpperCase() === "Z961COMBINATOR") {
                        setBonusUnlocked(true);
                      }
                    }}
                    className="flex-1 bg-zinc-50 border border-zinc-400 p-2 text-xs font-mono text-black focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-black text-white hover:bg-zinc-800 text-[10px] font-syne font-black uppercase px-3 cursor-pointer"
                  >
                    Crack Vault
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="pt-4 border-t border-zinc-200 mt-4 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
            <span>UNSEAL ACCESS LEVEL A</span>
            <span>LIFETIME ACCESS TO RESOURCES</span>
          </div>
        </div>

      </div>

      {/* 👥 6. WHO SHOULD JOIN TARGET SUMMARY */}
      <div className="border-4 border-black bg-black text-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]" id="bootcamp_target_demographics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1 space-y-2">
            <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest pl-0.5 block">AUDIENCE FILTER</span>
            <h3 className="font-syne font-black text-2xl sm:text-3xl uppercase leading-none text-white">
              👥 WHO SHOULD ENROLL?
            </h3>
            <p className="text-[13px] font-mono text-zinc-400 leading-normal">
              Any startup operator running transactions or seeking to minimize busy work using intelligence agents should connect immediately:
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Startup Founders", "Solopreneurs", "Creators & Authors",
                "Agency Owners", "Freelancers", "Consultants",
                "E-Commerce Brands", "Startup Teams", "Growth Managers",
                "Future Entrepreneurs", "Software Engineers", "Nomadic Builders"
              ].map((role, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 p-2 flex items-center gap-2 rounded">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-mono text-[11.5px] font-extrabold uppercase text-zinc-200 truncate">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔮 7. THE EXPECTED RESULT TRANSFORMATION */}
      <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between" id="bootcamp_transformation_module">
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 text-black">
            <BarChart2 className="w-6 h-6 text-black shrink-0" />
            <h3 className="font-syne font-black text-lg uppercase text-black tracking-tight">
              🚀 THE EXPECTED OUTCOME & FREEDOM MULTIPLIER
            </h3>
          </div>

          <p className="text-[15px] font-mono text-zinc-800 font-extrabold leading-relaxed">
            By integrating the Startup Automation Playbook, you will stop operating like a single, harried founder wearing 10 complex hats. 
            You will start operating like a mature corporation with an AI-powered automated workforce working behind you 24 hours a day, 7 days a week.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {[
              { title: "LEVERAGE", desc: "Run your startup like a team of fifty with zero fresh overhead." },
              { title: "FREEDOM", desc: "No manual copywriting, scraping, or entry tasks draining your cycles." },
              { title: "VELOCITY", desc: "Produce 30 days of high-attraction marketing in one weekend session." },
              { title: "CONVERSION", desc: "Capture CRM leads and answer support tickets under zero latency." },
              { title: "PROFITS", desc: "Free up continuous capital. Re-invest fresh USD in deep product moats." },
              { title: "AGILITY", desc: "Keep core operational workflows functioning even during domestic network offline intervals." }
            ].map((outcome, idx) => (
              <div key={idx} className="bg-zinc-50 border border-zinc-300 p-4 rounded hover:border-black transition-all">
                <span className="text-xs font-mono font-black text-black uppercase block tracking-wider">⚡ {outcome.title}</span>
                <p className="text-[12.5px] font-mono text-zinc-600 font-extrabold leading-relaxed mt-1">
                  {outcome.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-8 border-t border-zinc-200 mt-8">
          <p className="font-syne font-black text-sm uppercase text-black">
            BUILD SMARTER. MOVE FASTER. AUTOMATE EVERYTHING.
          </p>
        </div>
      </div>

      {/* 📥 8. OFFICIAL COHORT COHORT ENROLLMENT FORM & GENERATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch scrolling-mt-6" id="bootcamp_registration_desk">
        
        {/* Left: Interactive Apply Form */}
        <div className="lg:col-span-7 bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 pb-2 border-b-2 border-black mb-4">
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-300 stroke-[2.5]" />
              <h3 className="font-syne font-black text-base uppercase text-black">
                OFFICIAL COHORT ADMISSIONS PORTAL
              </h3>
            </div>

            {registeredBootcamp ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-300 p-4 text-zinc-950 font-mono text-xs font-bold leading-normal">
                  <div className="flex items-center gap-1.5 text-emerald-800 text-sm mb-1 uppercase">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>Seat Vetting Code Released</span>
                  </div>
                  Thank you! Your preliminary admissions application for the 4-week AI Startup Bootcamp has been logged. Your pass is saved in your local session storage. Download your credential badge on the right:
                </div>
                
                <div className="p-3 bg-zinc-50 border border-zinc-300 font-mono text-xs">
                  <span className="block font-black uppercase text-zinc-500">Applicant Summary:</span>
                  <div className="grid grid-cols-2 gap-2 mt-2 font-bold text-zinc-800">
                    <span>NAME: {registeredBootcamp.fullName}</span>
                    <span>COHORT: {registeredBootcamp.cohortDate}</span>
                    <span>PASSCODE: {registeredBootcamp.passCode}</span>
                    <span>INDUSTRY: {registeredBootcamp.targetIndustry}</span>
                  </div>
                </div>

                <button
                  onClick={handleLeaveBootcamp}
                  type="button"
                  className="text-center hover:text-red-800 text-red-650 font-mono text-[10px] font-black hover:underline cursor-pointer uppercase block pt-2"
                >
                  [ Clear Admission Pass and Re-Register New Application ]
                </button>
              </div>
            ) : (
              <form onSubmit={handleBootcampSubmit} className="space-y-4" id="bootcamp_registration_form">
                <p className="text-[13px] text-zinc-700 font-mono font-bold leading-snug">
                  Apply for the Summer 2026 Bootcamp Cohort. Seat allocation is capped at 30 founders across Lebanon and GCC to maintain direct co-development mentorship.
                </p>

                <div>
                  <label className="block font-mono text-[9px] font-black text-gray-500 uppercase mb-1">FOUNDER FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Charbel Tarabay"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border-2 border-black p-2.5 text-xs font-mono uppercase text-black focus:outline-none placeholder-zinc-300 font-extrabold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-mono text-[9px] font-black text-gray-500 uppercase mb-1">Target Industry / Segment *</label>
                    <select
                      value={targetIndustry}
                      onChange={(e) => setTargetIndustry(e.target.value)}
                      className="w-full bg-white border-2 border-black p-2.5 text-xs font-mono uppercase text-black focus:outline-none cursor-pointer font-bold"
                    >
                      <option value="SaaS">SaaS & B2B Tech</option>
                      <option value="E-Commerce">E-Commerce Retailing</option>
                      <option value="Healthcare">Healthcare Care Tech</option>
                      <option value="AgriTech">AgriTech Yield IoT</option>
                      <option value="Freelance/Agency">Services / Agency</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] font-black text-gray-500 uppercase mb-1">Email Coordinates *</label>
                    <input
                      type="email"
                      required
                      placeholder="E.g., charbel@tarabay.co"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full bg-white border-2 border-black p-2.5 text-xs font-mono text-black focus:outline-none placeholder-zinc-300 font-extrabold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] font-black text-gray-500 uppercase mb-1">Explain Your Startup Vision & Automation Need *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="E.g., Building a specialized multi-agent workflow to automate back-office bookkeeping for Lebanese freelancers."
                    value={startupIdea}
                    onChange={(e) => setStartupIdea(e.target.value)}
                    className="w-full bg-white border-2 border-black p-2.5 text-xs font-mono uppercase text-black focus:outline-none placeholder-zinc-300 font-extrabold resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white border-2 border-black font-syne font-black text-xs uppercase py-3.5 shadow-[3px_3px_0px_0px_rgba(245,158,11,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Submit Vetting & Lock Seat</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </form>
            )}
          </div>

          <div className="pt-4 border-t border-zinc-200 mt-4 text-[10.5px] font-mono text-zinc-500 uppercase">
            ✓ Registration logs directly into NCEI Beirut Sandbox frameworks and alerts the mentor council.
          </div>
        </div>

        {/* Right: Admission Card Credentials Visual representation */}
        <div className="lg:col-span-5 bg-zinc-50 border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between" id="bootcamp_credential_pass">
          <div>
            <div className="flex items-center gap-1.5 text-black border-b-2 border-black pb-2 mb-4">
              <FileText className="w-5 h-5 text-black shrink-0" />
              <h3 className="font-syne font-black text-xs sm:text-sm uppercase tracking-wide">
                COHORT VALIDATION CARD
              </h3>
            </div>

            {registeredBootcamp ? (
              <div className="bg-white border-4 border-black p-4 space-y-4 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" id="bootcamp_vetted_card">
                {/* Visual Accent ticket design patterns */}
                <div className="absolute top-0 right-0 bg-[#adff2f] text-black font-mono text-[8px] font-black tracking-widest px-2 py-0.5 border-b-2 border-l-2 border-black">
                  ISSUED VETTING LOCK
                </div>

                <div className="text-center font-mono text-[9px] font-black text-zinc-300">
                  ★ BOOTCAMP COHORT CARD ★
                </div>

                <div className="flex justify-between items-start pt-2 border-b border-zinc-200 pb-2">
                  <div>
                    <span className="text-[8px] text-zinc-400 font-mono block uppercase">FOUNDER REPRESENTATIVE</span>
                    <span className="font-syne font-black text-lg text-black block tracking-tight uppercase leading-none mt-1">
                      {registeredBootcamp.fullName}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-zinc-400 font-mono block uppercase">ID</span>
                    <span className="font-mono font-black text-xs text-orange-600 bg-orange-50 border border-orange-200 px-1 py-0.2 uppercase">
                      {registeredBootcamp.id}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[8px] text-zinc-400 font-mono block uppercase">VISION / IDEA</span>
                    <span className="font-sans font-bold text-[10px] text-zinc-700 block uppercase leading-tight truncate mt-0.5">
                      {registeredBootcamp.startupIdea}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] text-zinc-400 font-mono block uppercase">TRACK SECTOR</span>
                    <span className="font-sans font-bold text-[10px] text-zinc-700 block uppercase leading-tight truncate mt-0.5">
                      {registeredBootcamp.targetIndustry}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200">
                  <div>
                    <span className="text-[8px] text-zinc-400 font-mono block uppercase">GRAD DATE</span>
                    <span className="font-mono text-[9px] font-black text-black block">AUGUST 2026</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-zinc-400 font-mono block uppercase">SYSTEM VERIFIED</span>
                    <span className="font-mono text-[9px] font-black text-emerald-600 block flex items-center justify-end gap-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>APPROVED</span>
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-dashed border-zinc-300">
                  <div className="text-center font-mono font-black text-[9px] bg-[#121212] text-[#adff2f] p-3 block border border-black uppercase tracking-wider">
                    👉 VETTING TOKEN: {registeredBootcamp.passCode}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border-2 border-dashed border-zinc-300 p-6 flex flex-col justify-center items-center text-center min-h-[220px] relative overflow-hidden" id="blank_admissions_card">
                <Lock className="w-8 h-8 text-zinc-300 animate-pulse" />
                <p className="font-mono text-xs text-zinc-400 uppercase font-black tracking-wide mt-3 pb-1">
                  Credentials Sealed
                </p>
                <p className="text-[11.5px] font-mono text-zinc-400 max-w-xs leading-normal">
                  You must fill out the credentials form on the left first to generate your admissions vetting card and unlock the Mega resources bonus locker!
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-zinc-300 pt-3 mt-4 text-[10px] font-mono text-zinc-500 uppercase flex items-center justify-between">
            <span>COHORT CODES ENCRYPTED</span>
            <span>NCEI LEBANON DESK</span>
          </div>
        </div>

      </div>

    </div>
  );
}
