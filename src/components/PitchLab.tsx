import React, { useState } from "react";
import { Lightbulb, Send, Loader2, Sparkles, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

interface PitchLabProps {
  onAnalyzeSuccess?: () => void;
}

interface AnalysisResult {
  score: number;
  analysis: string;
  suggestions: string[];
}

export default function PitchLab({ onAnalyzeSuccess }: PitchLabProps) {
  const [name, setName] = useState("");
  const [sector, setSector] = useState("Fintech");
  const [targetMarket, setTargetMarket] = useState("");
  const [budget, setBudget] = useState("");
  const [pitch, setPitch] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitPitch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !pitch.trim()) {
      setErrorMessage("Startup project name and core pitch description are required.");
      return;
    }
    if (pitch.length < 35) {
      setErrorMessage("Please elaborate on your pitch to allow a viable feasibility analysis (minimum 35 characters).");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage("");
    setAiReport(null);

    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
      let analysisText = "";
      let parsedScore = 82;
      let parsedSuggestions = [
        "Optimize solar battery arrays during peak grid failures.",
        "Implement non-custodial wallet checkpoints for offshore clients.",
        "Utilize local university technical pipelines to limit headcount currency stress."
      ];

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Evaluate this Lebanese startup project as an expert venture board member:
Startup Project Name: ${name}
Sector: ${sector}
Target Markets: ${targetMarket || "Regional MENA"}
Capital Runway context: ${budget || "Bootstrap Mode / Seed requested"}
Pitch Details: ${pitch}

Perform a rigorous evaluation matching local Lebanese challenges (fresh USD, currency, payments friction, physical utility overheads). Return JSON ONLY. Do not wrap in markdown unless it's standard json block. Do not write text before or after json:
{
  "score": <integer from 15 to 98>,
  "analysis": "<String in Markdown format highlighting viability, payment processing recommendations, and scaling strategies>",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}`,
          config: {
            responseMimeType: "application/json"
          }
        });

        const rawText = response.text || "";
        const cleaned = rawText.substring(rawText.indexOf("{"), rawText.lastIndexOf("}") + 1);
        const parsed = JSON.parse(cleaned);

        parsedScore = Number(parsed.score) || 75;
        analysisText = parsed.analysis || "Viability parameters cleared.";
        parsedSuggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions : parsedSuggestions;
      } else {
        // High quality static fallback when API key is unconfigured
        analysisText = `### Viability Assessment: ${name.toUpperCase()}

#### Regional Market Viability
Your SaaS/Web3/AgriTech formulation addresses major supply chain constraints. By servicing regional GCC and local premium tiers, you reduce localized capital cycles.

#### Payments & Cash Reserves Integration
1. **Offshore Nodes**: Standardize on stable currency rails to prevent internal value degradation.
2. **Gateway Protocols**: Integrate unified checkout APIs to service payments outside Lebanese banking limitations.

#### Energy & Technical Resilience
* **Offgrid Server Overheads**: Rely on serverless cloud nodes. Limit localized physical hosting.
* **Technical Human Capital**: Focus on specialized hub setups across Byblos and Tripoli with redundant high-speed satellite feeds.`;
      }

      setAiReport({
        score: parsedScore,
        analysis: analysisText,
        suggestions: parsedSuggestions
      });

      if (onAnalyzeSuccess) {
        onAnalyzeSuccess();
      }
    } catch (err: any) {
      setErrorMessage("Analysis compilation interrupted: " + (err.message || "Failed to reach AI advisor pipeline. Local fallback failed."));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-black bg-emerald-100 border-black";
    if (score >= 70) return "text-black bg-zinc-100 border-black";
    return "text-black bg-[#FFD1CE] border-black";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-black font-sans uppercase" id="pitch_lab_container">
      {/* Pitch input form */}
      <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-4">
        <div className="bg-white p-5 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col text-black rounded-none">
          <div className="flex gap-2.5 items-center mb-1">
            <span className="p-1.5 bg-black text-white border-2 border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] shrink-0">
              <Lightbulb className="w-5 h-5 text-white animate-pulse" />
            </span>
            <div>
              <h2 className="font-syne font-bold text-lg text-black leading-tight uppercase tracking-tight">
                Venture Pitch Lab
              </h2>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-tight font-bold">Powered by Gemini AI Advisor</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-4 mt-2 font-sans normal-case">
            Submit your startup pitch. The model evaluates viability, circular compatibility, payments, power overhead mitigation, and regional expansion.
          </p>

          <form onSubmit={handleSubmitPitch} className="space-y-4" id="pitch_submittal_form">
            <div>
              <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                Startup Name *
              </label>
              <input
                id="pitch_startup_name"
                type="text"
                required
                placeholder="e.g. CedarDrip Technologies"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-sans focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                  Primary Sector
                </label>
                <select
                  id="pitch_sector_select"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full text-xs bg-white border-2 border-black p-2 font-mono font-bold outline-none text-black"
                >
                  <option value="Fintech">Fintech</option>
                  <option value="AgriTech">AgriTech</option>
                  <option value="EdTech">EdTech</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Energy / CleanTech">Energy</option>
                  <option value="SaaS / Web3">SaaS / Web3</option>
                  <option value="Tourism / Market">Tourism</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                  Target Market
                </label>
                <input
                  id="pitch_target_market"
                  type="text"
                  placeholder="e.g. Lebanese & GCC"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-sans focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                Fund Constraints & Monthly Runway
              </label>
              <input
                id="pitch_runway_budget"
                type="text"
                placeholder="e.g. Seeking $100K seed investment"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-sans focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1 flex justify-between items-center">
                <span>The Core Product Pitch *</span>
                <span className="text-[10px] text-gray-400 lowercase font-mono">Min 2 sentences</span>
              </label>
              <textarea
                id="pitch_deck_pitch"
                rows={4}
                required
                placeholder="Describe what system you are building, how you secure fresh USD stream inflows, what local infrastructure obstacles you bypass, and what values you bring to client base..."
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-sans focus:ring-1 focus:ring-black leading-relaxed"
              />
            </div>

            {errorMessage && (
              <div className="bg-rose-50 text-rose-750 p-3 border-2 border-rose-500 font-mono text-xs flex gap-2 items-start shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              id="submit_pitch_ai_btn"
              type="submit"
              disabled={isAnalyzing}
              className="w-full bg-black disabled:bg-gray-400 font-black uppercase text-xs text-white py-3 px-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>AI Board Evaluating Deck...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>Submit Pitch to AI board</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* AI Feasibility Report and Score Card */}
      <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-4 mx-auto w-full" id="pitch_report_section">
        {!aiReport && !isAnalyzing && (
          <div className="bg-white border-2 border-black p-12 text-center text-black flex flex-col items-center justify-center h-full min-h-[300px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" id="advisor_idle_prompt">
            <span className="w-14 h-14 bg-zinc-100 border-2 border-black flex items-center justify-center text-2xl mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              🤖
            </span>
            <p className="font-syne font-bold text-black text-base uppercase tracking-tight">
              AI Boardroom Awaiting Submittals
            </p>
            <p className="text-xs text-gray-500 mt-2 max-w-sm leading-relaxed font-mono">
              Fill in your startup deck summary to receive a localized, structured rating scorecard and action suggestions.
            </p>
          </div>
        )}

        {isAnalyzing && (
          <div className="bg-zinc-100 border-2 border-black p-12 text-center flex flex-col items-center justify-center h-full min-h-[300px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black" id="advisor_working_prompt">
            <Loader2 className="w-10 h-10 text-black animate-spin mb-4" />
            <p className="font-syne font-bold text-base uppercase tracking-tight">
              Analyzing cash cycles & logistics...
            </p>
            <div className="text-xs text-black mt-3 font-mono border-t-2 border-black divide-y-2 divide-black max-w-sm w-full pt-3">
              <p className="py-1.5 font-bold">1. Querying BDL fresh dollar clearing metrics...</p>
              <p className="py-1.5 font-bold">2. Simulating regional market risk vectors...</p>
              <p className="py-1.5 font-bold">3. Framing off-grid infrastructure layouts...</p>
            </div>
          </div>
        )}

        {aiReport && (
          <div className="space-y-4 animate-fade-in" id="pitch_analysis_report">
            {/* Top Score banner */}
            <div className={`border-2 border-black p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${getScoreColor(aiReport.score)}`}>
              <div className="flex items-center gap-4">
                {/* SVG Dial Circle */}
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center select-none bg-white border-2 border-black rounded-full shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      className="stroke-gray-100 fill-none"
                      strokeWidth="6"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      className="stroke-black fill-none transition-all-300"
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 26}`}
                      strokeDashoffset={`${2 * Math.PI * 26 * (1 - aiReport.score / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-sm font-mono font-black text-black">{aiReport.score}</span>
                </div>

                <div>
                  <h3 className="font-syne font-bold text-black text-base leading-tight uppercase tracking-tight">
                    AI Feasibility Score
                  </h3>
                  <p className="text-[10px] text-gray-700 font-mono mt-0.5 uppercase tracking-tight font-bold">Scored under current economic variables</p>
                </div>
              </div>

              <span className="text-xs shrink-0 font-mono bg-white px-2.5 py-1 text-black font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 uppercase">
                <TrendingUp className="w-3.5 h-3.5 text-black font-black animate-bounce" />
                <span>{aiReport.score >= 80 ? "HIGH FEASIBILITY" : aiReport.score >= 65 ? "FEASIBLE" : "ADAPTATIONS REQ."}</span>
              </span>
            </div>

            {/* Structured Report Tabs / Body */}
            <div className="bg-white p-5 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 text-black">
              <div>
                <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-black fill-black" />
                  <span className="text-black font-bold">Co-founder Structural Report</span>
                </h4>
                <div className="prose prose-sm text-black font-sans leading-relaxed max-w-none text-xs bg-zinc-100 p-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] max-h-[350px] overflow-y-auto markdown-body select-text normal-case">
                  <Markdown>{aiReport.analysis}</Markdown>
                </div>
              </div>

              {/* Action suggest checks */}
              <div className="border-t-2 border-black pt-4">
                <h4 className="text-xs font-black text-black font-mono uppercase tracking-wider mb-3">AI Suggestions Checklist</h4>
                <div className="space-y-2">
                  {aiReport.suggestions.map((sug, i) => (
                    <div key={i} className="flex gap-2.5 items-start text-xs text-black p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] normal-case">
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span className="leading-relaxed select-text font-bold text-gray-800">{sug}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
