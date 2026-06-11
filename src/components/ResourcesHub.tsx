import React, { useState } from "react";
import { BookOpen, HelpCircle, Activity, Award, Briefcase, ChevronRight, FileText, Globe } from "lucide-react";

export default function ResourcesHub() {
  const [activeResource, setActiveResource] = useState<"hubspoke" | "leadership">("hubspoke");

  return (
    <div className="space-y-8 text-black font-sans uppercase animate-fade-in" id="resources_hub_page">
      {/* Upper Title Band */}
      <div className="bg-zinc-100 border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="absolute top-2 right-2 bg-black text-white font-mono text-[9px] font-black px-2 py-0.5 uppercase">
          Ecosystem Papers
        </div>
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-5 h-5 text-black" />
          <span className="font-mono text-xs font-black text-black uppercase tracking-wider">NCEI ACADEMIC RESEARCH LIBRARY</span>
        </div>
        <h2 className="font-syne font-bold text-2xl sm:text-3xl uppercase tracking-tighter leading-none text-black">
          RESEARCH & OPERATIONAL DIRECTIVES
        </h2>
        <p className="text-xs sm:text-sm font-mono mt-3 text-gray-750 uppercase tracking-wide font-bold">
          Strategic frameworks for navigating regional volatile variables (VUCA)
        </p>
      </div>

      {/* Sub tabs to switch resources */}
      <div className="flex flex-wrap gap-2 border-b-4 border-black pb-4" id="resource_hub_toggles">
        <button
          onClick={() => setActiveResource("hubspoke")}
          className={`px-4 py-2 border-2 border-black font-black uppercase text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeResource === "hubspoke"
              ? "bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              : "bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-none"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Paper 1: Operational Hub-and-Spoke Model</span>
        </button>

        <button
          onClick={() => setActiveResource("leadership")}
          className={`px-4 py-2 border-2 border-black font-black uppercase text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeResource === "leadership"
              ? "bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              : "bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-none"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Paper 2: Leadership in the MENA Ecosystem</span>
        </button>
      </div>

      {/* Resource 1 Content */}
      {activeResource === "hubspoke" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="hubspoke_paper_content">
          {/* Main Paper */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Navigating Complexity Model */}
            <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <span className="font-mono text-gray-500 font-extrabold text-xs uppercase block mb-1">Resource Page 1: The Z961-Combinator</span>
              <h3 className="font-syne font-bold text-xl uppercase tracking-tight text-black mb-4 select-text">
                Navigating Complexity: Our Operational Hub-and-Spoke Model
              </h3>
              <p className="text-xs leading-relaxed text-gray-900 font-sans font-medium mb-4 select-text normal-case">
                In a VUCA (Volatility, Uncertainty, Complexity, Ambiguity) world, traditional centralized structures often fail under pressure. The Z961-Combinator adopts an Adaptive Ecosystem model designed to turn regional instability into a competitive advantage.
              </p>

              <div className="space-y-4">
                <div className="border border-black p-4 bg-zinc-100">
                  <p className="font-mono text-xs font-black uppercase text-black mb-1">• The Hub (Strategic Alignment)</p>
                  <p className="text-xs font-sans text-gray-800 normal-case">
                    The Combinator acts as the central intelligence node. It provides the "Common Control Framework", including standardized AI-native audit templates and regulatory compliance guidelines.
                  </p>
                </div>

                <div className="border border-black p-4 bg-zinc-100">
                  <p className="font-mono text-xs font-black uppercase text-black mb-1">• The Spokes (Operational Autonomy)</p>
                  <p className="text-xs font-sans text-gray-800 normal-case">
                    Our participating startups and innovation scouts operate as localized "spokes". They are empowered to manage their own workflows, enabling rapid response to local market shifts without waiting for centralized approval.
                  </p>
                </div>

                <div className="border border-black p-4 bg-zinc-100">
                  <p className="font-mono text-xs font-black uppercase text-black mb-1">• Systemic Resilience</p>
                  <p className="text-xs font-sans text-gray-800 normal-case">
                    This distributed network ensures that disruption at any single node does not jeopardize the entire ecosystem. The hub facilitates continuous feedback loops, allowing the collective to "pre-sense" market tremors and pivot before threats escalate.
                  </p>
                </div>
              </div>
            </div>

            {/* Leadership Competencies section */}
            <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-syne font-bold text-base uppercase tracking-tight text-black border-b border-black pb-2 mb-4">
                Leadership Competencies: From Controllers to Evolutionary Architects
              </h3>
              <p className="text-xs leading-relaxed text-gray-800 font-sans font-medium mb-4 select-text normal-case">
                In a VUCA-defined MENA region, the traditional command-and-control leadership model is increasingly inadequate. Effective leadership now requires "adaptive capacity"—the ability to maintain cognitive flexibility and interpret complex signals through diverse cultural and institutional systems. Rather than attempting to suppress instability, leaders must act as evolutionary architects who design systems capable of self-correction and continuous adaptation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-black p-3.5 bg-zinc-100">
                  <h5 className="font-mono text-xs font-black uppercase text-black mb-1">Systems Thinking</h5>
                  <p className="text-[11px] text-gray-700 font-sans leading-relaxed normal-case font-medium">The ability to perceive the interconnectedness of regional macroeconomic shifts (e.g., energy price fluctuations) and local operational realities.</p>
                </div>
                <div className="border border-black p-3.5 bg-zinc-100">
                  <h5 className="font-mono text-xs font-black uppercase text-black mb-1">Strategic Foresight</h5>
                  <p className="text-[11px] text-gray-700 font-sans leading-relaxed normal-case font-medium">Transitioning from reactive firefighting to building organizational "pre-sensing" mechanisms that allow the "hub" to anticipate systemic tremors.</p>
                </div>
                <div className="border border-black p-3.5 bg-zinc-100">
                  <h5 className="font-mono text-xs font-black uppercase text-black mb-1">Distributed Empowerment</h5>
                  <p className="text-[11px] text-gray-700 font-sans leading-relaxed normal-case font-medium">Cultivating a high-trust environment where local "spokes" possess the autonomy to make rapid decisions on the ground, guided by centralized, AI strategic pillars.</p>
                </div>
              </div>
            </div>

            {/* Case Studies section */}
            <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
              <h3 className="font-syne font-bold text-base uppercase tracking-tight text-black border-b border-black pb-2">
                Case Studies: Navigating Complexity
              </h3>
              
              <div className="border-l-4 border-black pl-4 space-y-1.5 py-1">
                <h4 className="font-mono text-xs font-black uppercase text-black">Case Study A: Distributed Resilience in Regional Logistics</h4>
                <p className="text-xs text-gray-900 font-sans leading-relaxed normal-case">
                  In response to recurring supply chain disruptions in the MENA region, leading logistics firms have pivoted from centralized warehousing to a decentralized hub-and-spoke delivery network.
                </p>
                <div className="text-[11px] font-mono text-gray-600 space-y-1 pl-2">
                  <p>• <strong>The Approach:</strong> By utilizing localized "micro-hubs" (spokes), these organizations reduced their vulnerability to transit blockages.</p>
                  <p>• <strong>The Result:</strong> When regional instability caused a major port to slow operations, the decentralized network enabled rapid rerouting through secondary spokes, maintaining service continuity.</p>
                </div>
              </div>

              <div className="border-l-4 border-zinc-700 pl-4 space-y-1.5 py-1">
                <h4 className="font-mono text-xs font-black uppercase text-black">Case Study B: AI-Driven Financial Auditing in Emerging Markets</h4>
                <p className="text-xs text-gray-900 font-sans leading-relaxed normal-case">
                  A fintech initiative operating across multiple high-volatility markets utilized an AI-native audit suite to combat "Knightian" uncertainty.
                </p>
                <div className="text-[11px] font-mono text-gray-600 space-y-1 pl-2">
                  <p>• <strong>The Approach:</strong> Instead of relying on manual, periodic audits, the organization implemented continuous, automated data verification across all its regional entities.</p>
                  <p>• <strong>The Result:</strong> The system detected anomalous revenue patterns—which traditional models missed—within hours. By addressing discrepancies immediately, the central hub prevented systemic liquidity risks.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Reference sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black border-b border-black pb-2 mb-3">
                References & Citations
              </h4>
              <ul className="space-y-3 text-[11px] font-sans font-medium text-gray-750 normal-case leading-relaxed">
                <li className="border-b pb-2">
                  <span className="font-mono font-bold block text-black">McKinsey & Company</span>
                  <span className="text-gray-500">Middle East & Africa Insights (2026).</span>
                </li>
                <li className="border-b pb-2">
                  <span className="font-mono font-bold block text-black">Dodds, P. S., et al.</span>
                  <span className="text-gray-500">Information exchange and the robustness of organizational networks. (2003).</span>
                </li>
                <li className="border-b pb-2">
                  <span className="font-mono font-bold block text-black">Nnaomah, U. I., et al.</span>
                  <span className="text-gray-500">AI in risk management: An analytical comparison between the U.S. and Nigerian banking sectors. (2024).</span>
                </li>
                <li>
                  <span className="font-mono font-bold block text-black">Syamsir, S.</span>
                  <span className="text-gray-500">Leadership agility in a VUCA world. (2025).</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* Resource 2 Content */}
      {activeResource === "leadership" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="leadership_paper_content">
          {/* Main Paper Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Evolutionary architect section */}
            <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <span className="font-mono text-gray-500 font-extrabold text-xs uppercase block mb-1">Resource Page 2: Leadership in the MENA Startup Ecosystem</span>
              <h3 className="font-syne font-bold text-xl uppercase tracking-tight text-black mb-4 select-text">
                The Evolutionary Architect: Leading Through Uncertainty
              </h3>
              <p className="text-xs leading-relaxed text-gray-900 font-sans font-semibold mb-4 select-text normal-case">
                To effectively navigate the "VUCA" (Volatility, Uncertainty, Complexity, Ambiguity) landscape in the MENA region, organizational strategies must shift from static, command-and-control models to antifragile, adaptive systems.
              </p>

              <div className="space-y-6">
                
                {/* Section 1 */}
                <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="font-mono text-xs font-black uppercase text-black border-b border-black pb-1.5 mb-2">
                    1. The Shift to Antifragile Systems
                  </h4>
                  <p className="text-xs text-gray-900 leading-relaxed font-sans font-medium normal-case">
                    In contrast to mere "resilience" (the ability to bounce back), antifragility—a concept popularized by Nassim Taleb—describes systems that grow stronger when exposed to stressors and disorder.
                  </p>
                  <ul className="text-xs font-sans font-medium text-gray-800 mt-2 pl-4 list-disc space-y-1 normal-case">
                    <li><strong>Structural Adaptability:</strong> Organizations that decentralize decision-making (using a hub-and-spoke model) are significantly better at preventing systemic failure because they limit cascading dependency collapse.</li>
                    <li><strong>The Role of Tinkering:</strong> Antifragile systems thrive by "tinkering"—creatively responding to changes through small, iterative experiments rather than rigid, top-down design.</li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="font-mono text-xs font-black uppercase text-black border-b border-black pb-1.5 mb-2">
                    2. Leadership in a VUCA World
                  </h4>
                  <p className="text-xs text-gray-900 leading-relaxed font-sans font-medium normal-case">
                    Traditional leadership frameworks prioritizing stability are increasingly ineffective in high-volatility environments. Under instructions from the SBS Journal of Applied Business Research at SBS Swiss Business School:
                  </p>
                  <ul className="text-xs font-sans font-medium text-gray-800 mt-2 pl-4 list-disc space-y-1 normal-case">
                    <li><strong>Agile Governance:</strong> Modern leadership requires "adaptive capacity," defined by cognitive flexibility and the ability to interpret indicators through cultural/regional frameworks.</li>
                    <li><strong>Strategic Foresight:</strong> Leaders must transition from "controllers" to "evolutionary architects", fostering distributed intelligence and systemic trust to empower spokes while keeping alignment.</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div className="border-2 border-black p-4 bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="font-mono text-xs font-black uppercase text-black border-b border-black pb-1.5 mb-2">
                    3. AI-Driven Verification and Risk Management
                  </h4>
                  <p className="text-xs text-gray-900 leading-relaxed font-sans font-medium normal-case">
                    For ventures like the Z961-Combinator and AI-native audit suites, artificial intelligence serves as a critical stabilization mechanism against "Knightian" uncertainty (unquantifiable risk).
                  </p>
                  <ul className="text-xs font-sans font-medium text-gray-800 mt-2 pl-4 list-disc space-y-1 normal-case">
                    <li><strong>Continuous Monitoring:</strong> AI facilitates real-time identification, assessment, and mitigation of risks by processing vast datasets to detect anomalies traditional manual audits miss.</li>
                    <li><strong>Proactive Mitigation:</strong> Predictive analytics enable organizations to identify risk patterns signaling threats (fraud, volatility, supply chain blockages) before they manifest.</li>
                    <li><strong>Institutional Flexibility:</strong> AI integration requires robust tech competence essential for emerging markets to bridge traditional limits and global requirements.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Core Competencies panel */}
            <div className="bg-zinc-100 border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-syne font-bold text-base uppercase tracking-tight text-black mb-3">
                Core Leadership Competencies
              </h3>
              <p className="text-xs text-gray-900 font-sans font-semibold mb-4 normal-case">
                Success in the MENA entrepreneurship landscape requires shifting from a "Controller" mindset to that of an Evolutionary Architect. NCEI defines these core competencies as follows:
              </p>

              <div className="space-y-3 font-mono text-xs font-bold text-black uppercase">
                <div className="bg-white border border-black p-3">
                  <p className="text-black font-extrabold uppercase mb-0.5">Adaptive Governance</p>
                  <p className="normal-case font-sans font-medium text-gray-700 text-[11px] leading-relaxed">Leaders must cultivate the ability to interpret complex signals through diverse cultural and institutional systems.</p>
                </div>
                <div className="bg-white border border-black p-3">
                  <p className="text-black font-extrabold uppercase mb-0.5">Systems Thinking</p>
                  <p className="normal-case font-sans font-medium text-gray-700 text-[11px] leading-relaxed">Success depends on the ability to perceive the interconnectedness of macroeconomic forces—such as energy price shifts—and translate them into actionable strategies.</p>
                </div>
                <div className="bg-white border border-black p-3">
                  <p className="text-black font-extrabold uppercase mb-0.5">Antifragile Tinkering</p>
                  <p className="normal-case font-sans font-medium text-gray-700 text-[11px] leading-relaxed">We encourage "tinkering" as a formal methodology. By running small, iterative experiments, founders build structures that grow stronger when exposed to volatility.</p>
                </div>
                <div className="bg-white border border-black p-3">
                  <p className="text-black font-extrabold uppercase mb-0.5">Radical Transparency</p>
                  <p className="normal-case font-sans font-medium text-gray-700 text-[11px] leading-relaxed">Our commitment to AI-Native Business Verification ensures that every entity maintains a real-time "health audit," effectively mitigating unquantifiable risk.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar References */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="font-mono text-xs font-black uppercase tracking-wider text-black border-b border-black pb-2 mb-3">
                References & Citations
              </h4>
              <ul className="space-y-3.5 text-[11px] font-sans font-medium text-gray-750 normal-case leading-relaxed">
                <li className="border-b pb-2">
                  <span className="font-mono font-bold block text-black">Danchin, A., Binder, P. M., & Noria, S.</span>
                  <p className="text-gray-600 mt-0.5 normal-case">
                    Antifragility and tinkering in biology (and in business) flexibility provides an efficient epigenetic way to manage risk. Genes, 2(4), 998–1016. (2011).
                  </p>
                </li>
                <li className="border-b pb-2">
                  <span className="font-mono font-bold block text-black">Dodds, P. S., Watts, D. J., & Sabel, C. F.</span>
                  <p className="text-gray-600 mt-0.5 normal-case">
                    Information exchange and the robustness of organizational networks. Proceedings of the National Academy of Sciences, 100(21), 12516–12521. (2003).
                  </p>
                </li>
                <li className="border-b pb-2">
                  <span className="font-mono font-bold block text-black">Nnaomah, U. I., et al.</span>
                  <p className="text-gray-600 mt-0.5 normal-case">
                    AI in risk management: An analytical comparison between the U.S. and Nigerian banking sectors. Int. Journal of Science & Tech Research. (2024).
                  </p>
                </li>
                <li>
                  <span className="font-mono font-bold block text-black">Syamsir, S.</span>
                  <p className="text-gray-600 mt-0.5 normal-case">
                    Leadership agility in a VUCA world: A systematic review, conceptual insights, and research directions. Taylor & Francis. (2025).
                  </p>
                </li>
              </ul>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
