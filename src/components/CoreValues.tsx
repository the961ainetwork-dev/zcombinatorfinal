import React from "react";
import { Landmark, TrendingUp, Compass, Heart, ArrowRight } from "lucide-react";

interface CoreValuesProps {
  onApplyNow?: () => void;
  onLearnMore?: () => void;
}

export default function CoreValues({ onApplyNow, onLearnMore }: CoreValuesProps) {
  return (
    <div className="space-y-8 text-black" id="core_values_page">
      {/* Visual Header */}
      <div className="bg-black text-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(255,102,0,1)] relative overflow-hidden">
        <div className="absolute top-2 right-2 bg-[#FF6600] text-white font-mono text-[9px] font-black px-2 py-0.5 uppercase tracking-wider border border-white">
          VALUES DECREE
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Compass className="w-5 h-5 text-[#FF6600] animate-spin-slow" />
          <span className="font-mono text-xs font-black text-[#FF6600] uppercase tracking-widest">Foundational Pillars</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tighter leading-none">
          OUR CORE VALUES
        </h2>
        <p className="text-xs sm:text-sm font-mono mt-3 text-gray-300 uppercase tracking-wide font-bold">
          Institutional Integrity, Capacity Building, Transparency & The National Mandate
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: Institutional Integrity */}
        <div className="bg-white border-2 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-[#FFF9E6] border-2 border-black flex items-center justify-center text-xl font-bold mb-4 shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
              ⚖️
            </div>
            <h3 className="font-display font-black text-base uppercase tracking-tight text-black mb-1">
              Institutional Integrity
            </h3>
            <p className="font-mono text-[10px] uppercase text-[#FF6600] font-black tracking-wider mb-3">
              The Institutional "Sandbox" for Transparency
            </p>
            <p className="text-xs leading-relaxed font-sans text-gray-900 font-medium select-text">
              NCEI Lebanon recognizes that attracting diaspora and international capital requires more than just innovation; it requires a culture of verifiable transparency. The Bridge to Growth program utilizes the "Institutional Sandbox" as a core governance mechanism.
            </p>
            <p className="text-xs leading-relaxed font-sans text-gray-900 font-medium mt-3 select-text">
              By centralizing feasibility documentation, financial projections, and milestones within an NCEI-monitored environment, we replace uncertainty with auditability. Every project receiving an "Institutional-Ready" status undergoes a rigorous vetting process by our network of researchers and academics, ensuring that potential partners are interacting with entities that meet international standards of corporate governance and operational accountability.
            </p>
          </div>
          <div className="border-t border-gray-200 pt-4 mt-6">
            <span className="text-[10px] font-mono font-bold bg-[#F6F6EF] px-2 py-0.5 border border-black text-black">
              AUDITABILITY FIRST
            </span>
          </div>
        </div>

        {/* Pillar 2: Capacity Building */}
        <div className="bg-white border-2 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-[#FFF9E6] border-2 border-black flex items-center justify-center text-xl font-bold mb-4 shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
              📈
            </div>
            <h3 className="font-display font-black text-base uppercase tracking-tight text-black mb-1">
              Capacity Building
            </h3>
            <p className="font-mono text-[10px] uppercase text-[#FF6600] font-black tracking-wider mb-3">
              From Ideation to Export-Readiness
            </p>
            <p className="text-xs leading-relaxed font-sans text-gray-900 font-medium mb-4 select-text">
              We understand that the transition from a local startup to a regional player requires specialized knowledge. NCEI Lebanon is committed to closing the "skill gap" through:
            </p>

            <div className="space-y-3">
              <div className="border border-black p-2.5 bg-[#F6F6EF]">
                <h5 className="font-mono text-[10px] font-black uppercase text-black">Targeted Training</h5>
                <p className="text-[11px] text-gray-700 font-sans leading-tight mt-0.5">Providing startups and solopreneurs with free access to modules on financial modeling, regulatory compliance, and cross-border business development.</p>
              </div>
              <div className="border border-black p-2.5 bg-[#F6F6EF]">
                <h5 className="font-mono text-[10px] font-black uppercase text-black">"Train-the-Trainer" Framework</h5>
                <p className="text-[11px] text-gray-700 font-sans leading-tight mt-0.5">Leveraging our partnerships with universities to equip graduates with the skills required to navigate the modern investment landscape, effectively creating a sustainable pipeline of talent.</p>
              </div>
              <div className="border border-black p-2.5 bg-[#F6F6EF]">
                <h5 className="font-mono text-[10px] font-black uppercase text-black">Mentorship Integration</h5>
                <p className="text-[11px] text-gray-700 font-sans leading-tight mt-0.5">Connecting founders with diaspora experts who provide not only capital but also the "tacit knowledge" required to scale effectively in competitive global markets.</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 mt-6">
            <span className="text-[10px] font-mono font-bold bg-[#F6F6EF] px-2 py-0.5 border border-black text-black">
              SKILLS OVER SPECULATION
            </span>
          </div>
        </div>

        {/* Pillar 3: The National Mandate */}
        <div className="bg-[#FFF9E6] border-2 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center text-xl font-bold mb-4 shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
              🌲
            </div>
            <h3 className="font-display font-black text-base uppercase tracking-tight text-black mb-1">
              The National Mandate
            </h3>
            <p className="font-mono text-[10px] uppercase text-[#FF6600] font-black tracking-wider mb-3">
              Retaining Value in Lebanon
            </p>
            <p className="text-xs leading-relaxed font-sans text-black font-semibold mb-4 select-text">
              The ultimate objective of Bridge to Growth is to reverse the brain drain by making Lebanon an attractive, viable hub for its own innovators. We aim to reposition the Lebanese ecosystem as a "Knowledge & Solutions Engine" for the region:
            </p>

            <div className="space-y-3 font-mono text-[11px] font-bold uppercase text-black">
              <div className="flex gap-1.5 items-start">
                <span className="text-[#FF6600] shrink-0">•</span>
                <p className="leading-tight">
                  <span>Localizing Growth:</span>{" "}
                  <span className="text-gray-700 lowercase first-letter:uppercase normal-case font-sans font-medium">By connecting startups directly with diaspora-led firms and development agencies (UNDP, ESCWA, EU) for international scaling.</span>
                </p>
              </div>
              <div className="flex gap-1.5 items-start">
                <span className="text-[#FF6600] shrink-0">•</span>
                <p className="leading-tight">
                  <span>Sustainable Ecosystem:</span>{" "}
                  <span className="text-gray-700 lowercase first-letter:uppercase normal-case font-sans font-medium">Building supports ensures when a startup hits growth inflections, legal, financial, and logistical pathways exist locally to support expansion.</span>
                </p>
              </div>
              <div className="flex gap-1.5 items-start">
                <span className="text-[#FF6600] shrink-0">•</span>
                <p className="leading-tight">
                  <span>Institutional Stewardship:</span>{" "}
                  <span className="text-gray-700 lowercase first-letter:uppercase normal-case font-sans font-medium">NCEI Lebanon is a long-term steward, advocating for policies and sandboxes that permanently slash the local operational cost barrier.</span>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-black/10 pt-4 mt-6">
            <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 border border-black text-black">
              BRAIN GAIN 🌲
            </span>
          </div>
        </div>

      </div>

      {/* Implementation Note Banner */}
      <div className="bg-[#F6F6EF] border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h4 className="font-mono text-xs font-black uppercase text-black mb-1.5 flex items-center gap-1">
          <Heart className="w-4 h-4 text-[#FF6600] fill-[#FF6600] animate-pulse" />
          <span>Transparency is Our Currency</span>
        </h4>
        <p className="text-xs leading-relaxed font-sans text-gray-700 font-medium">
          By formalizing these channels, we move away from informal, opaque networking and toward a predictable, institutional investment pathway. We invite our partners in the international community to join us in upholding these standards, ensuring that every dollar of investment, every hour of mentorship, and every partnership agreement contributes directly to the sustainable development of the Lebanese national economy.
        </p>
      </div>

      {/* Call to action section */}
      <div className="bg-black text-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,102,0,1)] text-center max-w-3xl mx-auto space-y-6">
        <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tighter text-[#FF6600]">
          JOIN US IN BUILDING LEBANON'S FUTURE
        </h3>
        <p className="text-xs sm:text-sm font-sans text-gray-300 max-w-xl mx-auto leading-relaxed">
          Be part of the institutional transformation that's redefining how Lebanese entrepreneurs access global capital and expertise.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onApplyNow}
            className="bg-[#FF6600] text-white border-2 border-black font-black uppercase text-xs py-3 px-6 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onLearnMore}
            className="bg-white text-black border-2 border-black font-black uppercase text-xs py-3 px-6 shadow-[3px_3px_0px_0px_rgba(255,102,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
          >
            Learn More
          </button>
        </div>
        <div className="pt-4 border-t border-gray-800 text-[11px] font-mono text-gray-400 flex justify-center items-center gap-2">
          <span>z961 Combinator</span>
          <span>×</span>
          <span>Local Innovation</span>
          <span>×</span>
          <span>Global Capital</span>
          <span>•</span>
          <span className="text-[#FF6600]">2026</span>
        </div>
      </div>
    </div>
  );
}
