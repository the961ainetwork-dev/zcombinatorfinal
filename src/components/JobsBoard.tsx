import React, { useState } from "react";
import { Job } from "../types";
import { Search, Plus, X, MapPin, Calendar, Clock, DollarSign, ChevronRight, Sparkles, Loader2, Copy, Check } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

interface JobsBoardProps {
  jobs: Job[];
  onSubmitJob: (jobData: Omit<Job, "id" | "timestamp">) => Promise<void>;
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
}

export default function JobsBoard({
  jobs,
  onSubmitJob,
  searchQuery: externalSearchQuery,
  setSearchQuery: setExternalSearchQuery,
}: JobsBoardProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : localSearchQuery;
  const setSearchQuery = setExternalSearchQuery !== undefined ? setExternalSearchQuery : setLocalSearchQuery;
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("Beirut");
  const [type, setType] = useState("Full-time");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState("💼");
  const [formError, setFormError] = useState("");

  // AI Generator Form State
  const [applicantName, setApplicantName] = useState("");
  const [skillsSummary, setSkillsSummary] = useState("");
  const [experienceSummary, setExperienceSummary] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Filter lists
  const jobTypes = ["all", "Full-time", "Part-time", "Contract", "Remote", "Internship"];
  const locations = ["all", "Beirut", "Tripoli", "Byblos", "Remote"];

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchType = selectedType === "all" || job.type === selectedType;
    const matchLoc =
      selectedLocation === "all" || job.location.toLowerCase() === selectedLocation.toLowerCase();

    return matchSearch && matchType && matchLoc;
  });

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim() || !salary.trim() || !description.trim()) {
      setFormError("Job title, organization name, salary index, and specifications are required");
      return;
    }

    const skillsArray = skillInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    try {
      await onSubmitJob({
        title,
        company,
        location,
        type,
        salary,
        description,
        skills: skillsArray.length > 0 ? skillsArray : ["React", "TypeScript", "Node"],
        logo: logo || "💼",
      });

      // Clear
      setTitle("");
      setCompany("");
      setSalary("");
      setDescription("");
      setSkillInput("");
      setLogo("💼");
      setWebsite("");
      setFormError("");
      setShowAddJobModal(false);
    } catch (err: any) {
      setFormError(err.message || "Failed to publish job vacancy");
    }
  };

  const handleGenerateAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    if (!applicantName.trim()) {
      setAiError("Applicant name is required for reference compilation");
      return;
    }

    setIsGenerating(true);
    setAiError("");
    setGeneratedLetter("");

    try {
      // Lazy, safe environment load
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
      let textResponse = "";

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const targetSkills = skillsSummary || selectedJob.skills.join(", ");
        const targetExp = experienceSummary || "highly resilient mid-level developer";

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Create a professional, modern, high-fashion tech-ecosystem cover letter for ${applicantName} applying for the "${selectedJob.title}" role at ${selectedJob.company} in Lebanon (${selectedJob.location}). Keep it punchy, neo-brutalist and logical.
Applicant Skills: ${targetSkills}.
Applicant Experience Context: ${targetExp}.
Highlight the resilience factor and offshore dollar generation efficiency (+961). Max 250 words. Do not use generic placeholders.`,
        });
        textResponse = response.text || "";
      } else {
        // High quality local fallback structured content matching editorial context
        textResponse = `Dear Hiring Team at ${selectedJob.company},

This is a premium-draft cover letter compiled via the 961 Combinator local fallback engine.

I am writing to express my high interest in the '${selectedJob.title}' vacancy. As a Lebanese builder operating within the +961 resilience index, I optimize for high execution efficiency, antifragile problem-solving, and clean, modular engineering architecture.

My technical repertoire aligns directly with your specified core skills. I offer proven experience navigating difficult environment dynamics to deliver production-grade products, enabling high productivity output.

I look forward to contributing direct leverage to your product sprints.

Sincerely,
${applicantName}
Location: Lebanon (+961)`;
      }

      setGeneratedLetter(textResponse);
    } catch (err: any) {
      setAiError("Compilation error: " + (err.message || "Endpoint connection failed. Fallback triggered."));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-black font-sans" id="jobs_board_container">
      {/* Side list of vacancy items */}
      <div className={`${selectedJob ? "lg:col-span-6" : "lg:col-span-12"} flex flex-col gap-4`} id="jobs_list_section">
        {/* Search layout banner */}
        <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 max-w-full sm:max-w-xs flex-1 bg-white border-2 border-black px-2.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Search className="w-4 h-4 text-black shrink-0" />
            <input
              id="search_jobs_input"
              type="text"
              placeholder="Search by role, company, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-transparent outline-none w-full text-black placeholder-gray-500 font-mono uppercase"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-black hover:text-zinc-650 cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            id="post_job_board_btn"
            onClick={() => setShowAddJobModal(true)}
            className="flex items-center gap-1.5 bg-black text-white border-2 border-black font-black uppercase text-xs px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] cursor-pointer hover:shadow-none transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Post Startup Job</span>
          </button>
        </div>

        {/* Jobs List Grid */}
        <div className="space-y-3.5" id="jobs_list_grid">
          {filteredJobs.length === 0 ? (
            <div className="bg-white border-2 border-black p-12 text-center text-gray-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" id="empty_jobs_prompt">
              <p className="font-extrabold text-lg uppercase font-syne text-black">No job listings found</p>
              <p className="text-xs mt-1 font-mono">Check back later or register a startup vacancy yourself!</p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isSelected = selectedJob?.id === job.id;
              return (
                <div
                  key={job.id}
                  id={`job_row_${job.id}`}
                  onClick={() => {
                    setSelectedJob(job);
                    setGeneratedLetter("");
                  }}
                  className={`bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] transition-all p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected ? "bg-zinc-100" : ""
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-2xl shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                      {job.logo || "💼"}
                    </span>
                    <div>
                      <h3 className="font-syne font-bold text-black leading-tight uppercase tracking-tight text-base hover:text-zinc-650">
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-700 font-mono font-bold uppercase tracking-wide mt-0.5">{job.company}</p>

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 font-mono mt-1 w-full">
                        <span className="flex items-center gap-0.5 font-bold text-black bg-zinc-100 border border-black px-1.5 py-0.2">
                          <MapPin className="w-3 h-3 text-black" />
                          <span>{job.location.toUpperCase()}</span>
                        </span>
                        <span className="text-black font-extrabold tracking-tight bg-zinc-100 border border-zinc-400 px-1 py-0.2 uppercase text-[10px]">{job.salary.toUpperCase()}</span>
                        <span>•</span>
                        <span>{job.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-2 border-t-2 sm:border-t-0 border-black pt-3 sm:pt-0 shrink-0">
                    <span className="text-[10px] font-mono font-black uppercase border border-black px-2 py-0.5 text-black bg-white">
                      {job.type}
                    </span>
                    <ChevronRight className="hidden sm:block w-4 h-4 text-black stroke-[3]" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT SIDE DETAILS AND TRANSCRIPTION letter builder */}
      {selectedJob && (
        <div className="col-span-12 lg:col-span-6 animate-fade-in" id="job_details_panel">
          <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col text-black rounded-none">
            {/* Header */}
            <div className="bg-zinc-100 p-4 border-b-2 border-black flex items-start justify-between">
              <div className="flex gap-3 items-center">
                <span className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-2xl shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] shrink-0">
                  {selectedJob.logo}
                </span>
                <div>
                  <h3 className="font-syne font-bold text-black leading-tight uppercase tracking-tight text-base">{selectedJob.title}</h3>
                  <p className="text-xs text-gray-650 font-mono font-bold uppercase tracking-tight">{selectedJob.company} • {selectedJob.location.toUpperCase()}</p>
                </div>
              </div>
              <button
                id="close_job_details"
                onClick={() => setSelectedJob(null)}
                className="text-black hover:text-zinc-600 p-1.5 border-2 border-black bg-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-5 overflow-y-auto max-h-[75vh]">
              {/* Description */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase font-mono tracking-wider mb-2">Job Description</h4>
                <p className="text-xs text-black leading-relaxed bg-zinc-50 p-3.5 border-2 border-black whitespace-pre-line select-text">
                  {selectedJob.description}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase font-mono tracking-wider mb-2">Required Core Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((sk) => (
                    <span key={sk} className="text-xs bg-white text-black border border-black font-mono font-bold px-2.5 py-0.5 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                      {sk.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI PITCH LETTER GENERATION */}
              <div className="border-t-2 border-dashed border-black pt-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-zinc-100 text-black border-2 border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                    <Sparkles className="w-4 h-4 fill-black" />
                  </span>
                  <div>
                    <h4 className="font-syne font-bold text-sm text-black uppercase tracking-tight">AI Instant Pitch Builder</h4>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-tight">Custom-tailored cover letter based on local Lebanese economics resilient factor</p>
                  </div>
                </div>

                {!generatedLetter ? (
                  <form onSubmit={handleGenerateAI} className="space-y-3 bg-zinc-100 p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" id="ai_letter_form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-black uppercase tracking-wider mb-1">Applicant Name *</label>
                        <input
                          id="ai_applicant_name"
                          type="text"
                          required
                          placeholder="e.g. Charbel El-Khoury"
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-sans focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-black uppercase tracking-wider mb-1">Your Core Skills</label>
                        <input
                          id="ai_applicant_skills"
                          type="text"
                          placeholder="e.g. React, Node (Leave empty to use job values)"
                          value={skillsSummary}
                          onChange={(e) => setSkillsSummary(e.target.value)}
                          className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-sans focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-black uppercase tracking-wider mb-1">Experience summary</label>
                      <textarea
                        id="ai_applicant_exp"
                        rows={2}
                        placeholder="e.g. 4 years of background, built solar IoT networks and scaled e-commerce dispatch routines in Beirut."
                        value={experienceSummary}
                        onChange={(e) => setExperienceSummary(e.target.value)}
                        className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    {aiError && (
                      <p className="text-xs text-rose-600 font-mono bg-rose-50 p-2 border-2 border-rose-500">
                        {aiError}
                      </p>
                    )}

                    <button
                      id="ai_generate_letter_btn"
                      type="submit"
                      disabled={isGenerating}
                      className="w-full bg-black text-white hover:bg-zinc-800 border-2 border-black font-black uppercase text-xs py-2 px-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                          <span>Generating Draft...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-white fill-white animate-pulse" />
                          <span>Build customized cover letter</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3 bg-zinc-50 border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" id="ai_letter_response_pane">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-[10px] font-bold uppercase text-black bg-zinc-250 border border-black px-2.5 py-0.5">
                        AI Draft Completed
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          id="copy_ai_letter_btn"
                          onClick={handleCopyText}
                          className="flex items-center gap-1 text-[11px] font-mono text-black font-bold uppercase tracking-tight bg-white border-2 border-black px-2 py-1 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-none transition-all cursor-pointer"
                        >
                          {copySuccess ? (
                            <>
                              <Check className="w-3 h-3 text-black animate-pulse" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-black" />
                              <span>Copy Pitch</span>
                            </>
                          )}
                        </button>
                        <button
                          id="regenerate_ai_letter_btn"
                          onClick={() => setGeneratedLetter("")}
                          className="text-[11px] text-black hover:text-zinc-600 font-extrabold underline font-mono uppercase cursor-pointer"
                        >
                          Retry
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-4 border border-black leading-relaxed text-xs text-black whitespace-pre-wrap font-sans max-h-[300px] overflow-y-auto select-all uppercase">
                      {generatedLetter}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPACT POST JOB BOARD MODAL */}
      {showAddJobModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="add_job_modal_overlay">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden max-w-xl w-full rounded-none text-black">
            <div className="bg-zinc-100 p-4 border-b-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-black" />
                <h3 className="font-syne font-bold text-base text-black uppercase tracking-tight">
                  Post Active Startup Vacancy
                </h3>
              </div>
              <button
                id="close_add_job_modal"
                onClick={() => setShowAddJobModal(false)}
                className="text-black hover:text-zinc-650 p-1 border-2 border-black bg-white transition hover:translate-x-[0.5px] hover:translate-y-[0.5px] font-black cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="p-5 space-y-4" id="add_job_form">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Job Title *
                  </label>
                  <input
                    id="add_job_title"
                    type="text"
                    required
                    placeholder="e.g. Senior Frontend Architect"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Company Name *
                  </label>
                  <input
                    id="add_job_company"
                    type="text"
                    required
                    placeholder="e.g. CedarPay Financial"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Work Location
                  </label>
                  <select
                    id="add_job_location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono"
                  >
                    <option value="Beirut">Beirut</option>
                    <option value="Tripoli">Tripoli</option>
                    <option value="Byblos">Byblos</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Job Type
                  </label>
                  <select
                    id="add_job_type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono w-full"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote (LB)</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Salary Index *
                  </label>
                  <input
                    id="add_job_salary"
                    type="text"
                    required
                    placeholder="e.g. $3,200/mo fresh"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                  Vacancy Specifications *
                </label>
                <textarea
                  id="add_job_desc"
                  rows={4}
                  required
                  placeholder="Elaborate on objectives, shift patterns and delivery milestones..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    External Site URL
                  </label>
                  <input
                    id="add_job_website"
                    type="url"
                    placeholder="https://company.com/apply"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Display Banner Logo
                  </label>
                  <input
                    id="add_job_logo"
                    type="text"
                    placeholder="e.g. 💻, 🧠, ⚡"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    className="w-full text-xs bg-zinc-100 border-2 border-black p-2 outline-none text-black font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                  Core Skills (comma separated)
                </label>
                <input
                  id="add_job_skills"
                  type="text"
                  placeholder="React, TypeScript, Laravel, PostgreSQL"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] focus:ring-1 focus:ring-black"
                />
              </div>

              {formError && (
                <p className="text-xs text-rose-600 font-mono bg-rose-50 p-2 border-2 border-rose-500">
                  {formError}
                </p>
              )}

              <div className="pt-2 border-t-2 border-black flex items-center justify-end gap-3">
                <button
                  type="button"
                  id="cancel_job_btn"
                  onClick={() => setShowAddJobModal(false)}
                  className="px-4 py-2 text-xs font-bold uppercase bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="confirm_post_job"
                  className="px-5 py-2 text-xs font-black uppercase text-white bg-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
                >
                  Publish Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
