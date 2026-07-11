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
  // Navigation tabs: 'all' | 'morning' | 'afternoon'
  const [activeHalf, setActiveHalf] = useState<"all" | "morning" | "afternoon">("all");
  
  // Interactive strategy search query
  const [strategyQuery, setStrategyQuery] = useState("");
  
  // Selected detailed session for accordion/details toggling
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // Layout mode controls for the detailed agenda: grid, timeline, board
  const [layoutMode, setLayoutMode] = useState<"grid" | "timeline" | "board">("timeline");
  const [sessionQuery, setSessionQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // --- Interactive AI Maturity & Resilience Audit State ---
  const [auditStep, setAuditStep] = useState<"start" | "q1" | "q2" | "q3" | "result">("start");
  const [auditScores, setAuditScores] = useState({
    stack: "",
    content: "",
    automation: ""
  });

  // --- Registration Ticket state ---
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regRole, setRegRole] = useState("Founder");
  const [regPassGenerated, setRegPassGenerated] = useState(false);
  const [savedPass, setSavedPass] = useState<any>(() => {
    try {
      const cached = localStorage.getItem("Z961_seminar_pass");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  // --- Real-Time Counter for Friday, July 17th, 2026, 10:00 AM Beirut Time ---
  const TARGET_TIME = new Date("2026-07-17T10:00:00").getTime();
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
      const seconds = Math.floor((difference / 1000) % 65 % 60);

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

  // Complete, highly detailed agenda structure covering Friday July 17th, 2026 verbatim notes
  const seminarAgenda = [
    {
      id: "agenda-1",
      time: "09:00 AM - 09:30 AM",
      timeStartDigit: 9.0,
      title: "Welcome Coffee and Late Registrations",
      type: "Logistics",
      sessionHalf: "morning",
      badgeColor: "bg-zinc-100 text-zinc-800 border-zinc-400",
      focus: "Late check-in, community greetings, and boarding pass collection.",
      details: "The day begins at the state-of-the-art Beirut Digital District. Registrants clear compliance gates, secure and synchronize their private sandbox workspace tools, and connect over high-grade Lebanese manual espresso brews.",
      speaker: "BDD Reception Crew & NCEI Lead Technologists"
    },
    {
      id: "agenda-2",
      time: "09:30 AM - 11:00 AM",
      timeStartDigit: 9.5,
      title: "Panel 1: The Foundation – State of the Ecosystem, Co-Working & Capital",
      type: "Panel",
      sessionHalf: "morning",
      badgeColor: "bg-stone-100 text-zinc-900 border-stone-800",
      focus: "Resilience baseline, collaborative density & current VC/angel financing realities.",
      details: "This opening session sets the baseline. It addresses the immediate environment founders are operating in, emphasizing community infrastructure and the realities of raising capital in 2026.\n\n" +
               "• State of the Market: A candid look at the resilience of the ecosystem amidst current macroeconomic pressures. Discussing how founders are navigating volatility and the shift toward efficiency over growth-at-all-costs.\n\n" +
               "• The Power of Proximity: Exploring why physical and hybrid co-working spaces remain critical. This segment will highlight how shared spaces foster serendipity, resource sharing, and the density of talent necessary for early-stage survival.\n\n" +
               "• Decoding the 2026 Funding Landscape: Unpacking current investor psychology. Topics should cover the strong preference for early-stage validation, the dominance of B2B revenue models, and how to access alternative funding structures (like venture debt or strategic grants) when traditional equity rounds tighten.",
      speaker: "Leading Seed VCs & Physical Hub Operations Directors"
    },
    {
      id: "agenda-3",
      time: "11:00 AM - 11:15 AM",
      timeStartDigit: 11.0,
      title: "Coffee Break Networking",
      type: "Break",
      sessionHalf: "morning",
      badgeColor: "bg-amber-50 text-amber-900 border-amber-300",
      focus: "Rapid, unstructured peer-to-peer connection & sandbox syncing.",
      details: "A fifteen-minute high-intensity networking break. Use this open session to meet neighboring engineering setups, exchange GitHub logins, verify sandbox credentials, and establish early diaspora bridges.",
      speaker: "Syndicate Builders"
    },
    {
      id: "agenda-4",
      time: "11:20 AM - 12:30 PM",
      timeStartDigit: 11.33,
      title: "Panel 2: Guiding Investors and VCs to Lebanon - The Frontier – Industries, Startups, & Tech Horizons",
      type: "Panel",
      sessionHalf: "morning",
      badgeColor: "bg-orange-50 text-orange-950 border-orange-500",
      focus: "Positioning Lebanon as the ultimate high-tier R&D and specialized brain engine for MENA.",
      details: "Rather than viewing the local market as a limitation, this panel positions Lebanon as the ultimate R&D and talent engine for the broader MENA region. However operating in a volatile environment forces a unique type of operational discipline. This discussion focuses on how local founders build naturally resilient, global-first architectures.\n\n" +
               "• The Levant-to-Gulf Pipeline: Tactics for building, funding, testing, and validating products using agile local teams, while structuring corporate entities for seamless market entry into Saudi Arabia (KSA) and the UAE.\n\n" +
               "• Capitalizing on Regional Financial De-risking: How Lebanese startups can position themselves to solve financial challenges as they tackle high-value digital transformation problems for enterprise clients in high-growth GCC markets.\n\n" +
               "• Diaspora as a Market Catalyst: Actively leveraging the global Lebanese network not just for funding, but as institutional design partners and first-tier enterprise buyers in Europe and the Americas.",
      speaker: "IDAL Strategy Leads, GCC Fund Managers & Returning Angels"
    },
    {
      id: "agenda-5",
      time: "12:30 PM - 13:55 PM",
      timeStartDigit: 12.5,
      title: "Panel 3: The Name of the Game . The Tech Talent Premium: AI & Deep Engineering",
      type: "Panel",
      sessionHalf: "afternoon",
      badgeColor: "bg-sky-50 text-sky-950 border-sky-500",
      focus: "Moving beyond basic software outsourcing to high-end Agentic AI & RAG workflows.",
      details: "Positioning Lebanon not as a generic outsourcing hub, but as a specialized hub for high-end engineering, specifically in artificial intelligence.\n\n" +
               "• Academic-to-Startup Tech Transfer: Bridging the gap between the country’s leading universities (like AUB) and active market commercialization, ensuring cutting-edge research is rapidly funneled into launch-ready startups.\n\n" +
               "• Building for Zero Downtime: Best practices in leveraging decentralized infrastructure, edge computing, and alternative connectivity solutions (like integrated hybrid cloud and satellite data networks) to ensure 100% operational continuity.\n\n" +
               "• The 'Lean & Antifragile' Playbook: How the resource constraints of the local ecosystem create hyper-efficient founders who optimize unit economics and path-to-profitability far faster than heavily subsidized Western counterparts.\n\n" +
               "• Fintech Workarounds & Global Rails: Navigating local banking constraints by embedding modern cross-border payment gateways, digital wallets, and compliant international corporate structures right from day one.\n\n" +
               "• From Code to Architecture: Shifting the narrative from basic software development to advanced specialization in Agentic AI, multi-agent workflows, and complex Retrieval-Augmented Generation (RAG) deployments.\n\n" +
               "• Retention through Innovation: Retaining top-tier engineering talent locally by offering them high-equity, deep-tech challenges within the incubator, creating a dense network effect of technical founders.",
      speaker: "AUB Computer Science Professors, LLM Engineers & Infrastructure Operators"
    },
    {
      id: "agenda-6",
      time: "13:55 PM - 14:30 PM",
      timeStartDigit: 13.91,
      title: "Panel 4: What Investors Are Shopping For (The 2026 Playbook)",
      type: "Panel",
      sessionHalf: "afternoon",
      badgeColor: "bg-emerald-50 text-emerald-955 border-emerald-500",
      focus: "Mapping high-attraction projects, capital safety and operational unit metrics.",
      details: "A critical breakdown of high-attraction projects and tactical metrics.\n\n" +
               "• Capital Efficiency Over Growth-at-All-Costs: How to prioritize Unit Economics (CAC, LTV, and churn) and align operations on a fast, verifiable path to profitability.\n\n" +
               "• Automated B2B Services: Mapping Platforms that help MENA-based businesses outsource or automate back-office operations (accounting, compliance, or customer service) using autonomous agents.\n\n" +
               "• Cross-Border FinTech, Healthcare and Retail: Solutions that bridge the gap between Lebanese entities and GCC/international markets (remittance, treasury management, or cross-border payment rails).\n\n" +
               "• Resilience Tech: Mapping Startups that demonstrate high operational agility in volatile environments; investors view this as a competitive 'moat' that proves the team can survive and scale in any condition.",
      speaker: "Diaspora Capital Counsel & Venture Capitalists"
    },
    {
      id: "agenda-7",
      time: "14:30 PM - 15:10 PM",
      timeStartDigit: 14.5,
      title: "Lunch Break & Catered Networking",
      type: "Break",
      sessionHalf: "afternoon",
      badgeColor: "bg-zinc-100 text-zinc-800 border-zinc-400",
      focus: "Traditional lunch buffet & structured sector roundtables.",
      details: "Connect with dedicated focus zones: Cybersecurity setups, cross-border fintech pipelines, medical informatics pools, and autonomous B2B SaaS builders.",
      speaker: "BDD Catering Staff & Sector Moderators"
    },
    {
      id: "agenda-8",
      time: "15:10 PM - 17:30 PM",
      timeStartDigit: 15.16,
      title: "Panel 5 / Final Session: The Ascent – The '1 to Z' Scaling Story & Strategic Recommendations",
      type: "Roundtable & Closing Keynote",
      sessionHalf: "afternoon",
      badgeColor: "bg-black text-white border-black",
      focus: "Actionable thematic frameworks, scaling mechanisms, and cybersecurity keynote.",
      details: "The final panel transitions from theory to execution. It focuses entirely on the operational playbook required to take a validated product (the '1') and scale it to market dominance (the 'Z'). The panel concludes with 3-5 definitive, actionable recommendations for the incoming cohort.\n\n" +
               "• Key Note Presentation: Why Cybersecurity is still a top notch investment in the ecosystem (Open Call to Lebanon Startups Case Studies).\n\n" +
               "• Beyond the Hype (New Technologies): Moving past basic consumer applications to focus on what is actually securing traction. A deep dive into the shift toward Agentic AI, multi-agent workflow automation, AI infrastructure, and Retrieval-Augmented Generation (RAG) architectures.\n\n" +
               "• Defensible Industries: Highlighting the sectors showing the most momentum and investor appetite across the MENA region, specifically Cybersecurity, advanced Healthtech, and deeply integrated B2B SaaS.\n\n" +
               "• Deconstructing the '1 to Z' Journey and Thematic Investment Recommendations: Examining the specific inflection points where startups typically break (founder-led sales to distribution automation, building enterprise networks, optimizing unit economics).\n\n" +
               "• Leverage Diaspora Connections: Connecting with vital diaspora partners to frame asks around the regional MENA market rather than the domestic sandbox alone.\n\n" +
               "• AI Tools for Entrepreneurial Success: Practical recommendations on embedding AI tools into daily tasks to run outsized, ultra-lean operations with 10x leverage.",
      speaker: "Cybersecurity Researchers, Scaling Founders & Seed Fund Partners"
    }
  ];

  // Specific strategic insights mapping OCR
  const strategicPillars = [
    {
      title: "1. Ecosystem Assessment & The Gulf Pipeline",
      category: "Ecosystem Strategy",
      items: [
        {
          heading: "The Socialpreneur vs High-Cluster Specialization",
          detail: "Balancing local societal integration with high-end global software capability. Lebanese startups must target structural niches rather than localized consumer toys."
        },
        {
          heading: "The Levant-to-Gulf Pipeline",
          detail: "Employ highly creative local developers at competitive costs in Beirut, while setting up corporate frameworks in Riyadh (KSA) or Dubai (UAE) for frictionless enterprise access."
        },
        {
          heading: "Diaspora as design & enterprise catalyst",
          detail: "Utilize groups such as LIFE to map connections to high-level decision makers. Always present investment asks of the regional Middle East market, not just the domestic local territory."
        }
      ]
    },
    {
      title: "2. The VC 2026 Playbook Checklist",
      category: "Investor Outlook",
      items: [
        {
          heading: "Agentic AI & Multi-Agent Workflows",
          detail: "Venture capitalists are avoiding shallow wrappers. They seek deeply integrated multi-agent automations that handle entire back-office pipelines cleanly."
        },
        {
          heading: "Robust Cybersecurity Frameworks",
          detail: "With geopolitical volatility, securing the chain of data and custody remains a premium competitive moat. Investors actively reward highly defensible systems."
        },
        {
          heading: "Capital Efficiency & Path to Positive Income",
          detail: "Vanity metrics are dead. Top priorities are Unit Economics (pristine metrics for CAC, LTV, and churn rates) and establishing a clear, fast route to profitability."
        }
      ]
    },
    {
      title: "3. Transatlantic Networking Codes",
      category: "International Scale",
      items: [
        {
          heading: "Remote-First Transparency Standards",
          detail: "Keep company cap tables, security architectures, and financial logs digitized, pre-vetted, and instantly queryable in secure online data rooms."
        },
        {
          heading: " Agility as a Highly Valued Defensive Asset",
          detail: "Frame constraints as a rigorous training platform. A startup that maintains 100% operational uptime in Beirut demonstrates extreme cost discipline and adaptability to global investors."
        },
        {
          heading: "Leveraging Pre-Vetted Ecosystem Channels",
          detail: "Affiliate your venture with trusted local sandboxes and official audit tracks. Vetted transparency signals safety and compliance to risk-averse foreign institutional capital."
        }
      ]
    },
    {
      title: "4. Areas Of High Venture Attraction",
      category: "Focused Opportunities",
      items: [
        {
          heading: "Automated B2B Back-Office Software",
          detail: "Replacing manual compliance, bookkeeping, and customer routing tasks inside Middle Eastern firms with autonomous agent software."
        },
        {
          heading: "Cross-Border FinTech and Healthcare",
          detail: "Solutions bridging physical transaction divides, modern cross-border routing rails, healthcare data compliance, and compliant multi-currency wallets."
        },
        {
          heading: "Resilience-Oriented Operations Tech",
          detail: "Off-grid telemetry, backup mesh networks, and decentralized cloud servers proving high physical survivability under stressful external pressures."
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
    const ticketId = "Z961-SEMINAR-" + Math.floor(100000 + Math.random() * 900000);
    const passObj = {
      ticketId,
      name: regName,
      email: regEmail,
      company: regCompany ? regCompany : "Sovereign Operator",
      role: regRole,
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
    setRegRole("Founder");
    setRegPassGenerated(false);
  };

  // AI Maturity Audit Simulator calculations
  const handleAuditPick = (key: "stack" | "content" | "automation", val: string, nextStep: any) => {
    setAuditScores(prev => ({ ...prev, [key]: val }));
    setAuditStep(nextStep);
  };

  const calculateAuditScore = () => {
    const { stack, content, automation } = auditScores;
    let rank = "FOUNDATION CONSOLIDATOR";
    let desc = "Your venture is relying on standard software architecture, lacks deep operational redundancy, and operates within conventional domestic transactional constraints. While functional, it is highly prone to local bottleneck disruption and leaves potential regional venture growth multipliers on the table.";
    let stackRec = "Adopt hybrid cloud structures and decentralized edges for total continuity, transition traditional scripts to Retrieval-Augmented Generation (RAG) paradigms, and structure a compliant offshore corporate layout wrapper to facilitate smoother capital inflows.";
    
    if (stack === "agents" || content === "semi" || automation === "zapier") {
      rank = "RESILIENT METROPOLITAN OPERATOR";
      desc = "You have integrated modular AI pipelines into your delivery stacks and utilize localized off-grid cloud strategies. Your business frameworks allow you to fulfill regional Gulf contracts, but significant manual human latency is still holding back your delivery velocity.";
      stackRec = "Shift your architecture towards specialized Agentic workflows and multi-agent system loops. Harden your physical assets with robust backup telemetry structures, and connect programmatic international payment gateways to clears cross-border invoices on day one.";
    }

    if (stack === "agents" && content === "automated" && automation === "zapier") {
      rank = "ANTIFRAGILE TECH GENERATOR (+961 PREMIUM)";
      desc = "You represent the highest tier of the 2026 playbook. You run hyper-efficient Agentic and complex RAG configurations over decentralized edge architecture with automated global fintech rails. This yields true zero-downtime, world-class capital agility.";
      stackRec = "Harden your digital security protocols to fit strict institutional compliance criteria. Keep your investor-ready data room loaded with audited balance sheets, and leverage diaspora-led design pipelines to scale from 1 to Z markets across GCC.";
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
      pillar.category.toLowerCase().includes(query) ||
      pillar.items.some(
        item => 
          item.heading.toLowerCase().includes(query) || 
          item.detail.toLowerCase().includes(query)
      )
    );
  });

  const filteredSessions = seminarAgenda.filter(session => {
    // Session Half Filter
    if (activeHalf !== "all" && session.sessionHalf !== activeHalf) {
      return false;
    }
    // Category Filter
    if (selectedCategory !== "ALL") {
      const typeLower = session.type.toLowerCase();
      if (selectedCategory === "PANEL" && !typeLower.includes("panel") && !typeLower.includes("keynote")) {
        return false;
      }
      if (selectedCategory === "BREAK" && !typeLower.includes("break") && !typeLower.includes("logistics")) {
        return false;
      }
    }
    // Search Query Filter
    if (sessionQuery.trim()) {
      const q = sessionQuery.toLowerCase();
      return (
        session.title.toLowerCase().includes(q) ||
        session.focus.toLowerCase().includes(q) ||
        session.details.toLowerCase().includes(q) ||
        session.speaker.toLowerCase().includes(q) ||
        session.time.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 text-black font-sans animate-fade-in" id="kickoff_seminar_view">
      
      {/* 1. HERO BANNER: BRAND NEW JULY 17TH SEMINAR CONFIGURATION */}
      <div className="bg-black text-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" id="seminar_hero_wrapper">
        <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-mono text-[9px] font-black px-3 py-1 tracking-widest border border-black animate-pulse z-10">
          BDD CONFIRMED: FRIDAY, JULY 17TH, 2026
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-color-dodge bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-450 fill-amber-350 text-amber-500" />
            <span className="font-mono text-xs font-black text-zinc-300 uppercase tracking-widest">Ecosystem Expansion 2026</span>
          </div>
          
          <h2 className="font-syne font-black text-2xl sm:text-5xl uppercase tracking-tight leading-none mb-4">
            KICKOFF SEMINAR: THE 2026 PLAYBOOK
          </h2>
          
          <p className="text-[17px] sm:text-[19px] font-mono text-gray-300 uppercase tracking-wide font-extrabold max-w-3xl leading-relaxed">
            Positioning Lebanon's Premium Tech Talent as the Regional AI & Deep Engineering Engine — Driving the Levant-to-Gulf Capital Pipeline.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-zinc-800 text-xs text-gray-300 font-mono">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>FRIDAY, JULY 17TH, 2026 | 10:00 AM SHARP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>BEIRUT DIGITAL DISTRICT (BDD) BUILDING 1075</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] uppercase font-bold text-zinc-300">Countdown Live</span>
            </div>
          </div>

          {/* REAL-TIME TIME-BLOCK COUNTDOWN */}
          <div className="mt-6 bg-[#adff2f] text-black border-2 border-black p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" id="seminar_kickoff_countdown">
            <div className="flex items-center gap-2 shrink-0">
              <Clock className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
                LEBANESE TECH SYMPOSIUM LAUNCH COUNTDOWN:
              </span>
            </div>
            {timeLeft.isOver ? (
              <span className="font-syne font-black text-xs sm:text-sm uppercase tracking-tight bg-black text-white px-3 py-1">
                SEMINAR IS UNDERWAY AT BDD
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

      {/* 2. SEMINAR SUMMARY: TARGET AUDIENCE & IMPACT FOCUS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="seminar_summary_root">
        
        {/* Left Column: Conceptual Framework */}
        <div className="lg:col-span-7 bg-white border-2 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between" id="seminar_focus_box">
          <div className="space-y-4">
            <h3 className="font-syne font-black text-sm sm:text-base uppercase tracking-wider text-black border-b-2 border-black pb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-600" />
              <span>Target Audience & Impact Focus</span>
            </h3>
            
            <div>
              <span className="font-mono text-[9px] font-black text-gray-500 uppercase tracking-widest block">ADRESSED TO:</span>
              <p className="text-[14px] font-mono text-zinc-800 leading-relaxed font-bold mt-1">
                The complete Lebanese ecosystem, including early-stage and established founders, venture capital and angel investors, university researchers and tech transfer officers, and economic policymakers. This call to action encompasses both local operators and the vital global Lebanese diaspora.
              </p>
            </div>

            <div className="border-l-4 border-black pl-4 py-1.5 bg-zinc-50 my-2">
              <h4 className="font-sans font-extrabold text-[12px] uppercase text-black">Morning Sessions: Foundation & Strategy</h4>
              <p className="text-[13px] font-mono text-zinc-650 leading-relaxed pt-1">
                The day begins with a candid assessment of the ecosystem’s resilience amidst current pressures. NCEI Lebanon and IDAL (Investment Development Authority of Lebanon) will present strategic roadmaps for investing in Lebanon in 2026, prioritizing capital efficiency. Discussions will focus on positioning Lebanon as the ultimate specialized R&D and talent engine for the broader MENA region, utilizing the "Levant-to-Gulf Pipeline" for market access to Saudi Arabia and the UAE.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4 py-1.5 bg-orange-50/25 my-2">
              <h4 className="font-sans font-extrabold text-[12px] uppercase text-orange-950">Afternoon Sessions: AI, Deep Engineering, & Scaling</h4>
              <p className="text-[13px] font-mono text-orange-900 leading-relaxed pt-1">
                Shifting to Lebanon's "Tech Talent Premium," experts from leading universities (like AUB) and tech hubs will move beyond basic software development to discuss specialization in Agentic AI and complex RAG (Retrieval-Augmented Generation) architectures. Panelists will share the "Lean & Antifragile" playbook—demonstrating how local resource constraints force Lebanese founders to build hyper-efficient architectures with integrated global fintech workarounds.
              </p>
            </div>

            <p className="text-[13px] font-mono text-zinc-650 leading-relaxed">
              The final segments provide an updated "Investor Playbook" for 2026, highlighting high-attraction sectors like Cybersecurity, automated B2B services, and Healthtech. The seminar concludes with actionable, thematic recommendations on leveraging AI for lean operations and scaling from validated products to market dominance.
            </p>
          </div>
          
          <div className="pt-4 border-t border-zinc-200 mt-4 text-[10px] text-zinc-500 font-mono flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            <span>Presented in physical partnership with BDD and IDAL Lebanon.</span>
          </div>
        </div>

        {/* Right Column: Dynamic Ecosystem Boarding Pass generator */}
        <div className="lg:col-span-5 bg-zinc-55 bg-zinc-50 border-2 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between" id="seminar_pass_module">
          <div>
            <div className="flex items-center gap-1.5 text-black border-b-2 border-black pb-2 mb-4">
              <FileCheck className="w-5 h-5 text-black shrink-0" />
              <h3 className="font-syne font-black text-xs sm:text-sm uppercase tracking-wide">
                SUMMIT BOARDING PASS
              </h3>
            </div>

            {savedPass ? (
              <div className="bg-white border-2 border-dashed border-black p-4 space-y-3 relative overflow-hidden" id="verified_ticket_pass">
                {/* Retro Ticket Side Cutouts */}
                <div className="absolute top-1/2 -left-3.5 w-6 h-6 rounded-full bg-zinc-50 border-r-2 border-black -translate-y-1/2"></div>
                <div className="absolute top-1/2 -right-3.5 w-6 h-6 rounded-full bg-zinc-50 border-l-2 border-black -translate-y-1/2"></div>
                
                <div className="text-center font-mono text-[9px] font-black text-zinc-400 select-none pb-1 border-b border-zinc-200">
                  ★ ECOSYSTEM STRATEGY SUMMIT PASS ★
                </div>
                
                <div className="flex justify-between items-start pt-2">
                  <div>
                    <span className="text-[8px] text-zinc-400 font-mono block">ATTENDEE / REPRESENTATIVE</span>
                    <span className="font-syne font-black text-sm text-black block tracking-tight uppercase leading-none mt-0.5">{savedPass.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-zinc-400 font-mono block">BOARDING ID</span>
                    <span className="font-mono font-bold text-xs text-orange-700 bg-orange-50 border border-orange-200 px-1 py-0.2">{savedPass.ticketId}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[8px] text-zinc-400 font-mono block">ORGANIZATION</span>
                    <span className="font-sans font-bold text-[10px] text-zinc-800 block uppercase leading-tight truncate mt-0.5">{savedPass.company}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-zinc-400 font-mono block">DESIGNATION</span>
                    <span className="font-sans font-bold text-[10px] text-zinc-800 block uppercase leading-tight truncate mt-0.5">{savedPass.role || "Sovereign Operator"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200">
                  <div>
                    <span className="text-[8px] text-zinc-400 font-mono block">VENUE & DATE</span>
                    <span className="font-mono text-[9px] font-black text-black block">BDD BEIRUT | JULY 17</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-zinc-400 font-mono block">SECTIONS</span>
                    <span className="font-mono text-[9px] font-black text-black block">FULL ADMITTANCE</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pt-3">
                  <div className="text-center text-[9px] font-mono font-bold bg-zinc-100 border border-zinc-300 p-2 text-zinc-650 uppercase">
                    ✓ Seat Secured. Display ticket code at registration desk on Friday morning.
                  </div>
                  <button
                    onClick={handleCancelPass}
                    type="button"
                    className="text-center hover:text-red-800 text-red-600 font-mono text-[9px] font-black hover:underline cursor-pointer uppercase py-1"
                  >
                    [ Cancel and Generate Another Pass ]
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSeminarSubmit} className="space-y-3" id="boarding_pass_signup_form">
                <p className="text-[13px] text-zinc-700 font-mono leading-tight uppercase font-bold mb-2">
                  Generate your instant boarding ticket below. Only 75 physical seats remain allocated at Beirut Digital District for July 17th.
                </p>
                
                <div>
                  <label className="block font-mono text-[9px] font-black text-gray-500 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Dr. Maryse Keyrouz"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-white border-2 border-black p-2 text-xs font-mono uppercase text-black focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-mono text-[9px] font-black text-gray-500 uppercase mb-1">Company / Institution *</label>
                    <input
                      type="text"
                      required
                      placeholder="E.g., AUB / Cedar VC"
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      className="w-full bg-white border-2 border-black p-2 text-xs font-mono uppercase text-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] font-black text-gray-500 uppercase mb-1">Select Role *</label>
                    <select
                      value={regRole}
                      onChange={(e) => setRegRole(e.target.value)}
                      className="w-full bg-white border-2 border-black p-2 text-xs font-mono uppercase text-black focus:outline-none cursor-pointer"
                    >
                      <option value="Founder">Founder / Operator</option>
                      <option value="Investor">Investor / VC</option>
                      <option value="Researcher">University Tech Transfer</option>
                      <option value="Policymaker">Ecosystem policymaker</option>
                      <option value="Diaspora Representative">Diaspora Agent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] font-black text-gray-500 uppercase mb-1">Email Coordinates *</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g., maryse@cedarventures.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-white border-2 border-black p-2 text-xs font-mono uppercase text-black focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white border-2 border-black font-syne font-black text-xs uppercase py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Verify and Issue Boarding Pass</span>
                  <ArrowRight className="w-4 h-4 shrink-0 font-bold" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC CONFERENCE SCHEDULE BLOCKS AND CONTROLS */}
      <div className="bg-white border-4 border-black p-6 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]" id="agenda_full_block">
        
        {/* Switcheable blocks: MORNING SESSIONS vs AFTERNOON SESSIONS */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b-4 border-black pb-5 mb-6" id="agenda_title_bar">
          <div>
            <span className="font-mono text-xs font-black text-gray-500 uppercase tracking-widest pl-0.5">TIMELINE TRACKS</span>
            <h3 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-black leading-none mt-1">
              CONFERENCE PROGRAM
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-3" id="agenda_days_toggle_wrapper">
            <div className="flex border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" id="agenda_days_toggle">
              <button
                onClick={() => {
                  setActiveHalf("all");
                  setSelectedSessionId(null);
                }}
                className={`px-3 sm:px-4 py-2 font-syne font-black text-[10px] uppercase tracking-tight transition-all cursor-pointer ${
                  activeHalf === "all"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-zinc-100"
                }`}
              >
                Full Day Program
              </button>
              <button
                onClick={() => {
                  setActiveHalf("morning");
                  setSelectedSessionId(null);
                }}
                className={`px-3 sm:px-4 py-2 font-syne font-black text-[10px] uppercase tracking-tight transition-all cursor-pointer ${
                  activeHalf === "morning"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-zinc-100"
                }`}
              >
                Morning: Foundation & Strategy
              </button>
              <button
                onClick={() => {
                  setActiveHalf("afternoon");
                  setSelectedSessionId(null);
                }}
                className={`px-3 sm:px-4 py-2 font-syne font-black text-[10px] uppercase tracking-tight transition-all cursor-pointer ${
                  activeHalf === "afternoon"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-zinc-100"
                }`}
              >
                Afternoon: AI & Scaling Playbook
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Context Headers */}
        <AnimatePresence mode="wait">
          {activeHalf === "all" && (
            <motion.div 
              key="all"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mb-6 p-4 bg-zinc-55 bg-zinc-50 border-2 border-black"
            >
              <h4 className="font-syne font-extrabold text-xs uppercase text-zinc-900">COMPLETE MASTER SYMPOSIUM OVERVIEW</h4>
              <p className="text-[14px] text-zinc-700 leading-relaxed font-sans font-medium mt-1">
                Visualizing the fully mapped July 17th agenda consisting of 4 dedicated Panels, a networking interlude, premium lunch zones, and the Ascent scaling finale Roundtable.
              </p>
            </motion.div>
          )}
          {activeHalf === "morning" && (
            <motion.div 
              key="morning"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mb-6 p-4 bg-stone-50 border-2 border-zinc-700"
            >
              <h4 className="font-syne font-extrabold text-xs uppercase text-stone-950">MORNING SESSIONS: ECOSYSTEM STATE & GULF INTEGRATION CHANNELS</h4>
              <p className="text-[14px] text-zinc-700 leading-relaxed font-sans font-medium mt-1">
                From 09:00 AM to 12:30 PM, learn how founders handle volatility and configure the Levant-to-Gulf entity structures (KSA & UAE) to draw regional seed capital.
              </p>
            </motion.div>
          )}
          {activeHalf === "afternoon" && (
            <motion.div 
              key="afternoon"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mb-6 p-4 bg-sky-50 border-2 border-sky-400"
            >
              <h4 className="font-syne font-extrabold text-xs uppercase text-sky-950 text-sky-900">AFTERNOON SESSIONS: DEEP AI ENGINEERING & CROSS-BORDER ROADMAPS</h4>
              <p className="text-[14px] text-sky-950 leading-relaxed font-sans font-medium mt-1">
                From 12:30 PM to 05:30 PM, deep dive into academic tech licensing, edge servers for zero physical downtime, multi-agent RAGs, cybersecurity moats, and the Ascent scaling playbook.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTROLS BAR: SEARCH, INTERACTIVE CATEGORY PILLS, AND LAYOUT SWITCHERS */}
        <div className="bg-zinc-50 border-2 border-black p-4 mb-6 space-y-4" id="agenda_advanced_controls">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search panels, workshops, specific topics, or speakers..."
                value={sessionQuery}
                onChange={(e) => setSessionQuery(e.target.value)}
                className="w-full bg-white border-2 border-black pl-10 pr-4 py-2 text-xs font-mono uppercase text-black focus:outline-none placeholder-zinc-400 font-bold"
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

            {/* Layout Mode Switcher */}
            <div className="flex items-center gap-2 border-2 border-black p-1 bg-white" id="layout_mode_switcher">
              <span className="font-mono text-[9px] font-black text-gray-505 uppercase px-2 hidden sm:inline">VIEW LAYOUT:</span>
              <button
                onClick={() => setLayoutMode("timeline")}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] font-black uppercase transition-all cursor-pointer ${
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
                onClick={() => setLayoutMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] font-black uppercase transition-all cursor-pointer ${
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
                onClick={() => setLayoutMode("board")}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] font-black uppercase transition-all cursor-pointer ${
                  layoutMode === "board"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-zinc-100"
                }`}
                title="Categorized Track Grid"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 animate-pulse" />
                <span>Segment Board</span>
              </button>
            </div>
          </div>

          {/* Type Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-200">
            {[
              { id: "ALL", label: "All Program", count: seminarAgenda.length },
              { id: "PANEL", label: "Panels, Keynotes & Ascent Roundtable", count: seminarAgenda.filter(s => s.type.toLowerCase().includes("panel") || s.type.toLowerCase().includes("keynote")).length },
              { id: "BREAK", label: "Networking Coffee & Lunches", count: seminarAgenda.filter(s => s.type.toLowerCase().includes("break") || s.type.toLowerCase().includes("logistics")).length },
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
                  selectedCategory === cat.id ? "bg-zinc-800 text-white border-zinc-705" : "bg-zinc-100 text-zinc-650 border-zinc-300"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* SCHEDULE DISPATCHERS */}
        {filteredSessions.length === 0 ? (
          <div className="border-2 border-dashed border-zinc-300 p-12 text-center bg-zinc-50 text-gray-500 space-y-3" id="agenda_empty_state">
            <SlidersHorizontal className="w-8 h-8 text-zinc-400 mx-auto" />
            <h4 className="font-syne font-black text-sm uppercase text-black">No Matching Program Blocks</h4>
            <p className="text-xs normal-case text-gray-500 max-w-md mx-auto">
              We couldn't verify any specific panel or keynote addressing your query criteria "<strong>{sessionQuery}</strong>" in the "{activeHalf}" list. Track adjustment is recommended.
            </p>
            <button
              onClick={() => {
                setSessionQuery("");
                setSelectedCategory("ALL");
                setActiveHalf("all");
              }}
              className="bg-black text-white border-2 border-black font-syne font-black text-xs uppercase px-4 py-1.5 hover:bg-zinc-800 transition-all cursor-pointer"
            >
              Reset Search Parameters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* RENDER MODE: TIMELINE HOUR GRID */}
            {layoutMode === "timeline" && (
              <div className="border-4 border-black divide-y-4 divide-black" id="agenda_timeline_render">
                {filteredSessions.map((session) => {
                  const isExpanded = selectedSessionId === session.id;
                  return (
                    <div 
                      key={session.id}
                      className={`grid grid-cols-1 lg:grid-cols-12 items-stretch gap-0 transition-colors ${
                        isExpanded ? "bg-zinc-50" : "bg-white hover:bg-zinc-50/20"
                      }`}
                      id={`timeline_block_${session.id}`}
                    >
                      {/* Hour column */}
                      <div className="lg:col-span-3 p-4 bg-zinc-100 border-b border-black lg:border-b-0 lg:border-r-2 lg:border-black flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-center gap-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-black" />
                          <span className="font-mono text-sm sm:text-base font-black text-black tracking-tight leading-none">
                            {session.time}
                          </span>
                        </div>
                        <span className={`font-mono text-[8px] sm:text-[9.5px] font-bold px-2 py-0.5 border border-black uppercase text-center ${session.badgeColor}`}>
                          {session.type}
                        </span>
                      </div>

                      {/* Summary details */}
                      <div className="lg:col-span-6 p-4 flex flex-col justify-center space-y-2 border-b border-black lg:border-b-0 lg:border-r-2 lg:border-black">
                        <h4 
                          className="font-syne font-black text-sm sm:text-base text-black uppercase tracking-tight cursor-pointer hover:text-orange-600 leading-tight"
                          onClick={() => setSelectedSessionId(isExpanded ? null : session.id)}
                        >
                          {session.title}
                        </h4>
                        <div className="bg-white/80 border border-zinc-200 p-2 text-xs">
                          <span className="font-mono text-[8px] font-black text-zinc-400 block uppercase">FOCUS VECTOR:</span>
                          <p className="text-[14px] text-zinc-800 font-mono font-bold leading-snug">
                            {session.focus}
                          </p>
                        </div>

                        {/* Expandable session summary notes */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden font-sans border-t border-dashed border-zinc-350 pt-2.5 mt-2.5 space-y-3"
                            >
                              <span className="font-mono text-[8px] font-black text-orange-500 uppercase block tracking-wider">Detailed Subject Syllabus</span>
                              <div className="text-[14px] text-zinc-800 leading-relaxed font-sans font-medium whitespace-pre-wrap font-semibold" id={`syllabus_notes_${session.id}`}>
                                {session.details}
                              </div>
                              <div className="pt-2 border-t border-zinc-205 font-mono text-[9px] flex flex-wrap gap-4 text-zinc-400 uppercase font-bold">
                                <span>VENUE: BDD HALLROOMS G-10</span>
                                <span>COHORT LEVEL: OPEN ENTRY</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Spakers Facilitators */}
                      <div className="lg:col-span-3 p-4 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-center gap-2">
                        <div className="min-w-0">
                          <span className="font-mono text-[8px] text-gray-400 font-black uppercase block">Facilitator / Speakers:</span>
                          <span className="font-sans text-[11px] font-black text-zinc-900 block truncate max-w-[200px]" title={session.speaker}>
                            {session.speaker}
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedSessionId(isExpanded ? null : session.id)}
                          className="px-3 py-1.5 border-2 border-black bg-white text-black font-mono text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-1"
                        >
                          <span>{isExpanded ? "Syllabus ▲" : "Syllabus ▼"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* RENDER MODE: BENTO GRID */}
            {layoutMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="agenda_grid_render">
                {filteredSessions.map((session) => {
                  const isExpanded = selectedSessionId === session.id;
                  return (
                    <div 
                      key={session.id}
                      className={`border-4 border-black p-5 flex flex-col justify-between transition-all relative ${
                        isExpanded 
                          ? "bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-[1.01]" 
                          : "bg-white hover:bg-zinc-50/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px]"
                      }`}
                      id={`grid_block_${session.id}`}
                    >
                      <div>
                        {/* Time label sticker */}
                        <div className="flex items-center justify-between gap-1 border-b border-zinc-200 pb-3 mb-3">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-zinc-650" />
                            <span className="font-mono text-[10px] font-extrabold bg-black text-white px-2 py-0.5">
                              {session.time}
                            </span>
                          </div>
                          <span className={`font-mono text-[8px] font-bold px-1.5 py-0.5 border border-black uppercase ${session.badgeColor}`}>
                            {session.type}
                          </span>
                        </div>

                        <h4 
                          className="font-syne font-black text-sm uppercase tracking-tight text-zinc-950 cursor-pointer hover:text-orange-500 leading-snug line-clamp-2"
                          onClick={() => setSelectedSessionId(isExpanded ? null : session.id)}
                        >
                          {session.title}
                        </h4>

                        <div className="bg-zinc-50 border border-zinc-300 p-2 mt-2">
                          <span className="font-mono text-[8px] text-zinc-400 block uppercase font-bold">Focus Target:</span>
                          <p className="text-[13px] text-zinc-900 font-mono font-bold leading-normal lowercase first-letter:uppercase">
                            {session.focus}
                          </p>
                        </div>

                        <div className="mt-3">
                          {isExpanded ? (
                            <div className="space-y-3 bg-white border border-black p-3 text-xs">
                              <span className="font-mono text-[8px] font-black text-gray-500 uppercase block">Curriculum Summary</span>
                              <p className="text-[14px] text-zinc-800 leading-relaxed font-sans font-medium whitespace-pre-wrap select-text font-semibold">
                                {session.details}
                              </p>
                            </div>
                          ) : (
                            <p className="text-[14px] text-zinc-500 font-sans line-clamp-3 leading-normal normal-case">
                              {session.details}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Card bottom footer */}
                      <div className="border-t border-zinc-200 mt-4 pt-3 flex items-center justify-between gap-2 text-[10px] font-mono">
                        <div className="min-w-0">
                          <span className="text-gray-400 uppercase font-black block text-[8px]">Facilitator</span>
                          <span className="text-zinc-900 font-black truncate block max-w-[150px]" title={session.speaker}>
                            {session.speaker}
                          </span>
                        </div>
                        
                        <button
                          onClick={() => setSelectedSessionId(isExpanded ? null : session.id)}
                          className="px-2 py-1 border border-black font-mono text-[9px] font-bold hover:bg-black hover:text-white cursor-pointer transition-all shrink-0"
                        >
                          {isExpanded ? "Close ▲" : "Detail ▼"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* RENDER MODE: SEGMENT TRACK BOARD */}
            {layoutMode === "board" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="agenda_board_render">
                {[
                  {
                    title: "Foundation & Strategy (09:00 - 12:30)",
                    tag: "morning",
                    bgColor: "bg-stone-50 border-stone-800",
                    headerClass: "bg-stone-900 text-stone-150 text-white",
                    items: filteredSessions.filter(s => s.sessionHalf === "morning")
                  },
                  {
                    title: "AI & Scaled Systems (12:30 - 14:30)",
                    tag: "afternoon-early",
                    bgColor: "bg-sky-50/40 border-sky-650 border-sky-400",
                    headerClass: "bg-sky-900 text-sky-100 text-white",
                    items: filteredSessions.filter(s => s.sessionHalf === "afternoon" && s.timeStartDigit < 15.0)
                  },
                  {
                    title: "Scaling Ascent & Cyber (15:10 - 17:30)",
                    tag: "afternoon-ascent",
                    bgColor: "bg-zinc-950 text-zinc-200 border-black",
                    headerClass: "bg-black text-[#adff2f]",
                    items: filteredSessions.filter(s => s.sessionHalf === "afternoon" && s.timeStartDigit >= 15.0)
                  }
                ].map((col, cIdx) => (
                  <div key={cIdx} className={`border-4 p-4 flex flex-col justify-between ${col.bgColor}`} id={`board_col_${cIdx}`}>
                    <div>
                      <div className={`p-2.5 border-2 border-black mb-4 uppercase ${col.headerClass}`}>
                        <h5 className="font-syne font-black text-xs tracking-tight">{col.title}</h5>
                        <span className="font-mono text-[8px] block opacity-80 font-bold mt-0.5">Time Cluster Segment</span>
                      </div>

                      {col.items.length === 0 ? (
                        <div className="p-8 text-center text-zinc-400 font-mono text-[10px] uppercase border border-dashed border-zinc-300 bg-white/20">
                          Empty Session Query segment
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {col.items.map((session) => {
                            const isExpanded = selectedSessionId === session.id;
                            return (
                              <div 
                                key={session.id}
                                className="bg-white text-black border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-1 mb-2">
                                    <span className="font-mono text-[8.5px] font-black bg-black text-white px-1.5 py-0.2">
                                      {session.time.split(" ")[0] || session.time}
                                    </span>
                                    <span className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-tighter truncate max-w-[80px]">
                                      {session.type}
                                    </span>
                                  </div>

                                  <h6 
                                    className="font-syne font-extrabold text-xs uppercase text-zinc-900 leading-tight cursor-pointer hover:text-orange-500"
                                    onClick={() => setSelectedSessionId(isExpanded ? null : session.id)}
                                  >
                                    {session.title}
                                  </h6>

                                  {isExpanded && (
                                    <div className="mt-2.5 pt-2 border-t border-dashed border-zinc-200 space-y-1.5">
                                      <span className="font-mono text-[8px] font-black text-zinc-400 block uppercase">Curriculum Synopsis:</span>
                                      <p className="text-[13px] font-sans normal-case text-zinc-700 leading-snug whitespace-pre-wrap font-semibold">
                                        {session.details}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                <button
                                  onClick={() => setSelectedSessionId(isExpanded ? null : session.id)}
                                  className="text-right text-[8.5px] font-mono font-black mt-3 text-zinc-400 hover:text-black cursor-pointer uppercase self-end"
                                >
                                  {isExpanded ? "[ Close ]" : "[ Outline ]"}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-dashed border-zinc-400 mt-4 pt-3 text-[9px] font-mono text-zinc-400 flex items-center justify-between font-bold">
                      <span>TRACK LOG:</span>
                      <span>{col.items.length} SECTOR BLOCK{col.items.length === 1 ? "" : "S"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. INTERACTIVE SIMULATOR DIALOGUE: THE AI MATURITY & CONTINUITY ENGINE */}
      <div className="bg-[#0b0c10] text-[#c5c6c7] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" id="interactive_audit_simulator">
        <div className="absolute top-2 right-2 font-mono text-[8px] font-black text-rose-500 bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 uppercase tracking-widest animate-pulse">
          DIAGNOSTIC PIPELINE MODULATOR
        </div>

        <div className="border-b border-zinc-800 pb-4 mb-5">
          <div className="flex items-center gap-2 text-white">
            <Cpu className="w-5 h-5 text-orange-500 animate-spin" style={{ animationDuration: '4s' }} />
            <h3 className="font-syne font-black text-base sm:text-lg uppercase tracking-tight">
              Ecosystem Agility & Sandbox Readiness Modulator
            </h3>
          </div>
          <p className="font-mono text-[13.5px] uppercase tracking-wide text-zinc-400 mt-1 font-bold">
            Simulate your startup parameters directly below to audit potential capital multipliers against our institutional standard.
          </p>
        </div>

        {/* STEP 0: START */}
        {auditStep === "start" && (
          <div className="space-y-4 py-2" id="audit_step_start">
            <h4 className="font-syne font-extrabold text-sm text-white uppercase leading-snug">Does your technical stack meet international diaspora risk limits?</h4>
            <p className="text-[14px] leading-relaxed text-zinc-300 normal-case font-sans font-semibold">
              Before presenting pitches inside the Sandbox or seeking IDAL R&D capital, startups undergo an agility assessment. Use this simulator to audit your Agentic stack, connectivity backup strategies, and financial pipeline designs.
            </p>
            <button
              onClick={() => setAuditStep("q1")}
              type="button"
              className="bg-white text-black font-syne font-black text-xs uppercase px-5 py-3 shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,0.4)] hover:shadow-none hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Initialize Compliance Modulator</span>
              <ArrowRight className="w-4 h-4 text-black font-bold" />
            </button>
          </div>
        )}

        {/* STEP 1: AI ARCHITECTURE STACK */}
        {auditStep === "q1" && (
          <div className="space-y-4 py-2" id="audit_step_q1">
            <div className="flex items-center gap-1 font-mono text-[9.5px] font-black text-orange-500">
              <span>SECTION 1 OF 3</span>
              <span>•</span>
              <span className="uppercase">AI ENGINEERING PARADIGM</span>
            </div>
            <h4 className="font-syne font-extrabold text-sm text-white uppercase">How is artificial intelligence layered into your product's core?</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleAuditPick("stack", "general", "q2")}
                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-400 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer transition-all"
              >
                <div className="font-bold text-white mb-1">Standard Software Apps</div>
                <p className="text-[13px] font-mono lowercase first-letter:uppercase text-zinc-500 leading-tight">Vanilla React or mobile frontends using external public SaaS APIs on top-level clients.</p>
              </button>
              <button
                type="button"
                onClick={() => handleAuditPick("stack", "hybrid", "q2")}
                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-400 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer transition-all"
              >
                <div className="font-bold text-white mb-1">Standalone RAG Nodes</div>
                <p className="text-[13px] font-mono lowercase first-letter:uppercase text-zinc-500 leading-tight">Retrieval-Augmented Generation setups backed by vector indices to query company files manually.</p>
              </button>
              <button
                type="button"
                onClick={() => handleAuditPick("stack", "agents", "q2")}
                className="bg-zinc-950 border-2 border-orange-500 p-4 text-left text-xs text-zinc-350 uppercase cursor-pointer transition-all relative"
              >
                <div className="absolute -top-2 right-2 bg-orange-500 text-black font-mono text-[8.5px] font-black px-1.5 uppercase">IDEAL SCORE</div>
                <div className="font-bold text-white mb-1">Agentic AI & Multi-Agent Loops</div>
                <p className="text-[13px] font-mono lowercase first-letter:uppercase text-zinc-450 leading-tight">Complex autonomous agent pipelines coordinating back-office workflows, billing compliance and routing.</p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: OPERATIONAL CONTINUITY */}
        {auditStep === "q2" && (
          <div className="space-y-4 py-2" id="audit_step_q2">
            <div className="flex items-center gap-1 font-mono text-[9.5px] font-black text-orange-500">
              <span>SECTION 2 OF 3</span>
              <span>•</span>
              <span className="uppercase">INFRASTRUCTURE CONTINUITY</span>
            </div>
            <h4 className="font-syne font-extrabold text-sm text-white uppercase">How does your codebase structure behave under infrastructure pressure?</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleAuditPick("content", "manual", "q3")}
                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-400 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer transition-all"
              >
                <div className="font-bold text-white mb-1">Standard Cloud Providers</div>
                <p className="text-[13px] font-mono lowercase first-letter:uppercase text-zinc-500 leading-tight">Conventional VM deployments with substantial reliance on local network access points.</p>
              </button>
              <button
                type="button"
                onClick={() => handleAuditPick("content", "semi", "q3")}
                className="bg-zinc-950 border border-zinc-805 hover:border-zinc-400 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer transition-all"
              >
                <div className="font-bold text-white mb-1">Redundant Mirror Backups</div>
                <p className="text-[13px] font-mono lowercase first-letter:uppercase text-zinc-500 leading-tight">Multi-region mirrors on general-purpose cloud services with automated fallbacks to secure databases.</p>
              </button>
              <button
                type="button"
                onClick={() => handleAuditPick("content", "automated", "q3")}
                className="bg-zinc-950 border-2 border-orange-500 p-4 text-left text-xs text-zinc-350 uppercase cursor-pointer transition-all relative"
              >
                <div className="absolute -top-2 right-2 bg-orange-500 text-black font-mono text-[8.5px] font-black px-1.5 uppercase">IDEAL SCORE</div>
                <div className="font-bold text-white mb-1">Zero Downtime Edge Mesh</div>
                <p className="text-[13px] font-mono lowercase first-letter:uppercase text-zinc-450 leading-tight">Edge hosting combined with hybrid satellite networks and alternative offline transaction channels.</p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CROSS-BORDER ENTITY PIPELINE */}
        {auditStep === "q3" && (
          <div className="space-y-4 py-2" id="audit_step_q3">
            <div className="flex items-center gap-1 font-mono text-[9.5px] font-black text-orange-500">
              <span>SECTION 3 OF 3</span>
              <span>•</span>
              <span className="uppercase">FINTECH GATEWAY DESIGN</span>
            </div>
            <h4 className="font-syne font-extrabold text-sm text-white uppercase">How is capital cleared and transferred programmatically to the venture?</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleAuditPick("automation", "manual", "result")}
                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-400 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer transition-all"
              >
                <div className="font-bold text-white mb-1">Legacy Wire Billing</div>
                <p className="text-[13px] font-mono lowercase first-letter:uppercase text-zinc-500 leading-tight">Traditional bank checking accounts handling regional transfers manually with clearance limits.</p>
              </button>
              <button
                type="button"
                onClick={() => handleAuditPick("automation", "semi", "result")}
                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-400 p-4 text-left text-xs text-zinc-300 uppercase cursor-pointer transition-all"
              >
                <div className="font-bold text-white mb-1">Offshore Account Wrapper</div>
                <p className="text-[13px] font-mono lowercase first-letter:uppercase text-zinc-500 leading-tight">An independent, remote bank setup cleared using standard wire transfers from GCC clients.</p>
              </button>
              <button
                type="button"
                onClick={() => handleAuditPick("automation", "zapier", "result")}
                className="bg-zinc-950 border-2 border-orange-500 p-4 text-left text-xs text-zinc-350 uppercase cursor-pointer transition-all relative"
              >
                <div className="absolute -top-2 right-2 bg-orange-500 text-black font-mono text-[8.5px] font-black px-1.5 uppercase">IDEAL SCORE</div>
                <div className="font-bold text-white mb-1">Embedded Levant-to-Gulf Rails</div>
                <p className="text-[13px] font-mono lowercase first-letter:uppercase text-zinc-450 leading-tight">Fully integrated global fintech APIs, multi-currency electronic wallets, and compliant GCC-wide structures.</p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: DIAGNOSTIC RESULTS */}
        {auditStep === "result" && (
          <div className="space-y-4 py-2" id="audit_step_result">
            <div className="font-mono text-[9px] font-black text-orange-550 uppercase">
              AUDIT VERIFIED ✓ STRATEGIC COMPLIANCE SYNTACTIC SUMMARY
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2.5">
                <div>
                  <span className="text-[8px] text-zinc-400 block font-mono">NCEI SCALE AGILITY CLASSIFICATION</span>
                  <span className="font-syne font-black text-sm text-white block mt-0.5">{auditResult.rank}</span>
                </div>
                <div className="bg-orange-500 text-black px-2.5 py-1 text-[9.5px] font-mono font-black uppercase tracking-tight shrink-0">
                  Sandboxed Status: Ready
                </div>
              </div>

              <div>
                <span className="text-[8px] text-zinc-400 block font-mono">DIAGNOSTIC FEEDBACK</span>
                <p className="text-[13.5px] normal-case text-zinc-300 font-sans mt-0.5 leading-relaxed font-semibold">
                  {auditResult.desc}
                </p>
              </div>

              <div className="bg-zinc-950 p-4 border border-zinc-800">
                <span className="text-[10px] text-orange-400 block font-mono font-black uppercase tracking-wide">SUMMIT RECOMMENDATION FOR JULY 17 COHORT PREPARATION</span>
                <p className="text-[13px] normal-case text-zinc-300 font-sans mt-1 leading-snug">
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
                Reset Diagnostic Modulator
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setActiveHalf("afternoon");
                  const el = document.getElementById("agenda_full_block");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-[#adff2f] text-black font-syne font-black text-xxs sm:text-xs uppercase px-4 py-3 shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,0.4)] hover:shadow-none hover:translate-x-[0.5px] hover:translate-y-[0.5px] cursor-pointer"
              >
                Go to Afternoon AI Panels
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. STRATEGY DEEP-DIVE: DETAILED MODULE BREAKDOWN (OCR INTEGRATED) */}
      <div className="bg-white border-4 border-black p-6 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]" id="detailed_strategic_playbook">
        
        {/* Playbook Header & Dynamic Filter Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b-2 border-black pb-4 mb-6">
          <div>
            <span className="font-mono text-xs font-black text-gray-500 uppercase tracking-widest pl-0.5">THE INCUBATOR MANDATE</span>
            <h3 className="font-syne font-black text-lg sm:text-2xl uppercase tracking-tight text-black mt-1">
              THE 2026 STRATEGIC RECOMMENDATIONS
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-zinc-50 border-2 border-black px-3 py-1.5 text-xs font-mono w-full md:w-64" id="strategy_search_container">
            <Search className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Filter Playbook Pillars..."
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
                      <p className="text-[14px] leading-relaxed text-zinc-700 font-sans normal-case font-semibold select-text">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-150 pt-3 mt-5 flex justify-between items-center text-[9px] font-mono text-zinc-405 font-black uppercase">
                <span>INCUBATOR COHORT MANDATE</span>
                <span>SECTION ID: 0{index + 1}</span>
              </div>
            </div>
          ))}

          {filteredStrategies.length === 0 && (
            <div className="col-span-full border-2 border-dashed border-black p-10 text-center bg-zinc-50 font-mono text-xs uppercase font-extrabold text-zinc-500" id="empty_strategy_search">
              No matching strategy found for "{strategyQuery}". Reset searching parameters to view the complete strategic pillars.
            </div>
          )}
        </div>
      </div>

      {/* 6. CALL TO ACTION FOOTER */}
      <div className="bg-black text-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center max-w-3xl mx-auto space-y-4 mt-6" id="seminar_bottom_cta">
        <h3 className="font-syne font-bold text-xl sm:text-2xl uppercase tracking-tight text-white leading-none">
          JOIN LEBANON'S 2026 DEEP TECH ECOSYSTEM
        </h3>
        <p className="text-[13.5px] font-mono text-zinc-300 max-w-xl mx-auto leading-relaxed uppercase font-semibold">
          Pre-registration is required to claim physical entrance permits at Beirut Digital District rooms. Sandbox members are urged to review security clearances beforehand.
        </p>

        <div className="flex flex-wrap justify-center gap-3.5 pt-2">
          {savedPass ? (
            <button
              onClick={() => {
                const el = document.getElementById("seminar_hero_wrapper");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              type="button"
              className="bg-[#adff2f] text-black border-2 border-[#adff2f] font-syne font-black text-xs uppercase px-5 py-3 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
            >
              Ticket verified ✓ View Boarding pass
            </button>
          ) : (
            <button
              onClick={() => {
                const el = document.getElementById("seminar_pass_module");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              type="button"
              className="bg-white text-black border-2 border-white font-syne font-black text-xs uppercase px-5 py-3 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
            >
              Request Free Boarding Pass
            </button>
          )}

          <button
            onClick={onOpenNda}
            type="button"
            className="bg-zinc-800 text-zinc-300 border-2 border-zinc-700 font-mono font-black text-xs uppercase px-5 py-3 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
          >
            Digital NDA Sign Sandbox
          </button>
        </div>

        <div className="border-t border-zinc-800 pt-4 text-[10px] font-mono text-zinc-500 flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 font-bold uppercase">
          <span>NCEI LEBANON</span>
          <span>•</span>
          <span>BEIRUT DIGITAL DISTRICT (BDD)</span>
          <span>•</span>
          <span>FRIDAY, JULY 17, 2026</span>
        </div>
      </div>

    </div>
  );
}
