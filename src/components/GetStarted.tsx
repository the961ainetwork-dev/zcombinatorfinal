import React, { useState } from "react";
import { 
  Rocket, 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  TrendingUp, 
  Building, 
  BookOpen, 
  Compass, 
  Sparkles, 
  Users, 
  Award, 
  ChevronRight, 
  FileCheck, 
  MapPin, 
  Coins, 
  Layers,
  GraduationCap
} from "lucide-react";

interface GetStartedProps {
  setTab: (tab: any) => void;
}

export default function GetStarted({ setTab }: GetStartedProps) {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  const workflowSteps = [
    {
      title: "1. Institutional Intake & Data Audit",
      description: "Submit your dossier for a multi-dimensional audit focusing on founder expertise, technical feasibility, and alignment with national goals.",
      detail: "This level monitors core tech stacks and business validation, ensuring no artificial bloat or mock systems are passed as solutions."
    },
    {
      title: "2. Readiness Verification",
      description: "Projects are assigned an 'Institutional Readiness Score'; only those meeting rigorous transparency standards proceed to the Sandbox.",
      detail: "This score is published on the blockchain-anchored ledger, enabling verified diaspora checks without friction."
    },
    {
      title: "3. The Institutional Sandbox",
      description: "A secure environment providing continuous researcher oversight, technical mentorship in RAG architectures, and financial modeling.",
      detail: "Features active sandboxing of legal and regulatory compliance guidelines for modern fintech & AI systems."
    },
    {
      title: "4. Strategic Matching",
      description: "Our matching engine connects verified startups with targeted diaspora investors based on specific sector mandates.",
      detail: "Matches take into account ticket sizes (from $10k to $250k+) as well as regional co-development targets."
    },
    {
      title: "5. Growth & Local Retention",
      description: "We provide the market access and institutional backing necessary to keep core operations rooted in Lebanon.",
      detail: "Empowering tech hubs locally to prevent brain drain while pulling fresh international USD into the domestic economy."
    }
  ];

  const startupThemes = [
    {
      category: "Financial & Regulatory",
      icon: <Coins className="w-5 h-5 text-amber-600" />,
      color: "bg-amber-50 border-amber-300",
      accentBg: "bg-amber-500",
      items: [
        "AI-driven micro-investment platforms",
        "Cross-border remittance optimizers",
        "Predictive debt recovery assistants",
        "KYC blockchain-AI hybrids",
        "Automated SME credit risk engines"
      ]
    },
    {
      category: "Operational & Macro",
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      color: "bg-blue-50 border-blue-300",
      accentBg: "bg-blue-500",
      items: [
        "AI-driven RegTech monitors",
        "Macro-economic sentiment analyzers",
        "Autonomous back-office concierges",
        "Hyper-localized supply chain optimizers"
      ]
    },
    {
      category: "Specialized Sectors",
      icon: <Cpu className="w-5 h-5 text-purple-600" />,
      color: "bg-purple-50 border-purple-300",
      accentBg: "bg-purple-500",
      items: [
        "AI-powered agricultural yield predictors",
        "Personalized digital education hubs",
        "Real estate valuation transparency engines",
        "Secure medical record hubs",
        "Hospitality management tools (e.g., Montavi Village)"
      ]
    }
  ];

  const milestones = [
    { date: "NOW OPEN", stage: "Enrollment & Screening", desc: "Applications actively open via the NCEI digital portal. Vetting is initiated automatically." },
    { date: "JUNE 30, 2026", stage: "Kickoff Event & Launch Seminar", desc: "Official launch seminar at the Beirut Digital District (BDD), setting expectations and standard guidelines." },
    { date: "EARLY SUMMER 2026", stage: "Development & Intensive Auditing", desc: "Startups engage in precise technical audits and business model refinement within the 'Demo Arena'." },
    { date: "MONTHLY 2026", stage: "Milestone Reviews", desc: "Standard checkpoints to track scale preparedness, operational velocity, and governance compliance." },
    { date: "SEPTEMBER 2026", stage: "Final Showcase & Singularity Summit", desc: "Graduation and project exposition to regional/global investors and institutional agencies." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-12" id="get_started_page_root">
      
      {/* SECTION 1: HERO HEADER HERO */}
      <div className="border-4 border-black bg-black text-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(245,158,11,1)] relative overflow-hidden" id="get_started_hero_header">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 opacity-20 rounded-full transform translate-x-24 -translate-y-24"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500 text-black font-mono font-black text-xs uppercase px-3 py-1 border border-black rounded">
            <Rocket className="w-3.5 h-3.5 animate-bounce" />
            <span>Applications Now Open</span>
          </div>
          
          <h1 className="font-syne font-black text-3xl md:text-5xl text-white uppercase tracking-tight leading-tight">
            GET STARTED with <span className="text-amber-500">Z961-Combinator</span>
          </h1>
          <p className="font-syne text-xl text-zinc-300 font-extrabold tracking-tight">
            Where Innovation Meets Capital • Summer 2026 Cohort
          </p>
          
          <p className="text-sm font-mono text-zinc-400 max-w-3xl leading-relaxed">
            We are officially opening applications for our Summer 2026 AI Startup Cohort—a cornerstone of the National Council for Entrepreneurship and Innovation’s (NCEI) strategic vision. Our goal is to transition <strong className="text-white underline">25 high-potential ventures</strong> from MVP to market-ready enterprises.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-500">
              <Calendar className="w-4.5 h-4.5 shrink-0" />
              <span>KICKOFF: June 30, 2026 @ Beirut Digital District (BDD)</span>
            </div>
            <span className="hidden md:inline text-zinc-650">•</span>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span>Beirut & virtual hybrid global match desk</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: HOW TO PARTICIPATE & INTERACTIVE QUICK LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="participation_and_quick_links">
        
        {/* How to Participate Detail */}
        <div className="col-span-1 md:col-span-2 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-amber-100 p-2 border-2 border-black">
                <Compass className="w-6 h-6 text-black" />
              </div>
              <h2 className="font-syne font-black text-xl uppercase tracking-tight text-orange-600">
                How to Participate
              </h2>
            </div>
            
            <p className="text-xs font-mono leading-relaxed text-zinc-700">
              Entering the cohort is designed as a structured process to ensure matching compliance and alignment. Startups, researchers, and diaspora investors coordinate through standardized sandboxing steps.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5">
                <div className="bg-amber-500 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-black mt-0.5">
                  <span className="text-[10px] font-bold text-black font-mono">1</span>
                </div>
                <div>
                  <h4 className="font-sans font-black text-xs text-black uppercase">Registration</h4>
                  <p className="text-[11px] font-mono text-zinc-550">Apply via our official digital portal to begin your intake dossier audit.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-black">
                <div className="bg-amber-500 rounded-full w-5 h-5 flex items-center justify-center shrink-0 border border-black mt-0.5">
                  <span className="text-[10px] font-bold text-black font-mono">2</span>
                </div>
                <div>
                  <h4 className="font-sans font-black text-xs text-black uppercase">Documentation Vetting</h4>
                  <p className="text-[11px] font-mono text-zinc-550">
                    Please review our regulatory sandbox terms, sign off your NDA, and read our comprehensive prospectus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-zinc-200 mt-4">
            <button
              onClick={() => setTab("register")}
              className="bg-amber-500 hover:bg-amber-400 text-black border-2 border-black font-black uppercase text-xs p-2.5 flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
            >
              <span>Apply for Cohort</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
            <button
              onClick={() => setTab("prospectus")}
              className="bg-white hover:bg-zinc-100 text-black border-2 border-black font-black uppercase text-xs p-2.5 flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
            >
              <span>Read Prospectus</span>
              <BookOpen className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

        {/* Action Panel: Sandbox Quick Action Cards */}
        <div className="border-4 border-black bg-amber-50 p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div className="space-y-4">
            <span className="bg-black text-amber-400 font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded border border-black self-start">
              Required Actions
            </span>
            <h3 className="font-syne font-black text-lg uppercase tracking-tight text-orange-600">
              Dossier Checklists
            </h3>
            <p className="text-[11px] font-mono text-amber-900 leading-relaxed">
              Verify your documentation meets NCEI criteria before the June 30 cutoff. Read our regulatory terms below:
            </p>

            <div className="space-y-2 font-mono text-xs">
              <button
                onClick={() => setTab("nda")}
                className="w-full text-left p-2.5 bg-white border border-black hover:bg-zinc-50 flex items-center justify-between font-bold"
              >
                <span>1. Sign Sandbox NDA</span>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </button>
              <button
                onClick={() => setTab("tor")}
                className="w-full text-left p-2.5 bg-white border border-black hover:bg-zinc-50 flex items-center justify-between font-bold"
              >
                <span>2. Accept ToR Rules</span>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </button>
              <button
                onClick={() => setTab("institutional")}
                className="w-full text-left p-2.5 bg-white border border-black hover:bg-zinc-50 flex items-center justify-between font-bold"
              >
                <span>3. Setup Partner Mandate</span>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </button>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-3 mt-4 text-[10px] font-mono text-amber-800 uppercase font-black flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Strict encrypted protection enabled</span>
          </div>
        </div>
      </div>

      {/* SECTION 4: THE Z961-COMBINATOR WORKFLOW (INTERACTIVE TIMELINE) */}
      <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" id="workflow_section">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b-2 border-black mb-6 gap-3">
          <div>
            <h2 className="font-syne font-black text-xl uppercase tracking-tight text-orange-600">
              The Z961-Combinator Workspace Workflow
            </h2>
            <p className="text-xs font-mono text-gray-500 uppercase mt-0.5">Click any stage below to inspect detailed auditing steps</p>
          </div>

          <div className="bg-zinc-90 w-full sm:w-auto p-1.5 border border-zinc-300 font-mono text-[10px] text-zinc-500 font-bold uppercase">
            Interactive Sequence Radar
          </div>
        </div>

        {/* Workflow steps horizontal/vertical navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 space-y-2">
            {workflowSteps.map((step, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveWorkflowStep(idx)}
                className={`w-full text-left p-3.5 border-2 border-black font-semibold cursor-pointer transition-all flex items-center justify-between ${
                  activeWorkflowStep === idx 
                    ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(245,158,11,1)]"
                    : "bg-zinc-50 hover:bg-zinc-150 text-zinc-900"
                }`}
              >
                <span className="font-mono text-xs uppercase font-extrabold">{step.title}</span>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${activeWorkflowStep === idx ? "text-amber-500 rotate-90" : "text-zinc-400"}`} />
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 border-2 border-dashed border-zinc-400 bg-zinc-50 p-6 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                <span className="text-[10px] font-mono uppercase bg-amber-500 text-black px-2 py-0.5 font-bold border border-black">
                  Stage Verification Phase 0{activeWorkflowStep + 1}
                </span>
                <span className="text-xs font-mono text-zinc-400">NCEI protocol certified</span>
              </div>

              <h3 className="font-syne font-black text-xl text-black uppercase">
                {workflowSteps[activeWorkflowStep].title.split(". ")[1]}
              </h3>

              <p className="text-xs font-mono text-zinc-700 leading-relaxed font-semibold">
                {workflowSteps[activeWorkflowStep].description}
              </p>

              <div className="bg-white p-3 border border-zinc-300 rounded font-mono text-[11px] text-zinc-650 leading-relaxed">
                <span className="font-bold text-zinc-800 uppercase block mb-1">Impact Directive:</span>
                {workflowSteps[activeWorkflowStep].detail}
              </div>

              {activeWorkflowStep === 1 && (
                <div className="border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden mt-3">
                  <img
                    src="https://picsum.photos/seed/verification-analytics/800/400"
                    alt="Institutional Readiness Verification Score Dashboard"
                    className="w-full h-auto object-cover max-h-52"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-1.5 bg-orange-600 text-white border-t border-black font-mono text-[9px] font-black uppercase tracking-wider text-center">
                    Z961 COHORT READINESS RADIAL ANALYTICS • VERIFIED PARTNERS DATA GRID
                  </div>
                </div>
              )}
            </div>

            <p className="text-[10px] text-zinc-450 font-mono mt-4 italic">
              * Verification checklists mapped strictly to international ESG compliance structures.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: PROGRAM PILLARS */}
      <div className="space-y-4" id="program_pillars_section">
        <h2 className="font-syne font-black text-xl uppercase tracking-tight text-orange-600 border-b-2 border-black pb-2">
          Program Pillars
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              title: "Strategic Objectives",
              badge: "PILLAR 1",
              icon: <Cpu className="w-8 h-8 text-black" />,
              desc: "Bridging advanced technical training (specifically in agentic AI & RAG systems) with core entrepreneurial business support."
            },
            {
              title: "Graduation Goal",
              badge: "PILLAR 2",
              icon: <GraduationCap className="w-8 h-8 text-black" />,
              desc: "Our resource-intensive environment is fully calibrated to graduate 25 verified AI-focused companies by the end of the summer."
            },
            {
              title: "20% Training Mandate",
              badge: "PILLAR 3",
              icon: <Award className="w-8 h-8 text-black" />,
              desc: "20% of all incubator time and resources are dedicated strictly to formal lectures and workshops to ensure regulatory and technical competence."
            },
            {
              title: "Incubator Infrastructure",
              badge: "PILLAR 4",
              icon: <Building className="w-8 h-8 text-black" />,
              desc: "Access our virtual sandbox, the 'Entrepreneurial Yellow Pages' for expert guidance, and our local ground network for regional operational support."
            }
          ].map((pillar) => (
            <div key={pillar.badge} className="border-2 border-black p-5 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {pillar.icon}
                  <span className="bg-zinc-100 border border-zinc-350 text-zinc-700 font-mono text-[9px] px-1.5 py-0.5 font-bold">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="font-syne font-black text-sm uppercase text-black">
                  {pillar.title}
                </h3>
                <p className="text-xs font-mono text-zinc-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: SUGGESTED AI STARTUP THEMES */}
      <div className="space-y-4" id="startup_themes_section">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-black pb-2 gap-2">
          <div>
            <h2 className="font-syne font-black text-xl uppercase tracking-tight text-orange-600">
              Suggested AI Startup Themes
            </h2>
            <p className="text-xs font-mono text-gray-500 uppercase mt-0.5">We encourage cohort submissions aligning with high-impact directories</p>
          </div>
          
          <span className="font-mono text-[10px] bg-amber-500 text-black px-2 py-1 font-black border border-black uppercase rounded">
            Innovation Scope
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {startupThemes.map((theme) => (
            <div 
              key={theme.category}
              className={`border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between transition-transform duration-200 ${theme.color} ${
                hoveredTheme === theme.category ? "scale-[1.01]" : ""
              }`}
              onMouseEnter={() => setHoveredTheme(theme.category)}
              onMouseLeave={() => setHoveredTheme(null)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-syne font-black text-md uppercase text-black">
                    {theme.category}
                  </h3>
                  <div className={`p-1.5 border border-black bg-white rounded`}>
                    {theme.icon}
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {theme.items.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full shrink-0 mt-1.5"></div>
                      <span className="text-[11px] font-mono text-zinc-800 leading-relaxed font-bold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-dashed border-zinc-350 mt-4 text-[10px] font-mono text-zinc-500 uppercase flex items-center justify-between">
                <span>Vetting Focus</span>
                <span className="font-extrabold text-zinc-700">Audit Grade A Required</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 7: LOGISTICAL TIMELINE */}
      <div className="border-4 border-black bg-[#121212] text-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" id="timeline_section">
        <div className="flex items-center gap-2 pb-4 border-b border-zinc-800 mb-6">
          <TrendingUp className="w-6 h-6 text-amber-500" />
          <h2 className="font-syne font-black text-xl uppercase tracking-tight text-white">
            Logistical Timeline
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {milestones.map((ms, idx) => (
            <div key={idx} className="relative bg-zinc-900 border border-zinc-800 p-4 rounded flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-black text-amber-500 uppercase block tracking-wider">
                  {ms.date}
                </span>
                <h4 className="font-sans font-black text-xs text-white uppercase border-b border-zinc-800 pb-1">
                  {ms.stage}
                </h4>
                <p className="text-[11px] font-mono text-zinc-400 leading-relaxed pt-1">
                  {ms.desc}
                </p>
              </div>

              {idx < 4 && (
                <div className="hidden md:block absolute top-1/2 -right-3.5 transform -translate-y-1/2 z-10 bg-[#121212] border border-zinc-800 p-0.5 rounded-full">
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 8: INVESTOR MATCH MECHANISMS */}
      <div className="border-4 border-black bg-zinc-50 p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" id="investor_matching_section">
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-3">
            <Building className="w-8 h-8 text-black" />
            <div>
              <span className="bg-black text-amber-500 text-[10px] font-mono font-black uppercase px-2 py-1">
                Diaspora Integration
              </span>
              <h2 className="font-syne font-black text-2xl text-orange-600 uppercase tracking-tight mt-1">
                Investor Matching Mechanisms
              </h2>
            </div>
          </div>

          <p className="text-xs font-mono text-zinc-700 leading-relaxed font-semibold">
            The Z961-Combinator facilitates investor matching by leveraging institutional rigor and global network connectivity to build credibility for Lebanese startups. The process is structured to bridge the gap between local talent and international capital through the following robust mechanisms:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <div className="bg-white border border-zinc-300 p-4 rounded space-y-1.5 flex flex-col justify-between">
              <div>
                <h4 className="font-sans font-black text-xs text-black uppercase flex items-center gap-1.5">
                  <FileCheck className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                  <span>1. Institutional Auditing & Readiness Verification</span>
                </h4>
                <p className="text-[11px] font-mono text-zinc-650 leading-relaxed pt-1">
                  Startups undergo a multi-dimensional data audit that evaluates technical feasibility, founder expertise, and alignment with national goals. Only those that meet rigorous transparency standards are assigned an <strong className="text-black underline">"Institutional Readiness Score,"</strong> which serves as a signal of credibility to potential investors.
                </p>
              </div>
            </div>

            <div className="bg-white border border-zinc-300 p-4 rounded space-y-1.5 flex flex-col justify-between">
              <div>
                <h4 className="font-sans font-black text-xs text-black uppercase flex items-center gap-1.5">
                  <Cpu className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                  <span>2. Strategic Matching Engine</span>
                </h4>
                <p className="text-[11px] font-mono text-zinc-650 leading-relaxed pt-1">
                  A dedicated matching engine connects verified startups with targeted diaspora and international investors based on specific sector mandates. This process acts as a <strong className="text-black">"mediating translator,"</strong> ensuring that startups are presented in a format and with the governance documentation that investors require.
                </p>
              </div>
            </div>

            <div className="bg-white border border-zinc-300 p-4 rounded space-y-1.5 flex flex-col justify-between">
              <div>
                <h4 className="font-sans font-black text-xs text-black uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                  <span>3. Institutional Oversight & Governance</span>
                </h4>
                <p className="text-[11px] font-mono text-zinc-650 leading-relaxed pt-1">
                  By housing startups within the NCEI’s Institutional Sandbox, researchers and experts provide continuous mentorship in financial modeling and regulatory compliance. This oversight ensures that ventures adhere to high standards of corporate governance, making them more attractive to serious, large-scale investors who prioritize transparency and risk management.
                </p>
              </div>
            </div>

            <div className="bg-white border border-zinc-300 p-4 rounded space-y-1.5 flex flex-col justify-between">
              <div>
                <h4 className="font-sans font-black text-xs text-black uppercase flex items-center gap-1.5">
                  <Users className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                  <span>4. Leveraging Global Networks</span>
                </h4>
                <p className="text-[11px] font-mono text-zinc-650 leading-relaxed pt-1">
                  The initiative taps into the Lebanese diaspora, utilizing their context, market knowledge, and established business networks to accelerate access to capital. By acting as a trusted intermediary, the NCEI facilitates introductions that begin with a foundation of credibility rather than investor skepticism.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
            <span className="text-xs font-mono text-zinc-600 uppercase font-black">
              Start building your growth track with NCEI Lebanon today
            </span>
          </div>

          <button
            onClick={() => {
              setTab("register");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-black text-white hover:bg-zinc-900 border-2 border-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_rgba(245,158,11,1)] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>JOIN THE SUMMER COHORT Now</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </button>
        </div>
      </div>

    </div>
  );
}
