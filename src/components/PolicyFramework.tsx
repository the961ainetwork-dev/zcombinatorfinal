import React, { useState } from "react";
import { Terminal, Shield, CheckCircle2, User, Key, Map, ArrowRight } from "lucide-react";

interface PolicyFrameworkProps {
  onApplyNow?: () => void;
  onEngage?: () => void;
}

export default function PolicyFramework({ onApplyNow, onEngage }: PolicyFrameworkProps) {
  const [activeWorkflow, setActiveWorkflow] = useState<"startup" | "investor">("startup");

  return (
    <div className="space-y-8 text-black font-sans uppercase" id="policy_framework_page">
      {/* Title Header Banner */}
      <div className="bg-zinc-100 border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="absolute top-2 right-2 bg-black text-white font-mono text-[9px] font-black px-2 py-0.5 uppercase tracking-wider border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
          OPERATIONAL CHARTER
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Terminal className="w-5 h-5 text-black animate-pulse" />
          <span className="font-mono text-xs font-black text-black uppercase tracking-wider">SECURE SANDBOX CORE DIRECTIVE</span>
        </div>
        <h2 className="font-syne font-bold text-2xl sm:text-3xl uppercase tracking-tighter leading-none text-black">
          Z961COMBINATOR PROGRAM POLICY & OPERATIONAL FRAMEWORK
        </h2>
        <p className="text-xs sm:text-sm font-mono mt-3 text-gray-700 uppercase tracking-wide font-black">
          Z961combinator: An Institutional Sandbox for Lebanese Innovation
        </p>
      </div>

      {/* Main Philosophy Page & Sandbox policy columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Columns (8 cols): Core Policy & Dynamic Workflows */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Program Philosophy */}
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-syne font-bold text-lg uppercase tracking-tight border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-black text-white font-mono text-xs font-black">1</span>
              <span>Program Philosophy</span>
            </h3>
            <p className="text-xs font-medium text-gray-950 normal-case font-sans leading-relaxed">
              This is not a reality show. It is a precision-engineered ecosystem. Our philosophy is rooted in Institutional Integrity, Transparency, and Resilience. We are here to institutionalize the Lebanese startup grind—moving from informal networks to audited, verifiable, and scalable business partnerships.
            </p>
          </div>

          {/* Section 2: Participant Workflows & Expectations */}
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h3 className="font-syne font-bold text-lg uppercase tracking-tight border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-black text-white font-mono text-xs font-black">2</span>
              <span>Participant Workflows & Expectations</span>
            </h3>

            {/* Switch Toggles for Startup or Investor workflow info */}
            <div className="flex border-2 border-black p-1 bg-zinc-100 max-w-sm">
              <button
                onClick={() => setActiveWorkflow("startup")}
                className={`flex-1 py-1 px-3 text-center text-xs font-black uppercase transition-all whitespace-nowrap ${
                  activeWorkflow === "startup"
                    ? "bg-black text-white border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-transparent text-black"
                }`}
              >
                Startups & Solopreneurs
              </button>
              <button
                onClick={() => setActiveWorkflow("investor")}
                className={`flex-1 py-1 px-3 text-center text-xs font-black uppercase transition-all whitespace-nowrap ${
                  activeWorkflow === "investor"
                    ? "bg-black text-white border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-transparent text-black"
                }`}
              >
                Investors & Partners
              </button>
            </div>

            {/* Workflow cards content */}
            {activeWorkflow === "startup" ? (
              <div className="space-y-4 animate-fade-in" id="startup_workflow_card">
                <div className="border-2 border-black p-4 bg-zinc-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative">
                  <span className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-black text-white px-1 font-bold">FOR UNDERTAKERS</span>
                  <p className="font-mono text-xs font-black text-black uppercase mb-1">THE FOUR-STAGE PIPELINE WORKFLOW:</p>
                  <ol className="text-xs font-mono text-black space-y-2 pl-4 list-decimal mt-2 font-bold uppercase">
                    <li>
                      <span className="text-black">Registration:</span>
                      <p className="normal-case font-sans font-medium text-gray-700 ml-2">Submit your comprehensive application (Data Audit questionnaire).</p>
                    </li>
                    <li>
                      <span className="text-black">Readiness Scoring:</span>
                      <p className="normal-case font-sans font-medium text-gray-700 ml-2">NCEI researchers audit your materials and you receive an "Institutional Readiness Score."</p>
                    </li>
                    <li>
                      <span className="text-black">Sandbox Entry:</span>
                      <p className="normal-case font-sans font-medium text-gray-700 ml-2">Once verified, your compliance room goes live inside the secure sandbox network.</p>
                    </li>
                    <li>
                      <span className="text-black">Institutional Tank:</span>
                      <p className="normal-case font-sans font-medium text-gray-700 ml-2">Engage in curated, academic-supervised pitches with diaspora stakeholders.</p>
                    </li>
                  </ol>
                </div>
                
                <div className="border border-black p-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="font-mono text-xs font-black uppercase flex items-center gap-1.5 text-black">
                    <User className="w-4 h-4 text-black" />
                    <span>Expectations Mandate</span>
                  </h4>
                  <p className="text-xs leading-relaxed font-sans text-gray-800 font-medium mt-1 normal-case">
                    Professionalism is non-negotiable. You are expected to provide real-time updates on milestones, maintain your Sandbox data room, and respond to investor inquiries within 48 hours.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in" id="investor_workflow_card">
                <div className="border-2 border-black p-4 bg-zinc-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative">
                  <span className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-black text-white px-1 font-bold">FOR ALLOCATORS</span>
                  <p className="font-mono text-xs font-black text-black uppercase mb-1">THE FOUR-STAGE INVESTMENT WORKFLOW:</p>
                  <ol className="text-xs font-mono text-black space-y-2 pl-4 list-decimal mt-2 font-bold uppercase">
                    <li>
                      <span>Mandate Submission:</span>
                      <p className="normal-case font-sans font-medium text-gray-700 ml-2">Define your investment interests (sectors, ticket size, and target impact goals).</p>
                    </li>
                    <li>
                      <span>Curated Discovery:</span>
                      <p className="normal-case font-sans font-medium text-gray-700 ml-2">Receive exclusive access to digital dossiers pre-vetted by academic monitors.</p>
                    </li>
                    <li>
                      <span>Secure Due Diligence:</span>
                      <p className="normal-case font-sans font-medium text-gray-700 ml-2">Access verifiable document audits inside the digital secure vault.</p>
                    </li>
                    <li>
                      <span>Engagement:</span>
                      <p className="normal-case font-sans font-medium text-gray-700 ml-2">Initiate and track cooperation metrics or grant allocations directly on the NCEI portal.</p>
                    </li>
                  </ol>
                </div>

                <div className="border border-black p-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="font-mono text-xs font-black uppercase flex items-center gap-1.5 text-black">
                    <Shield className="w-4 h-4 text-black" />
                    <span>Expectations Mandate</span>
                  </h4>
                  <p className="text-xs leading-relaxed font-sans text-gray-800 font-medium mt-1 normal-case">
                    Investors are expected to maintain the highest level of confidentiality. You agree to provide constructive feedback, even when declining a project, to help our ecosystem founders improve.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: The Sandbox Policy */}
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h3 className="font-syne font-bold text-lg uppercase tracking-tight border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-black text-white font-mono text-xs font-black">3</span>
              <span>The "Sandbox" Policy</span>
            </h3>
            <div className="border-2 border-black p-4 bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="font-mono text-xs font-black uppercase text-black block mb-2 tracking-wide">
                THE NCEI SANDBOX IS A SECURE DIGITAL VAULT
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="border border-black p-3 bg-white">
                  <p className="font-mono text-xs font-black text-black uppercase mb-1 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-black" />
                    <span>Confidentiality</span>
                  </p>
                  <p className="text-[11px] text-gray-700 font-sans leading-relaxed normal-case">
                    All proprietary information shared within the Sandbox is protected under the program's NDA protocols.
                  </p>
                </div>
                <div className="border border-black p-3 bg-white">
                  <p className="font-mono text-xs font-black text-black uppercase mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                    <span>Transparency</span>
                  </p>
                  <p className="text-[11px] text-gray-700 font-sans leading-relaxed normal-case">
                    NCEI acts as the "Neutral Intermediary". We track project milestones. We do not own IP, we ensure certified auditability.
                  </p>
                </div>
                <div className="border border-black p-3 bg-white">
                  <p className="font-mono text-xs font-black text-black uppercase mb-1 flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-black" />
                    <span>Ecosystem Integrity</span>
                  </p>
                  <p className="text-[11px] text-gray-700 font-sans leading-relaxed normal-case">
                    Participants misrepresenting data or bypassing compliance pathways face immediate expulsion from the platform.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Site Map & Navigation */}
          <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-syne font-bold text-lg uppercase tracking-tight border-b-2 border-black pb-2 mb-4 flex items-center gap-2">
              <Map className="w-5 h-5 text-black shrink-0" />
              <span>4. Site Map & Navigation</span>
            </h3>
            <p className="text-xs font-sans text-gray-700 font-medium mb-3 normal-case">
              To navigate the Z961combinator ecosystem, use the following operational segments:
            </p>
            <div className="space-y-2.5">
              <div className="flex gap-2.5 items-start">
                <span className="font-mono text-xs font-black uppercase text-white bg-black px-1.5 py-0.5 shrink-0">Dashboard (Home)</span>
                <p className="text-xs text-gray-850 font-sans leading-tight mt-0.5 normal-case"><span className="font-semibold text-black block uppercase">Central Hub:</span> Displays match status, active developer inquiries, and local ecosystem rate metrics.</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="font-mono text-xs font-black uppercase text-white bg-black px-1.5 py-0.5 shrink-0">The Sandbox</span>
                <p className="text-xs text-gray-850 font-sans leading-tight mt-0.5 normal-case"><span className="font-semibold text-black block uppercase">Secured Folder:</span> Vault for financial sheets, milestone logs, and certified directory files.</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="font-mono text-xs font-black uppercase text-white bg-black px-1.5 py-0.5 shrink-0">Investment Tank</span>
                <p className="text-xs text-gray-850 font-sans leading-tight mt-0.5 normal-case"><span className="font-semibold text-black block uppercase">Diaspora Node:</span> Vetted projects ready for capital allocations.</p>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="font-mono text-xs font-black uppercase text-white bg-black px-1.5 py-0.5 shrink-0">Prospectus Hub</span>
                <p className="text-xs text-gray-850 font-sans leading-tight mt-0.5 normal-case"><span className="font-semibold text-black block uppercase">Strategic Index:</span> Economic metrics, currency guidelines, and local policy directives.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Call-To-Action Desk Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-black text-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-full min-h-[350px]">
            <div>
              <h3 className="font-syne font-bold text-xl uppercase tracking-widest text-white mb-3">
                5. Get Started: Call to Action
              </h3>
              <p className="text-xs font-mono font-bold uppercase tracking-wider mb-2 text-zinc-300">
                Ready to build?
              </p>
              <p className="text-xs text-gray-300 font-sans leading-normal mb-6 normal-case">
                Connect your business idea with verified offshore network support. Select your path below to initiate operational checks.
              </p>

              <div className="space-y-4">
                <button
                  onClick={onApplyNow}
                  className="w-full bg-white text-black border border-white hover:bg-zinc-800 hover:text-white text-xs font-black uppercase py-4 px-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>Startups: Apply Now</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  onClick={onEngage}
                  className="w-full bg-zinc-800 text-white border border-zinc-700 hover:bg-white hover:text-black text-xs font-black uppercase py-4 px-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>Investors: Engage</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-800 pt-4 text-[10px] font-mono text-gray-400 space-y-2 normal-case leading-relaxed">
              <p>
                <strong>INSTITUTIONAL SUPPORT:</strong> NCEI Lebanon provides the "Expert Backing" for all vetted projects. If you are a graduate student, visit the Innovation Scout Portal in your dashboard to access your free market research reports.
              </p>
              <p>
                <strong>COMMITMENT TO THE MANDATE:</strong> We are building an ecosystem that thrives within Lebanon. By joining this initiative, you help position our country as a regional Knowledge & Solutions Engine.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
