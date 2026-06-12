import React, { useState, useEffect } from "react";
import { Lock, Search, Trash2, Edit, AlertCircle, CheckCircle, RefreshCw, Layers, Sliders, Newspaper, BookOpen, Plus, Loader2, ExternalLink, Landmark } from "lucide-react";

interface AdminPanelProps {
  stories: any[];
  setStories: React.Dispatch<React.SetStateAction<any[]>>;
  onReloadData: () => void;
}

export default function AdminPanel({ stories, setStories, onReloadData }: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Tab states
  const [activeTab, setActiveTab] = useState<"registrations" | "institutionals" | "stories">("registrations");
  
  // Data State
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [regLoading, setRegLoading] = useState(false);
  const [searchReg, setSearchReg] = useState("");
  const [searchStory, setSearchStory] = useState("");

  const [institutionals, setInstitutionals] = useState<any[]>([]);
  const [instLoading, setInstLoading] = useState(false);
  const [searchInst, setSearchInst] = useState("");
  const [editingInst, setEditingInst] = useState<any | null>(null);
  
  // Edit modal states - Registrations
  const [editingReg, setEditingReg] = useState<any | null>(null);
  
  // Edit modal states - Stories
  const [editingStory, setEditingStory] = useState<any | null>(null);
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [newStory, setNewStory] = useState({
    title: "",
    url: "",
    text: "",
    author: "Z961 Admin Desk",
    category: "tech",
  });

  // Verify cached password
  useEffect(() => {
    const saved = localStorage.getItem("961_admin_auth_token");
    if (saved === "Maan70939779") {
      setIsAuthenticated(true);
      fetchRegistrations();
      fetchInstitutionals();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (password === "Maan70939779") {
      setIsAuthenticated(true);
      localStorage.setItem("961_admin_auth_token", "Maan70939779");
      fetchRegistrations();
      fetchInstitutionals();
    } else {
      setErrorMsg("Incorrect admin password key. Access is restricted.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("961_admin_auth_token");
  };

  const fetchRegistrations = async () => {
    setRegLoading(true);
    try {
      const res = await fetch("/api/admin/registrations", {
        headers: {
          "x-admin-password": "Maan70939779"
        }
      });
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
      } else {
        console.error("Failed to load registrations due to authorization.");
      }
    } catch (e) {
      console.error("Registrations fetch failed:", e);
    } finally {
      setRegLoading(false);
    }
  };

  const fetchInstitutionals = async () => {
    setInstLoading(true);
    try {
      const res = await fetch("/api/admin/institutionals", {
        headers: {
          "x-admin-password": "Maan70939779"
        }
      });
      if (res.ok) {
        const data = await res.json();
        setInstitutionals(data);
      }
    } catch (e) {
      console.error("Institutional partners fetch failed:", e);
    } finally {
      setInstLoading(false);
    }
  };

  const handleSaveInst = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInst) return;
    try {
      const res = await fetch(`/api/admin/institutionals/${editingInst.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": "Maan70939779"
        },
        body: JSON.stringify(editingInst)
      });
      if (res.ok) {
        const updated = await res.json();
        setInstitutionals(prev => prev.map(i => i.id === updated.id ? updated : i));
        setEditingInst(null);
        alert("Institutional partner profile updated successfully.");
      }
    } catch (err) {
      alert("Error saving updates.");
    }
  };

  const handleDeleteInst = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the institutional engagement profile for "${name}"? This is irreversible.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/institutionals/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": "Maan70939779"
        }
      });
      if (res.ok) {
        setInstitutionals(prev => prev.filter(i => i.id !== id));
      }
    } catch (err) {
      alert("Failed to delete profile.");
    }
  };

  // --- SAVE / EDIT REGISTRATION ---
  const handleSaveReg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReg) return;
    
    try {
      const res = await fetch(`/api/admin/registrations/${editingReg.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": "Maan70939779"
        },
        body: JSON.stringify(editingReg)
      });
      
      if (res.ok) {
        const updated = await res.json();
        setRegistrations(prev => prev.map(r => r.id === updated.id ? updated : r));
        setEditingReg(null);
        alert("Registration dossier updated successfully.");
      }
    } catch (err) {
      alert("Error updating registration dossier.");
    }
  };

  // --- DELETE REGISTRATION ---
  const handleDeleteReg = async (id: string, projectName: string) => {
    if (!window.confirm(`Are you sure you want to delete the registration for project "${projectName || "General"}"? This is irreversible.`)) {
      return;
    }
    
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": "Maan70939779"
        }
      });
      
      if (res.ok) {
        setRegistrations(prev => prev.filter(r => r.id !== id));
      }
    } catch (err) {
      alert("Failed to delete registration profile.");
    }
  };

  // --- CREATE STORY ---
  const handleAddStory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStory)
      });

      if (res.ok) {
        const added = await res.json();
        setStories(prev => [added, ...prev]);
        setIsAddingStory(false);
        setNewStory({
          title: "",
          url: "",
          text: "",
          author: "Z961 Admin Desk",
          category: "tech",
        });
        alert("Site news ecosystem story published successfuly.");
      }
    } catch (err) {
      alert("Failed to publish story.");
    }
  };

  // --- EDIT STORY ---
  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory) return;

    try {
      const res = await fetch(`/api/admin/stories/${editingStory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": "Maan70939779"
        },
        body: JSON.stringify(editingStory)
      });

      if (res.ok) {
        const updated = await res.json();
        setStories(prev => prev.map(s => s.id === updated.id ? updated : s));
        setEditingStory(null);
        alert("Ecosystem story modified successfully.");
      }
    } catch (err) {
      alert("Error editing story entry.");
    }
  };

  // --- DELETE STORY ---
  const handleDeleteStory = async (id: string, title: string) => {
    if (!window.confirm(`Delete ecosystem story: "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/stories/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": "Maan70939779"
        }
      });

      if (res.ok) {
        setStories(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      alert("Failed to delete story.");
    }
  };

  // Searching filter matching
  const filteredRegs = registrations.filter(r => {
    const term = searchReg.toLowerCase();
    return (
      (r.projectName && r.projectName.toLowerCase().includes(term)) ||
      (r.username && r.username.toLowerCase().includes(term)) ||
      (r.email && r.email.toLowerCase().includes(term)) ||
      (r.developmentStage && r.developmentStage.toLowerCase().includes(term))
    );
  });

  const filteredStories = stories.filter(s => {
    const term = searchStory.toLowerCase();
    return (
      (s.title && s.title.toLowerCase().includes(term)) ||
      (s.author && s.author.toLowerCase().includes(term)) ||
      (s.category && s.category.toLowerCase().includes(term))
    );
  });

  const filteredInsts = institutionals.filter(i => {
    const term = searchInst.toLowerCase();
    return (
      (i.contactName && i.contactName.toLowerCase().includes(term)) ||
      (i.contactEmail && i.contactEmail.toLowerCase().includes(term)) ||
      (i.organizationName && i.organizationName.toLowerCase().includes(term)) ||
      (i.identity && i.identity.toLowerCase().includes(term)) ||
      (i.operationalFocus && i.operationalFocus.toLowerCase().includes(term))
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative" id="admin_login_box">
        <div className="absolute top-0 right-0 bg-[#FF0000] text-white text-[9px] font-mono uppercase px-2.5 py-0.5 tracking-wider border-b border-l border-black">
          LOCKED
        </div>
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-6 h-6 text-black" fill="currentColor" />
          <h2 className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tight text-black">
            ADMIN CONSOLE GATEWAY
          </h2>
        </div>

        <p className="text-xs font-semibold text-gray-700 leading-normal font-sans mb-6 uppercase">
          Enter the secure executive developer authorization password to manage sandbox files, adjust startup dossiers, and edit system story logs.
        </p>

        {errorMsg && (
          <div className="mb-4 bg-red-50 border-2 border-red-650 text-red-950 p-3 text-xs font-mono font-black uppercase tracking-wide flex gap-2 items-center">
            <AlertCircle className="w-4 h-4 text-red-650 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-black text-black uppercase">
              Admin Password Key
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-black p-2.5 font-sans shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm focus:outline-none"
              id="admin_passwd_field"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-zinc-904 border-2 border-black text-xs font-black uppercase py-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.35)] transition-all cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px]"
            id="admin_signin_submit"
          >
            Authenticate Developer credentials
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-black font-sans my-4" id="admin_control_frame">
      {/* Top Banner Control Panel */}
      <div className="bg-[#121212] text-white p-4 sm:p-5 border-b-2 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-yellow-500 text-black text-[9px] font-mono font-black uppercase px-2 py-0.5 border border-black">
              SUPERADMIN PRIVILEGES
            </span>
            <span className="text-zinc-400 font-mono text-xs">Maan70939779 ACCOUNT ACTIVE</span>
          </div>
          <h2 className="font-syne font-black text-lg sm:text-xl uppercase tracking-tight text-white mt-1">
            EXECUTIVE CONTROL CENTER PANEL
          </h2>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-black hover:bg-zinc-200 text-[10px] font-mono font-black uppercase px-3 py-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
        >
          Deauthorize Session
        </button>
      </div>

      {/* Mode selectors */}
      <div className="flex border-b-2 border-black bg-zinc-50 select-none">
        <button
          onClick={() => {
            setActiveTab("registrations");
            fetchRegistrations();
          }}
          className={`flex-1 py-3 px-4 font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border-r-2 border-black ${
            activeTab === "registrations" ? "bg-black text-white" : "bg-zinc-50 text-zinc-650 hover:bg-zinc-150"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>STARTUP REGISTRATIONS ({registrations.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("institutionals");
            fetchInstitutionals();
          }}
          className={`flex-1 py-3 px-4 font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border-r-2 border-black ${
            activeTab === "institutionals" ? "bg-black text-white" : "bg-zinc-50 text-zinc-650 hover:bg-zinc-150"
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>PARTNERS DESK ({institutionals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("stories")}
          className={`flex-1 py-3 px-4 font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "stories" ? "bg-black text-white" : "bg-zinc-50 text-zinc-650 hover:bg-zinc-150"
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>ECOSYSTEM SITE STORIES ({stories.length})</span>
        </button>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* ========================================= REGISTRATIONS TAB ========================================= */}
        {activeTab === "registrations" && (
          <div className="space-y-4" id="registrations_tab_section">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h3 className="font-syne font-black text-lg uppercase tracking-tight">VETTING REGISTRATIONS DESK</h3>
                <p className="text-xs text-gray-500 font-mono uppercase">Inspect complete multi-part NCEI sandbox application files</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchRegistrations}
                  className="bg-white hover:bg-zinc-100 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                  title="Reload Registrations from Server"
                >
                  <RefreshCw className={`w-4 h-4 ${regLoading ? "animate-spin" : ""}`} />
                </button>
                <div className="flex items-center bg-white border-2 border-black px-2.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] max-w-xs font-mono">
                  <Search className="w-4 h-4 text-zinc-500 mr-2" />
                  <input
                    type="text"
                    placeholder="SEARCH DOSSIERS..."
                    value={searchReg}
                    onChange={(e) => setSearchReg(e.target.value)}
                    className="text-[10px] bg-transparent outline-none uppercase font-black placeholder-zinc-400"
                  />
                </div>
              </div>
            </div>

            {regLoading ? (
              <div className="bg-zinc-50 border-2 border-black p-12 text-center text-xs font-mono font-bold" id="reg_spinner_block">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-zinc-650" />
                <span>FETCHING VERIFIABLE SIGNUPS FROM ECO PIPELINE DATA...</span>
              </div>
            ) : filteredRegs.length === 0 ? (
              <div className="bg-zinc-100 border-2 border-zinc-300 p-8 text-center text-gray-500 font-mono text-xs font-bold uppercase rounded">
                No active signup registrations matched your filters or search terms.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4" id="registrations_grid_panel">
                {filteredRegs.map((reg) => (
                  <div
                    key={reg.id}
                    className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative hover:bg-zinc-50/50 transition-colors"
                  >
                    {/* Upper Metadata Flag tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded border border-black ${
                        reg.completed ? "bg-emerald-500 text-white" : "bg-amber-100 text-amber-950"
                      }`}>
                        {reg.completed ? "Application Submitted" : "In Progress (Step " + reg.step + ")"}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 font-bold uppercase">
                        NODE ID: {reg.userId}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 font-bold uppercase ml-auto">
                        UPDATED: {new Date(reg.updatedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-3 border-b-2 border-zinc-200">
                      <div className="col-span-1 md:col-span-2">
                        <h4 className="font-syne font-black text-md sm:text-lg uppercase text-black leading-dense">
                          {reg.projectName || "UNTITLED PROJECT"}
                        </h4>
                        <p className="text-xs font-bold text-gray-700 uppercase mt-0.5">
                          {reg.username} • {reg.email}
                        </p>
                      </div>

                      <div className="text-[11px] font-mono leading-relaxed bg-zinc-50 p-2 border border-zinc-300">
                        <div>STAGE: <strong className="uppercase">{reg.developmentStage || "None"}</strong></div>
                        <div>CAPITAL REQUEST: <strong>${Number(reg.totalCapitalRequired || 0).toLocaleString()} USD</strong></div>
                      </div>

                      <div className="flex items-center justify-end gap-2 shrink-0 col-span-1">
                        <button
                          onClick={() => setEditingReg(reg)}
                          className="bg-zinc-200 hover:bg-black hover:text-white border-2 border-black px-3 py-1.5 text-xs font-black uppercase tracking-tight flex items-center gap-1 cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Dossier File</span>
                        </button>
                        <button
                          onClick={() => handleDeleteReg(reg.id, reg.projectName)}
                          className="bg-red-50 hover:bg-red-650 hover:text-white border-2 border-black p-1.5 text-xs font-black cursor-pointer text-red-750 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          title="Delete Dossier"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Previews of main descriptive blocks */}
                    <div className="mt-3 text-xs grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="font-mono text-[9px] text-zinc-550 font-black uppercase">PART 1: TEAM BIO</div>
                        <p className="font-semibold text-gray-800 line-clamp-2 uppercase leading-snug mt-1">
                          {reg.founderBio || "No Bio Provided."}
                        </p>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] text-zinc-550 font-black uppercase">PART 2: SCALABILITY & TIMEFRAME</div>
                        <p className="font-semibold text-gray-800 line-clamp-2 mt-1">
                          {reg.timeframeScalability || "No timeframe specified."}
                        </p>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] text-zinc-550 font-black uppercase font-bold">PART 3: NATIONAL ECONOMIC IMPACT</div>
                        <p className="font-semibold text-red-950 bg-red-50/15 p-1 border border-dashed border-zinc-200 line-clamp-2 uppercase mt-1 leading-snug">
                          {reg.nationalImpact || "No national economic impact analysis."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================= INSTITUTIONAL ENGAGEMENTS TAB ========================================= */}
        {activeTab === "institutionals" && (
          <div className="space-y-4" id="institutionals_tab_section">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h3 className="font-syne font-black text-lg uppercase tracking-tight">PARTNERS DESK ENGAGEMENTS</h3>
                <p className="text-xs text-gray-500 font-mono uppercase">Inspect submitted mandates and matchmaking preferences of global partners</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchInstitutionals}
                  className="bg-white hover:bg-zinc-100 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                  title="Reload Partners from Server"
                >
                  <RefreshCw className={`w-4 h-4 ${instLoading ? "animate-spin" : ""}`} />
                </button>
                <div className="flex items-center bg-white border-2 border-black px-2.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] max-w-xs font-mono">
                  <Search className="w-4 h-4 text-zinc-500 mr-2" />
                  <input
                    type="text"
                    placeholder="SEARCH PARTNERS..."
                    value={searchInst}
                    onChange={(e) => setSearchInst(e.target.value)}
                    className="text-[10px] bg-transparent outline-none uppercase font-black placeholder-zinc-400"
                  />
                </div>
              </div>
            </div>

            {instLoading ? (
              <div className="bg-zinc-50 border-2 border-black p-12 text-center text-xs font-mono font-bold">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-zinc-650" />
                <span>FETCHING PARTNER MANDATES FROM ECO PIPELINE...</span>
              </div>
            ) : filteredInsts.length === 0 ? (
              <div className="bg-zinc-100 border-2 border-zinc-300 p-8 text-center text-gray-500 font-mono text-xs font-bold uppercase rounded">
                No active institutional engagements matched your search terms.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4" id="institutionals_grid_panel">
                {filteredInsts.map((inst) => (
                  <div
                    key={inst.id}
                    className="bg-amber-50/10 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative hover:bg-amber-50/25 transition-colors"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-amber-500 text-black text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded border border-black">
                        {inst.identity}
                      </span>
                      <span className="text-[11px] font-mono text-gray-500 font-bold uppercase">
                        PARTNER ID: {inst.id}
                      </span>
                      <span className="text-[11px] font-mono text-gray-500 font-bold uppercase ml-auto">
                        CREATED: {inst.createdAt ? new Date(inst.createdAt).toLocaleDateString() : "N/A"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-3 border-b-2 border-zinc-200">
                      <div className="col-span-1 md:col-span-2">
                        <h4 className="font-syne font-black text-md sm:text-lg uppercase text-black leading-dense">
                          {inst.organizationName || "INDEPENDENT PARTNER"}
                        </h4>
                        <p className="text-xs font-bold text-gray-700 uppercase mt-0.5">
                          {inst.contactName} • {inst.contactEmail}
                        </p>
                      </div>

                      <div className="text-[11px] font-mono leading-relaxed bg-zinc-50 p-2 border border-zinc-300">
                        <div>TICKET SIZE: <strong className="uppercase">{inst.ticketSize || "N/A"}</strong></div>
                        <div>RISK LEVEL: <strong>{inst.riskAppetite}/5</strong></div>
                        <div>REGION: <strong className="uppercase">{inst.operationalFocus || "GLOBAL"}</strong></div>
                      </div>

                      <div className="flex items-center justify-end gap-2 shrink-0 col-span-1">
                        <button
                          onClick={() => setEditingInst(inst)}
                          className="bg-amber-100 hover:bg-black hover:text-white border-2 border-black px-3 py-1.5 text-xs font-black uppercase tracking-tight flex items-center gap-1 cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-amber-950"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit Mandate</span>
                        </button>
                        <button
                          onClick={() => handleDeleteInst(inst.id, inst.contactName)}
                          className="bg-red-50 hover:bg-red-650 hover:text-white border-2 border-black p-1.5 text-xs font-black cursor-pointer text-red-750 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          title="Delete Mandate"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 text-xs grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="font-mono text-[9px] text-zinc-550 font-black uppercase">PARTNERSHIP MANDATE OBJECTIVES</div>
                        <p className="font-semibold text-gray-800 line-clamp-2 uppercase leading-snug mt-1">
                          {Array.isArray(inst.objectives) && inst.objectives.length > 0 ? inst.objectives.join(", ") : "None specified"}
                        </p>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] text-zinc-550 font-black uppercase">PRIORITY CROP / TECH SECTORS</div>
                        <p className="font-semibold text-gray-800 line-clamp-2 mt-1 uppercase">
                          {Array.isArray(inst.prioritySectors) && inst.prioritySectors.length > 0 ? inst.prioritySectors.join(", ") : "All Sectors"}
                        </p>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] text-zinc-550 font-black uppercase font-bold">UN SDG IMPACT ALIGNMENTS</div>
                        <p className="font-semibold text-amber-950 bg-amber-50/15 p-1 border border-dashed border-amber-200 line-clamp-2 uppercase mt-1 leading-snug">
                          {inst.impactGoals || "Generic SDG development goals"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================= STORIES TAB ========================================= */}
        {activeTab === "stories" && (
          <div className="space-y-4" id="stories_tab_section">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h3 className="font-syne font-black text-lg uppercase tracking-tight">SITE STORIES MANAGEMENT</h3>
                <p className="text-xs text-gray-500 font-mono uppercase">Publish or modify standard Hacker News style stories on the homepage</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddingStory(true)}
                  className="bg-black text-white hover:bg-zinc-800 border-2 border-black text-xs font-black uppercase px-3 py-1.5 flex items-center gap-1 cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Plus className="w-4 h-4 text-orange-500 stroke-[3]" />
                  <span>Publish Story</span>
                </button>
                <div className="flex items-center bg-white border-2 border-black px-2.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] max-w-xs font-mono">
                  <Search className="w-4 h-4 text-zinc-500 mr-2" />
                  <input
                    type="text"
                    placeholder="SEARCH STORIES..."
                    value={searchStory}
                    onChange={(e) => setSearchStory(e.target.value)}
                    className="text-[10px] bg-transparent outline-none uppercase font-black placeholder-zinc-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3" id="admin_stories_grid">
              {filteredStories.map((s) => (
                <div
                  key={s.id}
                  className="bg-zinc-50 border-2 border-black p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3"
                >
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-black text-white text-[9px] font-mono px-1.5 py-0.5 font-bold uppercase rounded">
                        {s.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 font-extrabold uppercase">
                        {s.id} • Posted by {s.author} ({s.timestamp})
                      </span>
                    </div>
                    <h4 className="font-sans font-extrabold text-sm text-zinc-900 leading-tight uppercase">
                      {s.title}
                    </h4>
                    {s.url && (
                      <a
                        href={s.url}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="text-[10px] font-mono text-orange-655 hover:underline flex items-center gap-1"
                      >
                        <span>{s.url}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                    <button
                      onClick={() => setEditingStory(s)}
                      className="bg-white hover:bg-zinc-150 border-2 border-black px-2.5 py-1 text-xs font-black uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                    >
                      <Edit className="w-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteStory(s.id, s.title)}
                      className="bg-red-50 hover:bg-red-600 hover:text-white border-2 border-black p-1 text-xs text-red-750 font-black cursor-pointer transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      title="Delete Story Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================= REGISTRATIONS DOSSIER EDIT PANEL/MODAL ========================================= */}
      {editingReg && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xs select-text">
          <div className="bg-white border-4 border-black p-5 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2 select-none">
              <h3 className="font-syne font-black text-lg uppercase tracking-tight text-black flex items-center gap-2">
                <Sliders className="w-5 h-5 text-orange-600" />
                <span>EDIT REGISTRATION DOSSIER PROFILE</span>
              </h3>
              <button
                onClick={() => setEditingReg(null)}
                className="bg-black text-white px-2 py-0.5 text-xs font-mono uppercase font-black tracking-wider cursor-pointer"
              >
                [ Close Window ]
              </button>
            </div>

            <form onSubmit={handleSaveReg} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono font-black text-black">PROJECT NAME</label>
                  <input
                    type="text"
                    required
                    value={editingReg.projectName || ""}
                    onChange={(e) => setEditingReg({ ...editingReg, projectName: e.target.value })}
                    className="w-full bg-white border-2 border-black p-2 font-bold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black">LEAD FOUNDER NAME</label>
                  <input
                    type="text"
                    required
                    value={editingReg.username || ""}
                    onChange={(e) => setEditingReg({ ...editingReg, username: e.target.value })}
                    className="w-full bg-white border-2 border-black p-2 font-bold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black">DEVELOPMENT STAGE</label>
                  <select
                    value={editingReg.developmentStage || "Ideation"}
                    onChange={(e) => setEditingReg({ ...editingReg, developmentStage: e.target.value })}
                    className="w-full bg-white border-2 border-black p-2 font-black uppercase focus:outline-none cursor-pointer"
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

              {/* Sub headings */}
              <div className="border-t border-zinc-300 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono font-black text-zinc-700">FOUNDER LEGAL BIO</label>
                  <textarea
                    rows={3}
                    value={editingReg.founderBio || ""}
                    onChange={(e) => setEditingReg({ ...editingReg, founderBio: e.target.value })}
                    className="w-full bg-white border border-black p-2 font-semibold text-zinc-850"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-zinc-700">TEAM EXPERTISE DOSSIER</label>
                  <textarea
                    rows={3}
                    value={editingReg.teamExpertise || ""}
                    onChange={(e) => setEditingReg({ ...editingReg, teamExpertise: e.target.value })}
                    className="w-full bg-white border border-black p-2 font-semibold text-zinc-850"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-zinc-700 font-bold block bg-amber-50/20 p-0.5 border border-dashed border-amber-300">
                    PART 3: NATIONAL IMPACT ANALYSIS
                  </label>
                  <textarea
                    rows={4}
                    value={editingReg.nationalImpact || ""}
                    onChange={(e) => setEditingReg({ ...editingReg, nationalImpact: e.target.value })}
                    className="w-full bg-white border border-black p-2 font-semibold text-zinc-850"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-zinc-700 font-bold block bg-amber-50/20 p-0.5 border border-dashed border-amber-300">
                    PART 3: FX REVENUE GENERATION PROJECTIONS
                  </label>
                  <textarea
                    rows={4}
                    value={editingReg.exportPotentialPay || ""}
                    onChange={(e) => setEditingReg({ ...editingReg, exportPotentialPay: e.target.value })}
                    className="w-full bg-white border border-black p-2 font-semibold text-zinc-850"
                  ></textarea>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono font-black text-zinc-700">TOTAL CAPITAL USD REQUIRED</label>
                  <input
                    type="text"
                    value={editingReg.totalCapitalRequired || ""}
                    onChange={(e) => setEditingReg({ ...editingReg, totalCapitalRequired: e.target.value })}
                    className="w-full bg-white border border-black p-2 font-black text-zinc-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-zinc-700">CAPITAL ALLOCATION STRATEGY</label>
                  <input
                    type="text"
                    value={editingReg.capitalAllocation || ""}
                    onChange={(e) => setEditingReg({ ...editingReg, capitalAllocation: e.target.value })}
                    className="w-full bg-white border border-black p-2 font-semibold text-zinc-900"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingReg(null)}
                  className="bg-white hover:bg-zinc-100 border-2 border-black px-4 py-2 font-bold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-zinc-900 border-2 border-black px-5 py-2 font-black uppercase cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  SAVE / UPDATE DOSSIER FILE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================= INSTITUTIONALS EDIT PANEL/MODAL ========================================= */}
      {editingInst && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xs select-text">
          <div className="bg-white border-4 border-black p-5 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b-2 border-black pb-2 select-none">
              <h3 className="font-syne font-black text-lg uppercase tracking-tight text-black flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-600" />
                <span>EDIT INSTITUTIONAL ENGAGEMENT MANDATE</span>
              </h3>
              <button
                onClick={() => setEditingInst(null)}
                className="bg-black text-white px-2 py-0.5 text-xs font-mono uppercase font-black tracking-wider cursor-pointer"
              >
                [ Close Window ]
              </button>
            </div>

            <form onSubmit={handleSaveInst} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">Organization Name</label>
                  <input
                    type="text"
                    required
                    value={editingInst.organizationName || ""}
                    onChange={(e) => setEditingInst({ ...editingInst, organizationName: e.target.value })}
                    className="w-full bg-white border-2 border-black p-2 font-bold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">Representative Contact Name</label>
                  <input
                    type="text"
                    required
                    value={editingInst.contactName || ""}
                    onChange={(e) => setEditingInst({ ...editingInst, contactName: e.target.value })}
                    className="w-full bg-white border-2 border-black p-2 font-bold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black uppercase">Contact Email Pointer</label>
                  <input
                    type="email"
                    required
                    value={editingInst.contactEmail || ""}
                    onChange={(e) => setEditingInst({ ...editingInst, contactEmail: e.target.value })}
                    className="w-full bg-white border-2 border-black p-2 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-zinc-200 pt-3">
                <div className="space-y-1">
                  <label className="block font-mono font-black text-zinc-700 uppercase">Representative Identity</label>
                  <select
                    value={editingInst.identity || "Individual Investor"}
                    onChange={(e) => setEditingInst({ ...editingInst, identity: e.target.value })}
                    className="w-full bg-white border-2 border-black p-2 font-black uppercase focus:outline-none cursor-pointer"
                  >
                    <option value="Individual Investor">Individual Investor</option>
                    <option value="VC / Investment Firm">VC / Investment Firm</option>
                    <option value="International Institutional Partner (NGO/Development Body)">International Institutional Partner (NGO/Development Body)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-zinc-700 uppercase">Typical Ticket Size Limit</label>
                  <select
                    value={editingInst.ticketSize || "$10k–$50k"}
                    onChange={(e) => setEditingInst({ ...editingInst, ticketSize: e.target.value })}
                    className="w-full bg-white border-2 border-black p-2 font-black focus:outline-none cursor-pointer"
                  >
                    <option value="$10k–$50k">$10k–$50k</option>
                    <option value="$50k–$250k">$50k–$250k</option>
                    <option value="$250k+">$250k+</option>
                    <option value="N/A - Non-investor">N/A - Non-investor</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-zinc-700 uppercase">Operational / Geographical Focus</label>
                  <input
                    type="text"
                    required
                    value={editingInst.operationalFocus || ""}
                    onChange={(e) => setEditingInst({ ...editingInst, operationalFocus: e.target.value })}
                    className="w-full bg-[#FCFCFC] border-2 border-black p-2 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono font-black text-zinc-700 uppercase">Risk Appetite Matrix Score (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    required
                    value={editingInst.riskAppetite || 3}
                    onChange={(e) => setEditingInst({ ...editingInst, riskAppetite: parseInt(e.target.value) || 3 })}
                    className="w-full bg-white border-2 border-black p-2 font-black text-zinc-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-zinc-700 uppercase">Sustainable Impact Alignment (SDGs)</label>
                  <textarea
                    rows={2}
                    value={editingInst.impactGoals || ""}
                    onChange={(e) => setEditingInst({ ...editingInst, impactGoals: e.target.value })}
                    className="w-full bg-white border border-black p-2 font-semibold text-zinc-900"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingInst(null)}
                  className="bg-white hover:bg-zinc-100 border-2 border-black px-4 py-2 font-bold uppercase cursor-pointer text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-zinc-900 border-2 border-black px-5 py-2 font-black uppercase cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  SAVE / UPDATE PARTNER PROFILE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================= STORIES ADD / EDIT MODALS ========================================= */}
      {(editingStory || isAddingStory) && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs select-text">
          <div className="bg-white border-4 border-black p-5 max-w-2xl w-full shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2 select-none">
              <h3 className="font-syne font-black text-md sm:text-lg uppercase text-black flex items-center gap-1.5">
                <Newspaper className="w-5 h-5 text-black" fill="currentColor" />
                <span>{isAddingStory ? "PUBLISH NOVEL ECOSYSTEM STORY" : "MODIFY HOMEPAGE STORY"}</span>
              </h3>
              <button
                onClick={() => {
                  setEditingStory(null);
                  setIsAddingStory(false);
                }}
                className="bg-black text-white px-2 py-0.5 text-xs font-mono uppercase font-black cursor-pointer"
              >
                [ Close ]
              </button>
            </div>

            <form
              onSubmit={isAddingStory ? handleAddStory : handleSaveStory}
              className="space-y-4 text-xs font-sans"
            >
              <div className="space-y-1">
                <label className="block font-mono font-black text-black">STORY TITLE *</label>
                <input
                  type="text"
                  required
                  placeholder="Insert story headline (e.g., Toters fresh USD operations study)"
                  value={isAddingStory ? newStory.title : editingStory?.title || ""}
                  onChange={(e) => {
                    if (isAddingStory) setNewStory({ ...newStory, title: e.target.value });
                    else setEditingStory({ ...editingStory, title: e.target.value });
                  }}
                  className="w-full bg-white border-2 border-black p-2.5 font-extrabold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-mono font-black text-black">STORY CATEGORY *</label>
                  <select
                    value={isAddingStory ? newStory.category : editingStory?.category || "tech"}
                    onChange={(e) => {
                      if (isAddingStory) setNewStory({ ...newStory, category: e.target.value as any });
                      else setEditingStory({ ...editingStory, category: e.target.value as any });
                    }}
                    className="w-full bg-white border-2 border-black p-2.5 font-extrabold uppercase focus:outline-none cursor-pointer"
                  >
                    <option value="tech">Ecosystem Tech</option>
                    <option value="economy">Macro Economics</option>
                    <option value="ask">Ask 961 Discussions</option>
                    <option value="show">Show 961 Showcases</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono font-black text-black">STORY AUTHOR *</label>
                  <input
                    type="text"
                    required
                    value={isAddingStory ? newStory.author : editingStory?.author || ""}
                    onChange={(e) => {
                      if (isAddingStory) setNewStory({ ...newStory, author: e.target.value });
                      else setEditingStory({ ...editingStory, author: e.target.value });
                    }}
                    className="w-full bg-white border-2 border-black p-2.5 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono font-black text-black">EXTERNAL SOURCE URL (OPTIONAL)</label>
                <input
                  type="url"
                  placeholder="https://example.com/source-news"
                  value={isAddingStory ? newStory.url : editingStory?.url || ""}
                  onChange={(e) => {
                    if (isAddingStory) setNewStory({ ...newStory, url: e.target.value });
                    else setEditingStory({ ...editingStory, url: e.target.value });
                  }}
                  className="w-full bg-white border-2 border-black p-2.5 font-mono focus:outline-none text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono font-black text-black">STORY TEXT CONTENT (FOR DISCUSSIONS OR EXPLAINERS)</label>
                <textarea
                  rows={4}
                  placeholder="Optional text block explaining the item details..."
                  value={isAddingStory ? newStory.text : editingStory?.text || ""}
                  onChange={(e) => {
                    if (isAddingStory) setNewStory({ ...newStory, text: e.target.value });
                    else setEditingStory({ ...editingStory, text: e.target.value });
                  }}
                  className="w-full bg-white border border-black p-2.5 font-medium text-zinc-800"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-zinc-200 flex gap-2 justify-end select-none">
                <button
                  type="button"
                  onClick={() => {
                    setEditingStory(null);
                    setIsAddingStory(false);
                  }}
                  className="bg-white hover:bg-zinc-150 border-2 border-black px-4 py-2 font-bold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-zinc-900 border-2 border-black px-5 py-2 font-black uppercase cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  {isAddingStory ? "PUBLISH ECOSYSTEM STORY" : "APPLY STORY CHANGES"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
