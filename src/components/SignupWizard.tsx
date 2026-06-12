import React, { useState, useEffect } from "react";
import { User, Lock, Mail, ChevronRight, ChevronLeft, CheckCircle2, ShieldAlert, Sparkles, Loader2, BookOpen, ExternalLink, HelpCircle } from "lucide-react";

interface SignupWizardProps {
  onSuccess: (userId: string, username: string, email: string) => void;
  activeUserId: string;
  activeUsername: string;
  activeEmail: string;
  onLogout: () => void;
}

export default function SignupWizard({ onSuccess, activeUserId, activeUsername, activeEmail, onLogout }: SignupWizardProps) {
  // Authentication form states
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  // Questionnaire form states
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [formData, setFormData] = useState({
    // PART 1: FOUNDER & TEAM DOSSIER
    founderNames: "",
    founderBio: "",
    teamExpertise: "",
    linkedinUrls: "",
    // PART 2: PROJECT & IDEATION
    projectName: "",
    developmentStage: "Ideation",
    timeframeScalability: "",
    fundingHistory: "",
    tamSomAssessment: "",
    // PART 3: ECONOMIC ALIGNMENT & MACRO-DEVELOPMENT
    nationalImpact: "",
    exportPotentialPay: "",
    jobCreation: "",
    sdgIntegration: "",
    resilienceSustainability: "",
    // PART 4: FINANCIALS, STRATEGY & THE ASK
    totalCapitalRequired: "",
    capitalAllocation: "",
    investmentVehicle: "SAFE",
    nonCapitalServices: "",
    marketingPlan: "",
    // PART 5: RISK MITIGATION & EXIT STRATEGY
    operationalResilience: "",
    financialHedging: "",
    exitObjective: "acquisition",
    targetBuyerUniverse: "",
    // PART 6: SUPPORTING DOCUMENTATION
    documentLinks: "",
    // TERMS
    acceptedTerms: false,
  });

  // Fetch current user registration state upon successful login/active session
  useEffect(() => {
    if (activeUserId) {
      fetchRegistrationProfile();
    }
  }, [activeUserId]);

  const fetchRegistrationProfile = async () => {
    try {
      const res = await fetch(`/api/registration/my/${activeUserId}`);
      if (res.ok) {
        const data = await res.json();
        // Restore progress
        setFormData({
          founderNames: data.founderNames || "",
          founderBio: data.founderBio || "",
          teamExpertise: data.teamExpertise || "",
          linkedinUrls: data.linkedinUrls || "",
          projectName: data.projectName || "",
          developmentStage: data.developmentStage || "Ideation",
          timeframeScalability: data.timeframeScalability || "",
          fundingHistory: data.fundingHistory || "",
          tamSomAssessment: data.tamSomAssessment || "",
          nationalImpact: data.nationalImpact || "",
          exportPotentialPay: data.exportPotentialPay || "",
          jobCreation: data.jobCreation || "",
          sdgIntegration: data.sdgIntegration || "",
          resilienceSustainability: data.resilienceSustainability || "",
          totalCapitalRequired: data.totalCapitalRequired || "",
          capitalAllocation: data.capitalAllocation || "",
          investmentVehicle: data.investmentVehicle || "SAFE",
          nonCapitalServices: data.nonCapitalServices || "",
          marketingPlan: data.marketingPlan || "",
          operationalResilience: data.operationalResilience || "",
          financialHedging: data.financialHedging || "",
          exitObjective: data.exitObjective || "acquisition",
          targetBuyerUniverse: data.targetBuyerUniverse || "",
          documentLinks: data.documentLinks || "",
          acceptedTerms: data.acceptedTerms || false,
        });
        if (data.step) {
          setStep(data.step);
        }
        if (data.completed) {
          setSubmitted(true);
        }
      }
    } catch (err) {
      console.error("Failed to load active user registration:", err);
    }
  };

  const saveStepProgress = async (nextStep: number, isFinalSubmit: boolean = false) => {
    if (!activeUserId) return;
    setSaveLoading(true);
    try {
      const res = await fetch("/api/registration/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: activeUserId,
          data: {
            ...formData,
            step: nextStep,
            completed: isFinalSubmit,
          },
        }),
      });
      if (res.ok) {
        if (!isFinalSubmit) {
          setStep(nextStep);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } catch (err) {
      console.error("Failed to save step progress:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  // Handle Authentication Submission
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    const apiRoute = isLogin ? "/api/auth/signin" : "/api/auth/signup";
    const payload = isLogin
      ? { email, password }
      : { email, username, password };

    try {
      const res = await fetch(apiRoute, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Authentication failed.");
      }

      const userData = await res.json();
      onSuccess(userData.id, userData.username, userData.email);
    } catch (err: any) {
      setAuthError(err.message || "An unexpected auth error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Steps Navigation
  const handleNext = () => {
    if (step < 6) {
      saveStepProgress(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((p) => p - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedTerms) {
      alert("Please accept the terms of participation and Code of Conduct before submitting.");
      return;
    }
    saveStepProgress(7, true);
  };

  // Progress Sidebar Labels
  const stepsMeta = [
    { num: 1, title: "Founder Team", desc: "Dossier & Bio" },
    { num: 2, title: "Project & Stage", desc: "Ideation & TAM" },
    { num: 3, title: "Macro Alignment", desc: "USD & Impact" },
    { num: 4, title: "Capital Ask", desc: "Strategy & Allocation" },
    { num: 5, title: "Risk & Exit", desc: "Resilience & Plan" },
    { num: 6, title: "Documentation", desc: "Decks & Agreements" },
  ];

  if (!activeUserId) {
    return (
      <div className="max-w-md mx-auto my-8 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative" id="auth_portal_card">
        {/* Decorative corner tag */}
        <div className="absolute top-0 right-0 bg-black text-white text-[9px] font-mono uppercase px-2 py-0.5 tracking-wider">
          INITIATIVE GATEWAY
        </div>

        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-black" fill="currentColor" />
          <h2 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-black">
            {isLogin ? "SANDBOX SIGN IN" : "SANDBOX CREATION"}
          </h2>
        </div>

        <p className="text-xs font-semibold text-gray-700 leading-normal font-sans mb-6 uppercase">
          {isLogin
            ? "Access your Z961 Combinator application pipeline to modify your active ecosystem audit milestones."
            : "Register your sovereign node to build capital credibility and map your tech venture into the sandbox directory."}
        </p>

        {authError && (
          <div className="mb-4 bg-red-50 border-2 border-red-600 text-red-950 p-3 text-xs font-mono font-bold flex gap-2 items-center" id="auth_error_container">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-black text-black uppercase">
                Full Legal Name / Team Lead
              </label>
              <div className="flex items-center bg-white border-2 border-black px-3 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <User className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="e.g., Sammy Maalouf"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent outline-none text-xs text-black w-full uppercase font-bold"
                  id="auth_input_name"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-black text-black uppercase">
              Operational Email Address
            </label>
            <div className="flex items-center bg-white border-2 border-black px-3 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Mail className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
              <input
                type="email"
                placeholder="e.g., sammy@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none text-xs text-black w-full font-bold lowercase"
                id="auth_input_email"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-black text-black uppercase">
              Sandbox Security Access Key (Password)
            </label>
            <div className="flex items-center bg-white border-2 border-black px-3 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Lock className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none text-xs text-black w-full font-sans"
                id="auth_input_password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white hover:bg-zinc-900 border-2 border-black text-xs sm:text-sm font-black uppercase py-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
            id="auth_submit_btn"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin py-0.5" />
                <span>ESTABLISHING PROTOCOL...</span>
              </>
            ) : (
              <>
                <span>{isLogin ? "SIGN INTO SANDBOX" : "GENERATE SECURE ACCOUNT"}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t-2 border-zinc-250 text-center select-none">
          <p className="text-[10px] font-mono text-gray-500 uppercase font-black">
            {isLogin ? "Need a verified startup registration?" : "Already mapped your digital venture?"}
          </p>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setAuthError("");
            }}
            className="mt-1.5 text-xs font-mono font-black text-orange-600 hover:text-black uppercase underline transition-colors cursor-pointer"
            id="auth_toggle_mode_btn"
          >
            {isLogin ? "Register a New Node" : "Access Existing Node Login"}
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto my-8 bg-amber-50 border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center relative" id="registration_completed_screen">
        <div className="absolute top-0 right-0 bg-[#121212] text-white text-[9px] font-mono uppercase px-2.5 py-0.5 tracking-wider">
          NCEI STATUS: COMPLETED
        </div>

        <div className="inline-flex items-center justify-center bg-emerald-500 text-white rounded-full p-3 mb-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h2 className="font-syne font-black text-2xl uppercase tracking-tighter text-black mb-2 leading-none">
          APPLICATION SUCCESSFULLY SUBMITTED
        </h2>
        <p className="text-xs font-mono font-black text-zinc-700 uppercase tracking-widest tracking-wide mb-6">
          Z961 COMBINATOR INSTITUTIONAL SANDBOX PROPOSAL • UNDER AUDIT
        </p>

        <div className="bg-white border-2 border-black p-5 text-left text-xs text-zinc-900 font-sans font-medium space-y-4 max-w-2xl mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-bold text-black uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>EXECUTIVE AUDIT PIPELINE INFORMATION:</span>
          </p>
          <p className="leading-relaxed">
            Thank you, <strong className="uppercase">{activeUsername}</strong> ({activeEmail}). Your complete dossier and technical details have been encrypted and submitted to the National Center for Enterprise & Innovation (NCEI) expert panel.
          </p>
          <p className="leading-relaxed">
            Your anonymized project metrics will be shared with our strategic international mapping partners (including <strong>UNDP, ESCWA,</strong> and <strong>EU Delegation to Lebanon</strong>) for ecosystem development indexing.
          </p>
          <div className="p-3 bg-zinc-50 border border-zinc-300 font-mono text-[10px] space-y-1.5">
            <div>• NODE SECURE REGISTRY ID: <span className="font-bold">{activeUserId}</span></div>
            <div>• VERIFICATION TRACKER: <span className="font-bold text-orange-600 uppercase">PENDING NCEI BOARD AUDIT</span></div>
            <div>• SUBMISSION DATE / TIMESTAMP: <span className="font-bold">{new Date().toLocaleString()}</span></div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
            className="w-full sm:w-auto bg-black text-white hover:bg-zinc-800 border-2 border-black text-xs font-black py-2.5 px-6 uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-transform"
          >
            Review/Amend Application
          </button>
          <button
            onClick={onLogout}
            className="w-full sm:w-auto bg-white text-black hover:bg-zinc-150 border-2 border-black text-xs font-black py-2.5 px-6 uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            Log Out Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-black font-sans my-4" id="registration_onboarding_form">
      {/* Top Banner Header Info */}
      <div className="bg-black text-white p-4 sm:p-5 border-b-2 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-orange-500 text-black text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded border border-black">
              SECURE LOGGED NODE
            </span>
            <span className="text-zinc-400 font-mono text-xs">{activeEmail}</span>
          </div>
          <h2 className="font-syne font-black text-lg sm:text-xl uppercase tracking-tight text-white mt-1">
            Z961 COMBINATOR INSTITUTIONAL APPLICATION
          </h2>
        </div>
        <button
          onClick={onLogout}
          className="bg-white text-black hover:bg-zinc-200 text-[10px] font-mono font-black uppercase px-3 py-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
        >
          Sign Out Node
        </button>
      </div>

      {/* Main Form Layout Container (Sidebar Progress + Step Page content) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 border-b-2 border-black min-h-[500px]">
        {/* Sidebar steps indicator progress map */}
        <aside className="bg-zinc-100 border-r-2 border-b-2 lg:border-b-0 border-black p-4 space-y-2 select-none lg:block" id="wizard_sidebar">
          <p className="font-mono text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-4">
            APPLICATION BLUEPRINT
          </p>
          <div className="space-y-3">
            {stepsMeta.map((s) => {
              const isActive = step === s.num;
              const isPast = step > s.num;
              return (
                <div
                  key={s.num}
                  onClick={() => {
                    // Allowed to jump backwards or save current and navigate
                    if (s.num < step) {
                      setStep(s.num);
                    } else if (s.num === step + 1) {
                      handleNext();
                    }
                  }}
                  className={`flex gap-3 text-left p-2.5 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-colors ${
                    isActive
                      ? "bg-black text-white hover:bg-zinc-900 border-black"
                      : isPast
                      ? "bg-emerald-50 text-emerald-950 font-semibold cursor-pointer hover:bg-emerald-100 border-emerald-900"
                      : "bg-white text-zinc-500 cursor-not-allowed border-zinc-250"
                  }`}
                >
                  <span className={`font-mono text-xs font-black shrink-0 w-5 h-5 flex items-center justify-center border ${
                    isActive ? "border-white bg-orange-500 text-black" : "border-black"
                  }`}>
                    0{s.num}
                  </span>
                  <div className="leading-tight">
                    <div className="text-[10px] uppercase font-black tracking-wide">{s.title}</div>
                    <div className={`text-[9px] ${isActive ? "text-zinc-305" : "text-zinc-500"}`}>{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 bg-zinc-950 text-white p-3.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] space-y-1.5 pointer-events-none">
            <h4 className="text-[10px] font-mono font-black text-orange-500 uppercase tracking-wide flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>DIASPORA SECURITY LOCK</span>
            </h4>
            <p className="text-[9px] leading-relaxed text-zinc-300 font-medium">
              Ecosystem metrics are completely sandboxed. Double checks verify compliance under Beirut monetary regimes.
            </p>
          </div>
        </aside>

        {/* Dynamic Onboarding form wizard page screen */}
        <section className="lg:col-span-3 p-4 sm:p-6 bg-white space-y-6" id="onboarding_wizard_mainframe">
          <div className="space-y-1.5 border-b-2 border-black pb-3">
            <span className="text-[9px] font-mono font-extrabold text-orange-600 bg-orange-50 border border-orange-500/25 px-2 py-0.5 rounded uppercase">
              Part {step} of 6 • Active Section
            </span>
            <h3 className="font-syne font-black text-xl uppercase tracking-tighter text-black mt-1">
              {step === 1 && "PART 1: FOUNDER & TEAM DOSSIER"}
              {step === 2 && "PART 2: PROJECT & IDEATION"}
              {step === 3 && "PART 3: ECONOMIC ALIGNMENT & MACRO-DEVELOPMENT"}
              {step === 4 && "PART 4: FINANCIALS, STRATEGY & THE ASK"}
              {step === 5 && "PART 5: RISK MITIGATION & EXIT STRATEGY"}
              {step === 6 && "PART 6: SUPPORTING DOCUMENTATION & TERMS"}
            </h3>
            <p className="text-xs text-gray-700 leading-normal font-sans font-medium">
              {step === 1 && "Submit founders bio, professional history and track records to establish execution credentials."}
              {step === 2 && "Detail your startup description, TAM metrics and expectation timeline for break-even scalability."}
              {step === 3 && "How does this venture generate foreign currency (fresh USD) or substitute heavy Lebanese import reliance?"}
              {step === 4 && "Present required USD capital inputs, custom percentage allocation, and target investment instrument."}
              {step === 5 && "Contingency systems mapping out operational resilience, solar backups and exit buyer groups."}
              {step === 6 && "Link to active documents and accept NCEI guidelines to confirm regulatory sandbox participation."}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* ================= STEP 1 FORM ================= */}
            {step === 1 && (
              <div className="space-y-4 font-sans text-xs">
                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    Full Legal Name(s) of Founder(s) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full names of all founders"
                    value={formData.founderNames}
                    onChange={(e) => handleFieldChange("founderNames", e.target.value)}
                    className="w-full bg-white border-2 border-black p-2.5 font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="founder_names"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    Detailed Biography *
                  </label>
                  <textarea
                    required
                    placeholder="Include educational background, professional history, and track record in relevant sector"
                    value={formData.founderBio}
                    onChange={(e) => handleFieldChange("founderBio", e.target.value)}
                    rows={4}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="founder_bio"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase block flex items-center gap-1.5">
                    <span>Core Team Expertise *</span>
                    <span className="text-[9px] bg-zinc-150 text-zinc-700 border border-zinc-400 px-1 font-mono uppercase lowercase">Expertise</span>
                  </label>
                  <textarea
                    required
                    placeholder="List key team members, roles, and why they're uniquely qualified"
                    value={formData.teamExpertise}
                    onChange={(e) => handleFieldChange("teamExpertise", e.target.value)}
                    rows={3}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="team_expertise"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    LinkedIn/Portfolio URLs
                  </label>
                  <input
                    type="text"
                    placeholder="Enter URLs separated by commas"
                    value={formData.linkedinUrls}
                    onChange={(e) => handleFieldChange("linkedinUrls", e.target.value)}
                    className="w-full bg-white border-2 border-black p-2.5 font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="linkedin_urls"
                  />
                </div>
              </div>
            )}

            {/* ================= STEP 2 FORM ================= */}
            {step === 2 && (
              <div className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-mono font-black text-black uppercase">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter project name"
                      value={formData.projectName}
                      onChange={(e) => handleFieldChange("projectName", e.target.value)}
                      className="w-full bg-white border-2 border-black p-2.5 font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                      id="project_name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono font-black text-black uppercase">
                      Stage of Development *
                    </label>
                    <select
                      value={formData.developmentStage}
                      onChange={(e) => handleFieldChange("developmentStage", e.target.value)}
                      className="w-full bg-white border-2 border-black p-2.5 font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none cursor-pointer"
                      id="development_stage"
                    >
                      <option value="Ideation">Ideation</option>
                      <option value="MVP Testing">MVP Testing</option>
                      <option value="Seed">Seed</option>
                      <option value="Series A">Series A</option>
                      <option value="Series B">Series B</option>
                      <option value="IPO">IPO</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase text-justify leading-dense">
                    Timeframe to Market / Scalability Metrics *
                  </label>
                  <textarea
                    required
                    placeholder="Expected timeline for MVP launch, break-even, market expansion"
                    value={formData.timeframeScalability}
                    onChange={(e) => handleFieldChange("timeframeScalability", e.target.value)}
                    rows={3}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="timeframe_scalability"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    Funding History *
                  </label>
                  <textarea
                    required
                    placeholder="List any previous funding (grants, angel rounds, personal investment, incubator backing)"
                    value={formData.fundingHistory}
                    onChange={(e) => handleFieldChange("fundingHistory", e.target.value)}
                    rows={2}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="funding_history"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    TAM / SOM Assessment *
                  </label>
                  <textarea
                    required
                    placeholder="Total Addressable Market and Serviceable Obtainable Market with data-backed assessment"
                    value={formData.tamSomAssessment}
                    onChange={(e) => handleFieldChange("tamSomAssessment", e.target.value)}
                    rows={3}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="tam_som_assessment"
                  ></textarea>
                </div>
              </div>
            )}

            {/* ================= STEP 3 FORM ================= */}
            {step === 3 && (
              <div className="space-y-4 font-sans text-xs">
                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    National Impact *
                  </label>
                  <textarea
                    required
                    placeholder="How does this project address structural gaps like import dependence or digital infrastructure?"
                    value={formData.nationalImpact}
                    onChange={(e) => handleFieldChange("nationalImpact", e.target.value)}
                    rows={3}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="national_impact"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    Export Potential & FX Generation (USD Cash flows) *
                  </label>
                  <textarea
                    required
                    placeholder="Does your solution generate foreign currency or reduce import reliance? Provide 3-year projection"
                    value={formData.exportPotentialPay}
                    onChange={(e) => handleFieldChange("exportPotentialPay", e.target.value)}
                    rows={3}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="export_potential_pay"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    Job Creation & Human Capital Density *
                  </label>
                  <textarea
                    required
                    placeholder="Number and quality of jobs created, targeting underrepresented groups"
                    value={formData.jobCreation}
                    onChange={(e) => handleFieldChange("jobCreation", e.target.value)}
                    rows={2}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="job_creation"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-mono font-black text-black uppercase">
                      SDG Integration *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Which UN Sustainable Development Goals are advanced?"
                      value={formData.sdgIntegration}
                      onChange={(e) => handleFieldChange("sdgIntegration", e.target.value)}
                      className="w-full bg-white border-2 border-black p-2.5 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                      id="sdg_integration"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono font-black text-black uppercase">
                      Resilience & Sustainability *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="How does your business model survive electricity shutoffs?"
                      value={formData.resilienceSustainability}
                      onChange={(e) => handleFieldChange("resilienceSustainability", e.target.value)}
                      className="w-full bg-white border-2 border-black p-2.5 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                      id="resilience_sustainability"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 4 FORM ================= */}
            {step === 4 && (
              <div className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1 md:col-span-2">
                    <label className="block font-mono font-black text-black uppercase">
                      Total Capital Required (USD Amount) *
                    </label>
                    <div className="flex bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                      <span className="bg-zinc-100 text-black border-r border-black font-mono font-black px-3.5 py-2">
                        $
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="Enter amount in USD (e.g. 150000)"
                        value={formData.totalCapitalRequired}
                        onChange={(e) => handleFieldChange("totalCapitalRequired", e.target.value)}
                        className="w-full outline-none px-2.5 py-2 font-black text-black"
                        id="total_capital_required"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono font-black text-black uppercase">
                      Investment Vehicle Requested *
                    </label>
                    <select
                      value={formData.investmentVehicle}
                      onChange={(e) => handleFieldChange("investmentVehicle", e.target.value)}
                      className="w-full bg-white border-2 border-black p-2.5 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none cursor-pointer uppercase"
                      id="investment_vehicle"
                    >
                      <option value="Equity">Equity</option>
                      <option value="Convertible Note">Convertible Note</option>
                      <option value="SAFE">SAFE (Recommended)</option>
                      <option value="Grant">Grant</option>
                      <option value="Debt">Sovereign Debt</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    Capital Allocation Strategy *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Breakdown percentage: e.g. Operational: 30% / R&D: 40% / Marketing: 20% / Hiring: 10%"
                    value={formData.capitalAllocation}
                    onChange={(e) => handleFieldChange("capitalAllocation", e.target.value)}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="capital_allocation"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    Non-Capital Services Required *
                  </label>
                  <textarea
                    required
                    placeholder="e.g., Regulatory Mentorship / Technical Partnership / International Distribution / Strategic Advisory"
                    value={formData.nonCapitalServices}
                    onChange={(e) => handleFieldChange("nonCapitalServices", e.target.value)}
                    rows={2}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="non_capital_services"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    Marketing & Customer Acquisition Plan *
                  </label>
                  <textarea
                    required
                    placeholder="How will you acquire users? Detail sales channels and key partnerships"
                    value={formData.marketingPlan}
                    onChange={(e) => handleFieldChange("marketingPlan", e.target.value)}
                    rows={3}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="marketing_plan"
                  ></textarea>
                </div>
              </div>
            )}

            {/* ================= STEP 5 FORM ================= */}
            {step === 5 && (
              <div className="space-y-4 font-sans text-xs">
                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    Operational Resilience Plan (Backups mapping) *
                  </label>
                  <textarea
                    required
                    placeholder="Contingency plans for infrastructure failure or supply chain disruptions"
                    value={formData.operationalResilience}
                    onChange={(e) => handleFieldChange("operationalResilience", e.target.value)}
                    rows={3}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="operational_resilience"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">
                    Financial Hedging & Buffers *
                  </label>
                  <textarea
                    required
                    placeholder="How do you manage cash flow risk and FX exposure in hyper-inflation structures?"
                    value={formData.financialHedging}
                    onChange={(e) => handleFieldChange("financialHedging", e.target.value)}
                    rows={3}
                    className="w-full bg-white border-2 border-black p-2.5 font-semibold text-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                    id="financial_hedging"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-mono font-black text-black uppercase">
                      Exit Objective *
                    </label>
                    <select
                      value={formData.exitObjective}
                      onChange={(e) => handleFieldChange("exitObjective", e.target.value)}
                      className="w-full bg-white border-2 border-black p-2.5 font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none cursor-pointer"
                      id="exit_objective"
                    >
                      <option value="acquisition">Regional Acquisition</option>
                      <option value="IPO">IPO / Nascent Exchange</option>
                      <option value="dividend">Dividend / Revenue Sharing Loop</option>
                      <option value="sustainable">Sustainable (No-Exit Organic Plan)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono font-black text-black uppercase">
                      Target Buyer Universe (Must list 3 categories) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. GCC Tech Conglomerates, Global SaaS enterprises..."
                      value={formData.targetBuyerUniverse}
                      onChange={(e) => handleFieldChange("targetBuyerUniverse", e.target.value)}
                      className="w-full bg-white border-2 border-black p-2.5 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                      id="target_buyer_universe"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= STEP 6 FORM ================= */}
            {step === 6 && (
              <div className="space-y-5 font-sans text-xs">
                <div className="space-y-1.5">
                  <label className="block font-mono font-black text-black uppercase">
                    Supporting Document Links
                  </label>
                  <p className="text-[10px] text-gray-500 font-mono">
                    Provide links (Google Drive/Dropbox) to: Pitch Deck (PDF), Financial Projections (3-Year), Feasibility/Technical Dossier, Governance/Registration Documents
                  </p>
                  <textarea
                    placeholder="Enter document links (one per line)"
                    value={formData.documentLinks}
                    onChange={(e) => handleFieldChange("documentLinks", e.target.value)}
                    rows={4}
                    className="w-full bg-white border-2 border-black p-2.5 font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none text-[11px]"
                    id="doc_links_textarea"
                  ></textarea>
                </div>

                {/* TERMS OF PARTICIPATION IN BANNER SHAPE */}
                <div className="bg-amber-50 border-2 border-black p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3 relative" id="sandbox_terms_box">
                  <h4 className="font-mono text-xs font-black text-amber-955 uppercase tracking-wide flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>TERMS OF PARTICIPATION IN NCEI PLATFORMS</span>
                  </h4>
                  <p className="text-[10px] font-sans font-semibold text-zinc-800 leading-normal text-justify">
                    By submitting this application, I authorize the National Center for Enterprise & Innovation (NCEI Lebanon) to review my loaded data profiles for "Institutional Readiness." I explicitly agree that my anonymized project metadata may be shared securely with international multi-lateral development partners (specifically UNDP, ESCWA, European Union) for ecosystem mapping indices. I confirm that all startup details and team descriptions provided match standard legal registrations and I agree to hold complete compliance with the NCEI Code of Conduct protocols.
                  </p>

                  <div className="flex items-start gap-2.5 pt-2 select-none">
                    <input
                      type="checkbox"
                      id="acceptedTermsCheckbox"
                      checked={formData.acceptedTerms}
                      onChange={(e) => handleFieldChange("acceptedTerms", e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-2 border-black focus:ring-0 shrink-0 mt-0.5 cursor-pointer"
                    />
                    <label
                      htmlFor="acceptedTermsCheckbox"
                      className="text-xs font-bold text-black uppercase tracking-tight cursor-pointer leading-tight"
                    >
                      I accept the terms of participation and Code of Conduct
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Panel Navigation Buttons */}
            <div className="border-t-2 border-black pt-5 flex items-center justify-between gap-4 select-none">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1 || saveLoading}
                className={`border-2 border-black text-xs font-black py-2 px-4 uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform ${
                  step === 1
                    ? "bg-zinc-100 text-zinc-400 border-zinc-300 shadow-none cursor-not-allowed"
                    : "bg-white text-black hover:bg-zinc-200 cursor-pointer"
                }`}
                id="wizard_back_btn"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Part</span>
              </button>

              {step < 6 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={saveLoading}
                  className="bg-black text-white hover:bg-zinc-900 border-2 border-black text-xs font-black py-2.5 px-5 uppercase flex items-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  id="wizard_next_btn"
                >
                  {saveLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Data...</span>
                    </>
                  ) : (
                    <>
                      <span>Next Onboarding Part</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={saveLoading || !formData.acceptedTerms}
                  className={`border-2 border-black text-xs font-extrabold py-2.5 px-6 uppercase flex items-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                    formData.acceptedTerms
                      ? "bg-orange-600 text-white hover:bg-orange-700 cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px]"
                      : "bg-zinc-200 text-zinc-400 border-zinc-300 shadow-none cursor-not-allowed"
                  }`}
                  id="wizard_submit_btn"
                >
                  {saveLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SAVING SUBMISSION...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Sandbox Application</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
