import React, { useState } from "react";
import { Sparkles, BookOpen, Target, Network, Layers, Users, Eye, Mail, Flame, ArrowRight } from "lucide-react";

interface ProspectusProps {
  onVisitMag?: () => void;
}

export default function Prospectus({ onVisitMag }: ProspectusProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleLocalSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    localStorage.setItem("z961_mag_subscriber_email", email);
  };
  const prioritySectors = [
    { name: "FinTech & Digital Payments", desc: "Wallets, merchant enablement, remittance infrastructure", emoji: "💳" },
    { name: "Agri-Tech & Agri-Food", desc: "Supply chain modernization and food security", emoji: "🌾" },
    { name: "ICT & AI Solutions", desc: "Software, automation, digital infrastructure", emoji: "🤖" },
    { name: "Healthcare & MedTech", desc: "Affordable innovations and remote service delivery", emoji: "🏥" },
    { name: "Creative & Professional Services", desc: "High-value freelance and consultancy outputs", emoji: "🎨" }
  ];

  const investmentChannels = [
    { title: "Direct Equity / Convertible Notes", desc: "For early-stage and growth-stage ventures" },
    { title: "Partnership / Mentorship Agreements", desc: "Non-capital-intensive cooperation" },
    { title: "Technical Assistance / Grants", desc: "Channeling NGO / foundation support into R&D" },
    { title: "Joint Ventures", desc: "Local-global partnerships for infrastructure" }
  ];

  const coreClusters = [
    { number: "1", title: "Waste-to-Value", desc: "Circular economy models for municipal waste" },
    { number: "2", title: "Solar-Finance", desc: "Financing for decentralized rural solar" },
    { number: "3", title: "Agri-Coops", desc: "Digitizing supply chains for smallholders" },
    { number: "4", title: "EdTech Inclusion", desc: "Vocational training for marginalized youth" },
    { number: "5", title: "Water Security", desc: "Affordable filtration for communities" },
    { number: "6", title: "The Care Economy", desc: "Tech-enabled domestic care services" },
    { number: "7", title: "Heritage Artisans", desc: "Global marketplaces for rural crafts" },
    { number: "8", title: "Health-Link", desc: "Telemedicine and medicine delivery" },
    { number: "9", title: "Green Construction", desc: "Sustainable housing from recycled waste" },
    { number: "10", title: "Urban Mobility", desc: "Data-driven public transit solutions" }
  ];

  return (
    <div className="space-y-8 text-black font-sans uppercase animate-fade-in" id="prospectus_page_container">
      {/* Hero Banner */}
      <div className="bg-zinc-100 border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" id="prospectus_hero_banner">
        <div className="absolute top-2 right-2 bg-black text-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border border-black">
          Institutional Document
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6" id="prospectus_header_row">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono font-black text-xs sm:text-sm">
                PROSPECTUS
              </span>
              <span className="font-mono text-xs font-bold text-gray-750 tracking-wider">NCEI LEBANON</span>
            </div>
            
            <h2 className="font-syne font-black text-xl sm:text-3xl lg:text-4xl uppercase tracking-tight leading-tight" id="prospectus_title_heading">
              z961combinator A Matchpreneur Linkage Program with Investors Capital
            </h2>
            
            <p className="text-xs sm:text-sm font-mono text-gray-800 max-w-2xl font-bold uppercase" id="prospectus_title_sub">
              A Strategic Outreach & Integration Plan program through multi-channel diplomatic, digital, and institutional engagement.
            </p>
          </div>
          
          {/* Right-sided Nurtured By & Logo */}
          <div className="flex flex-row sm:flex-row lg:flex-col items-center gap-4 p-4 bg-zinc-950 border-3 border-black text-white min-w-[280px] shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" id="nurtured_by_ncei_side_badge">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15),transparent_70%)] pointer-events-none"></div>
            
            <div className="text-left lg:text-center w-full z-10">
              <span className="text-[9px] font-mono font-extrabold text-orange-400 tracking-[0.2em] block uppercase">
                STRATEGIC PARTNER
              </span>
              <span className="text-xs font-syne font-black text-white block uppercase mt-0.5 tracking-wider">
                NURTURED BY NCEI
              </span>
            </div>
            
            {/* Custom high-fidelity CSS NCEI Badge */}
            <div className="relative w-32 h-32 rounded-full bg-neutral-950 border-2 border-orange-500/80 shadow-[0_0_15px_rgba(249,115,22,0.3)] flex flex-col items-center justify-center p-3 select-none shrink-0" id="html_ncei_badge">
              {/* Dash ring inside */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-orange-500/50"></div>
              
              <div className="text-center z-10 flex flex-col items-center">
                <span className="text-[7.5px] font-mono font-extrabold text-orange-500 tracking-[0.25em] uppercase leading-none block mb-1">
                  LEBANON
                </span>
                <span className="text-2xl font-syne font-black text-white tracking-widest leading-none block mb-1">
                  NCEI
                </span>
                <div className="w-12 h-[1.5px] bg-orange-500 mb-1"></div>
                <span className="text-[6px] font-mono text-zinc-300 font-extrabold tracking-wider leading-tight block uppercase">
                  THE NATIONAL COUNCIL
                </span>
                <span className="text-[6px] font-mono text-zinc-300 font-extrabold tracking-wider leading-tight block uppercase">
                  FOR ENTERPRISE &
                </span>
                <span className="text-[6px] font-mono text-zinc-300 font-extrabold tracking-wider leading-tight block uppercase">
                  INNOVATION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW AVANT-GARDE HOME PROMO: "THE MAG" WITH SUBSCRIBE NEWSLETTER DEDICATED INPUT */}
      <div className="border-4 border-black bg-zinc-950 text-white p-6 shadow-[5px_5px_0px_0px_rgba(249,115,22,1)] grid grid-cols-1 md:grid-cols-12 gap-6 items-center" id="home_mag_promo_banner">
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-orange-500 font-extrabold uppercase">
            <Flame className="w-4 h-4 fill-orange-550 animate-pulse text-orange-500" />
            <span>JUST OUT: THE MAG EDITION XYZ • DEEP ECOSYSTEM BRIEFS</span>
          </div>
          
          <h3 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight leading-none text-white">
            THE MAG: Algorithmic Clears & Policy Insights
          </h3>
          
          <p className="text-[11px] sm:text-xs font-serif text-zinc-400 italic normal-case leading-snug">
            Sovereign digital aesthetics, diaspora trust frameworks, and direct developer compensation pipelines. Compiled bi-weekly.
          </p>
        </div>

        <div className="md:col-span-5 space-y-4" id="home_mag_subscription_form_container">
          {!subscribed ? (
            <form onSubmit={handleLocalSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="relative w-full bg-zinc-900 border border-zinc-800 flex items-center px-2.5 gap-2 text-white">
                <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="SUBSCRIBE WITH YOUR EMAIL..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2.5 bg-transparent text-[10px] font-mono font-bold uppercase placeholder-zinc-650 outline-none text-white"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-600 text-white hover:bg-orange-500 transition-colors font-mono text-[10px] font-black uppercase text-center py-2.5 px-4 cursor-pointer tracking-wider shrink-0"
              >
                JOIN ARRAY
              </button>
            </form>
          ) : (
            <div className="p-3 bg-zinc-900/50 border border-orange-500/40 text-left font-mono text-[10px] text-orange-400 font-bold uppercase leading-relaxed">
              <span>SUCCESSFUL ENLISTMENT • CHECKOUT THE MAG PORTAL BELOW</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => onVisitMag?.()}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] font-black text-white hover:text-orange-400 uppercase tracking-widest transition-all cursor-pointer group"
            >
              <span>EXPLORE THE MAG DIRECTLY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-orange-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Executive Summary & Capacity Building */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Executive Summary */}
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-syne font-bold text-lg uppercase tracking-tight border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-black shrink-0" />
              <span>Executive Summary</span>
            </h3>
            <p className="text-xs leading-relaxed font-sans text-gray-950 font-medium select-text normal-case">
              <strong>z961combinator</strong> is an institutional initiative bridging the Lebanese domestic startup ecosystem with the global diaspora. Managed by NCEI Lebanon, this program transforms informal networking into a professional, data-driven "Institutional Sandbox" environment.
            </p>
            <p className="text-xs leading-relaxed font-sans text-gray-950 font-medium mt-3 select-text normal-case">
              We provide diaspora investors and international partners with direct, verified access to Lebanon's most promising innovation pipeline, offering local startups and talent the tools, training, and capital pathways required for sustainable growth.
            </p>
          </div>

          {/* Institutional Integrity Block */}
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <h3 className="font-syne font-bold text-lg uppercase tracking-tight border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-black shrink-0" />
              <span>Institutional Integrity: Capacity Building, Transparency & The National Mandate</span>
            </h3>

            <div className="space-y-4">
              <div className="border-2 border-black p-4 bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-mono text-xs font-black text-black uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-black border border-black inline-block"></span>
                  The Institutional "Sandbox" for Transparency
                </h4>
                <p className="text-xs leading-relaxed font-sans font-medium text-gray-900 select-text normal-case">
                  NCEI Lebanon recognizes that attracting diaspora and international capital requires more than just innovation; it requires a culture of verifiable transparency. The Z961combinator program utilizes the "Institutional Sandbox" as a core governance mechanism.
                </p>
                <p className="text-xs leading-relaxed font-sans font-medium text-gray-900 mt-2 select-text normal-case">
                  By centralizing feasibility documentation, financial projections, and milestones within an NCEI-monitored environment, we replace uncertainty with auditability. Every project receiving an "Institutional-Ready" status undergoes a rigorous vetting process by our network of researchers and academics, ensuring that potential partners are interacting with entities that meet international standards of corporate governance and operational accountability.
                </p>
              </div>

              <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-mono text-xs font-black text-black uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-black border border-black inline-block"></span>
                  Capacity Building: From Ideation to Export-Readiness
                </h4>
                <p className="text-xs leading-relaxed font-sans font-medium text-gray-850 normal-case">
                  We understand that the transition from a local startup to a regional player requires specialized knowledge. NCEI Lebanon is committed to closing the "skill gap" through:
                </p>
                <ul className="text-xs font-sans font-medium text-gray-900 mt-2 space-y-1.5 list-disc pl-4 normal-case">
                  <li><strong>Targeted Training:</strong> Providing startups and solopreneurs with free access to modules on financial modeling, regulatory compliance, and cross-border business development.</li>
                  <li><strong>"Train-the-Trainer" Framework:</strong> Leveraging partnerships with universities to equip graduates with skills required for international collaboration.</li>
                  <li><strong>Mentorship Integration:</strong> Connecting founders with diaspora experts who provide both capital and tacit knowledge required to scale globally.</li>
                </ul>
              </div>

              <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-mono text-xs font-black text-black uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-black border border-black inline-block"></span>
                  The National Mandate: Retaining Value in Lebanon
                </h4>
                <p className="text-xs leading-relaxed font-sans font-medium text-gray-850 normal-case">
                  The ultimate objective of z961combinator is to reverse the brain drain by making Lebanon an attractive, viable hub for its own innovators. We aim to reposition the Lebanese ecosystem as a "Knowledge & Solutions Engine" for the region through:
                </p>
                <ul className="text-xs font-sans font-medium text-gray-900 mt-2 space-y-1.5 pl-4 list-disc normal-case">
                  <li><strong>Localizing Growth:</strong> Direct connections with diaspora-led firms and international agencies (UNDP, ESCWA, EU) provide market access without requiring relocation.</li>
                  <li><strong>Sustainable Ecosystem Positioning:</strong> Building infrastructure that keeps bright minds rooted in the local economy.</li>
                  <li><strong>Institutional Stewardship:</strong> Long-term advocacy for policies and regulatory sandboxes that lower the cost of doing business locally.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social Enterprise Clusters */}
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-syne font-bold text-lg uppercase tracking-tight border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
              <Network className="w-5 h-5 text-black shrink-0" />
              <span>Social Enterprise & Public Sector Cluster Projects</span>
            </h3>
            <p className="text-xs font-sans font-semibold text-gray-800 mb-4 normal-case">
              NCEI Lebanon highlights 10 core clusters designed to address structural societal needs through entrepreneurial innovation:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreClusters.map((cluster) => (
                <div key={cluster.number} className="border-2 border-black p-3.5 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-none bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                    {cluster.number}
                  </span>
                  <div>
                    <h5 className="font-mono text-xs font-black uppercase text-black leading-tight mb-0.5">{cluster.title}</h5>
                    <p className="text-[11px] text-gray-700 font-sans font-medium leading-normal normal-case">{cluster.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Support, Channels & scouts */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* NCEI Support Panel */}
          <div className="bg-zinc-100 border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-syne font-bold text-base uppercase tracking-tight mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-black fill-black" />
              <span>NCEI Support & Skills</span>
            </h4>
            <div className="space-y-3 font-mono text-[11px] font-bold text-black uppercase">
              <div className="border border-black p-2 bg-white">
                <p className="text-black font-black mb-1">Capacity Building</p>
                <p className="text-gray-700 normal-case font-sans font-medium">Free access to specialized training on financial modeling, business strategy, and investor pitching.</p>
              </div>
              <div className="border border-black p-2 bg-white">
                <p className="text-black font-black mb-1">The "Sandbox" Toolkit</p>
                <p className="text-gray-700 normal-case font-sans font-medium">Secure, AI-integrated platform with automated feasibility tools, expert access, and secure document management.</p>
              </div>
              <div className="border border-black p-2 bg-white">
                <p className="text-black font-black mb-1">Candidate Backing</p>
                <p className="text-gray-700 normal-case font-sans font-medium">Active endorsement of vetted candidates, providing the institutional seal of approval diaspora investors require.</p>
              </div>
            </div>
          </div>

          {/* Priority Sectors */}
          <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-syne font-bold text-base uppercase tracking-tight mb-3 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-black" />
              <span>Priority Sectors</span>
            </h4>
            <div className="space-y-3">
              {prioritySectors.map((sector) => (
                <div key={sector.name} className="flex gap-2.5 items-start">
                  <span className="text-xl shrink-0 p-1 bg-zinc-50 border border-black font-mono">
                    {sector.emoji}
                  </span>
                  <div>
                    <h5 className="font-mono text-xs font-black uppercase text-black leading-tight">{sector.name}</h5>
                    <p className="text-[11px] text-gray-650 font-sans font-medium mt-0.5 leading-normal normal-case">{sector.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Channels */}
          <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-syne font-bold text-base uppercase tracking-tight mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-black" />
              <span>Investment Channels</span>
            </h4>
            <div className="space-y-3">
              {investmentChannels.map((channel, idx) => (
                <div key={idx} className="border border-gray-200 pl-3 py-1.5 border-l-4 border-l-black normal-case">
                  <h5 className="font-mono text-xs font-bold uppercase text-black leading-tight uppercase">{channel.title}</h5>
                  <p className="text-[11px] text-gray-600 font-sans font-medium mt-0.5">{channel.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Innovation Scouts */}
          <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-syne font-bold text-base uppercase tracking-tight mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-black" />
              <span>Innovation Scouts</span>
            </h4>
            <p className="text-xs leading-relaxed text-gray-800 font-sans font-medium mb-3 normal-case font-semibold">
              We integrate top-tier recent graduates as <strong>"Innovation Scouts"</strong>:
            </p>
            <div className="space-y-2.5 font-mono text-[11px] font-bold uppercase">
              <div className="flex items-start gap-1.5">
                <span className="text-black font-black shrink-0">•</span>
                <p className="leading-tight"><span className="text-black">Market Intelligence:</span> <span className="text-gray-600 font-sans normal-case font-medium">Access to NCEI-curated "Feasibility & Market Prospectus" reports.</span></p>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-black font-black shrink-0">•</span>
                <p className="leading-tight"><span className="text-black">Talent Pipeline:</span> <span className="text-gray-600 font-sans normal-case font-medium">Diaspora investors receive first-look at vetted, emerging talent.</span></p>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-black font-black shrink-0">•</span>
                <p className="leading-tight"><span className="text-black">Practical Exposure:</span> <span className="text-gray-600 font-sans normal-case font-medium">Real-world experience in due diligence and international business.</span></p>
              </div>
            </div>
          </div>

          {/* Transparency Commitment */}
          <div className="bg-zinc-50 border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-syne font-bold text-base uppercase tracking-tight mb-2 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-black" />
              <span>Commitment to Transparency</span>
            </h4>
            <p className="text-xs leading-relaxed text-black font-sans font-semibold normal-case">
              NCEI Lebanon acts as the primary intermediary. We do not just make introductions; we monitor the health of every proposal within the Sandbox. From kickoff to final evaluation, we ensure every investor inquiry is tracked and every startup receives the support necessary to progress toward success.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
