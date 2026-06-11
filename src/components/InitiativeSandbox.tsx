import React, { useState, useEffect } from "react";
import {
  Shield,
  Search,
  User,
  Activity,
  FileText,
  Upload,
  Cpu,
  Bookmark,
  CheckCircle,
  Eye,
  Send,
  Zap,
  TrendingUp,
  FileSpreadsheet,
  Globe,
  AlertTriangle,
  RefreshCw,
  PlusCircle,
  Sparkles,
  Award
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface SandboxUser {
  id: string;
  username: string;
  email: string;
  role_type: "Startup" | "Investor" | "Scout" | "Admin";
  profile: {
    bio: string;
    linkedin_url: string;
    skills: string[];
  };
}

interface SandboxEntity {
  entity_id: string;
  name: string;
  sector: string;
  stage: string;
  description: string;
  problem_statement: string;
  solution_statement: string;
  readiness_score: number;
  is_verified: boolean;
  verified_by_ncei_expert?: string;
  embedding: string;
  author_id: string;
}

interface InvestorMandate {
  investor_id: string;
  investor_name: string;
  sector_preferences: string[];
  target_stage: string;
  min_ticket_size: number;
  max_ticket_size: number;
  geographic_focus: string;
}

interface MatchingRecord {
  match_id: string;
  startup_id: string;
  investor_id: string;
  match_score: number;
  status: "Pending" | "Vetted" | "Accepted" | "Rejected";
  ncei_notes: string;
  match_rationale: string;
}

interface DataRoomItem {
  id: string;
  entity_id: string;
  document_type: "Feasibility Study" | "Financials" | "Deck" | "Market Report";
  name: string;
  storage_url: string;
  views_log: { viewer_id: string; viewer_name: string; timestamp: string }[];
}

interface ResearchReport {
  id: string;
  title: string;
  author: string;
  summary: string;
  content: string;
  date: string;
}

export default function InitiativeSandbox() {
  // Sync Stores
  const [users, setUsers] = useState<SandboxUser[]>([]);
  const [entities, setEntities] = useState<SandboxEntity[]>([]);
  const [mandates, setMandates] = useState<InvestorMandate[]>([]);
  const [matches, setMatches] = useState<MatchingRecord[]>([]);
  const [dataroom, setDataroom] = useState<DataRoomItem[]>([]);
  const [research, setResearch] = useState<ResearchReport[]>([]);

  // Simulation Role States
  const [activeRole, setActiveRole] = useState<"Startup" | "Investor" | "Scout" | "Admin">("Startup");
  const [activeUser, setActiveUser] = useState<SandboxUser | null>(null);

  // Loading & Action feedback states
  const [loading, setLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [matchingInProgress, setMatchingInProgress] = useState(false);
  const [activeMatchResult, setActiveMatchResult] = useState<MatchingRecord | null>(null);

  // Form states: New Startup Entity
  const [newEntity, setNewEntity] = useState({
    name: "",
    sector: "AgriTech",
    stage: "Seed",
    description: "",
    problem_statement: "",
    solution_statement: ""
  });

  // Form states: Document upload
  const [docUpload, setDocUpload] = useState({
    entity_id: "",
    document_type: "Feasibility Study" as any,
    name: ""
  });

  // Form states: NCEI Verification Expert Audit
  const [auditForm, setAuditForm] = useState({
    entity_id: "",
    readiness_score: 80,
    ncei_notes: ""
  });

  // Chatbox Intermediary Interface States
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: "user" | "bot"; text: string; category?: string }[]>([
    {
      sender: "bot",
      text: "### Z961combinator Sandbox Compliance Intermediary\n\nWelcome back. I am your specialized regulatory agent.\n\nType queries such as:\n* *'Match my startup with Levant Green'* \n* *'Upload a feasibility report check'* \n* *'I need NCEI status updates'*",
      category: "CLASS_STATUS"
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Init fetch
  const syncDatabase = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/initiative/all");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
        setEntities(data.entities || []);
        setMandates(data.mandates || []);
        setMatches(data.matches || []);
        setDataroom(data.dataroom || []);
        setResearch(data.research || []);

        // Autoselect default active user corresponding to active role
        const defaultUser = data.users?.find((u: any) => u.role_type === activeRole) || null;
        setActiveUser(defaultUser);
      }
    } catch (e) {
      console.error("Initiative sync error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    syncDatabase();
  }, []);

  // Update active user when role changes
  const handleRoleChange = (role: "Startup" | "Investor" | "Scout" | "Admin") => {
    setActiveRole(role);
    const relatedUser = users.find((u) => u.role_type === role) || null;
    setActiveUser(relatedUser);
    // select first entity as default target for forms
    if (entities.length > 0) {
      setDocUpload((prev) => ({ ...prev, entity_id: entities[0].entity_id }));
      setAuditForm((prev) => ({ ...prev, entity_id: entities[0].entity_id }));
    }
  };

  useEffect(() => {
    if (users.length > 0) {
      const relatedUser = users.find((u) => u.role_type === activeRole) || null;
      setActiveUser(relatedUser);
    }
  }, [activeRole, users]);

  useEffect(() => {
    if (entities.length > 0 && !docUpload.entity_id) {
      setDocUpload((prev) => ({ ...prev, entity_id: entities[0].entity_id }));
      setAuditForm((prev) => ({ ...prev, entity_id: entities[0].entity_id }));
    }
  }, [entities]);

  // Handler: Register New Startup Entity
  const handleCreateEntity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntity.name || !newEntity.problem_statement || !newEntity.solution_statement) return;

    setFormSubmitting(true);
    try {
      const res = await fetch("/api/initiative/entities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newEntity,
          author_id: activeUser ? activeUser.id : "u-founder-farid"
        })
      });

      if (res.ok) {
        setNewEntity({
          name: "",
          sector: "AgriTech",
          stage: "Seed",
          description: "",
          problem_statement: "",
          solution_statement: ""
        });
        await syncDatabase();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handler: Upload feasibility / business documents
  const handleUploadDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docUpload.entity_id || !docUpload.name) return;

    setFormSubmitting(true);
    try {
      const res = await fetch("/api/initiative/dataroom/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity_id: docUpload.entity_id,
          document_type: docUpload.document_type,
          name: docUpload.name,
          storage_url: `https://z961combinator.xyz/data-room/${encodeURIComponent(docUpload.name.toLowerCase().replace(/\s+/g, "-"))}.pdf`
        })
      });

      if (res.ok) {
        setDocUpload((prev) => ({ ...prev, name: "" }));
        await syncDatabase();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handler: Expert Verification & Score Endorsement
  const handleVerifyAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditForm.entity_id) return;

    setFormSubmitting(true);
    try {
      const res = await fetch("/api/initiative/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity_id: auditForm.entity_id,
          readiness_score: Number(auditForm.readiness_score),
          ncei_notes: auditForm.ncei_notes,
          verified_by: activeUser ? activeUser.username : "Prof. Ghassan Youssef (NCEI Chair)"
        })
      });

      if (res.ok) {
        setAuditForm((prev) => ({ ...prev, ncei_notes: "" }));
        await syncDatabase();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handler: Simulated Vector Matcher Similarity Generator
  const runVectorSemanticMatcher = async (entityId: string, investorId: string) => {
    setMatchingInProgress(true);
    setActiveMatchResult(null);
    try {
      const res = await fetch("/api/initiative/matches/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entity_id: entityId,
          investor_id: investorId
        })
      });

      if (res.ok) {
        const data = await res.json();
        setActiveMatchResult(data);
        await syncDatabase();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMatchingInProgress(false);
    }
  };

  // Handler: Change match negotiation milestones
  const updateMatchStatus = async (matchId: string, status: "Vetted" | "Accepted" | "Rejected", notes: string) => {
    try {
      const res = await fetch("/api/initiative/matches/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          match_id: matchId,
          status,
          ncei_notes: notes
        })
      });
      if (res.ok) {
        await syncDatabase();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handler: Record investor secure view log in dataroom
  const triggerDataroomInspect = async (docId: string) => {
    if (!activeUser || activeRole !== "Investor") return;

    try {
      const res = await fetch("/api/initiative/dataroom/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doc_id: docId,
          viewer_id: activeUser.id,
          viewer_name: activeUser.username
        })
      });

      if (res.ok) {
        await syncDatabase();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handler: Intermediary Chat Submission
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatMessage("");
    setChatLog((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatLoading(true);

    try {
      const activeEntityId = entities.find((ent) => ent.author_id === (activeUser ? activeUser.id : ""))?.entity_id || "";

      const res = await fetch("/api/initiative/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          activeRole,
          activeUserId: activeUser ? activeUser.id : "",
          entityContextId: activeEntityId
        })
      });

      if (res.ok) {
        const data = await res.json();
        setChatLog((prev) => [
          ...prev,
          { sender: "bot", text: data.reply, category: data.classification }
        ]);
        if (data.actionTaken) {
          // If the AI took or suggested action, reload sandbox metrics
          await syncDatabase();
        }
      } else {
        setChatLog((prev) => [
          ...prev,
          { sender: "bot", text: "Compliance Intermediary experienced a pipeline disconnect. Please query again." }
        ]);
      }
    } catch (err) {
      console.error(err);
      setChatLog((prev) => [
        ...prev,
        { sender: "bot", text: "Secure query transport failed to route." }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white border-4 border-black" id="sandbox_loading">
        <RefreshCw className="w-10 h-10 text-black animate-spin mb-4 stroke-[3]" />
        <h4 className="font-mono text-sm font-bold uppercase tracking-wider">Loading Sandbox Ledger Pipelines...</h4>
      </div>
    );
  }

  // Helpful statistics
  const verifiedCount = entities.filter((e) => e.is_verified).length;
  const matchSuccessRate = matches.length > 0 
    ? Math.round((matches.filter(m => m.status === 'Accepted').length / matches.length) * 100) 
    : 0;

  return (
    <div className="space-y-8" id="sandbox_initiative_root">
      {/* Alert Header - Brutalist Strategic Frame */}
      <div className="bg-black text-white p-6 border-4 border border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[6px_6px_0px_0px_rgba(39,39,42,1)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 font-bold">
            <Shield className="w-4.5 h-4.5 stroke-[2.5]" />
            <span>UNDP / ESCWA ALIGNED TRANSNATIONAL SANDBOX</span>
          </div>
          <h2 className="font-syne font-bold text-2xl uppercase tracking-tighter">Z961combinator Initiative</h2>
          <p className="text-[11px] text-gray-400 font-mono">
            Digital Infrastructure for Economic Stabilization: Pairing fresh-revenue Lebanese tech builders with diaspora capital.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
          <div className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-zinc-300">
            ACTIVE PIPELINE: ${entities.length * 200}K ESTIMATED ASSIGNED CODES
          </div>
          <div className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-emerald-400">
            NCEI ENDORSED: {verifiedCount}/{entities.length}
          </div>
        </div>
      </div>

      {/* Role Play Intermediary Switcher Bar */}
      <div className="border-4 border-black p-4 bg-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono font-black text-gray-500 block mb-1">INTERACTIVE SIMULATION PORTAL</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-black uppercase">Active Role View:</span>
            <span className="bg-black border-2 border-black text-white text-xs font-mono font-bold px-2 py-0.5 uppercase">
              {activeRole} Interface
            </span>
          </div>
          {activeUser && (
            <p className="text-[11px] text-gray-700 font-mono font-bold mt-1.5">
              Simulated Persona: <span className="text-black underline">{activeUser.username}</span> ({activeUser.email})
            </p>
          )}
        </div>
        
        {/* Toggle Controls */}
        <div className="flex flex-wrap gap-2">
          {(["Startup", "Investor", "Scout", "Admin"] as const).map((role) => (
            <button
              key={role}
              id={`switch_role_${role.toLowerCase()}`}
              onClick={() => handleRoleChange(role)}
              className={`px-3 py-1.5 border-2 border-black font-mono text-xs font-black uppercase transition-all ${
                activeRole === role
                  ? "bg-black text-white shadow-none"
                  : "bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              }`}
            >
              <span>{role} Console</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: left column (Dashboards), right column (Compliance Intermediary AI Agent) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: ACTIVE USER PRIVATE CONSOLE */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* ==================================
              I. STARTUP FOUNDER DASHBOARD MODULE
              ================================== */}
          {activeRole === "Startup" && (
            <div className="space-y-6" id="startup_console_block">
              {/* Header */}
              <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-black text-white font-mono text-[9px] font-black uppercase px-3 py-1 border-b-2 border-l-2 border-black">
                  SECURE FOUNDER DEPOSIT
                </div>
                <h3 className="font-syne font-bold text-xl uppercase tracking-tight flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-black" />
                  <span>Institutional Readiness Profile</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4 font-sans font-medium">
                  Define your firmographic problem/solution parameters. Upon filing, NCEI specialists will formulate your 
                  **Readiness Score** to index matching similarity targets with offshore Lebanese diaspora.
                </p>

                {/* Submissions form */}
                <form onSubmit={handleCreateEntity} className="space-y-4 border-t-2 border-black pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-black uppercase mb-1">Startup Entity Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Phoenix Logistics"
                        value={newEntity.name}
                        onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })}
                        className="w-full text-xs font-mono font-bold border-2 border-black p-2 bg-zinc-50 focus:bg-white outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-black uppercase mb-1">Target Sector</label>
                      <select
                        value={newEntity.sector}
                        onChange={(e) => setNewEntity({ ...newEntity, sector: e.target.value })}
                        className="w-full text-xs font-mono font-bold border-2 border-black p-2 bg-white"
                      >
                        <option value="AgriTech / Remote Sensing">AgriTech / Drones</option>
                        <option value="Energy / Cleantech">Energy / Solar Grid</option>
                        <option value="Fintech">Fintech / USD Payroll</option>
                        <option value="Logistics / Circular Economy">Logistics / Recycling</option>
                        <option value="SaaS / Remote Agency">SaaS / Offshore Agency</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-black uppercase mb-1">Operating Stage</label>
                      <select
                        value={newEntity.stage}
                        onChange={(e) => setNewEntity({ ...newEntity, stage: e.target.value })}
                        className="w-full text-xs font-mono font-bold border-2 border-black p-2 bg-white"
                      >
                        <option value="Ideation">Ideation / R&D</option>
                        <option value="MVP Testing">MVP Testing</option>
                        <option value="Seed">Seed Stage</option>
                        <option value="Revenue">Fresh Revenue Generating</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-black uppercase mb-1">Brief Description (Tagline)</label>
                    <input
                      type="text"
                      placeholder="e.g. Decentralized solar grid software billing infrastructure optimized for Tripoli districts."
                      value={newEntity.description}
                      onChange={(e) => setNewEntity({ ...newEntity, description: e.target.value })}
                      className="w-full text-xs font-sans font-medium border-2 border-black p-2 bg-zinc-50 focus:bg-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono font-black uppercase mb-1">Macro-Economic Problem Statement</label>
                      <textarea
                        rows={3}
                        placeholder="Detail regional specific friction (e.g., state grid blackouts, high cost of cash transportation, lack of Stripe support for Lebanese fresh banks...)"
                        value={newEntity.problem_statement}
                        onChange={(e) => setNewEntity({ ...newEntity, problem_statement: e.target.value })}
                        className="w-full text-xs font-sans border-2 border-black p-2 bg-white outline-none focus:ring-1 focus:ring-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono font-black uppercase mb-1">Your Tech-Driven Solution Statement</label>
                      <textarea
                        rows={3}
                        placeholder="Detail how your specific tech layers solve this (e.g. solar telemetry tracking with collaborative neighborhood billing networks...)"
                        value={newEntity.solution_statement}
                        onChange={(e) => setNewEntity({ ...newEntity, solution_statement: e.target.value })}
                        className="w-full text-xs font-sans border-2 border-black p-2 bg-white outline-none focus:ring-1 focus:ring-black"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full bg-black text-white hover:bg-zinc-900 border-2 border-black font-mono font-black uppercase py-2 text-xs cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                  >
                    {formSubmitting ? "FILING PROFILE METRICS..." : "DEPOSIT READINESS APP FROM (+961)"}
                  </button>
                </form>
              </div>

              {/* Data Room File Vault Upload */}
              <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-display font-black text-lg uppercase tracking-tight flex items-center gap-2 mb-2">
                  <Upload className="w-5 h-5 text-black" />
                  <span>Confidential Information Vault (File Data Room)</span>
                </h3>
                <p className="text-xs text-gray-600 mb-4 font-sans font-medium">
                  Upload audited compliance reports or pitch decks here. Every external diaspora investor click generates an absolute, un-editable audit trail log entry shown in your dashboard below.
                </p>

                <form onSubmit={handleUploadDoc} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-mono font-black uppercase mb-1">Target Entity</label>
                    <select
                      value={docUpload.entity_id}
                      onChange={(e) => setDocUpload({ ...docUpload, entity_id: e.target.value })}
                      className="w-full text-xs font-mono font-bold border-2 border-black p-1.5"
                    >
                      {entities
                        .filter((ent) => ent.author_id === (activeUser ? activeUser.id : ""))
                        .map((ent) => (
                          <option key={ent.entity_id} value={ent.entity_id}>
                            {ent.name}
                          </option>
                        ))}
                      {entities.filter((ent) => ent.author_id === (activeUser ? activeUser.id : "")).length === 0 && (
                        <option value="">No registered startups</option>
                      )}
                    </select>
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[10px] font-mono font-black uppercase mb-1">Document Type</label>
                    <select
                      value={docUpload.document_type}
                      onChange={(e) => setDocUpload({ ...docUpload, document_type: e.target.value as any })}
                      className="w-full text-xs font-mono font-bold border-2 border-black p-1.5"
                    >
                      <option value="Feasibility Study">Feasibility Study</option>
                      <option value="Financials">Financial Projections</option>
                      <option value="Deck">Investor Pitch Deck</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 flex gap-2">
                    <div className="flex-1">
                      <label className="block text-[10px] font-mono font-black uppercase mb-1">File Name Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Tripoli Solar Microgrid Feasibility.pdf"
                        value={docUpload.name}
                        onChange={(e) => setDocUpload({ ...docUpload, name: e.target.value })}
                        className="w-full text-xs font-mono font-bold border-2 border-black p-1.5 bg-zinc-50"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-black text-white hover:bg-zinc-800 border-2 border-black px-4 font-mono font-black text-xs uppercase"
                    >
                      SECURE
                    </button>
                  </div>
                </form>

                {/* Secure viewing logs list */}
                <div className="mt-6 border-2 border-black bg-slate-50 p-4">
                  <h4 className="text-xs font-mono font-black uppercase mb-2 text-black flex items-center justify-between">
                    <span>Cryptographic Access View Audit logs</span>
                    <span className="text-[10px] bg-red-100 text-red-700 px-1.5 border border-red-300 font-mono">CONFIDENTIAL ANALYTICS</span>
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {dataroom
                      .filter((doc) => entities.find((ent) => ent.entity_id === doc.entity_id && ent.author_id === (activeUser ? activeUser.id : "")))
                      .map((doc) => (
                        <div key={doc.id} className="text-[11px] font-mono bg-white border border-gray-300 p-2 flex flex-col md:flex-row justify-between gap-1 shadow-sm">
                          <div>
                            <span className="font-bold text-black uppercase">[{doc.document_type}]</span> {doc.name}
                          </div>
                          <div className="text-gray-600">
                            {doc.views_log.length === 0 ? (
                              <span className="italic text-gray-400">No investor inspect views logged.</span>
                            ) : (
                              doc.views_log.map((view, i) => (
                                <span key={i} className="text-emerald-700 font-bold bg-emerald-50 px-1 border border-emerald-300 text-[10px]">
                                  👁️ Visited by {view.viewer_name} at {view.timestamp}
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ====================================
              II. DIASPORA INVESTOR DASHBOARD MODULE
              ==================================== */}
          {activeRole === "Investor" && (
            <div className="space-y-6" id="investor_console_block">
              {/* Opportunities list */}
              <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-black text-xl uppercase tracking-tight flex items-center gap-2">
                    <Globe className="w-5 h-5 text-indigo-6 stroke-[2.5]" />
                    <span>Matched Transnational Opportunities</span>
                  </h3>
                  <span className="text-xs bg-emerald-100 border border-emerald-400 px-2 py-0.5 text-emerald-800 font-mono font-bold uppercase rounded">
                    Fresh USD Clearable
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-6 font-sans">
                  The semantic matching engine pairs your investment preferences with validated Lebanese entities. 
                  Below are the vetted readiness scores approved by NCEI Experts.
                </p>

                {/* Match triggers */}
                <div className="border-2 border-black p-4 bg-slate-50 mb-6 font-mono text-xs">
                  <h4 className="font-black uppercase mb-3 text-black">⚡ Trigger Live Semantic Vector RAG Matcher</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                    <div>
                      <label className="block text-[10px] uppercase font-black text-gray-500 mb-1">Target Startup Portfolio</label>
                      <select id="vector_match_startup" className="w-full font-bold border-2 border-black bg-white p-1.5">
                        {entities.map((e) => (
                          <option key={e.entity_id} value={e.entity_id}>
                            {e.name} ({e.sector})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-[10px] uppercase font-black text-gray-500 mb-1">Your Investor ID</label>
                        <input
                          type="text"
                          readOnly
                          value={activeUser ? activeUser.username : "Levant Green Ventures"}
                          className="w-full font-bold border border-gray-300 p-1.5 bg-gray-200"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const startupSelect = document.getElementById("vector_match_startup") as HTMLSelectElement;
                          if (startupSelect && activeUser) {
                            runVectorSemanticMatcher(startupSelect.value, activeUser.id);
                          }
                        }}
                        disabled={matchingInProgress}
                        className="bg-black text-white hover:bg-zinc-900 border-2 border-black font-black px-4 uppercase cursor-pointer"
                      >
                        {matchingInProgress ? "COMPUTING EMBEDDING..." : "CALCULATE"}
                      </button>
                    </div>
                  </div>

                  {/* Similarity Result Card */}
                  {activeMatchResult && (
                    <div className="mt-4 border-2 border-dashed border-black bg-amber-50 p-3 rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-black text-xs uppercase text-slate-800">RAG Semantic Match Calculation</span>
                        <span className="font-black text-sm bg-black text-amber-400 px-2 font-mono">
                          {activeMatchResult.match_score}% Score
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed italic text-gray-700">
                        "{activeMatchResult.match_rationale}"
                      </p>
                    </div>
                  )}
                </div>

                {/* List Opportunities cards */}
                <div className="space-y-4">
                  {entities.map((ent) => {
                    const relatedMatch = matches.find((m) => m.startup_id === ent.entity_id && m.investor_id === (activeUser ? activeUser.id : ""));
                    return (
                      <div key={ent.entity_id} className="border-2 border-black p-4 hover:bg-slate-50 transition-all">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b-2 border-black pb-2 mb-3">
                          <div>
                            <h4 className="font-display font-black text-base text-black uppercase flex items-center gap-1.5">
                              <span>{ent.name}</span>
                              {ent.is_verified && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-400 px-1 font-mono uppercase font-bold">
                                  NCEI ENDORSED
                                </span>
                              )}
                            </h4>
                            <span className="text-[11px] font-mono text-gray-500 uppercase">{ent.sector} | Status: {ent.stage}</span>
                          </div>
                          
                          <div className="text-right flex items-center gap-3">
                            <div className="font-mono text-xs">
                              <span className="text-gray-500 uppercase text-[9px] block">READINESS INDEX</span>
                              <span className="font-black text-black">{ent.readiness_score}/100</span>
                            </div>
                            {relatedMatch && (
                              <div className="bg-black text-[11px] text-white py-1 px-2 font-mono font-black uppercase">
                                Match Score: {relatedMatch.match_score}%
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-gray-700 leading-relaxed mb-4">
                          <div>
                            <span className="font-mono text-[10px] font-black uppercase text-black block mb-0.5">THE MACRO PROBLEM:</span>
                            <p>{ent.problem_statement}</p>
                          </div>
                          <div>
                            <span className="font-mono text-[10px] font-black uppercase text-black block mb-0.5">THE TECH SOLUTION:</span>
                            <p>{ent.solution_statement}</p>
                          </div>
                        </div>

                        {/* Interactive Data rooms for the startup */}
                        <div className="border-t border-gray-300 pt-3 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-black uppercase text-gray-400">SECURE VAULT ATTACHMENTS:</span>
                            <div className="flex flex-wrap gap-1">
                              {dataroom
                                .filter((doc) => doc.entity_id === ent.entity_id)
                                .map((doc) => (
                                  <button
                                    key={doc.id}
                                    onClick={() => triggerDataroomInspect(doc.id)}
                                    className="px-2 py-1 bg-white border border-black hover:bg-zinc-100 text-[10px] font-mono uppercase font-black text-black flex items-center gap-1 cursor-pointer"
                                  >
                                    <FileSpreadsheet className="w-3.5 h-3.5 text-black" />
                                    <span>{doc.document_type}</span>
                                    <Eye className="w-3 h-3 text-gray-400" />
                                  </button>
                                ))}
                              {dataroom.filter((doc) => doc.entity_id === ent.entity_id).length === 0 && (
                                <span className="text-[10px] font-mono italic text-gray-400">No data room deposits yet.</span>
                              )}
                            </div>
                          </div>

                          {/* Connection Actions */}
                          {relatedMatch ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => updateMatchStatus(relatedMatch.match_id, "Accepted", "Investor signed NDA and initialized deep due diligence.")}
                                className={`text-[10px] font-mono font-black uppercase px-2.5 py-1.5 border border-black rounded ${
                                  relatedMatch.status === "Accepted"
                                    ? "bg-emerald-600 text-white"
                                    : "bg-white text-black hover:bg-emerald-100 cursor-pointer"
                                }`}
                              >
                                {relatedMatch.status === "Accepted" ? "✓ CONNECTION FUNDED" : "SIGN NDA & DISCLOSE FEEDBACK"}
                              </button>
                            </div>
                          ) : (
                            <p className="text-[10px] font-mono italic text-gray-500">Trigger vector simulation above to open connection channels.</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* =======================================
              III. ACADEMIC GRADUATE SCOUT PORTAL MODULE
              ======================================= */}
          {activeRole === "Scout" && (
            <div className="space-y-6" id="scout_console_block">
              <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-syne font-bold text-xl uppercase tracking-tight flex items-center gap-2 mb-2">
                  <Bookmark className="w-5 h-5 text-black" />
                  <span>Innovation Scout Market Intelligence</span>
                </h3>
                <p className="text-xs text-gray-600 mb-6 leading-relaxed normal-case">
                  Distinct access portal designed for university graduates acting as Node Research Officers. Scouts document macro sector studies
                  mapping out green circular economies and BDL liquidity failovers in response to ESCWA frameworks.
                </p>

                {/* Reports repository list */}
                <div className="space-y-4">
                  {research.map((report) => (
                    <div key={report.id} className="border-2 border-black p-4 bg-white hover:bg-zinc-50 transition-all">
                      <div className="flex justify-between items-start gap-2 border-b border-black pb-2 mb-3">
                        <div>
                          <h4 className="font-mono text-sm font-black text-black uppercase">{report.title}</h4>
                          <span className="text-[10px] font-mono text-gray-500">Author: {report.author} | Dated: {report.date}</span>
                        </div>
                        <span className="text-[9px] bg-black text-white px-2 py-0.5 uppercase font-mono tracking-wider font-bold">
                          OPEN SCOUT REPORT
                        </span>
                      </div>
                      <p className="text-xs font-sans text-gray-700 leading-relaxed font-bold mb-3 normal-case">
                        {report.summary}
                      </p>
                      
                      {/* Deep text study */}
                      <div className="text-[11px] font-sans bg-zinc-50 border border-zinc-200 p-3 leading-relaxed text-slate-800 normal-case font-medium">
                        <p>{report.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================================
              IV. NCEI SYSTEM CMS ADMIN AUDIT GATEWAY
              =================================== */}
          {activeRole === "Admin" && (
            <div className="space-y-6" id="admin_console_block">
              {/* CMS control panel */}
              <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-syne font-bold text-xl uppercase tracking-tight flex items-center gap-2">
                    <Shield className="w-5 h-5 text-black" />
                    <span>NCEI Administrative Audit System</span>
                  </h3>
                  <span className="text-xs bg-zinc-100 text-zinc-800 border border-zinc-400 font-mono font-black py-0.5 px-2 uppercase rounded">
                    Audit-Ready CMS
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-6 leading-relaxed normal-case">
                  Assess submitted readiness profiles. NCEI specialists approve metrics (TAM, Traction, exit strategies) 
                  resulting in standard verified status before investor global publication networks can see them.
                </p>

                {/* Audit verify form */}
                <form onSubmit={handleVerifyAudit} className="border-2 border-black bg-zinc-100 p-4 mb-8 space-y-4">
                  <h4 className="font-mono text-xs font-black uppercase text-black">🛡️ Set Readiness Scores & verified Flag</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                    <div>
                      <label className="block text-[10px] font-mono font-black uppercase mb-1">Target Startup Portfolio</label>
                      <select
                        value={auditForm.entity_id}
                        onChange={(e) => setAuditForm({ ...auditForm, entity_id: e.target.value })}
                        className="w-full text-xs font-mono font-bold border-2 border-black p-1.5 bg-white"
                      >
                        {entities.map((e) => (
                          <option key={e.entity_id} value={e.entity_id}>
                            {e.name} (Current Score: {e.readiness_score})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-black uppercase mb-1">Assigned Readiness Index (0-100)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={auditForm.readiness_score}
                        onChange={(e) => setAuditForm({ ...auditForm, readiness_score: Number(e.target.value) })}
                        className="w-full text-xs font-mono font-bold border-2 border-black p-1.5 bg-white"
                        required
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="w-full bg-black text-white hover:bg-zinc-900 border-2 border-black p-1.5 font-mono text-xs font-black uppercase cursor-pointer"
                      >
                        {formSubmitting ? "FILING AUDIT..." : "ENDORSE & VERIFY"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-black uppercase mb-1">Expert Auditor Analysis Feedback Logs</label>
                    <input
                      type="text"
                      placeholder="e.g. Agritech TAM fully proven. Verified team competence; offshore UK LTD mapping complete."
                      value={auditForm.ncei_notes}
                      onChange={(e) => setAuditForm({ ...auditForm, ncei_notes: e.target.value })}
                      className="w-full text-xs font-sans border border-gray-400 p-2"
                      required
                    />
                  </div>
                </form>

                {/* Audit listings */}
                <div className="space-y-4">
                  <h4 className="font-mono text-xs font-black uppercase mb-3 text-black">Active Sandbox Portfolio List</h4>
                  {entities.map((ent) => (
                    <div key={ent.entity_id} className="border-2 border-black p-4 bg-slate-50 relative">
                      <div className="flex justify-between items-start border-b border-gray-300 pb-2 mb-3">
                        <div>
                          <h5 className="font-mono font-black text-sm uppercase text-black">{ent.name}</h5>
                          <span className="text-[10px] font-mono text-gray-500">Stage: {ent.stage} | Author ID: {ent.author_id}</span>
                        </div>
                        <div className="text-right">
                          <div className={`text-[10px] font-mono px-2 py-0.5 uppercase font-black border ${
                            ent.is_verified 
                              ? "bg-emerald-100 text-emerald-800 border-emerald-400" 
                              : "bg-amber-100 text-amber-800 border-amber-400"
                          }`}>
                            {ent.is_verified ? "VERIFIED PROTOCOL" : "UNAUDITED"}
                          </div>
                          <span className="text-xs font-mono font-black text-black">Readiness: {ent.readiness_score}/100</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs font-sans text-gray-700">
                        <p><span className="font-mono font-bold text-[10px] text-gray-600 uppercase">Sector Scope:</span> {ent.sector}</p>
                        <p><span className="font-mono font-bold text-[10px] text-gray-600 uppercase">Description:</span> {ent.description}</p>
                        {ent.verified_by_ncei_expert && (
                          <div className="bg-white border border-gray-300 p-2.5 mt-2 rounded">
                            <span className="font-mono font-bold text-[10px] text-emerald-800 block uppercase">🛡️ AUDITOR ENDORSEMENT STATEMENT:</span>
                            <span className="text-[11px] leading-relaxed italic block mt-0.5">
                              "{matches.find(m => m.startup_id === ent.entity_id)?.ncei_notes || 'Verified according to TAM criteria.'}"
                            </span>
                            <span className="text-[9px] font-mono block text-gray-400 mt-1 uppercase text-right">Signed: {ent.verified_by_ncei_expert}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-syne font-bold text-lg uppercase tracking-tight flex items-center gap-1.5 mb-2">
              <Activity className="w-5 h-5 text-black stroke-[2.5]" />
              <span>Initiative Active Milestones & Settlement Logs</span>
            </h3>
            <p className="text-xs text-gray-500 mb-4 font-sans font-medium">
              A public audit trail tracking active pipeline settlements. Inflows must navigate Circular 165 for routing local Fresh USD checks.
            </p>

            <div className="divide-y-2 divide-black border-2 border-black max-h-56 overflow-y-auto">
              {matches.map((m) => {
                const entName = entities.find((ent) => ent.entity_id === m.startup_id)?.name || "Lebanese Startup";
                const invName = users.find((u) => u.id === m.investor_id)?.username || "Diaspora Investor";
                return (
                  <div key={m.match_id} className="p-3 bg-white text-xs font-mono font-bold flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-black text-white px-1.5 text-[9px] uppercase font-black uppercase">
                          MATCH-{m.match_id.substring(2, 6).toUpperCase()}
                        </span>
                        <span className="text-black uppercase">{entName} 🤝 {invName}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-sans italic normal-case font-medium">{m.ncei_notes}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] bg-gray-100 px-1.5 py-0.5 border border-gray-300">
                        {m.match_score}% Matching Vector
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase border ${
                        m.status === "Accepted"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-400"
                          : m.status === "Vetted"
                          ? "bg-zinc-100 text-zinc-800 border-zinc-400"
                          : "bg-amber-100 text-amber-800 border-amber-400"
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        <div className="lg:col-span-4 space-y-6 animate-fade-in">
          <div className="border-4 border-black bg-[#121212] text-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-[650px] relative overflow-hidden">
            
            {/* Header */}
            <div className="border-b-2 border-zinc-800 pb-3 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-white animate-pulse" />
                <div>
                  <h4 className="font-syne font-bold text-sm uppercase tracking-tight text-white">
                    Institutional Agent
                  </h4>
                  <span className="text-[9px] font-mono text-gray-400">NCEI DIRECT INTERMEDIARY v2.1</span>
                </div>
              </div>
              <div className="bg-zinc-900 text-zinc-400 font-mono text-[9px] font-bold uppercase border border-zinc-800 px-1.5">
                ● ONLINE Proxy
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 font-sans text-xs scrollbar-thin">
              {chatLog.map((chat, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    chat.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[90%] p-3 border-2 font-medium leading-relaxed normal-case ${
                      chat.sender === "user"
                        ? "bg-white text-black border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]"
                        : "bg-zinc-900 text-gray-100 border-zinc-800"
                    }`}
                  >
                    {chat.sender === "bot" && chat.category && (
                      <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase block mb-1.5 tracking-wider">
                        🤖 [{chat.category}] ACTION PARSED
                      </span>
                    )}
                    <ReactMarkdown>{chat.text}</ReactMarkdown>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 mt-1 uppercase">
                    {chat.sender === "user" ? "YOU / SENDER ID" : "INTERMEDIARY SYSTEM"}
                  </span>
                </div>
              ))}

              {chatLoading && (
                <div className="flex items-center gap-2 bg-zinc-900 border-2 border-dashed border-zinc-800 p-3 text-gray-200">
                  <Cpu className="w-4.5 h-4.5 text-white animate-spin" />
                  <span className="font-mono text-[11px] font-black uppercase text-gray-300">
                    Routing query through RAG pipeline...
                  </span>
                </div>
              )}
            </div>

            {/* Input form */}
            <form onSubmit={handleChatSubmit} className="border-t-2 border-zinc-800 pt-4 mt-auto text-black">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Ask agent, e.g. 'Generate match', 'NDA rules'..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-zinc-700 p-2.5 outline-none font-mono font-bold text-xs"
                />
                <button
                  type="submit"
                  disabled={chatLoading}
                  className="bg-white hover:bg-zinc-200 text-black border-2 border-white font-mono font-black px-4 flex items-center justify-center cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
