import React, { useState, useEffect } from "react";
import { Shield, Check, ClipboardCheck, Sparkles, FileText, Calendar, PenTool } from "lucide-react";

export default function NdaRegistration() {
  const [form, setForm] = useState({
    fullName: "",
    registrationType: "Startup",
    focusSector: "",
    primaryObjective: "",
    agreedNda: false,
    agreedAccuracy: false,
    signature: "",
    date: new Date().toISOString().split("T")[0]
  });

  const [submittedReceipt, setSubmittedReceipt] = useState<any>(null);

  useEffect(() => {
    // Check if user is already registered in localStorage
    const saved = localStorage.getItem("z961_nda_registered_receipt");
    if (saved) {
      setSubmittedReceipt(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreedNda || !form.agreedAccuracy) {
      alert("Please check both digital acceptance boxes before submitting.");
      return;
    }

    const receipt = {
      ...form,
      registrationId: "NCEI-NDA-" + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toLocaleString(),
      status: "APPROVED_AND_ACTIVE"
    };

    localStorage.setItem("z961_nda_registered_receipt", JSON.stringify(receipt));
    setSubmittedReceipt(receipt);
  };

  const handleReset = () => {
    localStorage.removeItem("z961_nda_registered_receipt");
    setSubmittedReceipt(null);
    setForm({
      fullName: "",
      registrationType: "Startup",
      focusSector: "",
      primaryObjective: "",
      agreedNda: false,
      agreedAccuracy: false,
      signature: "",
      date: new Date().toISOString().split("T")[0]
    });
  };

  if (submittedReceipt) {
    return (
      <div className="max-w-3xl mx-auto space-y-8" id="nda_receipt_view">
        <div className="bg-emerald-50 border-4 border-emerald-900 p-8 shadow-[6px_6px_0px_0px_rgba(6,78,59,1)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-emerald-900 pb-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-850 font-black tracking-wider">
                <Shield className="w-5 h-5 text-emerald-700" fill="currentColor" />
                <span>NCEI LEBANON DECENTRALIZED CLEARANCE</span>
              </div>
              <h2 className="font-syne font-black text-2xl uppercase tracking-tight text-emerald-950">
                NDA Registration Completed
              </h2>
            </div>
            <span className="mt-3 md:mt-0 px-3 py-1.5 bg-emerald-950 text-white font-mono text-xs font-black uppercase tracking-wider">
              RECEIPT VALID
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans mb-8">
            <div className="bg-white border-2 border-emerald-900 p-4 font-mono space-y-3">
              <div>
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">REGISTRATION REF:</span>
                <span className="text-sm font-black text-emerald-950">{submittedReceipt.registrationId}</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">REGISTERED ENTITY:</span>
                <span className="text-sm font-black text-emerald-950 uppercase">{submittedReceipt.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">PARTICIPATION CLASS:</span>
                <span className="text-sm font-black text-emerald-950 uppercase">{submittedReceipt.registrationType}</span>
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-900 p-4 font-mono space-y-3">
              <div>
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">MAPPED TAXONOMY SECTOR:</span>
                <span className="text-sm font-black text-emerald-950 uppercase">{submittedReceipt.focusSector || "GENERAL TRANSNATIONAL"}</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">REGISTRATION TIMETAG:</span>
                <span className="text-sm font-black text-emerald-950 uppercase">{submittedReceipt.timestamp}</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">E-SIGNATURE APPLIED:</span>
                <span className="text-sm font-black text-emerald-950 font-serif italic uppercase">{submittedReceipt.signature}</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-950 text-emerald-100 p-5 font-mono text-xs leading-relaxed space-y-3 border-2 border-emerald-900">
            <h4 className="font-extrabold uppercase text-white flex items-center gap-2 text-sm">
              <ClipboardCheck className="w-5 h-5 text-emerald-400" />
              <span>ACTIVE BILATERAL sandbox CLEARANCE FOR JULY 2026</span>
            </h4>
            <p>
              Your electronic dispatch has been indexed and approved by NCEI Lebanon’s legal sandbox monitors.
              You may now complete secure matching calculations, inspect institutional datarooms, and participate in direct offshore-backed salary settlement dialogues. This record will serve as an official audit-ready placeholder for two (2) years.
            </p>
          </div>

          <div className="mt-8 flex justify-between gap-4">
            <button
              onClick={() => window.print()}
              className="bg-emerald-950 text-white font-mono text-xs font-black uppercase tracking-wider px-6 py-2.5 border-2 border-emerald-950 hover:bg-emerald-900 cursor-pointer active:translate-y-0.5"
            >
              Print Receipt
            </button>
            <button
              onClick={handleReset}
              className="bg-white text-emerald-950 font-mono text-xs font-black uppercase tracking-wider px-6 py-2.5 border-2 border-emerald-950 hover:bg-emerald-50 cursor-pointer active:translate-y-0.5"
            >
              Reset NDA Filing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-black" id="nda_registration_root">
      {/* Brutalist Header Layout */}
      <div className="border-4 border-black bg-zinc-900 text-white p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 font-extrabold uppercase">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>z961combinator | NCEI Lebanon | July 2026</span>
          </div>
          <h2 className="font-syne font-bold text-2xl md:text-3xl uppercase tracking-tighter">
            NDA Registration & Non-Disclosure Agreement
          </h2>
          <p className="text-xs text-gray-400 font-mono leading-relaxed max-w-xl">
            Governing the transmission of proprietary business models, offshore remittance allocations, and high-trust credentials inside the interactive sandbox.
          </p>
        </div>
        <span className="bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono text-[10px] px-3 py-1.5 font-bold shrink-0">
          FORM CLASS: PRIV74-SEC
        </span>
      </div>

      <form onSubmit={handleSubmit} className="border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] divide-y-4 divide-black">
        {/* PARt I */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-4">
            <span className="bg-black text-white px-2 py-0.5 font-mono text-xs font-black">PART I</span>
            <h3 className="font-syne font-black text-lg uppercase tracking-tight">Participant Registration & Verification</h3>
          </div>
          <p className="text-xs text-gray-500 font-sans font-medium">
            To be completed by all users (Startups, Investors, Innovation Scouts).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-xs font-black uppercase text-black block">
                Full Name/Entity Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Enter your full name or entity name"
                className="w-full text-xs font-mono border-2 border-black p-3 bg-zinc-50 focus:bg-white outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs font-black uppercase text-black block">
                Registration Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Startup", "Investor", "Scout"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm({ ...form, registrationType: type })}
                    className={`border-2 border-black py-2 text-xs font-mono font-black uppercase transition-all cursor-pointer ${
                      form.registrationType === type
                        ? "bg-black text-white"
                        : "bg-zinc-50 hover:bg-zinc-100 text-black"
                    }`}
                  >
                    {type === "Scout" ? "Scout" : type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs font-black uppercase text-black block">
                Focus Sector (as per NCEI taxonomy) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.focusSector}
                onChange={(e) => setForm({ ...form, focusSector: e.target.value })}
                placeholder="e.g. Decentralized Energy, AgTech, Payroll Fintech"
                className="w-full text-xs font-mono border-2 border-black p-3 bg-zinc-50 focus:bg-white outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs font-black uppercase text-black block">
                Primary Objective <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.primaryObjective}
                onChange={(e) => setForm({ ...form, primaryObjective: e.target.value })}
                placeholder="Describe your primary objective"
                className="w-full text-xs font-sans font-medium border-2 border-black p-3 bg-zinc-50 focus:bg-white outline-none h-[42px] max-h-32 min-h-[42px]"
                required
              />
            </div>
          </div>
        </div>

        {/* PART II */}
        <div className="p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-4">
            <span className="bg-black text-white px-2 py-0.5 font-mono text-xs font-black">PART II</span>
            <h3 className="font-syne font-black text-lg uppercase tracking-tight">Non-Disclosure Agreement (NDA)</h3>
          </div>
          <p className="text-xs text-gray-500 font-sans font-medium">
            This Agreement is entered into by and between the Participant and NCEI Lebanon.
          </p>

          <div className="bg-zinc-50 border-2 border-black p-5 font-mono text-xs space-y-4 text-justify leading-relaxed max-h-80 overflow-y-auto">
            <div>
              <h4 className="font-black text-black uppercase mb-1">1. Definition of Confidential Information</h4>
              <p className="font-sans font-medium text-gray-700 normal-case">
                "Confidential Information" includes, but is not limited to, business plans, feasibility studies, financial projections, proprietary technology, and investor mandates shared within the NCEI Virtual Sandbox.
              </p>
            </div>

            <div>
              <h4 className="font-black text-black uppercase mb-1">2. Obligations</h4>
              <p className="font-sans font-medium text-gray-700 normal-case">
                The Participant agrees to hold all Confidential Information in strict confidence and shall not disclose, copy, or use such information for any purpose other than the evaluation of potential cooperation or investment within the Z961combinator program.
              </p>
            </div>

            <div>
              <h4 className="font-black text-black uppercase mb-1">3. Term</h4>
              <p className="font-sans font-medium text-gray-700 normal-case">
                This obligation of confidentiality shall remain in effect for a period of two (2) years from the date of disclosure.
              </p>
            </div>

            <div>
              <h4 className="font-black text-black uppercase mb-1">4. Exclusions</h4>
              <p className="font-sans font-medium text-gray-700 normal-case">
                This agreement does not apply to information that is already in the public domain or independently developed without reliance on Confidential Information.
              </p>
            </div>
          </div>
        </div>

        {/* PART III */}
        <div className="p-6 md:p-8 space-y-5">
          <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-4">
            <span className="bg-black text-white px-2 py-0.5 font-mono text-xs font-black">PART III</span>
            <h3 className="font-syne font-black text-lg uppercase tracking-tight">Code of Conduct & Governance</h3>
          </div>
          <p className="text-xs text-gray-500 font-sans font-medium">
            By clicking "Accept" below, the Participant agrees to:
          </p>

          <ul className="space-y-2.5 text-xs font-sans font-medium text-gray-800 list-disc pl-5">
            <li>Maintain the integrity of the Institutional Sandbox by providing accurate data and professional responses.</li>
            <li>Acknowledge that NCEI Lebanon acts as the neutral mediator and institutional overseer of all interactions.</li>
            <li>Respect the intellectual property of all other participants.</li>
            <li>Abide by the NCEI dispute resolution process in the event of any professional disagreement.</li>
          </ul>
        </div>

        {/* Digital Acceptance Block */}
        <div className="p-6 md:p-8 bg-zinc-50 space-y-6">
          <h4 className="font-mono text-xs font-black uppercase text-black tracking-wider">Digital Acceptance & Signature</h4>
          
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agreedNda}
                onChange={(e) => setForm({ ...form, agreedNda: e.target.checked })}
                className="w-4 h-4 mt-0.5 border-2 border-black text-black focus:ring-0 focus:outline-none shrink-0"
              />
              <span className="text-xs font-sans font-semibold text-gray-800 select-none">
                I have read and agree to the Terms of Participation and the Non-Disclosure Agreement.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agreedAccuracy}
                onChange={(e) => setForm({ ...form, agreedAccuracy: e.target.checked })}
                className="w-4 h-4 mt-0.5 border-2 border-black text-black focus:ring-0 focus:outline-none shrink-0"
              />
              <span className="text-xs font-sans font-semibold text-gray-800 select-none">
                I verify that the information provided is accurate to the best of my knowledge.
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-black">
            <div className="space-y-2">
              <label className="font-mono text-xs font-black uppercase tracking-wider text-black flex items-center gap-1">
                <PenTool className="w-3.5 h-3.5" />
                <span>Electronic Signature</span>
              </label>
              <input
                type="text"
                value={form.signature}
                onChange={(e) => setForm({ ...form, signature: e.target.value })}
                placeholder="Sign here"
                className="w-full text-xs font-mono border-2 border-black p-2.5 bg-white focus:bg-white outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs font-black uppercase tracking-wider text-black flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date</span>
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full text-xs font-mono border-2 border-black p-2.5 bg-white focus:bg-white outline-none"
                required
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto bg-black text-white hover:bg-zinc-900 border-2 border-black font-mono font-black uppercase tracking-wider text-xs px-8 py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Accept & Register</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
