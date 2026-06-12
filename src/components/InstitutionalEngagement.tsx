import React, { useState, useEffect } from "react";
import { Landmark, Check, AlertCircle, HelpCircle, Loader2, Sparkles, Send, CheckCircle, ArrowRight, RefreshCw, Star, Info } from "lucide-react";

interface InstitutionalEngagementProps {
  activeUserId?: string;
  activeUsername?: string;
  activeEmail?: string;
}

export default function InstitutionalEngagement({ activeUserId, activeUsername, activeEmail }: InstitutionalEngagementProps) {
  // Loading & error state
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    contactName: "",
    contactEmail: "",
    organizationName: "",
    identity: "",
    objectives: [] as string[],
    ticketSize: "",
    operationalFocus: "",
    prioritySectors: [] as string[],
    stagePreference: "",
    impactGoals: "",
    willingnessToEngage: "",
    institutionalRequirements: "",
    riskAppetite: 3,
    localRetention: "",
    collaboration: "",
    acceptedTerms: false
  });

  // Load baseline session user email & name if they're logged in
  useEffect(() => {
    if (activeUserId) {
      setFormData(prev => ({
        ...prev,
        contactName: prev.contactName || activeUsername || "",
        contactEmail: prev.contactEmail || activeEmail || ""
      }));
    }
    
    // Check localStorage for drafted progress
    const savedDraft = localStorage.getItem("Z961_institutional_draft");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(prev => ({
          ...prev,
          ...parsed,
          // Retain logged in values if present
          contactName: prev.contactName || parsed.contactName || activeUsername || "",
          contactEmail: prev.contactEmail || parsed.contactEmail || activeEmail || ""
        }));
      } catch (e) {
        console.error("Failed to parse unsaved institutional draft", e);
      }
    }
  }, [activeUserId, activeUsername, activeEmail]);

  // Handle draft saving to local storage
  const handleFieldChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    localStorage.setItem("Z961_institutional_draft", JSON.stringify(updated));
  };

  // Toggle multi-select items (objectives or prioritySectors)
  const toggleArrayItem = (field: "objectives" | "prioritySectors", item: string) => {
    const array = [...formData[field]];
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(item);
    }
    handleFieldChange(field, array);
  };

  // Submitting to backend REST API route
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorStatus("");

    // Form Validations
    if (!formData.contactName.trim()) {
      setErrorStatus("Official Contact Name is required.");
      return;
    }
    if (!formData.contactEmail.trim()) {
      setErrorStatus("Contact Email address is required.");
      return;
    }
    if (!formData.identity) {
      setErrorStatus("Please select your Institutional Identity or representation.");
      return;
    }
    if (formData.objectives.length === 0) {
      setErrorStatus("Please select at least one primary Engagement Mandate objective.");
      return;
    }
    if (!formData.acceptedTerms) {
      setErrorStatus("You must accept the NCEI Sandbox terms and conditions to proceed.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/institutional/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: activeUserId || ""
        })
      });

      if (response.ok) {
        const result = await response.json();
        setSubmittedData(result);
        setSuccess(true);
        // Clear draft cache on success
        localStorage.removeItem("Z961_institutional_draft");
      } else {
        const err = await response.json();
        setErrorStatus(err.error || "Failed to submit questionnaire. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorStatus("Network error occurred. The server could not register your questionnaire.");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic sandbox alignment helper for real-time engagement score
  const getDynamicAlignmentScore = () => {
    let score = 0;
    if (formData.identity) score += 20;
    if (formData.objectives.length > 0) score += 20;
    if (formData.prioritySectors.length > 0) score += 20;
    if (formData.willingnessToEngage) score += 20;
    if (formData.localRetention === "Yes, absolutely") score += 20;
    else if (formData.localRetention === "Depends on the opportunity") score += 10;
    return score;
  };

  return (
    <div className="max-w-4xl mx-auto my-6 px-4" id="institutional_questionnaire_view">
      {/* Visual Header / Banner */}
      <div className="bg-amber-500 border-4 border-black p-6 mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-black opacity-10 rounded-full transform translate-x-12 -translate-y-12"></div>
        <div className="flex items-center gap-3">
          <Landmark className="w-10 h-10 text-black stroke-[2.5]" />
          <div>
            <span className="bg-black text-amber-500 text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-black">
              Partnership Track
            </span>
            <h2 className="font-syne font-black text-2xl md:text-3xl text-black uppercase tracking-tight mt-0.5">
              Institutional Engagement
            </h2>
          </div>
        </div>
        <p className="text-black text-[17px] font-mono mt-3 max-w-2xl font-bold leading-snug">
          Thank you for joining the <strong className="underline">"Bridge to Growth"</strong> initiative. This form helps us understand your objectives, risk appetite, and desired level of involvement in Lebanon's innovation ecosystem.
        </p>
      </div>

      {success ? (
        <div className="border-4 border-black bg-white p-8 mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden" id="submission_success_card">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600"></div>
          <div className="mx-auto w-16 h-16 bg-amber-100 border-2 border-black rounded-full flex items-center justify-center mb-4">
            <Check className="w-9 h-9 text-amber-600 stroke-[3]" />
          </div>
          
          <h3 className="font-syne font-black text-2xl text-black uppercase tracking-tight">
            Mandate Signed Successfully!
          </h3>
          <p className="text-gray-600 font-mono text-xs mt-2">
            Record ID: <span className="font-bold underline text-black">{submittedData?.id || "N/A"}</span> • Timestamp: {new Date().toLocaleDateString()}
          </p>

          <div className="my-6 p-4 bg-zinc-50 border-2 border-dashed border-zinc-300 text-left rounded-md max-w-xl mx-auto font-mono text-xs text-zinc-700 leading-relaxed">
            <p className="font-black text-zinc-900 border-b border-zinc-200 pb-2 mb-2 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Preserved Sandbox Parameters:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1.5 gap-x-4">
              <div><strong>Representative:</strong> {submittedData?.contactName}</div>
              <div><strong>Organization:</strong> {submittedData?.organizationName || "N/A"}</div>
              <div><strong>Profile Identity:</strong> {submittedData?.identity}</div>
              <div><strong>Est. Range size:</strong> {submittedData?.ticketSize || "N/A"}</div>
              <div><strong>Region base:</strong> {submittedData?.operationalFocus || "Not Specified"}</div>
              <div><strong>Risk Level score:</strong> {submittedData?.riskAppetite}/5</div>
            </div>
          </div>

          <p className="text-[17px] font-mono font-medium max-w-lg mx-auto text-zinc-800 leading-relaxed mb-6">
            Your responses are stored securely and classified under the <strong className="underline">Confidentiality Rules</strong> of the NCEI Sandbox. The matching engine will now evaluate high-preparedness startups aligning with your strategic parameters.
          </p>

          <button
            onClick={() => {
              setSuccess(false);
              setFormData({
                contactName: activeUsername || "",
                contactEmail: activeEmail || "",
                organizationName: "",
                identity: "",
                objectives: [],
                ticketSize: "",
                operationalFocus: "",
                prioritySectors: [],
                stagePreference: "",
                impactGoals: "",
                willingnessToEngage: "",
                institutionalRequirements: "",
                riskAppetite: 3,
                localRetention: "",
                collaboration: "",
                acceptedTerms: false
              });
            }}
            className="px-6 py-2 border-2 border-black bg-amber-500 font-black uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-400 hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Submit Another Objective</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" id="institutional_questionnaire_form">
          
          {/* Quick Real-time Progress HUD */}
          <div className="border-2 border-black bg-zinc-50 p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-black text-amber-500 font-mono text-sm px-2.5 py-1 font-bold">
                {getDynamicAlignmentScore()}%
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-xs text-black uppercase">
                  NCEI Matching Readiness
                </h4>
                <p className="text-[13px] text-zinc-500 hover:text-black font-mono transition-colors">
                  Complete questions to customize diaspora matchmaking weights.
                </p>
              </div>
            </div>
            
            {/* Dynamic visual progress bar */}
            <div className="flex-1 max-w-xs bg-zinc-200 border border-zinc-400 h-3 overflow-hidden rounded relative">
              <div 
                className="bg-amber-500 h-full transition-all duration-500" 
                style={{ width: `${getDynamicAlignmentScore()}%` }}
              ></div>
            </div>
          </div>

          {/* Part 1: Profile & Capacity */}
          <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-syne font-black text-sm uppercase tracking-wider text-black bg-zinc-150 py-1.5 px-3 border border-zinc-200 mb-4">
              Part 1: Profile & Capacity
            </h3>

            {/* Sub-group: Representative Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs font-mono font-black uppercase mb-1.5 text-black">
                  Official Contact Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Jean-Marc Jabre"
                  value={formData.contactName}
                  onChange={(e) => handleFieldChange("contactName", e.target.value)}
                  className="w-full text-xs font-mono border-2 border-black p-2 bg-zinc-50 focus:bg-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-black uppercase mb-1.5 text-black">
                  Official Contact Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g., contact@levantventures.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleFieldChange("contactEmail", e.target.value)}
                  className="w-full text-xs font-mono border-2 border-black p-2 bg-zinc-50 focus:bg-white outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-mono font-black uppercase mb-1.5 text-black">
                  Organization / Firm Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Levant Horizon Capital Partners"
                  value={formData.organizationName}
                  onChange={(e) => handleFieldChange("organizationName", e.target.value)}
                  className="w-full text-xs font-mono border-2 border-black p-2 bg-zinc-50 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Ques 1: Identity */}
            <div className="mb-5">
              <label className="block text-xs font-mono font-black uppercase mb-2 text-black">
                Identity Representation <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  "Individual Investor",
                  "VC/Investment Firm",
                  "International Institutional Partner (NGO/Development Body)"
                ].map((item) => (
                  <label
                    key={item}
                    className={`border-2 border-black p-3 flex items-start gap-2.5 cursor-pointer selection:bg-transparent ${
                      formData.identity === item
                        ? "bg-amber-100 border-amber-500 font-extrabold shadow-[2px_2px_0px_0px_rgba(217,119,6,1)]"
                        : "bg-zinc-50 hover:bg-zinc-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="identity"
                      className="mt-0.5 accent-amber-500 shrink-0"
                      checked={formData.identity === item}
                      onChange={() => handleFieldChange("identity", item)}
                    />
                    <span className="text-xs font-mono leading-tight">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ques 2: Objectives */}
            <div className="mb-5">
              <label className="block text-xs font-mono font-black uppercase mb-1 text-black">
                Investment/Engagement Mandate <span className="text-red-600">*</span>
              </label>
              <p className="text-[10px] text-zinc-500 font-mono mb-2">
                What is your primary objective? (Select all that apply)
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5">
                {[
                  "Capital Deployment",
                  "Strategic Partnership",
                  "Technical Mentorship",
                  "Market Access",
                  "CSR/Impact"
                ].map((item) => {
                  const selected = formData.objectives.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleArrayItem("objectives", item)}
                      className={`p-2 border-2 border-black text-[11px] font-mono leading-tight flex items-center justify-between text-left cursor-pointer transition-all ${
                        selected
                          ? "bg-zinc-900 text-amber-400 font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          : "bg-white hover:bg-zinc-50 text-zinc-800"
                      }`}
                    >
                      <span>{item}</span>
                      {selected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ques 3: Ticket Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-black uppercase mb-2 text-black">
                  Ticket Size (for Investors)
                </label>
                <select
                  value={formData.ticketSize}
                  onChange={(e) => handleFieldChange("ticketSize", e.target.value)}
                  className="w-full text-xs font-mono border-2 border-black p-2 bg-zinc-50 focus:bg-white outline-none cursor-pointer"
                >
                  <option value="">-- Select ticket range per startup --</option>
                  <option value="$10k–$50k">$10k–$50k</option>
                  <option value="$50k–$250k">$50k–$250k</option>
                  <option value="$250k+">$250k+</option>
                  <option value="N/A - Non-investor">N/A - Non-investor</option>
                </select>
              </div>

              {/* Ques 4: Operational Focus */}
              <div>
                <label className="block text-xs font-mono font-black uppercase mb-2 text-black">
                  Operational Focus Location
                </label>
                <input
                  type="text"
                  placeholder="Enter your region or global location"
                  value={formData.operationalFocus}
                  onChange={(e) => handleFieldChange("operationalFocus", e.target.value)}
                  className="w-full text-xs font-mono border-2 border-black p-2 bg-zinc-50 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Part 2: Sectoral Interests & Thematic Fit */}
          <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-syne font-black text-sm uppercase tracking-wider text-black bg-zinc-150 py-1.5 px-3 border border-zinc-200 mb-4">
              Part 2: Sectoral Interests & Thematic Fit
            </h3>

            {/* Priority Clusters */}
            <div className="mb-5">
              <label className="block text-xs font-mono font-black uppercase mb-1.5 text-black">
                Priority Sectors
              </label>
              <p className="text-[10px] text-zinc-500 font-mono mb-2">
                Which of the NCEI priority clusters are you most interested in? (Select all that apply)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {[
                  "FinTech",
                  "Agri-Tech",
                  "ICT/AI",
                  "MedTech",
                  "Creative/Professional Services",
                  "Other"
                ].map((sector) => {
                  const selected = formData.prioritySectors.includes(sector);
                  return (
                    <button
                      key={sector}
                      type="button"
                      onClick={() => toggleArrayItem("prioritySectors", sector)}
                      className={`p-2 border-2 border-black text-[11px] font-mono leading-tight flex items-center justify-between text-left cursor-pointer transition-all ${
                        selected
                          ? "bg-amber-600 text-white font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          : "bg-white hover:bg-zinc-50 text-zinc-800"
                      }`}
                    >
                      <span>{sector}</span>
                      {selected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 2: Growth preference & SDG goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-black uppercase mb-2 text-black">
                  Startup Growth Stage Preference
                </label>
                <select
                  value={formData.stagePreference}
                  onChange={(e) => handleFieldChange("stagePreference", e.target.value)}
                  className="w-full text-xs font-mono border-2 border-black p-2 bg-zinc-50 focus:bg-white outline-none cursor-pointer"
                >
                  <option value="">-- Select target stage --</option>
                  <option value="Ideation">Ideation</option>
                  <option value="Prototype">Prototype</option>
                  <option value="MVP/Early Revenue">MVP/Early Revenue</option>
                  <option value="Growth/Scale-up">Growth/Scale-up</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-black uppercase mb-2 text-black">
                  Impact Goals (UN SDGs alignment)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Job Creation, Food Security, Digital Inclusion"
                  value={formData.impactGoals}
                  onChange={(e) => handleFieldChange("impactGoals", e.target.value)}
                  className="w-full text-xs font-mono border-2 border-black p-2 bg-zinc-50 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Part 3: Engagement Model & The Sandbox */}
          <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-syne font-black text-sm uppercase tracking-wider text-black bg-zinc-150 py-1.5 px-3 border border-zinc-200 mb-4">
              Part 3: Engagement Model & The Sandbox
            </h3>

            {/* Q1: Sandbox Willingness */}
            <div className="mb-5">
              <label className="block text-xs font-mono font-black uppercase mb-2 text-black">
                Participation in July 2026 Virtual Sandbox
              </label>
              <div className="space-y-2">
                {[
                  {
                    value: 'Passive: Receive "High-Readiness" project briefs once a week',
                    lbl: "Passive Track",
                    desc: 'Weekly digests of audited projects with zero communication overhead.'
                  },
                  {
                    value: 'Active: Attend live "Institutional Tank" pitch sessions',
                    lbl: "Active Track",
                    desc: "Real-time attendance in mock trials and feedback dialogues with diaspora investors."
                  },
                  {
                    value: "Strategic: Provide mentorship or serve as an industry advisor",
                    lbl: "Strategic Track",
                    desc: "High-contribution advisory role shape regulatory framework pilots & legal sandboxing."
                  }
                ].map((item) => (
                  <label
                    key={item.lbl}
                    className={`border-2 border-black p-3 flex items-start gap-3 cursor-pointer selection:bg-transparent ${
                      formData.willingnessToEngage === item.value
                        ? "bg-amber-100 border-amber-500 font-extrabold shadow-[2px_2px_0px_0px_rgba(217,119,6,1)]"
                        : "bg-zinc-50 hover:bg-zinc-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name="willingnessToEngage"
                      value={item.value}
                      className="mt-1 accent-amber-500 shrink-0"
                      checked={formData.willingnessToEngage === item.value}
                      onChange={() => handleFieldChange("willingnessToEngage", item.value)}
                    />
                    <div className="text-xs font-mono">
                      <p className="font-extrabold text-black uppercase text-[11px]">{item.lbl}</p>
                      <p className="text-zinc-600 mt-0.5">{item.value}</p>
                      <p className="text-[10px] text-zinc-400 mt-1 italic">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Q2: Compliance Mandates */}
            <div className="mb-5">
              <label className="block text-xs font-mono font-black uppercase mb-1.5 text-black">
                Institutional Due Diligence & Compliance Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Describe any specific requirements, KYC/AML procedures, or legal/compliance frameworks your organization mandates..."
                value={formData.institutionalRequirements}
                onChange={(e) => handleFieldChange("institutionalRequirements", e.target.value)}
                className="w-full text-xs font-mono border-2 border-black p-2 bg-zinc-50 focus:bg-white outline-none"
              />
            </div>

            {/* Q3: Risk appetite */}
            <div>
              <label className="block text-xs font-mono font-black uppercase mb-1 text-black">
                Comfort with Lebanese Economic Landscape <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center justify-between font-mono text-[9px] text-zinc-500 mb-2">
                <span>1 = Low Risk Tolerance</span>
                <span>5 = High/Opportunistic</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleFieldChange("riskAppetite", level)}
                    className={`flex-1 p-2.5 border-2 border-black font-mono font-black text-sm text-center transition-all cursor-pointer ${
                      formData.riskAppetite === level
                        ? "bg-zinc-900 text-amber-400 font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-zinc-50 text-zinc-700 hover:bg-zinc-150"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Part 4: Commitment to the National Mandate */}
          <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-syne font-black text-sm uppercase tracking-wider text-black bg-zinc-150 py-1.5 px-3 border border-zinc-200 mb-4">
              Part 4: Commitment to the National Mandate
            </h3>

            {/* Q1: Local operation retention */}
            <div className="mb-5">
              <label className="block text-xs font-mono font-black uppercase mb-2 text-black">
                Operational Talent Retention within Lebanon
              </label>
              <p className="text-[10px] text-zinc-500 font-mono mb-2">
                Are you open to supporting startups that aim to keep their core operations and talent base within Lebanon?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  "Yes, absolutely",
                  "Depends on the opportunity",
                  "Not a priority"
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleFieldChange("localRetention", item)}
                    className={`p-2.5 border-2 border-black text-xs font-mono text-center transition-all cursor-pointer ${
                      formData.localRetention === item
                        ? "bg-zinc-900 text-amber-400 font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white hover:bg-zinc-50 text-zinc-800"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2: Co-investment / Collaboration */}
            <div className="mb-5">
              <label className="block text-xs font-mono font-black uppercase mb-2 text-black">
                Regional co-investment / Collaboration willingness
              </label>
              <p className="text-[10px] text-zinc-500 font-mono mb-2">
                Would you be interested in co-investment or partnership opportunities with other regional partners (e.g., EU, UNDP, ESCWA)?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  "Yes, very interested",
                  "Open to exploring",
                  "Prefer to operate independently"
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleFieldChange("collaboration", item)}
                    className={`p-2.5 border-2 border-black text-xs font-mono text-center transition-all cursor-pointer ${
                      formData.collaboration === item
                        ? "bg-zinc-900 text-amber-400 font-extrabold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white hover:bg-zinc-50 text-zinc-800"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Agreement Policy */}
            <div className="bg-amber-50 p-4 border-2 border-black mb-4">
              <label className="flex items-start gap-2.5 cursor-pointer selection:bg-transparent">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptedTerms}
                  onChange={(e) => handleFieldChange("acceptedTerms", e.target.checked)}
                  className="mt-1 Accent-amber-600 cursor-pointer shrink-0"
                />
                <span className="text-xs font-mono text-black font-extrabold">
                  I accept the terms and conditions of the NCEI Sandbox
                </span>
              </label>
              <p className="text-[10px] text-zinc-500 font-mono mt-2 leading-relaxed pl-6">
                Responses are treated as Confidential Information within the NCEI Sandbox and will be used solely for the purpose of matching you with vetted high-potential opportunities.
              </p>
            </div>
          </div>

          {/* Submission feedback */}
          {errorStatus && (
            <div className="p-3 bg-red-100 border-2 border-red-600 text-red-800 font-mono text-xs flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorStatus}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black border-4 border-black font-black uppercase text-sm tracking-widest shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-black" />
                  <span>Submit Questionnaire</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
