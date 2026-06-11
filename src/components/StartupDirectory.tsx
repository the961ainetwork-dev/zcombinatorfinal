import React, { useState } from "react";
import { Startup } from "../types";
import { Search, Plus, X, Globe, Landmark, Users, Calendar, Award, Building, DollarSign } from "lucide-react";

interface StartupDirectoryProps {
  startups: Startup[];
  onSubmitStartup: (startupData: Omit<Startup, "id" | "founded">) => Promise<void>;
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
}

export default function StartupDirectory({
  startups,
  onSubmitStartup,
  searchQuery: externalSearchQuery,
  setSearchQuery: setExternalSearchQuery,
}: StartupDirectoryProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : localSearchQuery;
  const setSearchQuery = setExternalSearchQuery !== undefined ? setExternalSearchQuery : setLocalSearchQuery;
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("Seed");
  const [city, setCity] = useState("Beirut");
  const [website, setWebsite] = useState("");
  const [funding, setFunding] = useState("");
  const [founder, setFounder] = useState("");
  const [teamSize, setTeamSize] = useState("3");
  const [logo, setLogo] = useState("🚀");
  const [formError, setFormError] = useState("");

  // Get unique lists for filters
  const industries = ["all", ...new Set(startups.map((s) => s.industry))];
  const stages = ["all", "Idea", "Pre-seed", "Seed", "Series A", "Series B", "IPO"];
  const cities = ["all", "Beirut", "Tripoli", "Zahle", "Byblos", "Sidon", "Remote"];

  // Filter
  const filteredStartups = startups.filter((startup) => {
    const matchSearch =
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.founder.toLowerCase().includes(searchQuery.toLowerCase());

    const matchIndustry = selectedIndustry === "all" || startup.industry === selectedIndustry;
    const matchStage = selectedStage === "all" || startup.stage === selectedStage;
    const matchCity = selectedCity === "all" || startup.city.toLowerCase() === selectedCity.toLowerCase();

    return matchSearch && matchIndustry && matchStage && matchCity;
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !tagline.trim() || !founder.trim()) {
      setFormError("Name, tagline, and founder name are required");
      return;
    }

    try {
      await onSubmitStartup({
        name,
        tagline,
        description: description || "Innovating key systems in Lebanon.",
        logo: logo || "🚀",
        industry: industry || "Technology",
        stage,
        city,
        website: website || "https://z961combinator.xyz",
        funding: funding || "Bootstrap",
        founder,
        teamSize: Number(teamSize) || 1,
      });

      // Clear Form
      setName("");
      setTagline("");
      setDescription("");
      setFounder("");
      setWebsite("");
      setFunding("");
      setTeamSize("3");
      setLogo("🚀");
      setFormError("");
      setShowAddModal(false);
    } catch (err: any) {
      setFormError(err.message || "Failed to submit startup info");
    }
  };

  return (
    <div className="space-y-6" id="startup_directory_container">
      {/* Search and Filters Segment */}
      <div className="bg-white p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-black text-xl uppercase tracking-tight text-black leading-none">
              Lebanese Startup Ecosystem Directory
            </h2>
            <p className="text-xs text-gray-500 mt-1.5 font-mono">
              Empowering global remote Builders and localized fresh cash generators (+961)
            </p>
          </div>
          <button
            id="register_startup_btn"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-black hover:bg-neutral-800 text-white border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-tight shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register Startup</span>
          </button>
        </div>

        {/* Input & dropdown grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-[#F6F6EF] border-2 border-black p-4">
          <div className="flex items-center gap-2 bg-white border-2 border-black px-2.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] col-span-1 sm:col-span-2 md:col-span-1">
            <Search className="w-4 h-4 text-black shrink-0" />
            <input
              id="search_startups_input"
              type="text"
              placeholder="Search by name, founder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-transparent outline-none w-full text-black placeholder-gray-500 font-mono uppercase"
            />
          </div>

          <div>
            <label className="block text-[9px] font-bold text-black uppercase font-mono tracking-wider mb-1">
              Filter by Industry
            </label>
            <select
              id="filter_industry_select"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full text-xs bg-white border-2 border-black px-2 py-1.5 font-mono font-bold text-black outline-none"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind === "all" ? "All Industries" : ind.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[9px] font-bold text-black uppercase font-mono tracking-wider mb-1">
              Filter by Stage
            </label>
            <select
              id="filter_stage_select"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full text-xs bg-white border-2 border-black px-2 py-1.5 font-mono font-bold text-black outline-none"
            >
              {stages.map((stg) => (
                <option key={stg} value={stg}>
                  {stg === "all" ? "ALL STAGES" : stg.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[9px] font-bold text-black uppercase font-mono tracking-wider mb-1">
              Filter by City
            </label>
            <select
              id="filter_city_select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full text-xs bg-white border-2 border-black px-2 py-1.5 font-mono font-bold text-black outline-none"
            >
              {cities.map((ct) => (
                <option key={ct} value={ct}>
                  {ct === "all" ? "ALL CITIES" : ct.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Startup Cards (Bento grid style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="startups_cards_grid">
        {filteredStartups.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-gray-550" id="empty_startups_prompt">
            <p className="font-black text-lg uppercase font-display text-black">No matching startups listed</p>
            <p className="text-xs mt-1 font-mono">Be the catalyst. Click "Register Startup" to pin your progress!</p>
          </div>
        ) : (
          filteredStartups.map((startup) => (
            <div
              key={startup.id}
              id={`startup_card_${startup.id}`}
              onClick={() => setSelectedStartup(startup)}
              className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all p-5 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                 {/* Card Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 bg-zinc-100 border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 transition-transform">
                      {startup.logo || "🚀"}
                    </span>
                    <div>
                      <h3 className="font-syne font-bold text-black text-base uppercase tracking-tight group-hover:text-zinc-650 transition">
                        {startup.name}
                      </h3>
                      <p className="text-[9px] text-gray-500 font-mono font-bold flex items-center gap-1 uppercase tracking-wider mt-0.5">
                        <Building className="w-3 h-3 text-black" />
                        <span>{startup.industry}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-black uppercase shrink-0 bg-zinc-100 text-black border border-black px-2 py-0.5">
                    {startup.stage}
                  </span>
                </div>

                <p className="text-xs text-black font-mono font-bold uppercase tracking-tight mb-2 line-clamp-1 leading-snug">
                  {startup.tagline}
                </p>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                  {startup.description}
                </p>
              </div>

              {/* Card Footer tags */}
              <div className="border-t-2 border-black pt-3 flex items-center justify-between text-[11px] text-black font-mono font-bold uppercase">
                <span className="bg-[#F6F6EF] border border-black px-1.5 py-0.5">
                  📍 {startup.city}
                </span>
                <span className="text-black bg-zinc-100 border border-black px-2 py-0.5">
                  💵 {startup.funding}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DETAIL DRAWER / MODAL */}
      {selectedStartup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="startup_drawer_overlay">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full overflow-hidden text-black rounded-none">
            {/* Header */}
            <div className="bg-zinc-100 p-5 border-b-2 border-black flex items-start justify-between gap-3">
              <div className="flex gap-4 items-center">
                <span className="w-14 h-14 bg-white border-2 border-black flex items-center justify-center text-3xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {selectedStartup.logo}
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-syne font-bold text-2xl uppercase tracking-tight text-black">
                      {selectedStartup.name}
                    </h3>
                    <span className="text-[10px] font-bold font-mono tracking-wider text-black bg-zinc-200 border border-black px-2.5 py-0.5 uppercase">
                      {selectedStartup.stage}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-700 font-bold uppercase tracking-tight">{selectedStartup.tagline}</p>
                </div>
              </div>
              <button
                id="close_startup_drawer_btn"
                onClick={() => setSelectedStartup(null)}
                className="text-black hover:text-zinc-600 p-1.5 border-2 border-black bg-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
              <div>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono mb-2">
                  Company Overview
                </h4>
                <p className="text-sm text-black leading-relaxed font-sans bg-[#F6F6EF] p-4 border-2 border-black">
                  {selectedStartup.description}
                </p>
              </div>

              {/* Grid Profile cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2.5">
                  <Award className="w-4.5 h-4.5 text-black shrink-0" />
                  <div>
                    <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-wider">Founder</span>
                    <span className="text-xs font-black text-black line-clamp-1">{selectedStartup.founder}</span>
                  </div>
                </div>

                <div className="bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2.5">
                  <Users className="w-4.5 h-4.5 text-black shrink-0" />
                  <div>
                    <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-wider">Team Size</span>
                    <span className="text-xs font-black text-black font-mono">{selectedStartup.teamSize} BUILDERS</span>
                  </div>
                </div>

                <div className="bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <Calendar className="w-4.5 h-4.5 text-black shrink-0" />
                  <div>
                    <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-wider">Founded</span>
                    <span className="text-xs font-black text-black font-mono">{selectedStartup.founded} (LB)</span>
                  </div>
                </div>

                <div className="bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2.5">
                  <Globe className="w-4.5 h-4.5 text-black shrink-0" />
                  <div>
                    <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-wider">Website</span>
                    <a
                      href={selectedStartup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-black text-black hover:underline flex items-center gap-0.5 truncate"
                    >
                      <span>Visit site</span>
                    </a>
                  </div>
                </div>

                <div className="bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2.5">
                  <Landmark className="w-4.5 h-4.5 text-black shrink-0" />
                  <div>
                    <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-wider">Headquarters</span>
                    <span className="text-xs font-black text-black">{selectedStartup.city.toUpperCase()}</span>
                  </div>
                </div>

                <div className="bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2.5">
                  <DollarSign className="w-4.5 h-4.5 text-black shrink-0" />
                  <div>
                    <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-wider">Capitalization</span>
                    <span className="text-xs font-black text-black">{selectedStartup.funding.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t-2 border-black flex justify-end gap-3">
              <button
                id="close_popup_details_btn"
                onClick={() => setSelectedStartup(null)}
                className="px-5 py-2 text-xs font-bold uppercase bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPACT REGISTER STARTUP MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="add_startup_modal_overlay">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden max-w-xl w-full rounded-none text-black">
            <div className="bg-zinc-100 p-4 border-b-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-black" />
                <h3 className="font-syne font-bold text-base text-black uppercase tracking-tight">
                  Register Startup in Directory
                </h3>
              </div>
              <button
                id="close_add_startup_modal"
                onClick={() => setShowAddModal(false)}
                className="text-black hover:text-zinc-650 p-1 border-2 border-black bg-white transition hover:translate-x-[0.5px] hover:translate-y-[0.5px] font-black cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 space-y-4" id="add_startup_form">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Startup Name *
                  </label>
                  <input
                    id="add_startup_name"
                    type="text"
                    required
                    placeholder="e.g. CedarPay"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    One-liner Tagline *
                  </label>
                  <input
                    id="add_startup_tagline"
                    type="text"
                    required
                    placeholder="e.g. Automated fresh payroll grids"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                  Full Description
                </label>
                <textarea
                  id="add_startup_desc"
                  rows={2}
                  placeholder="Detail your product operations, market focus, and localized solution context (e.g. solar alternative engines)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">
                    City HQ
                  </label>
                  <select
                    id="add_startup_city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono font-bold"
                  >
                    <option value="Beirut">BEIRUT</option>
                    <option value="Tripoli">TRIPOLI</option>
                    <option value="Zahle">ZAHLE</option>
                    <option value="Byblos">BYBLOS</option>
                    <option value="Sidon">SIDON</option>
                    <option value="Remote">REMOTE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Stage
                  </label>
                  <select
                    id="add_startup_stage"
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono font-bold"
                  >
                    <option value="Idea">Idea</option>
                    <option value="Pre-seed">Pre-seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B">Series B</option>
                    <option value="IPO">IPO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Industry
                  </label>
                  <input
                    id="add_startup_industry"
                    type="text"
                    placeholder="e.g. Fintech"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Emoji Logo
                  </label>
                  <input
                    id="add_startup_logo"
                    type="text"
                    required
                    placeholder="e.g. 💳, 🌾"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Founder Name(s) *
                  </label>
                  <input
                    id="add_startup_founder"
                    type="text"
                    required
                    placeholder="e.g. Fady Ghandour"
                    value={founder}
                    onChange={(e) => setFounder(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Team Size
                  </label>
                  <input
                    id="add_startup_team"
                    type="number"
                    min="1"
                    placeholder="3"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Funding raised
                  </label>
                  <input
                    id="add_startup_funding"
                    type="text"
                    placeholder="Bootstrap, $100k, etc."
                    value={funding}
                    onChange={(e) => setFunding(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                  Website URL
                </label>
                <input
                  id="add_startup_website"
                  type="url"
                  placeholder="https://cedarpay.xyz"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:ring-1 focus:ring-black"
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
                  id="cancel_startup_btn"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold uppercase bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="confirm_startup_btn"
                  className="px-5 py-2 text-xs font-black uppercase text-white bg-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
                >
                  Pin Startup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
