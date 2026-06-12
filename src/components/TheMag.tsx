import React, { useState } from "react";
import { Download, Mail, Sparkles, ArrowRight, BookOpen, Share2, Eye, Star, Heart, Flame, ShieldAlert } from "lucide-react";

interface Article {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  imageUrl: string;
  date: string;
  takeaways?: string[];
  references?: string[];
}

export default function TheMag() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [likes, setLikes] = useState<{ [key: string]: number }>({
    "1": 44,
    "2": 21,
    "3": 33,
    "4": 59,
    "5": 70
  });
  const [likedList, setLikedList] = useState<string[]>([]);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const curatedArticles: Article[] = [
    {
      id: "4",
      category: "OPERATIONAL MODEL",
      title: "Navigating Complexity: Our Operational Hub-and-Spoke Model",
      subtitle: "In a VUCA world, traditional centralized structures fail. Discover the dynamics of systemic resilience and local operational autonomy.",
      excerpt: "By empowering participating startups and local innovation scouts as decentralized spokes, the Combinator builds a distributed network that thrives on regional tremors.",
      content: "In a VUCA (Volatility, Uncertainty, Complexity, Ambiguity) world, traditional centralized structures often fail under pressure. The Z961-Combinator adopts an Adaptive Ecosystem model designed to turn regional instability into a competitive advantage.\n\n• The Hub (Strategic Alignment): The Combinator acts as the central intelligence node. It provides the \"Common Control Framework,\" including standardized AI-native audit templates and regulatory compliance guidelines.\n\n• The Spokes (Operational Autonomy): Our participating startups and innovation scouts operate as localized \"spokes\". They are empowered to manage their own workflows, enabling rapid response to local market shifts without waiting for centralized approval.\n\n• Systemic Resilience: This distributed network ensures that disruption at any single node does not jeopardize the entire ecosystem. The hub facilitates continuous feedback loops, allowing the collective to \"pre-sense\" market tremors and pivot before threats escalate.\n\nLeadership Competencies: From Controllers to Evolutionary Architects\nIn a VUCA-defined MENA region, the traditional command-and-control leadership model is increasingly inadequate. Effective leadership now requires \"adaptive capacity\"—the ability to maintain cognitive flexibility and interpret complex signals through diverse cultural and institutional systems. Rather than attempting to suppress instability, leaders must act as evolutionary architects who design systems capable of self-correction and continuous adaptation.\n\nKey Leadership Competencies:\n• Systems Thinking: The ability to perceive the interconnectedness of regional macroeconomic shifts (e.g., energy price fluctuations) and local operational realities.\n• Strategic Foresight: Transitioning from reactive firefighting to building organizational \"pre-sensing\" mechanisms that allow the \"hub\" to anticipate systemic tremors before they reach the \"spokes\".\n• Distributed Empowerment: Cultivating a high-trust environment where local \"spokes\" possess the autonomy to make rapid decisions on the ground, guided by centralized, AI-informed strategic pillars.\n\nCase Studies: Navigating Complexity\n\nCase Study A: Distributed Resilience in Regional Logistics\nIn response to recurring supply chain disruptions in the MENA region, leading logistics firms have pivoted from centralized warehousing to a decentralized hub-and-spoke delivery network.\n• The Approach: By utilizing localized \"micro-hubs\" (spokes), these organizations reduced their vulnerability to transit blockages.\n• The Result: When regional instability caused a major port to slow operations, the decentralized network enabled rapid rerouting through secondary spokes, maintaining service continuity that competitors relying on centralized mega-hubs could not match.\n\nCase Study B: AI-Driven Financial Auditing in Emerging Markets\nA fintech initiative operating across multiple high-volatility markets utilized an AI-native audit suite to combat \"Knightian\" uncertainty.\n• The Approach: Instead of relying on manual, periodic audits, the organization implemented continuous, automated data verification across all its regional entities.\n• The Result: The system detected anomalous revenue patterns—which traditional models missed—within hours of their emergence. By addressing these discrepancies at the \"spoke\" level immediately, the central hub successfully prevented systemic liquidity risks from cascading into their broader investment portfolio.",
      author: "Z961 Editorial Board",
      readTime: "5 MIN READ",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
      date: "JULY 15, 2026",
      takeaways: [
        "The central Hub provides institutional compliance boundaries, standardized AI audit logs, and strategic guidance blueprints.",
        "Local Spokes manage specialized nodes autonomously, facilitating real-time adjustment to swift macroeconomic shocks.",
        "A distributed topological network insulates the critical baseline infrastructure, ensuring localized tremors cannot trigger a systemic breakdown.",
        "Proactive strategic alignment at the hub level secures direct integration pipelines with accredited diaspora trust repositories.",
        "Decentralized decision frameworks encourage risk-focused tinkering, building organizational agility under market instability."
      ],
      references: [
        "McKinsey & Company. (2026). Middle East & Africa Insights.",
        "Dodds, P. S., Watts, D. J., & Sabel, C. F. (2003). Information exchange and the robustness of organizational networks. PNAS, 100(21), 12516-12521.",
        "Nnaomah, U. I., et al. (2024). AI in risk management: An analytical comparison between the U.S. and Nigerian banking sectors. IJSTRA, 6(1), 127-146.",
        "Syamsir, S. (2025). Leadership agility in a VUCA world: A systematic review. Taylor & Francis."
      ]
    },
    {
      id: "5",
      category: "LEADERSHIP FRAMEWORK",
      title: "The Evolutionary Architect: Leading Through Uncertainty",
      subtitle: "The Evolutionary Architect: Leading Through Uncertainty in a VUCA Landscape.",
      excerpt: "Transitioning strategic leadership from command-and-control frameworks to antifragile, emergent systems driven by tinkering and continuous AI-monitoring.",
      content: "To effectively navigate the \"VUCA\" (Volatility, Uncertainty, Complexity, Ambiguity) landscape in the MENA region, organizational strategies must shift from static, command-and-control models to antifragile, adaptive systems.\n\n1. The Shift to Antifragile Systems\nIn contrast to mere \"resilience\" (the ability to bounce back), antifragility—a concept popularized by Nassim Taleb—describes systems that grow stronger when exposed to stressors and disorder.\n• Structural Adaptability: Research suggests that organizational resilience is an emergent property rather than an individual trait. Organizations that decentralize decision-making (using a \"hub-and-spoke\" or multiscale network model) are significantly better at preventing systemic failure because they contain localized dependencies, preventing a single node failure from cascading into total collapse.\n• The Role of Tinkering: Antifragile systems thrive by \"tinkering\"—creatively responding to environmental changes through small, iterative experiments rather than rigid, top-down design.\n\n2. Leadership in a VUCA World\nTraditional leadership frameworks prioritizing stability are increasingly ineffective in high-volatility environments. (SBS Journal of Applied Business Research - SBS Swiss Business School)\n• Agile Governance: Modern leadership requires \"adaptive capacity,\" defined by cognitive flexibility and the ability to interpret leadership signals through cultural systems. (SBS Swiss Business School)\n• Strategic Foresight: Leaders must transition from \"controllers\" to \"evolutionary architects.\" This involves fostering distributed intelligence and systemic trust to empower local \"spokes\" while maintaining high-level strategic alignment at the \"hub\". (SBS Swiss Business School)\n\n3. AI-Driven Verification and Risk Management\nFor ventures like the Z961-Combinator and AI-native audit suites, artificial intelligence serves as a critical stabilization mechanism against \"Knightian\" uncertainty (unquantifiable risk).\n• Continuous Monitoring: AI facilitates real-time identification, assessment, and mitigation of risks by processing vast datasets to detect anomalies that traditional manual audit methods would miss.\n• Proactive Mitigation: Predictive analytics enable organizations to identify patterns signaling potential threats (fraud, market volatility, or supply chain blockages) before they manifest, allowing for immediate corrective action.\n• Institutional Flexibility: The integration of AI requires supportive IT infrastructure and \"technological competence,\" which are essential for emerging markets to bridge the gap between traditional risk management and the modern requirements of global financial integration.\n\nSuccess in the MENA entrepreneurship landscape requires shifting from a \"Controller\" mindset to that of an Evolutionary Architect. We define the core competencies for our founders and leaders as follows:\n• Adaptive Governance: Leaders must cultivate the ability to interpret complex signals through diverse cultural and institutional systems.\n• Systems Thinking: Success depends on the ability to perceive the interconnectedness of macroeconomic forces—such as energy price shifts—and translate them into actionable, on-the-ground startup strategies.\n• Antifragile Tinkering: We encourage \"tinkering\" as a formal methodology. By running small, iterative experiments, founders build organizations that do not just survive volatility, but grow stronger when exposed to it.\n• Radical Transparency: Our commitment to AI-Native Business Verification ensures that every entity maintains a real-time \"health audit,\" effectively mitigating Knightian uncertainty and building trust across the investor network.",
      author: "SBS Swiss Business School Contributor",
      readTime: "6 MIN READ",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
      date: "JULY 14, 2026",
      takeaways: [
        "Antifragility describes systems that actively evolve and improve under volatile conditions, distinct from mere static defenses.",
        "Sovereign leaders must act as Evolutionary Architects by promoting distributed system trust and local tinkering permissions.",
        "AI-informed monitoring and risk engines neutralize Knightian uncertainties, providing verifiable stability metrics.",
        "By structuring teams as distributed networks, organizations effectively prevent localized shocks from cascading into systemic collapse.",
        "Transitioning from static command structures to feedback-driven architectures optimizes long-term survival in high-volatility regions."
      ],
      references: [
        "Danchin, A., Binder, P. M., & Noria, S. (2011). Antifragility and tinkering in biology (and in business) flexibility provides an efficient epigenetic way to manage risk. Genes, 2(4), 998–1016.",
        "Dodds, P. S., Watts, D. J., & Sabel, C. F. (2003). Information exchange and the robustness of organizational networks. PNAS, 100(21), 12516–12521.",
        "Nnaomah, U. I., et al. (2024). AI in risk management: An analytical comparison between the U.S. and Nigerian banking sectors. IJSTRA, 6(1), 127–146.",
        "Syamsir, S. (2025). Leadership agility in a VUCA world: A systematic review. Taylor & Francis."
      ]
    },
    {
      id: "1",
      category: "ALGORITHMIC CLEARANCE",
      title: "Circular 165 and the Rise of Decentralized Remittance Clearing",
      subtitle: "How autonomous digital wallets are establishing direct financial pipelines with the Beirut tech core.",
      excerpt: "By bypassing traditional interbank blockages, Lebanon's premium engineers are constructing low-latency wallets to settle diaspora capital instantly under verified sandboxed jurisdictions.",
      content: "The landscape of Lebanese fintech has undergone a silent, radical transformation. Central Bank Circular 165 laid the preliminary infrastructure for clearing electronic transfers in fresh funds, but the actual optimization occurs at the edges. Under the supervision of the National Council for Entrepreneurship & Innovation (NCEI Lebanon), algorithmic consensus engines are now backing peer-to-peer developer compensation loops. The 961 Combinator acts as the visual manifest database of this transition. By coupling sovereign code repositories with diaspora financial reserves, standard software deliverables are cleared instantly without local banking friction, ensuring maximum face-value liquidity.",
      author: "Farah Al-Sayegh",
      readTime: "4 MIN READ",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop",
      date: "JULY 10, 2026",
      takeaways: [
        "BDL Circular 165 lays the framework for fresh funds settlement, which high-end engineer nodes subsequently clear in low-latency networks.",
        "Sovereign code repository delivery status is directly coupled to diaspora escrow reserves, automating instant clearance.",
        "Decentralized payment loops keep capital fully liquid and eliminate heavy interbank service friction.",
        "Direct peer-to-peer developer compensation loops circumvent traditional cross-border institutional friction.",
        "Securing compliant virtual sandboxes with sovereign clearing protocols ensures maximum cash-in, cash-out security for regional innovators."
      ],
      references: [
        "Banque du Liban (BDL). (2024). Central Bank Circular 165 Regulations.",
        "National Council for Entrepreneurship & Innovation (NCEI Lebanon). (2026). Technical Clearing Protocols."
      ]
    },
    {
      id: "2",
      category: "AVANT-GARDE DESIGN",
      title: "The Architecture of Sovereign Digital Aesthetics",
      subtitle: "Exposing the design language of high-performance micro-economies.",
      excerpt: "Brutalism, Swiss modern typography, and strict monochrome layouts are not merely stylist selections; they are assertions of operational clarity under systemic constraints.",
      content: "Traditional web interfaces treat design as a superficial wrapper of marketing copy. Avant-garde interfaces, however, employ structural design like architectural blueprints. For the 961 Combinator, every block, every checkbox boundary, and every rotating star reflects functional logic. In a state of highly volatile resource availability, typography like 'Space Grotesk' and 'JetBrains Mono' minimizes decorative heavy payload images while delivering maximal cognitive impact and readability. True craftsmanship means executing code whose layouts speak louder than its claims—using raw data, stark grids, and pure typographic hierarchies.",
      author: "Marc El-Chidiac",
      readTime: "3 MIN READ",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
      date: "JULY 03, 2026",
      takeaways: [
        "Strict monochrome layouts and raw typographic grids minimize high-payload network demands.",
        "Structural UI components function as blueprints representing logical underlying infrastructure.",
        "High-contrast formatting builds instantaneous user-facing clarity and systemic trust.",
        "Pairing elegant display weights like Space Grotesk and JetBrains Mono removes the need for excessive bandwidth decor.",
        "Transparent design choices communicate organizational rigor, asserting operational integrity under resource constraints."
      ],
      references: [
        "El-Chidiac, M. (2026). Sovereign UX Architectures under Grid & Resource Constraints."
      ]
    },
    {
      id: "3",
      category: "DIASPORA TRUSTS",
      title: "Remodeling the Brain Drain into a Remote Brain Force",
      subtitle: "Why global tech leaders are backing local engineer clusters inside Z961.",
      excerpt: "Instead of promoting absolute human capital flight, diaspora investment trusts are shifting priorities to keep elite developers on Lebanese soil while matching global pay averages.",
      content: "The narrative of regional exodus is being disrupted. Diaspora networks across Paris, London, and Silicon Valley have realized that physical relocation is no longer the optimal path for scaling technology. By keeping engineering teams domiciled locally within secure institutional sandboxes, startup teams maintain extreme capital efficiency while founders secure living wages that exceed domestic indices tenfold. Over 45 active investment mandates currently integrated with NCEI monitors are specifically earmarked for non-exportable, high-speed engineering nodes, allowing Lebanon to operate as a premium off-shore developer conservatory.",
      author: "Rania Warde",
      readTime: "5 MIN READ",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
      date: "JUNE 28, 2026",
      takeaways: [
        "Technology enables physical local retention while exporting high-value intellectual labor on global metrics.",
        "Generous diaspora trusts channel strategic wages directly, avoiding physical emigration pressure on developers.",
        "Secure institutional sandboxes allow direct offshore deployment compliance, fostering rapid foreign capital ingress.",
        "Domiciled engineering clusters deliver exceptional efficiency benefits without compromising global payroll targets.",
        "Strategic wage incentives cultivate sustainable domestic hubs, transforming the regional brain drain into a remote brain force."
      ],
      references: [
        "Warde, R. (2026). Remodeling Human Capital Flight in High-Volatility Technology Sectors.",
        "National Council for Entrepreneurship & Innovation (NCEI Lebanon). (2026). Diaspora Capital Deployment Maps."
      ]
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    // Mimic storing local subscriber state
    localStorage.setItem("z961_mag_subscriber_email", email);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedList.includes(id)) {
      setLikes({ ...likes, [id]: likes[id] - 1 });
      setLikedList(likedList.filter((item) => item !== id));
    } else {
      setLikes({ ...likes, [id]: likes[id] + 1 });
      setLikedList([...likedList, id]);
    }
  };

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/?tab=the-mag&article=${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setToastMessage("Cleared Article Link Copied!");
      setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    }).catch(() => {
      // Manual/Secondary Fallback
      setToastMessage("Cleared Reference Logged!");
      setTimeout(() => {
        setToastMessage(null);
      }, 2500);
    });
  };

  // Simulated PDF Generation / Download with avant-garde loading
  const handlePdfDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(10);
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            setDownloadProgress(0);
            
            // Trigger browser native simulation
            const link = document.createElement("a");
            link.href = "#";
            // Create a fake txt/pdf structure for downloader
            const blob = new Blob([
              `961 COMBINATOR VIRTUAL MAG - JULY 2026 EDITION\n\n` +
              `Nurtured by the National Council for Entrepreneurship & Innovation (NCEI Lebanon)\n` +
              `========================================================================\n\n` +
              `This document serves as an official printout of the June/July 2026 compilation.\n\n` +
              `CURATED ARTICLES:\n` +
              `1. THE Z961-COMBINATOR: HUB-AND-SPOKE MODEL\n` +
              `2. LEADERSHIP IN THE MENA STARTUP ECOSYSTEM: THE EVOLUTIONARY ARCHITECT\n` +
              `3. REMITTANCE CLEARING VIA BDL CIRCULAR 165 - by Farah Al-Sayegh\n` +
              `4. THE ARCHITECTURE OF SOVEREIGN aesthetics - by Marc El-Chidiac\n` +
              `5. DIGITAL BRAIN PIECE ON LEBANESE SOIL - by Rania Warde\n\n` +
              `------------------------------------------------------------------------\n` +
              `Status: AUDIT APPROVED AND READY FOR DIASPORA CIRCULATION\n` +
              `NCEI Registry Reference: NCEI-MAG-PUB7512\n` +
              `Printed On: ${new Date().toLocaleString()}`
            ], { type: "text/plain" });
            link.download = "THE_MAG_961_JULY_2026_COMPLATION.txt";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 300);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 text-black text-left" id="the_mag_root">
      
      {/* 1. EDITORIAL HEADER & BARCODE (AVANT-GARDE COVER DESIGN) */}
      <div className="border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="mag_cover_header">
        {/* Left Side: Oversized Editorial Branding */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-zinc-500 font-extrabold uppercase">
              <span>961 combinator publication</span>
              <span className="text-black">•</span>
              <span className="text-orange-500">Vol. 04 / Jul 2026</span>
              <span className="text-black">•</span>
              <span className="bg-zinc-100 px-2 py-0.5 border border-zinc-300">LEGAL CLASSIFICATION: OPEN</span>
            </div>
            
            <h1 className="font-syne font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none select-none uppercase">
              THE MAG <span className="font-serif font-light text-3xl md:text-5xl tracking-normal italic text-zinc-500 lowercase">xyz</span>
            </h1>
            
            <p className="text-[15px] md:text-[17px] font-serif italic text-zinc-700 max-w-xl">
              An avant-garde repository compiling critical ecosystem briefings, data-clearing standards, diaspora network developments, and technical policy reports.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10.5px] font-mono font-bold uppercase text-zinc-500">
            <span>CHIEF EDITOR: MANBARAZY</span>
            <span>|</span>
            <span>SUPPORT BY: NCEI LEBANON</span>
            <span>|</span>
            <span>PUBLISHED BI-WEEKLY</span>
          </div>
        </div>

        {/* Right Side: Brutalist Barcode & Download/Aesthetic Meta */}
        <div className="lg:col-span-4 border-t-2 lg:border-t-0 lg:border-l-2 border-black pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between space-y-6" id="mag_cover_meta">
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-orange-600 block uppercase">
              DOWNLOAD DISPATCH
            </span>
            <p className="text-xs font-sans font-medium text-gray-500 leading-snug">
              Get the entire curated high-fidelity publication in a single printed PDF dossier for offline briefing or board meetings.
            </p>
            
            {/* Interactive Download Trigger */}
            <button
              onClick={handlePdfDownload}
              disabled={isDownloading}
              className="w-full bg-zinc-950 text-white hover:bg-orange-600 border-2 border-black font-mono font-black uppercase text-xs px-4 py-3 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
            >
              {isDownloading ? (
                <span>COMPILING DOSSIER ({downloadProgress}%)</span>
              ) : (
                <>
                  <Download className="w-4 h-4 text-orange-500 animate-bounce" />
                  <span>DOWNLOAD VIRTUAL PDF</span>
                </>
              )}
            </button>
          </div>

          {/* Brutalist CSS Barcode Representation */}
          <div className="font-mono text-center space-y-1 select-none" id="brutalist_barcode">
            <div className="flex justify-center items-stretch h-9 gap-[1px] bg-black p-1">
              {[3,1,4,1,5,9,2,6,5,3,5,8,9,7,9,3,2,3,8,4,6,2,6,4,3,3,8,3,2,7,9,5,0].map((width, idx) => (
                <div 
                  key={idx} 
                  className="bg-white" 
                  style={{ width: `${width === 0 ? 1 : width * 0.7}px` }} 
                />
              ))}
            </div>
            <span className="text-[9px] text-zinc-400 font-extrabold tracking-[0.3em]">NCEI-MAG-2026-XQ</span>
          </div>
        </div>
      </div>

      {/* STARTUP INVESTMENTS SUMMARY BANNER */}
      <div className="border-4 border-black bg-amber-400 text-black p-5 md:p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" id="investment_wrapped_banner">
        <div className="absolute right-0 top-0 h-full w-24 bg-black/5 flex items-center justify-center font-mono text-7xl font-black select-none pointer-events-none text-black/10">
          $
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase text-black bg-black text-amber-400 px-2.5 py-1 w-fit">
              <span>💰 STARTUP INVESTMENTS SUMMARY</span>
            </div>
            <h3 className="font-syne font-black text-lg md:text-xl uppercase tracking-tight">
              May Wrapped Up with <b className="underline decoration-black decoration-2">$152.5M</b> in Funding Across 21 MENA-Based Startups:
            </h3>
            <p className="text-xs font-semibold leading-relaxed text-black">
              The <span className="font-black">UAE</span> captured <span className="font-sans font-black">51.4%</span> of the funding value and <span className="font-sans font-black">42.9%</span> of the deals. While <span className="font-black">Saudi Arabia</span> captured <span className="font-sans font-black">44.5%</span> of the funding value and <span className="font-sans font-black">38.1%</span> of the deals. This brings the total funding raised so far this year to <b className="font-mono text-xs bg-black text-white px-1 py-0.5">$1.07B</b> across <span className="font-black">181 startups</span> in the region.
            </p>
          </div>
          
          {/* Circular mini info indicators for high-fidelity representation */}
          <div className="flex gap-2 shrink-0 font-mono text-[9px] font-extrabold uppercase">
            <div className="bg-black text-white p-2.5 border border-black flex flex-col items-center justify-center text-center">
              <span className="text-amber-400 text-xs font-sans font-bold">51.4%</span>
              <span className="text-[7.5px] text-zinc-400 font-medium">UAE VALUE</span>
            </div>
            <div className="bg-black text-white p-2.5 border border-black flex flex-col items-center justify-center text-center">
              <span className="text-amber-400 text-xs font-sans font-bold">44.5%</span>
              <span className="text-[7.5px] text-zinc-400 font-medium">KSA VALUE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE MAG AVANT-GARDE SUBSCRIBE BANNER */}
      <div className="border-4 border-black bg-zinc-950 text-white p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(249,115,22,1)]" id="mag_subscription_banner">
        {/* Abstract decorative orange grid overlay */}
        <div className="absolute inset-y-0 right-0 w-1/3 opacity-5 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none hidden md:block"></div>
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-orange-500 font-mono text-[10px] md:text-xs font-black tracking-widest uppercase">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>THE COVETED BI-WEEKLY DISPATCH</span>
            </div>
            <h2 className="font-syne font-black text-2xl md:text-4xl uppercase tracking-tighter">
              Subscribe to the MAG Newsletter
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 font-serif font-light max-w-2xl leading-relaxed">
              We compile the absolute finest algorithmic clearings, pending investment mandates, ecosystem insights, and developer logs directly from NCEI's Beirut registry. No fluff, pure architecture.
            </p>
          </div>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2 max-w-lg">
              <div className="relative w-full bg-zinc-900 border border-zinc-805 text-white flex items-center px-3 gap-2.5">
                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="ENTER YOUR RESEARCH EMAIL..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3.5 bg-transparent text-xs font-mono font-bold uppercase placeholder-zinc-550 outline-none text-white"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-600 text-white hover:bg-orange-500 font-mono text-xs font-black uppercase tracking-widest px-6 py-3.5 shrink-0 transition-colors border-2 border-orange-600 hover:border-orange-500 cursor-pointer text-center"
              >
                DISPATCH ENTRY
              </button>
            </form>
          ) : (
            <div className="bg-[#121212] border-2 border-orange-500/50 p-5 font-mono text-xs max-w-xl space-y-3" id="suscbribe_success_box">
              <div className="flex items-center gap-2 text-orange-500 font-black text-sm">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>CLEARANCE ENGAGED • ENLISTED SUCCESSFUL</span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-[11px] normal-case">
                Thank you! We have logged <b className="text-white font-mono uppercase">{email}</b> in the Z961 subscriber array. Your digital dispatch clearance ID is <b className="text-orange-400 font-mono">NCEI-SUB-{Math.floor(1000 + Math.random() * 9000)}-MAG</b>. You will receive the next high-fidelity ecosystem brief on next Tuesday.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. CURATED ARTICLES (AVANT-GARDE EDITORIAL DESIGN) */}
      <div className="space-y-6" id="mag_articles_block">
        <div className="flex items-baseline justify-between border-b-4 border-black pb-2">
          <h3 className="font-syne font-black text-lg md:text-2xl uppercase tracking-tighter">
            Curated Publications & Bulletins
          </h3>
          <span className="font-mono text-xs font-black text-zinc-550 shrink-0">
            NCEI APPROVED READS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Selected Article View (Deep Dive Modal / Section) */}
          {activeArticleId && (
            <div className="col-span-12 bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative" id="active_article_reader">
              <button 
                onClick={() => setActiveArticleId(null)}
                className="absolute top-5 right-5 font-mono text-xs font-black uppercase border-2 border-black bg-zinc-900 text-white hover:bg-black px-3 py-1 cursor-pointer"
              >
                CLOSE READWAY
              </button>
              
              {(() => {
                const art = curatedArticles.find((a) => a.id === activeArticleId)!;
                return (
                  <div className="space-y-6 max-w-4xl">
                    <div className="space-y-2">
                      <span className="text-[10px] bg-black text-orange-400 px-2 py-0.5 border border-black font-mono font-extrabold uppercase tracking-widest">
                        {art.category}
                      </span>
                      <h2 className="font-syne font-black text-2xl md:text-4xl text-black uppercase tracking-tight leading-none pt-2">
                        {art.title}
                      </h2>
                      <p className="font-serif italic text-[17px] md:text-[19px] text-zinc-650 font-light leading-snug">
                        {art.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 border-y border-zinc-200 py-3 font-mono text-[10px] text-zinc-500 font-bold uppercase">
                      <span>WRITTEN BY: {art.author}</span>
                      <span>•</span>
                      <span>PUBLISHED: {art.date}</span>
                      <span>•</span>
                      <span>TIME: {art.readTime}</span>
                    </div>

                    {/* Highly Polished Key Takeaways section */}
                    {art.takeaways && art.takeaways.length > 0 && (
                      <div className="bg-amber-50 border-2 border-black p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3" id={`takeaways_box_${art.id}`}>
                        <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-amber-900 tracking-wide">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-600 animate-pulse" />
                          <span>EXECUTIVE KEY TAKEAWAYS</span>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-bold text-zinc-900 list-none font-sans uppercase">
                          {art.takeaways.map((takeaway, tIdx) => (
                            <li key={tIdx} className="flex gap-2 items-start bg-white p-3 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-50/10 transition-colors">
                              <span className="text-orange-500 font-mono font-black shrink-0">0{tIdx + 1}.</span>
                              <span className="leading-snug text-zinc-800">{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="font-sans text-[15px] md:text-[17px] text-gray-800 leading-relaxed max-w-3xl text-justify font-medium normal-case space-y-4">
                      {art.content.split("\n\n").map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>

                    {/* Structured References Bibliography Section */}
                    {art.references && art.references.length > 0 && (
                      <div className="bg-zinc-50 border-2 border-black p-4 sm:p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] space-y-2 mt-4" id={`references_box_${art.id}`}>
                        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs font-black uppercase text-zinc-650 tracking-wider">
                          <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                          <span>ACADEMIC CITATIONS & OFFICIAL SOURCE REGISTRIES</span>
                        </div>
                        <ul className="grid grid-cols-1 gap-1.5 text-[10px] font-mono font-semibold text-zinc-600 list-none select-text">
                          {art.references.map((ref, rIdx) => (
                            <li key={rIdx} className="flex gap-2 items-start">
                              <span className="text-zinc-400 shrink-0 select-none">[{rIdx + 1}]</span>
                              <span className="leading-normal hover:text-black transition-colors">{ref}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-4 flex gap-4">
                      <button
                        onClick={(e) => handleLike(art.id, e)}
                        className={`font-mono text-xs font-black uppercase px-4 py-2 border-2 border-black flex items-center gap-1.5 cursor-pointer hover:bg-zinc-100 ${
                          likedList.includes(art.id) ? "bg-black text-white hover:bg-zinc-900" : "bg-white text-black"
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5" fill={likedList.includes(art.id) ? "currentColor" : "none"} />
                        <span>INTERESTING ({likes[art.id]})</span>
                      </button>
                      <button
                        onClick={(e) => handleShare(art.id, e)}
                        className="font-mono text-xs font-black uppercase px-4 py-2 border-2 border-black bg-white hover:bg-zinc-100 text-black flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-y-1 transition-all"
                      >
                        <Share2 className="w-3.5 h-3.5 text-orange-600" />
                        <span>SHARE REF</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Grid list of curated articles */}
          {curatedArticles.map((art) => {
            const isReadingThis = activeArticleId === art.id;
            return (
              <div 
                key={art.id} 
                className={`col-span-12 md:col-span-4 bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all group ${
                  isReadingThis ? "ring-4 ring-orange-500" : ""
                }`}
                id={`article_card_${art.id}`}
              >
                <div className="space-y-4">
                  {/* Article category + date */}
                  <div className="flex justify-between items-center font-mono text-[9px] text-zinc-400 font-extrabold uppercase border-b border-zinc-100 pb-2">
                    <span className="text-orange-600">{art.category}</span>
                    <span>{art.date}</span>
                  </div>

                  {/* Curated Graphic image inside magazine borders */}
                  <div className="aspect-[16/10] bg-black border border-zinc-200 overflow-hidden relative">
                    <img 
                      src={art.imageUrl} 
                      alt={art.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 left-2 bg-black text-white text-[8px] font-mono font-black uppercase px-1.5 py-0.5 border border-white/20 select-none">
                      {art.readTime}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <h4 className="font-syne font-black text-base uppercase leading-tight text-zinc-950 group-hover:text-orange-600 transition-colors">
                      {art.title}
                    </h4>
                    <p className="font-serif italic text-[15px] text-zinc-600 font-light leading-snug">
                      {art.subtitle}
                    </p>
                    <p className="text-[14px] text-zinc-500 font-sans font-medium line-clamp-3 pt-1">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-dashed border-zinc-200 mt-4 flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => setActiveArticleId(art.id)}
                    className="font-mono text-[10px] font-black uppercase tracking-wider text-black flex items-center gap-1.5 hover:text-orange-600 cursor-pointer"
                  >
                    <span>READ DOSSIER</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleShare(art.id, e)}
                      className="font-mono text-[10px] font-extrabold px-2 py-1 border border-black bg-zinc-50 hover:bg-zinc-100 text-zinc-800 flex items-center gap-1 cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] active:translate-y-1 active:shadow-none transition-all"
                      title="Share link"
                    >
                      <Share2 className="w-3 h-3 text-orange-600" />
                      <span>SHARE</span>
                    </button>
                    <button
                      onClick={(e) => handleLike(art.id, e)}
                      className={`font-mono text-[10px] font-extrabold px-2 py-1 border border-black flex items-center gap-1 cursor-pointer ${
                        likedList.includes(art.id) ? "bg-black text-white" : "bg-zinc-50 hover:bg-zinc-100 text-zinc-800"
                      }`}
                    >
                      <Heart className="w-3 h-3 text-red-500" fill={likedList.includes(art.id) ? "currentColor" : "none"} />
                      <span>{likes[art.id]}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. EXPLICIT DIAGNOSTIC AUDIT LOGS STATING TRUST CHANNELS */}
      <div className="border-4 border-black p-5 bg-[#E6F3FF] text-[#123C69] font-mono text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none">
        <h4 className="font-mono text-[11px] font-black uppercase tracking-wider text-[#123C69] flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>OFFICIAL REGISTRY SPECIFICATIONS FOR MAG INTEL</span>
        </h4>
        <p className="text-[10px] leading-relaxed font-sans font-semibold text-zinc-800 uppercase text-justify normal-case">
          The curated news bulletins featured in THE MAG are derived directly from regulatory proposals, diaspora feedback, and software activity maps validated by the Sandbox mediators at NCEI Lebanon. If you are an active startup founder inside the Sandbox and would like to request editorial publication, submit your Feasibility Study or schedule a Pitch Lab peer review.
        </p>
      </div>

      {/* Global Neobrutalist Floating Toast Notification */}
      {toastMessage && (
        <div 
          className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 bg-amber-400 text-black border-4 border-black p-4 font-mono text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.95)] flex items-center gap-3 animate-bounce"
          id="mag_share_toast_alert"
        >
          <span className="w-6 h-6 bg-black text-amber-400 rounded-none flex items-center justify-center border border-black font-sans text-sm select-none">
            ⚡
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
