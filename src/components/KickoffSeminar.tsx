import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, MapPin, Sparkles, ArrowRight, ShieldAlert, Cpu, 
  Workflow, Database, Award, CheckCircle, Search, Users, ExternalLink, 
  FileCheck, TrendingUp, Info, HelpCircle, Clock, LayoutGrid, List, SlidersHorizontal, ChevronDown, ChevronUp, Grid, Tag
} from "lucide-react";

interface KickoffSeminarProps {
  onJoinEcosystem?: () => void;
  onOpenNda?: () => void;
}

export default function KickoffSeminar({ onJoinEcosystem, onOpenNda }: KickoffSeminarProps) {
  // Navigation tabs for the 2 days
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  
  // Interactive strategy search
  const [strategyQuery, setStrategyQuery] = useState("");
  
  // Selected detailed session for modal/popup details
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // --- Grid and Hourly Agenda Layout Filters ---
  const [sessionQuery, setSessionQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [layoutMode, setLayoutMode] = useState<"grid" | "timeline" | "board">("grid");

  // --- Interactive AI Maturity Audit State ---
  const [auditStep, setAuditStep] = useState<"start" | "q1" | "q2" | "q3" | "result">("start");
  const [auditScores, setAuditScores] = useState({
    stack: "",
    content: "",
    automation: ""
  });

  // --- Registration state ---
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regPassGenerated, setRegPassGenerated] = useState(false);
  const [savedPass, setSavedPass] = useState<any>(() => {
    const cached = localStorage.getItem("Z961_seminar_pass");
    return cached ? JSON.parse(cached) : null;
  });

  // --- Seminar Kickoff Countdown ---
  const TARGET_TIME = new Date("2026-06-30T09:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_TIME - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isOver: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isOver: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Seminar detail data objects mirroring OCR exactly
  const day1Schedule = [
    {
      id: "s1-1",
      time: "09:00",
      title: "Registration & Coffee Reception",
      type: "Networking",
      badgeColor: "bg-zinc-100 text-black border-black",
      focus: "Networking reception at Beirut Digital District (BDD)",
      details: "Meet fellow Lebanese tech developers, startup builders, and returning diaspora advisors. Warm up with artisan single-origin Lebanese roasts.",
      speaker: "BDD Welcome Team"
    },
    {
      id: "s1-2",
      time: "09:30",
      title: "Opening Keynote: Bridging Local Innovation with Global Capital",
      type: "Keynote",
      badgeColor: "bg-black text-white border-black",
      focus: "Living in a VUCA world & Understanding the 961 Investment Landscape vs Competitive Positioning",
      details: "A critical roadmap for navigating macroeconomic turbulence. Position Lebanese remote tech squads to overcome transactional friction, leverage diaspora gates, and command Western venture pricing.",
      speaker: "Z961 Founding Partners"
    },
    {
      id: "s1-3",
      time: "10:50",
      title: "Panel 1: What Investors Are Shopping For (The VC 2026 Playbook)",
      type: "Panel",
      badgeColor: "bg-orange-50 text-orange-850 border-orange-500",
      focus: "The advent of socialpreneur vs high clusters strategies — How to secure VC & Angel investment in 2026",
      details: "Moving beyond 'AI-enabled' vanity features. Focus on AI-Native Operations, Vertical SaaS prototypes, and high-margin cash flows solving deep infrastructure pains.",
      speaker: "Diaspora Capital Counsel & Venture Leads"
    },
    {
      id: "s1-4",
      time: "11:55",
      title: "Mid-Morning Break & Coffee",
      type: "Break",
      badgeColor: "bg-zinc-150 text-gray-700 border-zinc-300",
      focus: "Peer-to-peer engineering chat",
      details: "Exchange GitHub handles, share tech stacks, and brainstorm early-stage leverage points.",
      speaker: "Catering Crew"
    },
    {
      id: "s1-5",
      time: "12:15",
      title: "Panel 2: Startups Success Stories (The StartUp 2026 Playbook)",
      type: "Panel",
      badgeColor: "bg-blue-50 text-blue-800 border-blue-500",
      focus: "Refining your narrative for international investors",
      details: "How Lebanon's top survivability pioneers pivoted amidst severe localized bottlenecks to deliver mission-critical offshore services.",
      speaker: "Featured Founders from Toters, Purse Pay & Synkers"
    },
    {
      id: "s1-6",
      time: "13:00",
      title: "Networking Lunch with Table Themes",
      type: "Lunch",
      badgeColor: "bg-green-55 bg-zinc-50 text-zinc-900 border-zinc-800",
      focus: "Structured 'Table Themes' for specific industry Verticals",
      details: "Connect with tables reserved under: Cross-Border Fintech, AI-Native Agencies, B2B Automatons, and Resilience Hardware.",
      speaker: "Moderated by Sector Experts"
    },
    {
      id: "s1-7",
      time: "14:00",
      title: "Panel 3: Going Global from Beirut — How to Network with the 'Open World'",
      type: "Panel",
      badgeColor: "bg-purple-50 text-purple-800 border-purple-500",
      focus: "Legal structures, remote operations, and cross-border payment compliance",
      details: "How Lebanese startups survive and thrive under volatile structural margins. Highlights agility and resilience as massive competitive moats valued in global venture circles.",
      speaker: "Corporate Attorneys & Wise/Stripe Integration Gurus"
    },
    {
      id: "s1-s8",
      time: "15:30",
      title: "High-Attraction Projects for Lebanon Pitch",
      type: "Pitch Session",
      badgeColor: "bg-red-50 text-red-800 border-red-500",
      focus: "Pitches from top Lebanese startups demonstrating resilience & success stories",
      details: "Live feedback from panels of international angel investors. Discover where actual capital flows have established scalable footprints in 2026.",
      speaker: "Ecosystem Pioneers"
    },
    {
      id: "s1-9",
      time: "16:50",
      title: "Closing Keynote & Z961 Award Ceremony",
      type: "Awards",
      badgeColor: "bg-yellow-50 text-yellow-905 border-yellow-600",
      focus: "Celebrating resilience, growth, and excellence",
      details: "Official citation of the most capital-efficient, high-traction remote builders demonstrating stellar growth metrics over the year.",
      speaker: "NCEI Steering Board"
    }
  ];

  const day2Schedule = [
    {
      id: "s2-1",
      time: "09:00",
      title: "Workshop Kickoff: AI-Powered Entrepreneurship",
      type: "Workshop",
      badgeColor: "bg-black text-white border-black",
      focus: "Welcome, setting metrics/goals, and initial 'AI Maturity' audit",
      details: "Establish baseline operating metrics. Discover where manual bottlenecks reside and launch private sandbox environments.",
      speaker: "AI Engineering Mentors"
    },
    {
      id: "s2-2",
      time: "09:30",
      title: "Module 1: The AI Stack (The Brain of Your Business)",
      type: "Module Session",
      badgeColor: "bg-sky-50 text-sky-850 border-sky-500",
      focus: "Mapping your business to LLMs, custom Agents, and programmatic workflows",
      details: "Focus: Choosing the right models for the right tasks. Key Learning: Distinguishing between general assistants (ChatGPT, Claude) and specialized orchestration agents (Gumloop, custom GPT loops). Output: A custom AI Tech Stack blueprint document.",
      speaker: "Venture AI Architects"
    },
    {
      id: "s2-3",
      time: "10:45",
      title: "Coffee Break & Peer Tech-Sharing",
      type: "Break",
      badgeColor: "bg-zinc-100 text-black border-black",
      focus: "Code & workflow sharing",
      details: "Compare API rate limits, model latency, prompt schemas, and memory constraints with fellow attendees.",
      speaker: "Technical Leads"
    },
    {
      id: "s2-4",
      time: "11:00",
      title: "Module 2: Content & Branding (Efficiency at Scale)",
      type: "Module Session",
      badgeColor: "bg-pink-50 text-pink-850 border-pink-500",
      focus: "Turning one single idea into 20 coherent brand assets safely",
      details: "Focus: Heavy lifting for corporate marketing with 10% human oversight. Tools covered: Jasper AI, Canva (AI-infused), and Surfer SEO. Key Learning: Retaining rigorous, high-contrast, professional brand-voice across multi-node social channels.",
      speaker: "Programmatic Marketers"
    },
    {
      id: "s2-5",
      time: "12:15",
      title: "Working Lunch: Prompt Engineering Roundtables",
      type: "Lunch / Lab",
      badgeColor: "bg-emerald-50 text-emerald-850 border-emerald-500",
      focus: "Solving specific business problems together inside playground sandboxes",
      details: "Sit at dedicated roundtables to craft, test, and validate multi-step logic flows for real Lebanese business use cases.",
      speaker: "Lead Prompters"
    },
    {
      id: "s2-6",
      time: "13:30",
      title: "Module 3: AI Automation (The Hands of Your Business)",
      type: "Module Session",
      badgeColor: "bg-purple-50 text-purple-850 border-purple-500",
      focus: "Removing manual friction using programmatic web handlers",
      details: "Focus: Autonomous lead-generation, customer CRM routing, and automated email validation pipelines. Tools: Zapier with AI Copilot, Make.com. Key Learning: Capturing, qualifying, and assigning leads in real time without human latency.",
      speaker: "Systems Integration Gurus"
    },
    {
      id: "s2-7",
      time: "14:45",
      title: "Mid-Afternoon Coffee Break",
      type: "Break",
      badgeColor: "bg-zinc-100 text-black border-black",
      focus: "Deep-work sandbox setup",
      details: "Refuel and gear up for the strategy compilation session.",
      speaker: "Catering Team"
    },
    {
      id: "s2-8",
      time: "15:00",
      title: "Module 4: Data & Strategy (The Vision of Your Business)",
      type: "Module Session",
      badgeColor: "bg-indigo-50 text-indigo-850 border-indigo-500",
      focus: "Turning cold data into high-value executive intelligence reports",
      details: "Focus: Rapid parsing of financial sheets, CSV customer records, and competitor reports. Tools: NotebookLM for deep research, SheetAI.app for dynamic manipulation. Key Learning: Convert raw metrics into clean investor-ready pitch decks in minutes.",
      speaker: "Data Operations Leads"
    },
    {
      id: "s2-9",
      time: "16:15",
      title: "Live Demos & Constructive Feedback",
      type: "Demo Panel",
      badgeColor: "bg-indigo-100 text-black border-black",
      focus: "Participants present one 'AI Automated Workflow' built today",
      details: "Showcase raw automation solutions. Critical feedback on security, audit trails, prompt reliability, and token efficiency from panel mentors.",
      speaker: "Attendees & Jury Panel"
    },
    {
      id: "s2-10",
      time: "16:45",
      title: "Closing Keynote: Staying Ahead in the 2026 AI Landscape",
      type: "Keynote",
      badgeColor: "bg-black text-white border-black",
      focus: "Future-proofing operations against sudden model shifts",
      details: "How local Lebanese ventures can maintain relevance when core generative tools updates occur. Strategies for protecting intellectual property.",
      speaker: "Z961 Tech Director"
    },
    {
      id: "s2-11",
      time: "17:00",
      title: "Networking Mixer",
      type: "Networking",
      badgeColor: "bg-zinc-100 text-black border-zinc-400",
      focus: "Solidify partnerships over refreshments",
      details: "Sign agreements, exchange contacts, and celebrate a rigorous 2-day marathon.",
      speaker: "Ecosystem Members"
    }
  ];

  // Specific strategic insights mapping OCR
  const strategicPillars = [
    {
      title: "1. 961 Investment Landscape & Position",
      category: "landscape",
      items: [
        {
          heading: "The Socialpreneur vs High-Cluster Strategy",
          detail: "Balancing high societal impact with rigorous cluster specialization. Lebanese startups must target structural niches rather than broad consumer plays."
        },
        {
          heading: "Target Fintech & Digital Infrastructure",
          detail: "In 2026, international investors prioritize startups that bypass regional transactional blocks. Focus on digital remittance setups, international payment routing, and resilient cloud tools."
        },
        {
          heading: "Leverage Diaspora Connection (LIFE)",
          detail: "Organizations like LIFE are vital. Connect directly with highly-placed Lebanese founders in major financial capitals. Always present investment asks around the broader MENA regional market, not just the local territory."
        },
        {
          heading: "Utilize Pre-Vetted Official Channels",
          detail: "Secure institutional-ready stampings. Legitimacy and active audit trails are non-negotiable when dealing with foreign partners."
        }
      ]
    },
    {
      title: "2. The VC 2026 Playbook Checklist",
      category: "playbook",
      items: [
        {
          heading: "AI-Native Operations",
          detail: "Investors are moving away from surface-level 'AI-enabled' buttons. They seek AI-Native Agencies: hyper-efficient entities utilizing micro LLM grids to handle massive deliverables with tiny headcount."
        },
        {
          heading: "The 'Company Brain' Architecture",
          detail: "High demand exists for systems mapping a company's custom knowledge flows — combining Slack repositories, legacy docs, and email silos into structured queryable nodes."
        },
        {
          heading: "Capital Efficiency Over Vanity Metrics",
          detail: "In 2026, growth-at-all-costs is over. Focus heavily on pristine Unit Economics (CAC, LTV, churn rate, and immediate routes to profitability). Prove you are essential infrastructure rather than a discretionary luxury."
        }
      ]
    },
    {
      title: "3. Transatlantic Networking Strategies",
      category: "networking",
      items: [
        {
          heading: "The 'Agent-Partner' Strategy",
          detail: "If seeking international backers, recruit a certified trust intermediary or leverage international programs (like the U.S. Commercial Service's 'Gold Key' system) to pre-validate your operations to outsiders."
        },
        {
          heading: "Remote-First Transparency standards",
          detail: "Keep financial accounts, cap tables, and legal compliance structures completely transparent and audit-ready via digitized data room tools."
        },
        {
          heading: "Problem-Solving Narrative Focus",
          detail: "Frame the volatility of the Lebanese market as a rigorous testing suite. If a startup thrives in Beirut's dynamic margins, it signals extreme agility, operational resilience, and cost discipline to global investors."
        },
        {
          heading: "A Pristine Digital Footprint",
          detail: "Your online footprint is your resume. Decks and websites must speak international venture language fluently, highlighting KPIs, total addressable market (TAM), and unit margins rather than abstract social slogans."
        }
      ]
    },
    {
      title: "4. Areas Of High Attraction",
      category: "opportunity",
      items: [
        {
          heading: "Cross-Border FinTech Rails",
          detail: "Build secure transaction pipelines bridging Lebanese providers directly with GCC/global markets to ensure fast clearance times."
        },
        {
          heading: "Automated B2B Services",
          detail: "Use autonomous agents to manage complex back-office workflows (compliance routing, bookkeeping, first-line support) for GCC regional companies."
        },
        {
          heading: "Resilience Technology",
          detail: "Pioneering backup power microgrids, off-grid telemetry nodes, or decentralized remote office networks which represent critical operational moats."
        }
      ]
    },
    {
      title: "5. The Investor-Ready Data Room",
      category: "dataroom",
      items: [
        {
          heading: "Verified Digital Cap Table",
          detail: "Move off erratic Excel sheets immediately. Deploy reliable automated equity systems (Carta, Pulley, Cake) to verify ownership clean of complications."
        },
        {
          heading: "Financial Integrity & Audits",
          detail: "Ensure you maintain professionally compiled, audited balance sheets tracking the last 3 fiscal periods, paired with an accurate monthly burn-rate forecast."
        }
      ]
    }
  ];

  // Seminar Registration Submit Action
  const handleRegisterSeminarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      alert("Please provide at least Name and Email address.");
      return;
    }
    const ticketId = "Z961-PASS-" + Math.floor(100000 + Math.random() * 900000);
    const passObj = {
      ticketId,
      name: regName,
      email: regEmail,
      company: regCompany ? regCompany : "Independent Talent",
      dateCreated: new Date().toLocaleDateString()
    };
    localStorage.setItem("Z961_seminar_pass", JSON.stringify(passObj));
    setSavedPass(passObj);
    setRegPassGenerated(true);
  };

  const handleCancelPass = () => {
    localStorage.removeItem("Z961_seminar_pass");
    setSavedPass(null);
    setRegName("");
    setRegEmail("");
    setRegCompany("");
    setRegPassGenerated(false);
  };

  // AI Maturity Audit Simulator calculations
  const handleAuditPick = (key: "stack" | "content" | "automation", val: string, nextStep: any) => {
    setAuditScores(prev => ({ ...prev, [key]: val }));
    setAuditStep(nextStep);
  };

  const calculateAuditScore = () => {
    const { stack, content, automation } = auditScores;
    let rank = "FOUNDATION BUILDER";
    let desc = "Your business structure mainly operates with general-purpose assistants. You rely on manual copy-pasting for marketing assets and have few programmatic automations connected to your core delivery systems.";
    let stackRec = "Deploy centralized agent interfaces (e.g., custom GPT nodes) and begin tracking model costs. Integrate standard API endpoints rather than web interface manual tasks.";
    
    if (stack === "agents" || content === "semi" || automation === "zapier") {
      rank = "OPTIMIZED HYBRID OPERATOR";
      desc = "You recognize the immense power of system modularity. You leverage basic AI integrations to write text fragments and have a few automated hooks linking lead spreadsheets directly into email triggers.";
      stackRec = "Migrate to multi-step programmatic pipelines using custom platforms (Make.com/Zapier). Move to specialized API workflows using specialized models for complex market report synthesis.";
    }

    if (stack === "agents" && content === "automated" && automation === "zapier") {
      rank = "AI-NATIVE PIONEER (+961 AGILITY)";
      desc = "You meet the highest-tier VC 2026 paradigm. Your team runs as a high-density, low-headcount agency where LLMs act as the primary engines of core B2B service delivery, totally integrated with secure knowledge repositories.";
      stackRec = "Build deep proprietary 'Company Brain' interfaces mapping historical database files directly to your private local execution loops. Safeguard your data sovereignty and prepare for institutional due diligence.";
    }

    return { rank, desc, stackRec };
  };

  const auditResult = calculateAuditScore();

  // Filter strategy items based on user search query
  const filteredStrategies = strategicPillars.filter(pillar => {
    if (!strategyQuery) return true;
    const query = strategyQuery.toLowerCase();
    return (
      pillar.title.toLowerCase().includes(query) ||
      pillar.items.some(
        item => 
          item.heading.toLowerCase().includes(query) || 
          item.detail.toLowerCase().includes(query)
      )
    );
  });

  const matchCategory = (sessionType: string, tabValue: string) => {
    if (tabValue === "ALL") return true;
    const normalizedType = sessionType.toLowerCase();
    if (tabValue === "KEYNOTE") {
      return normalizedType.includes("keynotes") || normalizedType.includes("keynote") || normalizedType.includes("awards");
    }
    if (tabValue === "PANEL") {
      return normalizedType.includes("panel") || normalizedType.includes("pitch") || normalizedType.includes("demo");
    }
    if (tabValue === "WORKSHOP") {
      return normalizedType.includes("workshop") || normalizedType.includes("module") || normalizedType.includes("lab");
    }
    if (tabValue === "NETWORKING") {
      return normalizedType.includes("networking") || normalizedType.includes("break") || normalizedType.includes("lunch") || normalizedType.includes("reception");
    }
    return true;
  };

  const selectedSession = [...day1Schedule, ...day2Schedule].find(s => s.id === selectedSessionId);

  const currentSchedule = activeDay === 1 ? day1Schedule : day2Schedule;

  const filteredSessions = currentSchedule.filter(session => {
    if (!matchCategory(session.type, selectedCategory)) {
      return false;
    }
    if (sessionQuery.trim()) {
      const q = sessionQuery.toLowerCase();
      return (
        session.title.toLowerCase().includes(q) ||
        session.focus.toLowerCase().includes(q) ||
        session.details.toLowerCase().includes(q) ||
        session.speaker.toLowerCase().includes(q) ||
        session.time.toLowerCase().includes(q) ||
        session.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 text-black font-sans animate-fade-in" id="kickoff_seminar_view">
      
      {/* Banner / Header */}
      <div className="bg-black text-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" id="seminar_hero_wrapper">
        <div className="absolute top-2 right-2 bg-red-600 text-white font-mono text-[9px] font-black px-2.5 py-1 tracking-widest border border-red-650 animate-pulse z-10">
          OFFICIAL INVITATION: JUNE 30 & JULY 1
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-color-dodge bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-yellow-405 fill-yellow-405" />
            <span className="font-mono text-xs font-black text-zinc-300 uppercase tracking-widest">Z961-Combinator Exchange</span>
          </div>
          
          <h2 className="font-syne font-black text-2xl sm:text-5xl uppercase tracking-tight leading-none mb-4">
            UNLOCKING LEBANON'S VENTURE POTENTIAL
          </h2>
          
          <p className="text-[17px] sm:text-[19px] font-mono text-gray-300 uppercase tracking-wide font-extrabold max-w-3xl leading-relaxed">
            Bridging Local Engineering Excellence with Global Venture Capital — 2-Day Executive Seminar & Hands-On AI scaling Workshop.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-zinc-800 text-xs text-gray-300 font-mono">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>JUNE 30TH – JULY 1ST, 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>BEIRUT DIGITAL DISTRICT (BDD), LEBANON</span>
              </div>
            </div>

            {/* Micro Live Status Indicator */}
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] uppercase font-bold text-zinc-300">Countdown Active</span>
            </div>
          </div>

          {/* Real-time Kickoff Countdown */}
          <div className="mt-6 bg-[#adff2f] text-black border-2 border-black p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" id="seminar_kickoff_countdown">
            <div className="flex items-center gap-2 shrink-0">
              <Clock className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
                SEMINAR KICKOFF COUNTDOWN:
              </span>
            </div>
            {timeLeft.isOver ? (
              <span className="font-syne font-black text-xs sm:text-sm uppercase tracking-tight bg-black text-white px-3 py-1">
                SEMINAR IS LIVE IN BEIRUT
              </span>
            ) : (
              <div className="flex items-center gap-4 text-center font-mono select-none">
                <div id="countdown_days" className="min-w-[40px]">
                  <span className="text-xl sm:text-2xl font-black block leading-none">{String(timeLeft.days).padStart(2, "0")}</span>
                  <span className="text-[9px] font-bold text-zinc-700 uppercase">Days</span>
                </div>
                <span className="text-xl sm:text-2xl font-black block leading-none text-zinc-550">:</span>
                <div id="countdown_hours" className="min-w-[40px]">
                  <span className="text-xl sm:text-2xl font-black block leading-none">{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span className="text-[9px] font-bold text-zinc-700 uppercase">Hrs</span>
                </div>
                <span className="text-xl sm:text-2xl font-black block leading-none text-zinc-550">:</span>
                <div id="countdown_minutes" className="min-w-[40px]">
                  <span className="text-xl sm:text-2xl font-black block leading-none">{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span className="text-[9px] font-bold text-zinc-700 uppercase">Mins</span>
                </div>
                <span className="text-xl sm:text-2xl font-black block leading-none text-zinc-550">:</span>
                <div id="countdown_seconds" className="min-w-[40px]">
                  <span className="text-xl sm:text-2xl font-black block leading-none text-rose-650 font-extrabold">{String(timeLeft.seconds).padStart(2, "0")}</span>
                  <span className="text-[9px] font-bold text-zinc-700 uppercase">Secs</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TWO COLUMN SUMMARY & QUICK REGISTER PASS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="seminar_intro_grid">
        
        {/* Rationale and Overview */}
        <div className="lg:col-span-7 bg-white border-2 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-4" id="seminar_rationale_box">
          <h3 className="font-syne font-bold text-lg sm:text-xl uppercase tracking-tight text-black border-b border-black pb-2 flex items-center gap-2">
            <span>The Exchange Rationale</span>
          </h3>
           <p className="text-[21px] leading-relaxed text-gray-800 font-medium normal-case select-text">
            While local legacy frameworks continue operating in isolation, the offshore venture marketplace has pivoted towards extreme programmatic efficiency. The Lebanese ecosystem possesses a unique, highly-resourced advantage: a massive talent pool of remote software engineers fluent in modern system architectures and accustomed to handling operations in highly volatile (VUCA) conditions.
          </p>
          
          <blockquote className="border-l-4 border-black pl-3 py-1 bg-zinc-50 font-mono text-[20px] font-bold text-gray-700 uppercase tracking-tight leading-snug">
            "THE INTENSITY OF THE PROBLEMS EXPERIENCED IN BEIRUT CREATES AN OPERATIONAL COMPETITIVE MOAT. SURVIVAL & RESILIENCE IN VOLATILE MARGINS ARE HIGHLY VALUED COMPETENCIES IN THE GLOBAL VENTURE COMMUNITY."
          </blockquote>
          
          <p className="text-[21px] leading-relaxed text-gray-800 font-medium normal-case select-text">
            This two-day event brings international investors, diaspora advisors from LIFE, and local startup pioneers under one roof to forge clean operational pipelines. We move beyond general theoretical discussion, offering actionable checklists to package, vet, and integrate your codebases directly into the global capital streams.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="bg-zinc-50 border border-black p-3" id="feat_day1_card">
              <span className="font-mono text-[10px] bg-black text-white px-1.5 py-0.5 font-bold">DAY ONE Focus</span>
              <h4 className="font-syne font-bold text-xs uppercase mt-2">Venture Economics Playbook</h4>
              <p className="text-[19px] text-gray-650 font-mono mt-1 font-bold leading-tight">DIASPORA NETWORKING, DATA ROOM DUE DILIGENCE, & MENA SCALING STRATEGIES</p>
            </div>
            <div className="bg-zinc-50 border border-black p-3" id="feat_day2_card">
              <span className="font-mono text-[10px] bg-orange-600 text-white px-1.5 py-0.5 font-bold">DAY TWO Focus</span>
              <h4 className="font-syne font-bold text-xs uppercase mt-2">AI-Powered scale workshop</h4>
              <p className="text-[19px] text-gray-650 font-mono mt-1 font-bold leading-tight">HANDS-ON BLUEPRINTS: ZAPIER RUNS, KNOWLEDGE BRAINS, & CONTENT SYSTEMS</p>
            </div>
          </div>
        </div>

        {/* Seminar Pass / Registration Ticket Module */}
        <div className="lg:col-span-5 bg-zinc-50 border-2 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]" id="seminar_passenger_module">
          <div className="flex items-center gap-1.5 text-black border-b border-black pb-2 mb-4">
            <FileCheck className="w-5 h-5 text-black shrink-0" />
            <h3 className="font-syne font-black text-xs sm:text-sm uppercase tracking-wide">
              Ecosystem Boarding Pass
            </h3>
          </div>

          {savedPass ? (
            <div className="bg-white border-2 border-dashed border-black p-4 space-y-3 relative overflow-hidden" id="registered_pass_box">
              {/* Retro Ticket Cutouts */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-zinc-55 bg-zinc-50 border-r-2 border-black -translate-y-1/2"></div>
              <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-zinc-55 bg-zinc-50 border-l-2 border-black -translate-y-1/2"></div>
              
              <div className="text-center font-mono text-[10px] font-black text-zinc-400 select-none pb-1 border-b border-zinc-200">
                ★ OFFICIAL ENTRANCE PERMIT ★
              </div>
              
              <div className="flex justify-between items-start pt-2">
                <div>
                  <span className="text-[9px] text-gray-400 font-mono block">PASSENGER NAME</span>
                  <span className="font-syne font-bold text-sm text-black block tracking-tight uppercase leading-none mt-0.5">{savedPass.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gray-400 font-mono block">PERMIT ID</span>
                  <span className="font-mono font-bold text-xs text-orange-700 bg-orange-50 border border-orange-200 px-1 py-0.2 select-text">{savedPass.ticketId}</span>
                </div>
              </div>

              <div>
                <span className="text-[9px] text-gray-400 font-mono block">ORGANIZATION</span>
                <span className="font-sans font-bold text-[11px] text-gray-800 block uppercase leading-tight mt-0.5">{savedPass.company}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200">
                <div>
                  <span className="text-[9px] text-gray-400 font-mono block">DATE issued</span>
                  <span className="font-mono text-[10px] font-black text-black block">{savedPass.dateCreated}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gray-400 font-mono block">SECTIONS</span>
                  <span className="font-mono text-[9px] font-black text-black block">FULL 2-DAY ACCESS</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-3">
                <div className="text-center text-[9px] font-mono font-bold bg-zinc-100 border border-zinc-300 p-2 text-zinc-650 uppercase">
                  ✓ Pre-registration verified. Show this pass at BDD entrance table on June 30.
                </div>
                <button
                  onClick={handleCancelPass}
                  type="button"
                  className="text-center hover:text-red-750 text-red-600 font-mono text-[9px] font-black hover:underline cursor-pointer uppercase py-1"
                >
                  [ Revoke Registration & Reserve Spot Again ]
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegisterSeminarSubmit} className="space-y-3" id="seminar_register_form">
              <p className="text-[19px] text-gray-700 font-mono leading-tight uppercase font-bold mb-2 animate-pulse" style={{ animationDuration: '3s' }}>
                Secure your seat and receive your printable PDF pass instantly. Registration is free for verified Lebanese builders & diaspora agents.
              </p>
              
              <div>
                <label className="block font-mono text-[9px] font-black text-gray-500 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Charbel Tarazi"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-white border-2 border-black p-2 text-xs font-mono uppercase text-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] font-black text-gray-500 uppercase mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  placeholder="charbel@z961devs.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-white border-2 border-black p-2 text-xs font-mono uppercase text-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] font-black text-gray-500 uppercase mb-1">Company / Startup / Venture Idea</label>
                <input
                  type="text"
                  placeholder="E.g., RemitShield SaaS"
                  value={regCompany}
                  onChange={(e) => setRegCompany(e.target.value)}
                  className="w-full bg-white border-2 border-black p-2 text-xs font-mono uppercase text-black focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white border-2 border-black font-syne font-black text-xs uppercase py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Generate Boarding Pass</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* DUAL-DAY TAB SYSTEM FOR EXTREMELY DETAILED CONFERENCE AGENDA */}
      <div className="bg-white border-4 border-black p-6 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]" id="agenda_full_block">
        
        {/* Module Title and Navigation Switcher */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b-4 border-black pb-5 mb-6" id="agenda_title_bar">
          <div>
            <span className="font-mono text-xs font-black text-gray-500 uppercase tracking-widest pl-0.5">THE SCHEDULE</span>
            <h3 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-black leading-none mt-1">
              CONFERENCE PROGRAM
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-3" id="agenda_days_toggle_wrapper">
            <div className="flex border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" id="agenda_days_toggle">
              <button
                onClick={() => {
                  setActiveDay(1);
                  setSelectedSessionId(null);
                }}
                className={`px-4 sm:px-6 py-2.5 font-syne font-black text-xs uppercase tracking-tight transition-all cursor-pointer ${
                  activeDay === 1
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-zinc-100"
                }`}
              >
                DAY 1: JUNE 30TH (ECOSYSTEM EXCHANGE)
              </button>
              <button
                onClick={() => {
                  setActiveDay(2);
                  setSelectedSessionId(null);
                }}
                className={`px-4 sm:px-6 py-2.5 font-syne font-black text-xs uppercase tracking-tight transition-all cursor-pointer ${
                  activeDay === 2
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-zinc-100"
                }`}
              >
                DAY 2: JULY 1ST (AI WORKSHOP)
              </button>
            </div>
          </div>
        </div>

        {/* Day Header Subtitle */}
        {activeDay === 1 && (
          <div className="mb-6 p-4 bg-zinc-50 border-2 border-black animate-fade-in" id="day1_narrative">
            <h4 className="font-syne font-extrabold text-sm uppercase text-black">THEME: BRIDGING LOCAL INNOVATION WITH GLOBAL CAPITAL</h4>
            <p className="text-[21px] normal-case text-gray-700 leading-relaxed font-sans font-medium mt-1">
              Day 1 tackles the foundational venture mechanisms necessary to attract diaspora capital. We examine the exact metrics top investors look for in Lebanese teams, map diaspora relationships, and build a localized structural narrative that proves robustness under hyperinflation and logistical issues.
            </p>
          </div>
        )}

        {activeDay === 2 && (
          <div className="mb-6 p-4 bg-orange-50 border-2 border-orange-500 animate-fade-in" id="day2_narrative">
            <h4 className="font-syne font-extrabold text-sm uppercase text-black text-orange-950">WORKSHOP TITLE: AI-POWERED ENTREPRENEURSHIP — ACCELERATING SCALE IN 2026</h4>
            <p className="text-[21px] normal-case text-orange-900 leading-relaxed font-sans font-medium mt-1">
              Subtitle: "Building Autonomous Workflows & Data-Driven Growth". Day 2 shifts from theoretical framework to immediate deep-work application. Learn exactly how to choose models programmatically, automate content voice pipelines, design CRM funnels, and construct investor-ready data rooms with 1/10th of typical headcounts.
            </p>
          </div>
        )}

        {/* CONTROLS BAR: SEARCH, CATEGORY PILLS, AND LAYOUT TOGGLES */}
        <div className="bg-zinc-50 border-2 border-black p-4 mb-6 space-y-4" id="agenda_advanced_controls">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search panels, workshops, topics, or speakers..."
                value={sessionQuery}
                onChange={(e) => setSessionQuery(e.target.value)}
                className="w-full bg-white border-2 border-black pl-10 pr-4 py-2 text-xs font-mono uppercase text-black focus:outline-none placeholder-zinc-400"
              />
              {sessionQuery && (
                <button 
                  onClick={() => setSessionQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black font-mono text-[10px] font-bold"
                >
                  [CLEAR]
                </button>
              )}
            </div>

            {/* Layout Mode Toggles */}
            <div className="flex items-center gap-2 border-2 border-black p-1 bg-white" id="layout_mode_switcher">
              <span className="font-mono text-[9px] font-black text-gray-500 uppercase px-2 hidden sm:inline">VIEW LAYOUT:</span>
              <button
                onClick={() => setLayoutMode("grid")}
                className={`flex items-center gap-1 px-3 py-1.5 font-mono text-[10px] font-black uppercase transition-all cursor-pointer ${
                  layoutMode === "grid"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-zinc-100"
                }`}
                title="Bento Box Grid Layout"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bento Grid</span>
              </button>
              <button
                onClick={() => setLayoutMode("timeline")}
                className={`flex items-center gap-1 px-3 py-1.5 font-mono text-[10px] font-black uppercase transition-all cursor-pointer ${
                  layoutMode === "timeline"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-zinc-100"
                }`}
                title="Hourly Timeline Grid"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Hour Grid</span>
              </button>
              <button
                onClick={() => setLayoutMode("board")}
                className={`flex items-center gap-1 px-3 py-1.5 font-mono text-[10px] font-black uppercase transition-all cursor-pointer ${
                  layoutMode === "board"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-zinc-100"
                }`}
                title="Categorized Track Grid"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 animate-pulse" />
                <span>Track Board</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-200">
            {[
              { id: "ALL", label: "All Sessions", count: currentSchedule.length },
              { id: "KEYNOTE", label: "Keynotes & Awards", count: currentSchedule.filter(s => matchCategory(s.type, "KEYNOTE")).length },
              { id: "PANEL", label: "Panels & Demos", count: currentSchedule.filter(s => matchCategory(s.type, "PANEL")).length },
              { id: "WORKSHOP", label: "Workshops & Modules", count: currentSchedule.filter(s => matchCategory(s.type, "WORKSHOP")).length },
              { id: "NETWORKING", label: "Networking & Breaks", count: currentSchedule.filter(s => matchCategory(s.type, "NETWORKING")).length },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 border-2 border-black font-mono text-[9px] sm:text-[10px] font-extrabold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-black text-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-black hover:bg-zinc-100"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 text-[8px] font-bold border ${
                  selectedCategory === cat.id ? "bg-zinc-800 text-white border-zinc-700" : "bg-zinc-100 text-zinc-650 border-zinc-300"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* AGENDA SECTION RENDER DISPATCHER */}
        
        {/* Empty State */}
        {filteredSessions.length === 0 && (
          <div className="border-2 border-dashed border-zinc-300 p-12 text-center bg-zinc-50 text-gray-500 space-y-3" id="agenda_empty_state">
            <SlidersHorizontal className="w-8 h-8 text-zinc-400 mx-auto" />
            <h4 className="font-syne font-black text-sm uppercase text-black">No Matching Sessions Found</h4>
            <p className="text-xs normal-case text-gray-500 max-w-md mx-auto">
              We couldn't find any panels or workshops matching your search "<strong>{sessionQuery}</strong>" or category selection for Day {activeDay}. Try adjusting your filters or switching days.
            </p>
            <button
              onClick={() => {
                setSessionQuery("");
                setSelectedCategory("ALL");
              }}
              className="bg-black text-white border-2 border-black font-syne font-black text-xs uppercase px-4 py-1.5 hover:bg-zinc-800 transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* layoutMode === "grid" (Multi-column Bento grid) */}
        {layoutMode === "grid" && filteredSessions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="agenda_grid_bento">
            {filteredSessions.map((session) => {
              const isExpanded = selectedSessionId === session.id;
              return (
                <div
                  key={session.id}
                  className={`border-4 border-black p-5 flex flex-col justify-between transition-all relative ${
                    isExpanded
                      ? "bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-[1.01]"
                      : "bg-white hover:bg-zinc-50/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                  id={`grid_session_${session.id}`}
                >
                  <div>
                    {/* Time & Sticker tag row */}
                    <div className="flex items-center justify-between gap-2 border-b border-zinc-200 pb-3 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-600" />
                        <span className="font-mono text-xs font-black bg-black text-white px-2 py-0.5 border border-black">
                          {session.time}
                        </span>
                      </div>
                      <span className={`font-mono text-[9px] font-bold px-2 py-0.5 border border-black ${session.badgeColor}`}>
                        {session.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-syne font-black text-sm uppercase tracking-tight text-black line-clamp-2 leading-snug cursor-pointer select-text hover:text-red-600"
                        onClick={() => setSelectedSessionId(isExpanded ? null : session.id)}>
                      {session.title}
                    </h4>

                    {/* Focus Line */}
                    <div className="mt-2 bg-zinc-100 border border-zinc-300 p-2">
                      <span className="font-mono text-[8px] text-gray-500 uppercase block font-bold">Focus Area:</span>
                      <p className="text-[19px] text-black font-mono font-black tracking-wide lowercase first-letter:uppercase leading-tight mt-0.5">
                        {session.focus}
                      </p>
                    </div>
 
                    {/* Expanded Abstract Syllabus drawer */}
                    <div className="mt-3">
                      {isExpanded ? (
                        <div className="space-y-3.5 bg-white border border-black p-3 animate-fade-in text-xs">
                          <div>
                            <span className="font-mono text-[8px] font-black text-gray-500 uppercase block mb-0.5">Syllabus Overview</span>
                            <p className="text-[20px] text-zinc-805 leading-relaxed font-sans font-medium normal-case select-text">
                              {session.details}
                            </p>
                          </div>
                          
                          <div className="pt-2 border-t border-dashed border-zinc-300 text-[10px] font-mono">
                            <span className="text-gray-500 uppercase font-black block">Location:</span>
                            <span className="text-black font-extrabold flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-red-600" /> BDD Beirut Conference Suite
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[20px] text-zinc-550 line-clamp-2 leading-relaxed normal-case font-sans">
                          {session.details}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card bottom: facilitators & action */}
                  <div className="border-t border-zinc-200 mt-4 pt-3 flex items-center justify-between gap-2 text-[10px] font-mono">
                    <div className="min-w-0">
                      <span className="text-gray-400 uppercase font-bold block text-[8px]">Facilitator</span>
                      <span className="text-black font-extrabold truncate block max-w-[150px]" title={session.speaker}>
                        {session.speaker}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedSessionId(isExpanded ? null : session.id)}
                      className="px-2 py-1 border border-black font-mono text-[9px] font-bold hover:bg-black hover:text-white transition-all cursor-pointer shrink-0"
                    >
                      {isExpanded ? "Less ▲" : "Syllabus ▼"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* layoutMode === "timeline" (Structured chronological hour grid) */}
        {layoutMode === "timeline" && filteredSessions.length > 0 && (
          <div className="border-4 border-black divide-y-4 divide-black" id="agenda_grid_timeline">
            {filteredSessions.map((session) => {
              const isExpanded = selectedSessionId === session.id;
              return (
                <div
                  key={session.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 items-stretch gap-0 transition-colors ${
                    isExpanded ? "bg-zinc-50" : "bg-white hover:bg-zinc-50/20"
                  }`}
                  id={`timeline_session_${session.id}`}
                >
                  {/* Grid Col 1-2: Hour Box */}
                  <div className="lg:col-span-2 p-4 bg-zinc-100 border-b border-black lg:border-b-0 lg:border-r-2 lg:border-black flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-center gap-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-black" />
                      <span className="font-mono text-base font-black text-black tracking-tight">
                        {session.time}
                      </span>
                    </div>
                    <span className={`font-mono text-[8px] sm:text-[9px] font-bold px-2 py-0.5 border border-black ${session.badgeColor}`}>
                      {session.type}
                    </span>
                  </div>

                  {/* Grid Col 3-9: Title & Focus Summary */}
                  <div className="lg:col-span-7 p-4 flex flex-col justify-center space-y-1.5 border-b border-black lg:border-b-0 lg:border-r-2 lg:border-black">
                    <h4 
                      className="font-syne font-black text-sm sm:text-base text-black uppercase tracking-tight cursor-pointer hover:text-red-600"
                      onClick={() => setSelectedSessionId(isExpanded ? null : session.id)}
                    >
                      {session.title}
                    </h4>
                    <p className="font-mono text-[19px] text-gray-650 font-bold tracking-wide uppercase">
                      <strong>Focus Blueprint:</strong> {session.focus}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-white border border-black p-3.5 mt-2 text-xs normal-case font-sans font-medium space-y-2 select-text"
                        >
                          <span className="font-mono text-[8px] font-black text-gray-500 uppercase block">Course Syllabus Abstract</span>
                          <p className="leading-relaxed text-gray-800 text-[20px]">{session.details}</p>
                          <div className="pt-2 border-t border-dashed border-zinc-200 font-mono text-[9px] flex items-center gap-4 text-zinc-500">
                            <span>LOCATION: BDD BEIRUT CONFERENCE ROOMS</span>
                            <span>ACCESS PERMIT: REQUIRED IN ADVANCE</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Grid Col 10-12: Facilitator Panel */}
                  <div className="lg:col-span-3 p-4 flex items-center justify-between lg:flex-col lg:items-start lg:justify-center gap-2">
                    <div className="min-w-0">
                      <span className="font-mono text-[8.5px] text-gray-400 font-black uppercase block">Facilitator / Speaker:</span>
                      <span className="font-sans text-xs font-extrabold text-black uppercase block truncate max-w-[200px]" title={session.speaker}>
                        {session.speaker}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedSessionId(isExpanded ? null : session.id)}
                      className="px-3 py-1.5 border border-black bg-white text-black font-mono text-[9px] font-black uppercase hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>Syllabus</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* layoutMode === "board" (Visual Track Board grid Columns) */}
        {layoutMode === "board" && filteredSessions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" id="agenda_grid_board">
            {[
              { 
                id: "keynotes", 
                title: "Keynotes & Awards", 
                classes: "border-black bg-zinc-950 text-white",
                textClass: "text-white",
                tagline: "High-level strategic shifts",
                items: filteredSessions.filter(s => matchCategory(s.type, "KEYNOTE")) 
              },
              { 
                id: "panels", 
                title: "Panels & Pitches", 
                classes: "border-yellow-600 bg-yellow-50/10 text-black", 
                textClass: "text-zinc-900",
                tagline: "Ecosystem experts & angels",
                items: filteredSessions.filter(s => matchCategory(s.type, "PANEL")) 
              },
              { 
                id: "workshops", 
                title: "Workshops & Labs", 
                classes: "border-orange-500 bg-orange-50/10 text-black", 
                textClass: "text-zinc-900",
                tagline: "Modular software sandboxes",
                items: filteredSessions.filter(s => matchCategory(s.type, "WORKSHOP")) 
              },
              { 
                id: "breaks", 
                title: "Networking / Breaks", 
                classes: "border-zinc-305 border-zinc-300 bg-zinc-50/40 text-black", 
                textClass: "text-zinc-700",
                tagline: "Coffee networking & lunch hubs",
                items: filteredSessions.filter(s => matchCategory(s.type, "NETWORKING")) 
              }
            ].map((col) => (
              <div 
                key={col.id} 
                className={`border-2 p-4 flex flex-col justify-between ${col.classes}`}
                id={`track_col_${col.id}`}
              >
                <div>
                  <div className="border-b border-zinc-200 pb-2 mb-3">
                    <h5 className="font-syne font-black text-xs uppercase tracking-tight block">
                      {col.title}
                    </h5>
                    <span className="font-mono text-[8px] text-gray-400 block uppercase font-bold">
                      {col.tagline}
                    </span>
                  </div>

                  {col.items.length === 0 ? (
                    <div className="p-8 text-center text-zinc-400 font-mono text-[9px] uppercase border border-dashed border-zinc-300 bg-white/20 mt-1">
                      No active sessions in query
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {col.items.map((session) => {
                        const isExpanded = selectedSessionId === session.id;
                        return (
                          <div 
                            key={session.id} 
                            className="bg-white text-black border border-black p-3 transition-shadow hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1.5">
                                <span className="font-mono text-[10px] font-black bg-black text-white px-1.5 py-0.2">
                                  {session.time}
                                </span>
                                <span className="font-sans text-[8px] font-black tracking-tighter text-zinc-500 block truncate max-w-[80px]">
                                  {session.type}
                                </span>
                              </div>
                              
                              <h6 className="font-syne font-bold text-xs uppercase text-zinc-900 leading-tight">
                                {session.title}
                              </h6>

                              {isExpanded && (
                                <p className="text-[19px] font-sans normal-case text-zinc-650 leading-relaxed mt-2 pt-2 border-t border-dashed border-zinc-200">
                                  {session.details}
                                </p>
                              )}
                            </div>

                            <button
                              onClick={() => setSelectedSessionId(isExpanded ? null : session.id)}
                              className="text-right text-[8.5px] font-mono font-black mt-2 text-zinc-500 hover:text-black cursor-pointer uppercase self-end"
                            >
                              {isExpanded ? "[ Close ]" : "[ Detail ]"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-zinc-300/40 text-[9px] font-mono text-gray-500 flex justify-between items-center">
                  <span>Track Total</span>
                  <span className="font-extrabold">{col.items.length} Event{col.items.length === 1 ? "" : "s"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INTERACTIVE WORKSHOP COMPANION: AI MATURITY AUDIT SIMULATOR */}
      <div className="bg-[#0b0c10] text-[#c5c6c7] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" id="interactive_audit_simulator">
        <div className="absolute top-2 right-2 font-mono text-[8.5px] font-black text-rose-500 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 uppercase tracking-widest">
          INTERACTIVE SIMULATOR (DAY 2 COMPANION)
        </div>
        
        <div className="border-b border-zinc-800 pb-4 mb-5">
          <div className="flex items-center gap-2 text-white">
            <Cpu className="w-5 h-5 text-orange-500" />
            <h3 className="font-syne font-black text-base sm:text-lg uppercase tracking-tight">
              AI Maturity Audit & Pipeline Architect
            </h3>
          </div>
          <p className="font-mono text-[15.5px] uppercase tracking-wide text-zinc-400 font-extrabold mt-1">
            Simulate Day 2's opening seminar diagnostic directly below to assess your firm's automation readiness and download a custom AI stack blueprint.
          </p>
        </div>

        {/* STEP CONTROLS SWITCH */}
        {auditStep === "start" && (
          <div className="space-y-4 py-3" id="audit_step_start">
            <h4 className="font-syne font-extrabold text-sm text-white uppercase">Is your operation investor-ready for the AI-Native VC Playbook of 2026?</h4>
            <p className="text-[17px] leading-relaxed text-zinc-300 normal-case font-sans font-medium">
              Take this brief 3-question evaluation designed by NCEI engineering facilitators. Analyze where your operational leakage points occur and evaluate if your workflows command 'AI-Native' premium multipliers.
            </p>
            <button
              onClick={() => setAuditStep("q1")}
              type="button"
              className="bg-white text-black font-syne font-black text-xs uppercase px-5 py-3 shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,0.4)] hover:shadow-none hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Begin Audit Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        )}

        {auditStep === "q1" && (
          <div className="space-y-4 py-2" id="audit_step_q1">
            <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-orange-500">
              <span>STEP 1 OF 3</span>
              <span>•</span>
              <span className="uppercase">MODULE 1 CORE: THE BRAIN STACK</span>
            </div>
            <h4 className="font-syne font-extrabold text-sm text-white uppercase">How does your venture utilize LLM and generation models?</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleAuditPick("stack", "general", "q2")}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-450 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer"
              >
                <div className="font-bold text-white mb-1">GENERAL SEARCH CHATS</div>
                <p className="text-[15px] font-mono lowercase first-letter:uppercase text-zinc-450 leading-tight">We manually open standard chat browsers on external setups (ChatGPT, Claude) to draft files occasionally.</p>
              </button>
              <button
                type="button"
                onClick={() => handleAuditPick("stack", "hybrid", "q2")}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-450 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer"
              >
                <div className="font-bold text-white mb-1">API INTEGRATIONS</div>
                <p className="text-[15px] font-mono lowercase first-letter:uppercase text-zinc-450 leading-tight">We integrate dynamic system API requests into modular functions or leverage code frameworks occasionally.</p>
              </button>
              <button
                type="button"
                onClick={() => handleAuditPick("stack", "agents", "q2")}
                className="bg-zinc-900 border-2 border-orange-500 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer relative"
              >
                <div className="absolute -top-2 right-2 bg-orange-500 text-black font-mono text-[8px] font-black px-1 uppercase">VC IDEAL</div>
                <div className="font-bold text-white mb-1">PROGRAMMATIC ORCHESTRATION</div>
                <p className="text-[15px] font-mono lowercase first-letter:uppercase text-zinc-450 leading-tight">We employ structured AI agent pipelines (custom workflows, multi-agent frameworks) with direct system integrations.</p>
              </button>
            </div>
          </div>
        )}

        {auditStep === "q2" && (
          <div className="space-y-4 py-2" id="audit_step_q2">
            <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-orange-500">
              <span>STEP 2 OF 3</span>
              <span>•</span>
              <span className="uppercase">MODULE 2 CORE: Content & Branding</span>
            </div>
            <h4 className="font-syne font-extrabold text-sm text-white uppercase">How is your company's marketing content processed?</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleAuditPick("content", "manual", "q3")}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-450 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer"
              >
                <div className="font-bold text-white mb-1">100% MANUAL DELIVERABLES</div>
                <p className="text-[15px] font-mono lowercase first-letter:uppercase text-zinc-450 leading-tight font-medium">Humans type and layout every article, social update, and document. Content takes substantial turnaround time.</p>
              </button>
              <button
                type="button"
                onClick={() => handleAuditPick("content", "semi", "q3")}
                className="bg-zinc-900 border border-zinc-850 hover:border-zinc-450 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer"
              >
                <div className="font-bold text-white mb-1">AI-ASSISTED DRAFTING</div>
                <p className="text-[15px] font-mono lowercase first-letter:uppercase text-zinc-450 leading-tight font-medium">We use generators to draft layouts or write outlines, which our humans review, edit, and publish manually.</p>
              </button>
              <button
                type="button"
                onClick={() => handleAuditPick("content", "automated", "q3")}
                className="bg-zinc-900 border-2 border-orange-500 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer relative"
              >
                <div className="absolute -top-2 right-2 bg-orange-500 text-black font-mono text-[8px] font-black px-1 uppercase">VC IDEAL</div>
                <div className="font-bold text-white mb-1">AI-NATIVE CONTENT ENGINE</div>
                <p className="text-[15px] font-mono lowercase first-letter:uppercase text-zinc-450 leading-tight font-medium">One input idea automatically generates 20 cross-channel assets tailored to our custom brand voice, running on a set loop.</p>
              </button>
            </div>
          </div>
        )}

        {auditStep === "q3" && (
          <div className="space-y-4 py-2" id="audit_step_q3">
            <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-orange-500">
              <span>STEP 3 OF 3</span>
              <span>•</span>
              <span className="uppercase">MODULE 3 CORE: INTEGRATION AUTOMATION</span>
            </div>
            <h4 className="font-syne font-extrabold text-sm text-white uppercase">How do leads and data synchronize into your CRM or systems?</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleAuditPick("automation", "manual", "result")}
                className="bg-zinc-900 border border-zinc-805 hover:border-zinc-450 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer"
              >
                <div className="font-bold text-white mb-1">MANUAL EXCEL FILES</div>
                <p className="text-[15px] font-mono lowercase first-letter:uppercase text-zinc-450 leading-tight">We manually copy-paste leads, files, and customer messages into Excel/Sheets to track everything.</p>
              </button>
              <button
                type="button"
                onClick={() => handleAuditPick("automation", "semi", "result")}
                className="bg-zinc-900 border border-zinc-805 hover:border-zinc-450 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer"
              >
                <div className="font-bold text-white mb-1">BASIC WEB Webhooks</div>
                <p className="text-[15px] font-mono lowercase first-letter:uppercase text-zinc-450 leading-tight">Simple pre-built email alerts notify us when someone applies, but sorting is manual.</p>
              </button>
              <button
                type="button"
                onClick={() => handleAuditPick("automation", "zapier", "result")}
                className="bg-zinc-900 border-2 border-orange-500 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer relative"
              >
                <div className="absolute -top-2 right-2 bg-orange-500 text-black font-mono text-[8px] font-black px-1">VC IDEAL</div>
                <div className="font-bold text-white mb-1">AUTONOMOUS MULTI-STEP LOGIC</div>
                <p className="text-[15px] font-mono lowercase first-letter:uppercase text-zinc-450 leading-tight">We employ structured AI agent pipelines (custom workflows, multi-agent frameworks) with direct system integrations.</p>
              </button>
            </div>
          </div>
        )}

        {auditStep === "result" && (
          <div className="space-y-4 py-2" id="audit_step_result">
            <div className="font-mono text-[10px] font-bold text-orange-500 uppercase">
              AUDIT COMPLETED ✓ COMPOSING DIAGNOSTIC BLUEPRINT
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2.5">
                <div>
                  <span className="text-[9px] text-zinc-400 block font-mono">DETERMINED VC REPUTATION</span>
                  <span className="font-syne font-extrabold text-sm sm:text-base text-white block mt-0.5">{auditResult.rank}</span>
                </div>
                <div className="bg-orange-500 text-black px-2.5 py-1 text-[10px] font-mono font-black uppercase text-center shrink-0">
                  Agility Status: Active
                </div>
              </div>

              <div>
                <span className="text-[9px] text-zinc-400 block font-mono">DIAGNOSTIC CRITIQUE</span>
                <p className="text-[17px] normal-case text-zinc-300 font-sans mt-0.5 leading-relaxed font-semibold">
                  {auditResult.desc}
                </p>
              </div>

              <div className="bg-zinc-950 p-4 border border-zinc-800">
                <span className="text-[9.5px] text-orange-400 block font-mono font-black uppercase">DAY 2 MENTOR RECOMMENDATION FOR JUNE 1st WORKSHOP</span>
                <p className="text-[16px] normal-case text-zinc-300 font-sans mt-1 leading-snug">
                  {auditResult.stackRec}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setAuditStep("start");
                  setAuditScores({ stack: "", content: "", automation: "" });
                }}
                className="bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-750 font-syne font-bold text-xxs sm:text-xs uppercase px-4 py-2.5 cursor-pointer"
              >
                Reset Audit Simulator
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setActiveDay(2);
                  const el = document.getElementById("agenda_full_block");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-black font-syne font-black text-xxs sm:text-xs uppercase px-4 py-2.5 shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,0.4)] hover:shadow-none hover:translate-x-[0.5px] hover:translate-y-[0.5px] cursor-pointer"
              >
                Go to Day 2 Workshop Modules
              </button>
            </div>
          </div>
        )}
      </div>

      {/* STRATEGY DEEP-DIVE: DETAILED MODULE BREAKDOWN (OCR INTEGRATED) */}
      <div className="bg-white border-4 border-black p-6 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]" id="detailed_strategic_playbook">
        
        {/* Playbook Header & Dynamic Filter Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b-2 border-black pb-4 mb-6">
          <div>
            <span className="font-mono text-xs font-black text-gray-500 uppercase tracking-widest pl-0.5">THE VENTURE MANIFESTO</span>
            <h3 className="font-syne font-black text-lg sm:text-2xl uppercase tracking-tight text-black mt-1">
              KEY NETWORKING & INVESTMENT STRATEGIES
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-zinc-50 border-2 border-black px-3 py-1.5 text-xs font-mono w-full md:w-64" id="strategy_search_container">
            <Search className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Filter Playbook..."
              value={strategyQuery}
              onChange={(e) => setStrategyQuery(e.target.value)}
              className="text-[10px] bg-transparent outline-none w-full text-black placeholder-gray-400 font-mono uppercase font-black"
            />
          </div>
        </div>

        {/* Pillars Display Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="playbook_pillars_grid">
          {filteredStrategies.map((pillar, index) => (
            <div 
              key={index} 
              className="border-2 border-black p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
              id={`strategy_pillar_card_${index}`}
            >
              <div>
                <h4 className="font-syne font-black text-xs sm:text-sm uppercase tracking-tight text-white bg-black px-2.5 py-1.5 inline-block mb-4 border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                  {pillar.title}
                </h4>
                
                <div className="space-y-4">
                  {pillar.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-l-2 border-zinc-200 pl-3">
                      <h5 className="font-mono text-[10.5px] font-black text-black leading-tight uppercase mb-1">
                        {item.heading}
                      </h5>
                      <p className="text-[20.5px] leading-relaxed text-gray-700 font-sans normal-case font-medium select-text">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-150 pt-3 mt-5 flex justify-between items-center text-[9px] font-mono text-zinc-400 font-bold">
                <span>Z961 CURATED ADVISE</span>
                <span>SECTION ID: 0{index + 1}</span>
              </div>
            </div>
          ))}

          {filteredStrategies.length === 0 && (
            <div className="col-span-full border-2 border-dashed border-black p-10 text-center bg-zinc-50 font-mono text-xs uppercase font-extrabold text-zinc-500" id="empty_strategy_search">
              No specific strategies found matching key "{strategyQuery}". Clear input query to reload the complete manifesto.
            </div>
          )}
        </div>
      </div>

      {/* FOOTER CALL TO ACTION */}
      <div className="bg-black text-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center max-w-3xl mx-auto space-y-4 mt-6" id="seminar_bottom_cta">
        <h3 className="font-syne font-bold text-xl sm:text-2xl uppercase tracking-tight text-white leading-none">
          SECURE YOUR TICKET FOR THE BDD EVENT
        </h3>
        <p className="text-[17px] sm:text-[17px] font-mono text-zinc-300 max-w-xl mx-auto leading-relaxed uppercase font-semibold">
          Pre-registrations close 24 hours prior to commencement. Only 75 hardware seats are allocated at the BDD venue. Verification of codebase pipelines required for developers.
        </p>

        <div className="flex flex-wrap justify-center gap-3.5 pt-2">
          {savedPass ? (
            <button
              onClick={() => {
                const el = document.getElementById("seminar_hero_wrapper");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              type="button"
              className="bg-emerald-500 text-black border-2 border-emerald-500 font-syne font-black text-xs uppercase px-5 py-3 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
            >
              Pass Registered ✓ View Ticket
            </button>
          ) : (
            <button
              onClick={() => {
                const el = document.getElementById("seminar_passenger_module");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              type="button"
              className="bg-white text-black border-2 border-white font-syne font-black text-xs uppercase px-5 py-3 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
            >
              Get Boarding Pass Now
            </button>
          )}

          <button
            onClick={onOpenNda}
            type="button"
            className="bg-zinc-800 text-zinc-300 border-2 border-zinc-700 font-mono font-black text-xs uppercase px-5 py-3 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
          >
            Digital NDA Sign Registry
          </button>
        </div>

        <div className="border-t border-zinc-800 pt-4 text-[10px] font-mono text-zinc-400 flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
          <span>NCEI LEBANON</span>
          <span>•</span>
          <span>BEIRUT DIGITAL DISTRICT (BDD)</span>
          <span>•</span>
          <span>JUNE 30 - JULY 1</span>
        </div>
      </div>

    </div>
  );
}
