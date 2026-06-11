import React, { useState } from "react";
import { HelpCircle, Search, Cpu, Landmark, ShieldCheck, ChevronDown, ChevronUp, UserCheck, Coins, HelpCircle as FaqIcon, Info, MessageCircle, FileText } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: "all" | "sandbox" | "eligibility" | "mediator";
  icon: any;
}

export default function FaqHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "sandbox" | "eligibility" | "mediator">("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqData: FaqItem[] = [
    {
      category: "sandbox",
      icon: Cpu,
      question: "What is the 961 Combinator Sandbox?",
      answer: "The 961 Combinator Sandbox is a secure virtual and structural ecosystem managed by NCEI Lebanon. It aggregates vetted startup pitch decks, feasibility studies, and financial audits, and correlates them algorithmically with diaspora investment mandates. By keeping communications logging strict and data-rooms access-controlled, it acts as a low-friction conduit for high-trust investments."
    },
    {
      category: "sandbox",
      icon: Coins,
      question: "How does fresh USD clearance and BDL Circular 165 apply here?",
      answer: "In order to bypass legacy commercial banking constraints, all remote contract arrangements and investment commitments leverage modern clearing networks. Under BDL Circular 165 protocols, fresh funds can be securely processed domestically via electronic wallets, clearing checks, and direct wires. This guarantees remote developers and founders receive their offshore-backed compensation immediately, legally, and at full face value."
    },
    {
      category: "eligibility",
      icon: UserCheck,
      question: "Who is eligible to participate in the program?",
      answer: "Eligibility is divided into three primary classes: 1) Startups & tech-seekers with a viable proof-of-concept, team, or registered entity targeting scaling markets; 2) Diaspora Investors & Business Leaders aiming to deploy active capital, mentorship or resource access; and 3) Innovation Scouts (university seniors, graduates, or staff engineers) demonstrating top-tier software engineering proficiency."
    },
    {
      category: "mediator",
      icon: Landmark,
      question: "What is the role of NCEI Lebanon as an institutional mediator?",
      answer: "NCEI Lebanon serves as a neutral intermediary and trust broker. Instead of taking general finder fees, NCEI oversees due diligence, validates the legal structures of participants, handles conflicts of interest, and coordinates the digital sandbox vault logging. This dual institutional backing provides diaspora investors the regulatory peace of mind that their partner ventures are fully vetted and accountable."
    },
    {
      category: "eligibility",
      icon: ShieldCheck,
      question: "What criteria are analyzed in the readiness audit?",
      answer: "The AI-assisted and human readiness audits focus on four main pillars: Total Addressable Market (TAM), traction indicators (real user volume or early revenue), technical execution speed (GitHub activity or operational build velocity), and clear capitalization table structure. Founders are graded transparently to improve their profile matching chances."
    },
    {
      category: "mediator",
      icon: FileText,
      question: "How are intellectual property rights and data privacy handled?",
      answer: "All participants in the 961 Combinator ecosystem submit a digital Non-Disclosure Agreement (NDA) prior to inspecting any data room assets. NCEI Lebanon does not claim any ownership of startup IP. Shared pitch materials, code outlines, and feasibility designs remain the sole property of respective founders, protected by strict audit-logged sandbox barriers."
    },
    {
      category: "sandbox",
      icon: HelpCircle,
      question: "What happens during the July 2026 Pitch Lab and Matchmaking phase?",
      answer: "Throughout July 2026, the 961 Combinator platform hosts automated matchings, peer pitch practices, and active workspace reviews. Investors receive notifications of startups matching their quantitative criteria. Vetted matches are then unlocked for secure bilateral chats, document sharing, and direct remote contract negotiation with institutional overhead."
    },
    {
      category: "mediator",
      icon: Info,
      question: "Can academic institutions or NGOs participate?",
      answer: "Absolutely. Standard NGOs and top-tier foreign/domestic universities act as academic sponsors and recruitment pipelines. Graduates from these programs can register as Innovation Scouts to showcase their engineering portfolios to startups looking to expand their engineering capabilities."
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFaqs = faqData.filter((item) => {
    const categoryMatches = activeCategory === "all" || item.category === activeCategory;
    const searchMatches = 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatches && searchMatches;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-black" id="faq_hub_root">
      
      {/* Editorial Header Layout */}
      <div className="border-4 border-black bg-zinc-900 text-white p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 font-extrabold uppercase">
            <FaqIcon className="w-4 h-4 text-emerald-400" />
            <span>EXPERT LEGAL & SYSTEM ADVISORY • JULY 2026</span>
          </div>
          <h2 className="font-syne font-black text-2xl md:text-3.5xl uppercase tracking-tighter leading-none">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-zinc-400 font-mono leading-relaxed max-w-xl">
            Answers to crucial questions on vetting, matching, fresh USD clearance, intellectual property protection, and NCEI mediator activities.
          </p>
        </div>
        <span className="bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono text-[10px] px-3 py-1.5 font-bold shrink-0 uppercase tracking-wider">
          DOC CLASS: FAQ-961
        </span>
      </div>

      {/* Categories & Live Search */}
      <div className="space-y-4" id="faq_controls">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Brutalist Tab Category Controls */}
          <div className="flex flex-wrap gap-2" id="faq_category_tabs">
            {([
              { key: "all", label: "ALL TOPICS" },
              { key: "sandbox", label: "SYSTEM & SANDBOX" },
              { key: "eligibility", label: "ELIGIBILITY & RECRUITS" },
              { key: "mediator", label: "NCEI MEDIATOR & LAWS" }
            ] as const).map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setExpandedIndex(null);
                }}
                className={`px-3 py-1.5 border-2 border-black font-mono text-xs font-black uppercase transition-all cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-[10px] sm:text-xs font-mono font-bold text-gray-500 uppercase">
            SHOWING {filteredFaqs.length} OF {faqData.length} FAQs
          </div>
        </div>

        {/* Live Search Input */}
        <div className="flex items-center gap-3 bg-zinc-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Search className="w-5 h-5 text-black shrink-0" />
          <input
            type="text"
            placeholder="FILTER ADVISORIES BY KEYWORD (e.g. BDL, sandbox, eligibility)..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setExpandedIndex(null);
            }}
            className="w-full text-xs font-mono font-bold bg-transparent outline-none uppercase placeholder-gray-500"
          />
          {searchTerm && (
            <button 
              onClick={() => {
                setSearchTerm("");
                setExpandedIndex(null);
              }} 
              className="text-xs font-mono font-extrabold underline text-black hover:text-zinc-650"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Accordion FAQ Area */}
      <div className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] divide-y-4 divide-black" id="faq_accordion_container">
        {filteredFaqs.map((faq, idx) => {
          const isExpanded = expandedIndex === idx;
          const IconComponent = faq.icon;
          return (
            <div key={idx} className="transition-all hover:bg-zinc-50" id={`faq_item_${idx}`}>
              {/* Question Header Row */}
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 border-2 border-black bg-zinc-900 text-white shrink-0">
                    <IconComponent className="w-4 h-4 text-emerald-450" />
                  </div>
                  <span className="font-syne font-black text-sm md:text-base leading-snug uppercase tracking-tight text-zinc-900">
                    {faq.question}
                  </span>
                </div>
                <div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-black stroke-[3] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400 hover:text-black stroke-[3] shrink-0" />
                  )}
                </div>
              </button>

              {/* Answer Row (Collapsible) */}
              {isExpanded && (
                <div className="bg-zinc-50 px-5 pb-5 md:px-6 md:pb-6 font-sans text-xs md:text-sm text-gray-700 leading-relaxed border-t-2 border-dashed border-zinc-200">
                  <div className="pt-4 max-w-3xl space-y-3 font-medium text-justify text-gray-800 normal-case">
                    <p>{faq.answer}</p>
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-400 font-extrabold mt-2 uppercase">
                      <span>VERIFIED • NCEI PROTOCOL CLASSIFICATION: {faq.category}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="p-12 text-center text-xs font-mono font-bold text-gray-400 bg-zinc-50">
            NO ADVISORY QUESTIONS MATCH "{searchTerm.toUpperCase()}"
          </div>
        )}
      </div>

      {/* Advisory Call-to-action Block */}
      <div className="border-4 border-black p-5 md:p-6 bg-emerald-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-left">
          <h4 className="font-mono text-xs font-black text-emerald-950 uppercase flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-emerald-700" />
            <span>Have a specific legal or infrastructural query?</span>
          </h4>
          <p className="text-[11px] text-emerald-850 font-sans font-medium">
            Post an "Ask 961" thread on the news forum, or complete your Digital NDA Acceptance to unlock live sandbox communication channels.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto shrink-0">
          <a
            href="#tab_btn_nda"
            onClick={(e) => {
              const ndaBtn = document.getElementById("tab_btn_nda") ?? document.getElementById("top_tab_policy");
              ndaBtn?.click();
            }}
            className="w-full md:w-auto text-center bg-black text-white hover:bg-zinc-900 font-mono text-[10px] font-bold uppercase tracking-wider px-4 py-2 border border-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            NDA Acceptance
          </a>
        </div>
      </div>
    </div>
  );
}
