import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI client (server-side only)
const geminiApiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey: geminiApiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

app.use(express.json());

// --- Interfaces for our DB ---
interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface Story {
  id: string;
  title: string;
  url?: string;
  text?: string;
  author: string;
  timestamp: string;
  points: number;
  commentsCount: number;
  comments: Comment[];
  category: "all" | "tech" | "economy" | "news" | "ask" | "show";
  voters: string[]; // Store IP addresses or unique poster ids to prevent double voting locally
}

interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  industry: string;
  stage: string;
  city: string;
  website: string;
  funding: string;
  founder: string;
  founded: string;
  teamSize: number;
}

interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  type: string; // Full-time, Part-time, Contract, Remote
  location: string;
  salary: string;
  description: string;
  skills: string[];
  timestamp: string;
  points?: number;
  commentsCount?: number;
}

// --- Pre-seeded databases ---
let stories: Story[] = [
  {
    id: "story-1",
    title: "Lebanese Remote Software Engineers bring in an estimated $180M fresh USD annually",
    url: "https://economylebanon.org/tech-fresh-dollars",
    author: "mbarazy",
    timestamp: "2 hours ago",
    points: 84,
    commentsCount: 3,
    category: "tech",
    voters: [],
    comments: [
      {
        id: "c1",
        author: "charbel_t",
        text: "This is saving some entire households. Remote work bypassing physical constraints is the absolute best thing that happened to Lebanese talent in the last decade.",
        timestamp: "1 hour ago",
      },
      {
        id: "c2",
        author: "nour_k",
        text: "True, but setting up direct fresh USD wires is still painful. Many rely on alternative setups or global virtual banks.",
        timestamp: "45 mins ago",
      },
      {
        id: "c3",
        author: "elias_m",
        text: "Fintech solutions clearing fresh USD in Lebanon are rising. See BDL circular 165.",
        timestamp: "20 mins ago",
      }
    ]
  },
  {
    id: "story-2",
    title: "How Toters managed offline logistics under hyper-inflation and continuous fuel crises",
    url: "https://z961combinator.xyz/case-study-toters",
    author: "startup_guru",
    timestamp: "5 hours ago",
    points: 125,
    commentsCount: 2,
    category: "economy",
    voters: [],
    comments: [
      {
        id: "c4",
        author: "fadi_b",
        text: "The resilience of their dispatch algorithm is insane. When fuel prices fluctuated daily, they dynamically computed rates using real-time solar tracking integrations and bulk pre-purchases.",
        timestamp: "3 hours ago",
      },
      {
        id: "c5",
        author: "beirut_coder",
        text: "They are basically the Uber of Lebanon but with better survival instincts. Hats off.",
        timestamp: "2 hours ago",
      }
    ]
  },
  {
    id: "story-3",
    title: "Ask 961: What legal entity structure is best for receiving international SaaS funds?",
    text: "I am building a SaaS for global customers in Byblos. Stripe isn't directly supported for Lebanese banks. What are my best alternatives? Delaware C-Corp? UK LTD with PSP gateway? Airwallex? Let's discuss our options.",
    author: "habib_k",
    timestamp: "8 hours ago",
    points: 43,
    commentsCount: 2,
    category: "ask",
    voters: [],
    comments: [
      {
        id: "c6",
        author: "tech_lawyer_lb",
        text: "A UK LTD paired with Wise/Airwallex is currently the fastest to register. Delaware is solid but tax compliance makes it heavier unless you are raising institutional VC money.",
        timestamp: "6 hours ago",
      },
      {
        id: "c7",
        author: "saas_guy99",
        text: "I used an Estonian e-Residency. It is very straightforward, although opening the banking layer takes some paperwork and travel/virtual interviews.",
        timestamp: "4 hours ago",
      }
    ]
  },
  {
    id: "story-4",
    title: "BDL Circular 165: A silent revolution in enabling digital fresh bank clearings",
    url: "https://centralbank.gov.lb/circular-165-fresh",
    author: "economist_lb",
    timestamp: "10 hours ago",
    points: 67,
    commentsCount: 1,
    category: "economy",
    voters: [],
    comments: [
      {
        id: "c8",
        author: "karim_finance",
        text: "It basically created a mirror fresh-checking clearance system. This has greatly minimized the physical cash carrying risk for major tech businesses in Lebanon.",
        timestamp: "7 hours ago",
      }
    ]
  },
  {
    id: "story-5",
    title: "Show 961: Cedarscreen – Open-source hardware nodes tracking micro-pollution in central Beirut",
    url: "https://github.com/cedarcoder/cedarscreen",
    author: "cedarcoder",
    timestamp: "12 hours ago",
    points: 98,
    commentsCount: 2,
    category: "show",
    voters: [],
    comments: [
      {
        id: "c9",
        author: "green_peace_lb",
        text: "Unbelievable work. Standard government data is rare, so having granular particulate monitors helps with civic research.",
        timestamp: "9 hours ago",
      }
    ]
  },
  {
    id: "story-6",
    title: "Beqaa Valley AgTech startup uses solar-powered automated drip loops to reduce water waste by 50%",
    url: "https://agrytech.lb/solar-drip-loops",
    author: "rindala_a",
    timestamp: "1 day ago",
    points: 112,
    commentsCount: 1,
    category: "tech",
    voters: [],
    comments: [
      {
        id: "c10",
        author: "agro_expert",
        text: "Agriculture is our most valuable sector next to tourism, but irrigation fuel bills were killing the margins. Solar IoT is the perfect remedy.",
        timestamp: "18 hours ago",
      }
    ]
  },
];

let startups: Startup[] = [
  {
    id: "s1",
    name: "Toters",
    tagline: "The premier on-demand delivery and Q-commerce app in Lebanon",
    description: "Toters connects users with local merchants, delivering food, groceries, retail goods, and pharmacy items in real-time. Built entirely on an adaptive logistics routing engine designed to operate dynamically.",
    logo: "🚚",
    industry: "Logistics / Q-Commerce",
    stage: "Series B",
    city: "Beirut",
    website: "https://toters.app",
    funding: "$18.5M raised",
    founder: "Tamim Khalfa & Nael Halaby",
    founded: "2017",
    teamSize: 320
  },
  {
    id: "s2",
    name: "Anghami",
    tagline: "The leading music streaming platform of the Middle East",
    description: "First legal music streaming platform and digital distribution company in the Arab world, letting users listen to millions of Arabic and international tracks. Now listed on NASDAQ.",
    logo: "🎵",
    industry: "Media & Entertainment",
    stage: "IPO",
    city: "Beirut / Abu Dhabi",
    website: "https://anghami.com",
    funding: "NASDAQ Listed",
    founder: "Eddy Maroun & Elie Habib",
    founded: "2012",
    teamSize: 180
  },
  {
    id: "s3",
    name: "Purse Pay",
    tagline: "Automated USD payroll and compliance for offshore Lebanese tech freelancers",
    description: "A fast-growing fintech company enabling global contract builders to bypass physical barriers, receiving fresh international bank cards and clearing funds directly into Lebanese banks.",
    logo: "💳",
    industry: "Fintech",
    stage: "Seed",
    city: "Beirut",
    website: "https://pursepay.example.xyz",
    funding: "$1.2M seed",
    founder: "Samer Baroud & Nour El Dine",
    founded: "2024",
    teamSize: 14
  },
  {
    id: "s4",
    name: "AgriDrone Bio",
    tagline: "Precision drone crop monitoring for high-yield Beqaa agriculture",
    description: "Utilizes thermal multispectral cameras mounted on drones to analyze crop moisture, pest infestation, and nitrogen requirements, lowering insecticide costs by up to 35% using focused delivery.",
    logo: "☘️",
    industry: "AgriTech",
    stage: "Pre-seed",
    city: "Zahle",
    website: "https://agridronebio.example.com",
    funding: "$250K raised",
    founder: "Farid Abou Sleiman",
    founded: "2023",
    teamSize: 8
  },
  {
    id: "s5",
    name: "Synkers",
    tagline: "Connecting students and high-quality mentors instantly",
    description: "Edtech platform delivering personalized tutoring and curriculum support in real-time through an interactive matching app. Scaled successfully across Jordan and the Gulf.",
    logo: "🎓",
    industry: "EdTech",
    stage: "Series A",
    city: "Byblos",
    website: "https://synkers.com",
    funding: "$2.1M raised",
    founder: "Audrey Nakad & Zeina Sultani",
    founded: "2016",
    teamSize: 45
  },
  {
    id: "s6",
    name: "GreenCedars Energy",
    tagline: "SaaS platform powering decentralized solar micro-grids",
    description: "Helps local neighborhoods lease, manage, and distribute solar electricity collaboratively. It tracks individual household load constraints to optimize batteries and minimize diesel costs.",
    logo: "☀️",
    industry: "Energy / Cleantech",
    stage: "Seed",
    city: "Tripoli",
    website: "https://greencedarsenergy.example.com",
    funding: "$800K raised",
    founder: "Rayan Al-Sayegh",
    founded: "2024",
    teamSize: 12
  }
];

let jobs: Job[] = [
  {
    id: "j1",
    title: "Senior Full Stack Dev (Laravel / React)",
    company: "Toters app",
    logo: "🚚",
    type: "Full-Time",
    location: "Beirut, Lebanon (Hybrid)",
    salary: "$2,800 - $3,800 fresh / month",
    description: "We are seeking a Senior Developer experienced in scaling high-load real-time REST nodes. You will spearhead our merchant dashboard revitalization, utilizing React 19 and scalable SQL query optimization.",
    skills: ["React", "Laravel", "PostgreSQL", "Redis", "AWS"],
    timestamp: "1 day ago",
    points: 24,
    commentsCount: 8
  },
  {
    id: "j2",
    title: "Backend Services Lead (Node.js / Express)",
    company: "Purse Pay",
    logo: "💳",
    type: "Remote / Beirut Office",
    location: "Beirut, Lebanon (Remote-friendly)",
    salary: "$3,000 - $4,200 fresh / month",
    description: "Join our fintech team to build highly secure bank proxy integrations. Experience in handling cryptographic keys, financial transaction ledgers, and standard REST/GraphQL compliance is critically valued.",
    skills: ["Node.js", "Express", "TypeScript", "Cryptography", "PostgreSQL"],
    timestamp: "2 days ago",
    points: 42,
    commentsCount: 3
  },
  {
    id: "j3",
    title: "AgriTech IoT Embedded Designer",
    company: "AgriDrone Bio",
    logo: "☘️",
    type: "Contract",
    location: "Zahle / Beqaa (On-Site Field Testing)",
    salary: "$1,800 - $2,500 fresh / month",
    description: "Developing robust circuit hardware connecting drone cameras with ESP32 multi-nodes. You will conduct tests in the fields and deploy compact, battery-efficient telemetry firmware.",
    skills: ["C++", "ESP32", "IoT Sensors", "Microcontrollers", "PCB Design"],
    timestamp: "4 days ago",
    points: 15,
    commentsCount: 9
  },
  {
    id: "j4",
    title: "React Native Core Developer",
    company: "Synkers Ltd",
    logo: "🎓",
    type: "Full-time (Remote)",
    location: "Byblos, Lebanon (Remote)",
    salary: "$2,200 - $3,000 fresh / month",
    description: "Expanding our mobile tutoring platform to accommodate real-time streaming class dashboards. Refactoring the mobile app core into modular, optimized component trees.",
    skills: ["React Native", "TypeScript", "Redux", "WebSockets"],
    timestamp: "1 week ago",
    points: 8,
    commentsCount: 2
  }
];

// --- API routes ---

// GET stories
app.get("/api/stories", (req, res) => {
  const category = (req.query.category as string) || "all";
  if (category === "all") {
    res.json(stories);
  } else {
    res.json(stories.filter((s) => s.category === category));
  }
});

// GET single story
app.get("/api/stories/:id", (req, res) => {
  const story = stories.find((s) => s.id === req.params.id);
  if (story) {
    res.json(story);
  } else {
    res.status(404).json({ error: "Story not found" });
  }
});

// POST novel story
app.post("/api/stories", (req, res) => {
  const { title, url, text, author, category } = req.body;
  if (!title || !author || !category) {
    return res.status(400).json({ error: "Title, author, and category are required." });
  }

  const newStory: Story = {
    id: `story-${Date.now()}`,
    title,
    url: url || undefined,
    text: text || undefined,
    author,
    timestamp: "Just now",
    points: 1,
    commentsCount: 0,
    comments: [],
    voters: [],
    category: category as any,
  };

  stories = [newStory, ...stories];
  res.status(201).json(newStory);
});

// POST upvote story
app.post("/api/stories/:id/upvote", (req, res) => {
  const { userId } = req.body; // Unique client token or standard placeholder
  const story = stories.find((s) => s.id === req.params.id);

  if (!story) {
    return res.status(404).json({ error: "Story not found" });
  }

  const voter = userId || "default-user";
  if (story.voters.includes(voter)) {
    // Toggle downvote if clicked again (standard elegant toggle)
    story.voters = story.voters.filter((v) => v !== voter);
    story.points = Math.max(1, story.points - 1);
    return res.json({ points: story.points, voted: false });
  } else {
    story.voters.push(voter);
    story.points += 1;
    return res.json({ points: story.points, voted: true });
  }
});

// POST novel comment
app.post("/api/stories/:id/comments", (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ error: "Author and text are required" });
  }

  const story = stories.find((s) => s.id === req.params.id);
  if (!story) {
    return res.status(404).json({ error: "Story not found" });
  }

  const newComment: Comment = {
    id: `c-${Date.now()}`,
    author,
    text,
    timestamp: "Just now",
  };

  story.comments.push(newComment);
  story.commentsCount += 1;

  res.status(201).json(newComment);
});

// GET startups
app.get("/api/startups", (req, res) => {
  res.json(startups);
});

// POST startup entry
app.post("/api/startups", (req, res) => {
  const { name, tagline, description, industry, stage, city, website, funding, founder, teamSize, logo } = req.body;
  if (!name || !tagline || !founder) {
    return res.status(400).json({ error: "Name, tagline, and founder are required." });
  }

  const newStartup: Startup = {
    id: `s-${Date.now()}`,
    name,
    tagline,
    description: description || "Innovating key systems in Lebanon.",
    logo: logo || "🇱🇧",
    industry: industry || "Technology",
    stage: stage || "Idea",
    city: city || "Beirut",
    website: website || "https://z961combinator.xyz",
    funding: funding || "Bootstrap",
    founder,
    founded: new Date().getFullYear().toString(),
    teamSize: teamSize ? Number(teamSize) : 1,
  };

  startups = [newStartup, ...startups];
  res.status(201).json(newStartup);
});

// GET jobs
app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

// POST job board entry
app.post("/api/jobs", (req, res) => {
  const { title, company, type, location, salary, description, skills, logo } = req.body;
  if (!title || !company || !description) {
    return res.status(400).json({ error: "Title, Company, and Description are required." });
  }

  const newJob: Job = {
    id: `j-${Date.now()}`,
    title,
    company,
    logo: logo || "💼",
    type: type || "Full-Time",
    location: location || "Beirut, Lebanon",
    salary: salary || "Fresh USD negotiable",
    description,
    skills: Array.isArray(skills) ? skills : ["React", "Node.js"],
    timestamp: "Just now",
    points: 1,
    commentsCount: 0,
  };

  jobs = [newJob, ...jobs];
  res.status(201).json(newJob);
});

// POST evaluate business deck - AI pitch lab using Gemini API
app.post("/api/pitch-lab", async (req, res) => {
  const { name, industry, pitch, budget, targetMarket } = req.body;

  if (!pitch || !name) {
    return res.status(400).json({ error: "Startup name and pitch text are required." });
  }

  if (!geminiApiKey) {
    return res.json({
      score: 74,
      analysis: "### Gemini Pitch Analysis (Offline Demo Mode)\n\n*Note: GEMINI_API_KEY is not defined. Showing simulated local feedback.*\n\nYour startup **" + name + "** shows great local promise. Conducting logistics operations or tech SaaS under Lebanon's dynamic framework requires high infrastructural modularity (like solar microgrids or decentralized settlement networks).\n\n1. **Market Fit**: High relevance for local optimization.\n2. **Funding Strategy**: Focus on foreign fresh currency inflows. Raise from angel syndicates or international entities.\n3. **Policy Integration**: BDL Circular 165 compatibility will ease payment flows.",
      suggestions: [
        "Migrate payment gateway to multi-currency clearing.",
        "Emphasize local talent engineering cost benefits.",
        "Highlight infrastructure alternatives (e.g. solar energy failovers)."
      ]
    });
  }

  try {
    const prompt = `You are a high-profile economic expert, startup incubator manager, and business advisor familiar with Lebanese economics, BDL banking circulars (like Circular 165), fresh USD regulations, logistics, and high-inflation market conditions.

Evaluate this startup pitch:
- Startup Name: ${name}
- Sector/Industry: ${industry}
- Pitch Summary: ${pitch}
- Budget Context: ${budget || "Not defined"}
- Target Market: ${targetMarket || "Lebanese & Arab Diaspora / GCC"}

Provide:
1. Feasibility Score (number between 1 and 100).
2. Deep structured analysis in Markdown detailing Market Suitability, Economic Challenges (handling electricity/payment issues), Funding Opportunities, and Regulatory Navigation (such as leveraging fresh clearances).
3. A list of 3-4 specific tactical recommendations to scale fresh revenue, optimize operating cash flow, or register the entity offshore (e.g. UK Ltd or Delaware).

Please return the output STRICTLY in JSON format with this exact structure:
{
  "score": number,
  "analysis": "markdown string",
  "suggestions": ["string", "string", "string"]
}
Keep the JSON perfectly valid. Do not wrap it in markdown code blocks like \\\`\\\`\\\`json. Return only raw json.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text?.trim() || "{}";
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch (parseErr) {
      console.error("Failed to parse Gemini JSON:", text, parseErr);
      res.json({
        score: 82,
        analysis: text,
        suggestions: [
          "Establish secondary offshore presence to optimize checkout pipelines.",
          "Target GCC client acquisition for immediate Fresh USD incoming streams."
        ]
      });
    }
  } catch (err: any) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "AI Lab analysis failed: " + err.message });
  }
});

// POST cover-letter generation - AI helper
app.post("/api/cover-letter", async (req, res) => {
  const { jobTitle, company, applicantName, experience, skillsSummary } = req.body;

  if (!jobTitle || !company || !applicantName) {
    return res.status(400).json({ error: "Job title, company, and applicant name are required." });
  }

  if (!geminiApiKey) {
    return res.json({
      letter: `Dear Hiring Team at ${company},\n\nI am writing to express my eager interest in the ${jobTitle} position. With my expertise in ${skillsSummary || "software engineering"} and ${experience || "developing resilient solutions"}, I am confident I will be a stellar addition to your collaborative team.\n\nBest regards,\n${applicantName}`
    });
  }

  try {
    const prompt = `Write a professional, highly engaging, and customized application cover letter for a job applicant in Lebanon.
- Company: ${company}
- Job Title: ${jobTitle}
- Applicant Name: ${applicantName}
- Years of Experience/Background: ${experience || "Junior-to-Mid level developer"}
- Skills & Core Focus: ${skillsSummary || "Full Stack Engineering and system design"}

Make it sound human, polite, and emphasize the candidate's enthusiasm to contribute fresh results in the company's local or regional operations. Highlight their capacity to build reliable technology despite operational constraints. Keep it to 3 concise, impactful paragraphs. Return only the plain-text letter.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ letter: response.text?.trim() || "Failed to generate." });
  } catch (err: any) {
    console.error("Cover letter error:", err);
    res.status(500).json({ error: err.message });
  }
});


// =========================================================================
// --- Z961COMBINATOR INITIATIVE SYSTEMS: MODELS, STORAGE & API ENDPOINTS ---
// =========================================================================

interface SandboxUser {
  id: string;
  username: string;
  email: string;
  role_type: "Startup" | "Investor" | "Scout" | "Admin";
  profile: {
    bio: string;
    linkedin_url: string;
    skills: string[];
    role_type: string;
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

// In-Memory Database Store simulating pgvector + relations
let sandboxUsers: SandboxUser[] = [
  {
    id: "u-founder-farid",
    username: "Farid Abou Sleiman",
    email: "farid@agridrone.xyz",
    role_type: "Startup",
    profile: {
      bio: "AgriTech pioneer from Zahle, utilizing drone-guided multispectral mapping inside the Beqaa Valley.",
      linkedin_url: "https://linkedin.com/in/farid-agri-drone",
      skills: ["Remote Sensing", "Embedded IoT", "Agri-economics"],
      role_type: "Startup"
    }
  },
  {
    id: "u-founder-rayan",
    username: "Rayan Al-Sayegh",
    email: "rayan@greencedars.com",
    role_type: "Startup",
    profile: {
      bio: "Software architect based in Tripoli, designing decentralized microgrid sharing technologies.",
      linkedin_url: "https://linkedin.com/in/rayan-greencedars",
      skills: ["Decentralized Energy", "Go", "Solidity", "Grid Analytics"],
      role_type: "Startup"
    }
  },
  {
    id: "u-investor-lda",
    username: "Elie Dagher (Lebanon Diaspora Alliance)",
    email: "dagher@lda-capital.org",
    role_type: "Investor",
    profile: {
      bio: "Diaspora fund based in Boston linking US tech capitals with Lebanese high-potential founders.",
      linkedin_url: "https://linkedin.com/in/elie-dagher-lda",
      skills: ["Diaspora Investments", "SaaS Scaleups", "Cross-border Tax"],
      role_type: "Investor"
    }
  },
  {
    id: "u-investor-green",
    username: "Clara Maalouf (Levant Green Ventures)",
    email: "c.maalouf@levantgreen.com",
    role_type: "Investor",
    profile: {
      bio: "Focusing strictly on climate resilience, agro-stabilization, and waste clearing technology in the Levant.",
      linkedin_url: "https://linkedin.com/in/clara-m-green",
      skills: ["Circular Economy", "AgriTech Venture", "Carbon Credit Mapping"],
      role_type: "Investor"
    }
  },
  {
    id: "u-scout-lynn",
    username: "Lynn Harake",
    email: "lynn.h@aub.edu.lb",
    role_type: "Scout",
    profile: {
      bio: "AUB MSc Graduate in Environmental Policy, researching local microgrid impacts and agricultural stability.",
      linkedin_url: "https://linkedin.com/in/lynn-harake-aub",
      skills: ["Policy Research", "Statistical TAM Analysis", "Green Audits"],
      role_type: "Scout"
    }
  },
  {
    id: "u-admin-ncei",
    username: "Prof. Ghassan Youssef (NCEI Chair)",
    email: "ghassan.youssef@ncei-gov.org",
    role_type: "Admin",
    profile: {
      bio: "Academic lead and Chief Auditor at the National Center for Enterprise and Innovation (NCEI).",
      linkedin_url: "https://linkedin.com/in/ghassan-ncei",
      skills: ["Ecosystem Governance", "Monetary Stabilization", "R&D Grants"],
      role_type: "Admin"
    }
  }
];

let sandboxEntities: SandboxEntity[] = [
  {
    entity_id: "e-agridrone",
    name: "AgriDrone Bio",
    sector: "AgriTech / Remote Sensing",
    stage: "MVP Testing",
    description: "Multispectral drone inspections to optimize pesticide and water distribution in Beqaa Valley.",
    problem_statement: "Beqaa Valley farmers are struggling with skyrocketing diesel bills for irrigation pumps and imported chemical fertilizing agent costs.",
    solution_statement: "Precision drone crop monitoring that targets water application and reduces pesticide input by 35% through localized spraying logs.",
    readiness_score: 85,
    is_verified: true,
    verified_by_ncei_expert: "Prof. Ghassan Youssef (NCEI Chair)",
    embedding: "agritech agriculture drone remote sensing solar irrigation water conservation Beqaa Zahle",
    author_id: "u-founder-farid"
  },
  {
    entity_id: "e-greencedars",
    name: "GreenCedars Energy",
    sector: "Energy / Cleantech",
    stage: "Seed",
    description: "Decentralized microgrid billing software allowing communities to co-purchase and distribute solar electricity.",
    problem_statement: "Frequent local power shutoffs force reliance on hyper-polluting local diesel generators with predatory monthly prices.",
    solution_statement: "Deploying solar micro-grids managed by our adaptive energy sharing ledger billing software to cut diesel usage in neighborhoods by 60%.",
    readiness_score: 92,
    is_verified: true,
    verified_by_ncei_expert: "Prof. Ghassan Youssef (NCEI Chair)",
    embedding: "solar micro-grid electricity energy saving local billing ledger cleaner tripoli tri-generation battery failovers",
    author_id: "u-founder-rayan"
  },
  {
    entity_id: "e-phoenix",
    name: "Phoenix Eco-Clearance",
    sector: "Logistics / Circular Economy",
    stage: "Ideation",
    description: "Algorithmic waste sorting loops pairing scrap materials with recycling agents in Mount Lebanon.",
    problem_statement: "Solid waste management crisis results in unauthorized burning and landfills, destroying vital tourism and agricultural assets.",
    solution_statement: "Real-time scrap clearance marketplace allowing businesses to monetize cardboard, copper and glass, utilizing optimized transport dispatch.",
    readiness_score: 45,
    is_verified: false,
    embedding: "waste recycling scrap materials marketplace logistics circular economy Mount Lebanon Beirut carbon credit",
    author_id: "u-founder-rayan"
  }
];

let investorMandates: InvestorMandate[] = [
  {
    investor_id: "u-investor-lda",
    investor_name: "Lebanon Diaspora Alliance (Elie Dagher)",
    sector_preferences: ["SaaS", "Fintech", "AgriTech", "Energy"],
    target_stage: "Seed",
    min_ticket_size: 100000,
    max_ticket_size: 500000,
    geographic_focus: "Lebanon Offshore, GCC Markets"
  },
  {
    investor_id: "u-investor-green",
    investor_name: "Levant Green Ventures (Clara Maalouf)",
    sector_preferences: ["AgriTech", "Energy", "Logistics"],
    target_stage: "Early Stage",
    min_ticket_size: 50000,
    max_ticket_size: 300000,
    geographic_focus: "Beqaa, Mount Lebanon, South Lebanon"
  }
];

let matchingRecords: MatchingRecord[] = [
  {
    match_id: "m-1",
    startup_id: "e-agridrone",
    investor_id: "u-investor-green",
    match_score: 96,
    status: "Vetted",
    ncei_notes: "Highly qualified match during NCEI review. Agritech aligns completely with Levant Green's carbon goals.",
    match_rationale: "AgriDrone solves a critical agro-financial pain in Levant's target Beqaa focus area, perfectly fitting LG's ticket mandate."
  },
  {
    match_id: "m-2",
    startup_id: "e-greencedars",
    investor_id: "u-investor-lda",
    match_score: 89,
    status: "Pending",
    ncei_notes: "Strong team competence, requires offshore UK Ltd incorporating layers.",
    match_rationale: "SaaS microgrid is highly scalable to Jordan & GCC. LDA diaspora capital pairs beautifully with Rayan's vision."
  }
];

let dataRooms: DataRoomItem[] = [
  {
    id: "doc-1",
    entity_id: "e-agridrone",
    document_type: "Feasibility Study",
    name: "Beqaa Valley Crop Multi-Telemetry Feasibility Report v2.pdf",
    storage_url: "https://z961combinator.xyz/data-room/agridrone-feasibility.pdf",
    views_log: [
      { viewer_id: "u-investor-green", viewer_name: "Clara Maalouf (Green Ventures)", timestamp: "2026-06-10 14:15" }
    ]
  },
  {
    id: "doc-2",
    entity_id: "e-agridrone",
    document_type: "Financials",
    name: "AgriDrone Bio 5-Year Fresh USD Cashflow Projections.xlsx",
    storage_url: "https://z961combinator.xyz/data-room/agridrone-cashflows.xlsx",
    views_log: []
  },
  {
    id: "doc-3",
    entity_id: "e-greencedars",
    document_type: "Deck",
    name: "GreenCedars SaaS Microgrid Investment Pitch deck.pdf",
    storage_url: "https://z961combinator.xyz/data-room/greencedars-pitchdeck.pdf",
    views_log: [
      { viewer_id: "u-investor-lda", viewer_name: "Elie Dagher (Diaspora Alliance)", timestamp: "2026-06-09 09:30" }
    ]
  }
];

let researchReports: ResearchReport[] = [
  {
    id: "rep-1",
    title: "Green Energy Recovery TAM Study: Decentralized Solar Cleared Markets in Lebanon",
    author: "Lynn Harake (AUB)",
    summary: "Estimating the aggregate TAM at $420M annually across 80% non-functional state grid structures.",
    content: "Detailed economic study tracking 24 administrative districts. Community microgrids represent the fastest mechanism for green recovery, scaling fresh monetization structures via local merchant aggregations.",
    date: "2026-05-15"
  },
  {
    id: "rep-2",
    title: "Fintech Circular 165 Impacts: Transitioning Cash Economy to Bank Clearing Ledger Platforms",
    author: "Z961 Economist Team & LAU Scholars",
    summary: "Analyses over $1.2B physical cash volume and how digital clearance settles payroll friction.",
    content: "Circular 165 enables check clearings in Fresh USD. This allows digital SaaS payroll startups like Purse Pay to capture 1.5% clearings margins safely while bypassing hyperinflation structures.",
    date: "2026-06-01"
  }
];


// --- API routes for the Initiative Sandbox ---

// GET All Initiative data
app.get("/api/initiative/all", (req, res) => {
  res.json({
    users: sandboxUsers,
    entities: sandboxEntities,
    mandates: investorMandates,
    matches: matchingRecords,
    dataroom: dataRooms,
    research: researchReports
  });
});

// POST Register/Submitting sandbox entities
app.post("/api/initiative/entities", (req, res) => {
  const { name, sector, stage, description, problem_statement, solution_statement, author_id } = req.body;

  if (!name || !problem_statement || !solution_statement) {
    return res.status(400).json({ error: "Name, problem, and solution statements are required." });
  }

  // Calculate an automatic readiness score based on completeness
  let initialScore = 30;
  if (stage === "Revenue" || stage === "IPO") initialScore += 40;
  else if (stage === "MVP Testing" || stage === "Seed" || stage === "Series A") initialScore += 25;
  else initialScore += 10;

  if (description && description.length > 50) initialScore += 10;
  if (problem_statement && problem_statement.length > 100) initialScore += 10;
  if (solution_statement && solution_statement.length > 100) initialScore += 10;
  initialScore = Math.min(initialScore, 95);

  const newEntity: SandboxEntity = {
    entity_id: `e-${Date.now()}`,
    name,
    sector: sector || "Technology / General",
    stage: stage || "Ideation",
    description: description || "General innovation startup",
    problem_statement,
    solution_statement,
    readiness_score: initialScore,
    is_verified: false,
    embedding: `${name} ${sector} ${description} ${problem_statement} ${solution_statement}`.toLowerCase(),
    author_id: author_id || "u-founder-farid"
  };

  sandboxEntities.push(newEntity);
  res.status(201).json(newEntity);
});

// POST Admin Verification & Audit of Readiness
app.post("/api/initiative/verify", (req, res) => {
  const { entity_id, readiness_score, ncei_notes, verified_by } = req.body;

  const entity = sandboxEntities.find((e) => e.entity_id === entity_id);
  if (!entity) {
    return res.status(404).json({ error: "Sandbox entity not found." });
  }

  entity.is_verified = true;
  entity.readiness_score = Math.min(100, Math.max(0, Number(readiness_score)));
  entity.verified_by_ncei_expert = verified_by || "Prof. Ghassan Youssef (NCEI Chair)";

  // Ensure and update status of matching notes for related records
  matchingRecords.forEach((m) => {
    if (m.startup_id === entity_id) {
      m.ncei_notes = ncei_notes || "Verified by NCEI experts.";
      m.status = "Vetted";
    }
  });

  res.json({ message: "Entity successfully verified and readiness score validated.", entity });
});

// POST Simulate Vector Matcher RAG Engine
app.post("/api/initiative/matches/generate", async (req, res) => {
  const { entity_id, investor_id } = req.body;

  const entity = sandboxEntities.find((e) => e.entity_id === entity_id);
  const mandate = investorMandates.find((m) => m.investor_id === investor_id);

  if (!entity || !mandate) {
    return res.status(400).json({ error: "Valid startup entity and investor mandate are required." });
  }

  const existing = matchingRecords.find((m) => m.startup_id === entity_id && m.investor_id === investor_id);
  if (existing) {
    return res.json(existing);
  }

  let matchScore = 55;
  let rationale = "General interest, sector overlap.";

  const sectorOverlap = mandate.sector_preferences.some(
    (sec) => entity.sector.toLowerCase().includes(sec.toLowerCase()) || entity.embedding.includes(sec.toLowerCase())
  );

  if (sectorOverlap) {
    matchScore += 25;
  }
  if (entity.is_verified) {
    matchScore += 15;
  }
  if (entity.readiness_score > 80) {
    matchScore += 10;
  }

  matchScore = Math.min(99, matchScore);

  if (matchScore >= 80) {
    rationale = `High structural compatibility. Sector matches ${mandate.sector_preferences.join(", ")}. Perfect alignment with the ${mandate.geographic_focus} mandate. Team readiness verified.`;
  } else if (matchScore >= 60) {
    rationale = `Moderate structural overlap. The entity's stage (${entity.stage}) targets the investor's criteria but needs secondary cross-border compliance optimization.`;
  } else {
    rationale = "Low sector similarity score. Strategic diversification might be required.";
  }

  if (geminiApiKey) {
    try {
      const prompt = `You are the chief mathematical auditor for Z961combinator Initiative's Smart Matching Engine.
Evaluate the semantic alignment (cosine similarity index) between this Lebanese startup entity and the investor mandate:

Startup Entity Profile:
- Name: ${entity.name}
- Sector: ${entity.sector}
- Stage: ${entity.stage}
- Readiness Score: ${entity.readiness_score}/100 (Verified: ${entity.is_verified})
- Problem: ${entity.problem_statement}
- Solution: ${entity.solution_statement}

Investor Mandate Profile:
- Investor: ${mandate.investor_name}
- Sector Preferences: ${mandate.sector_preferences.join(", ")}
- Target Stage: ${mandate.target_stage}
- Ticket sizes: $${mandate.min_ticket_size} - $${mandate.max_ticket_size}
- Geographic Focus: ${mandate.geographic_focus}

Calculate and return a smart response in strict JSON:
{
  "match_score": number (between 40 and 99),
  "match_rationale": "markdown formatted paragraph detailing the exact synergies (e.g. green recovery, diaspora FX routing, tech talent density) and risk-mitigation advice."
}
Return raw JSON only, no markdown wrappers and no backticks.`;

      const genAIResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const responseText = genAIResponse.text?.trim() || "{}";
      const cleanedJSON = JSON.parse(responseText);

      if (cleanedJSON.match_score) matchScore = cleanedJSON.match_score;
      if (cleanedJSON.match_rationale) rationale = cleanedJSON.match_rationale;

    } catch (e) {
      console.error("Gemini Match calculation failed:", e);
    }
  }

  const newMatch: MatchingRecord = {
    match_id: `m-${Date.now()}`,
    startup_id: entity_id,
    investor_id: investor_id,
    match_score: matchScore,
    status: "Pending",
    ncei_notes: "Auto-computed smart semantic recommendation.",
    match_rationale: rationale
  };

  matchingRecords.push(newMatch);
  res.status(201).json(newMatch);
});

// POST Update match status
app.post("/api/initiative/matches/status", (req, res) => {
  const { match_id, status, ncei_notes } = req.body;
  const match = matchingRecords.find((m) => m.match_id === match_id);
  if (!match) {
    return res.status(404).json({ error: "Matching record not found." });
  }

  match.status = status;
  if (ncei_notes) {
    match.ncei_notes = ncei_notes;
  }
  res.json(match);
});

// POST Upload a document to sandbox data room
app.post("/api/initiative/dataroom/upload", (req, res) => {
  const { entity_id, document_type, name, storage_url } = req.body;

  if (!entity_id || !document_type || !name) {
    return res.status(400).json({ error: "Entity, document type, and name are required." });
  }

  const newDoc: DataRoomItem = {
    id: `doc-${Date.now()}`,
    entity_id,
    document_type,
    name,
    storage_url: storage_url || "https://z961combinator.xyz/data-room/placeholder-download.pdf",
    views_log: []
  };

  dataRooms.push(newDoc);
  res.status(201).json(newDoc);
});

// POST Log document review by investor
app.post("/api/initiative/dataroom/view", (req, res) => {
  const { doc_id, viewer_id, viewer_name } = req.body;

  const doc = dataRooms.find((d) => d.id === doc_id);
  if (!doc) {
    return res.status(404).json({ error: "Document not found." });
  }

  const alreadyLogged = doc.views_log.some((v) => v.viewer_id === viewer_id);
  if (!alreadyLogged) {
    doc.views_log.push({
      viewer_id: viewer_id || "investor-anon",
      viewer_name: viewer_name || "Diaspora Investor",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16)
    });
  }

  res.json(doc);
});

// POST Agent Intermediary Chatbot
app.post("/api/initiative/chat", async (req, res) => {
  const { message, activeRole, activeUserId, entityContextId } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message parameter provided." });
  }

  // Intent analysis
  let classification = "CLASS_STATUS";
  const msgLower = message.toLowerCase();

  if (msgLower.includes("upload") || msgLower.includes("document") || msgLower.includes("study") || msgLower.includes("file") || msgLower.includes("pdf")) {
    classification = "CLASS_UPLOAD";
  } else if (msgLower.includes("match") || msgLower.includes("investor") || msgLower.includes("pair") || msgLower.includes("diaspora") || msgLower.includes("align")) {
    classification = "CLASS_MATCH";
  } else if (msgLower.includes("verify") || msgLower.includes("ncei") || msgLower.includes("approve") || msgLower.includes("score")) {
    classification = "CLASS_VERIFY";
  } else if (msgLower.includes("status") || msgLower.includes("negotiation") || msgLower.includes("milestone") || msgLower.includes("track")) {
    classification = "CLASS_STATUS";
  }

  const userContext = sandboxUsers.find((u) => u.id === activeUserId) || sandboxUsers[0];
  const activeEntity = sandboxEntities.find((e) => e.entity_id === entityContextId || e.author_id === activeUserId) || sandboxEntities[0];

  let replyText = "";
  let actionTaken = null;

  if (geminiApiKey) {
    try {
      const prompt = `You are the Z961combinator Institutional Intermediary chatbot.
Your job is to assist Lebanese startup founders, diaspora investors, academic scouts, and NCEI administrators.
You act with legal compliance and professional gravity, facilitating transactions under Lebanese BDL circulars (like Circular 165) and global sandbox requirements.

Active User: ${userContext.username}
Role: ${activeRole || userContext.role_type}
Primary Active Startup Profile: ${activeEntity.name} (Sector: ${activeEntity.sector}, Verified: ${activeEntity.is_verified}, Score: ${activeEntity.readiness_score})

User Message: "${message}"

Formulate a highly professional response that addresses the user's intent. Present recommendations clearly:
1. Classification category (one of: CLASS_UPLOAD, CLASS_MATCH, CLASS_VERIFY, CLASS_STATUS).
2. Action recommendations (e.g. uploading to Data Room, trigger matching query, expert endorsement).
3. Professional compliance feedback (reminding them about fresh clearing protocols where relevant).

Return the response in a strict valid JSON format:
{
  "classification": "CLASS_UPLOAD" | "CLASS_MATCH" | "CLASS_VERIFY" | "CLASS_STATUS",
  "reply": "markdown structured text response explaining what to do.",
  "action_suggested": {
    "type": "string",
    "target": "string",
    "params": {}
  }
}
Return raw JSON only, no backtick wrap.`;

      const geminiRes = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsed = JSON.parse(geminiRes.text?.trim() || "{}");
      classification = parsed.classification || classification;
      replyText = parsed.reply || "Unable to compute reply.";
      actionTaken = parsed.action_suggested || null;

    } catch (e: any) {
      console.error("Gemini failed in intermediary chat, rolling back to offline logic:", e);
    }
  }

  // Fallback response builder if GPT/Gemini failed or not active
  if (!replyText) {
    if (classification === "CLASS_UPLOAD") {
      replyText = `### 📂 Data Room Compliance Intermediary
Greetings **${userContext.username}**, I have classified your query as a Document Upload Action.

Under **NDAs and Diaspora Clearance protocols**, you can host secure attachments (Feasibility Studies, Multi-year fresh USD forecasts, etc.) in your **Institutional Sandbox Data Room**.
- **Recommended Action**: Navigate to the **Data Room** sub-pane below. Use the Document Upload trigger button.
- **Auditing Note**: Every investor visual click is cryptographic-stamped and logged under the founder analytical table to guarantee investor-view traceability.`;
      actionTaken = { type: "system_guidance", target: "dataroom_pane", params: { advice: "Upload feasibility reports to increase matching probability." } };
    } else if (classification === "CLASS_MATCH") {
      replyText = `### 🤝 RAG Smart Matching Engine Intermediary
Greetings **${userContext.username}**, I have classified your query as a Semantic Matching Request.

Utilizing **OpenAI text-embedding models** and **pgvector** similarity metrics, the system identifies synergies between your problem statements and active diaspora investor mandates.
- **Recommended Action**: Trigger the **Smart Matching simulator** below. It will pair **${activeEntity.name}** with **Levant Green Ventures** or **Lebanon Diaspora Alliance** and render an AI score detailing synergies.
- **Readiness requirement**: High-level matches require a verified status validated by NCEI Experts to secure diaspora investor credibility.`;
      actionTaken = { type: "system_guidance", target: "match_engine", params: { advice: "Optimize readiness score to unlock priority investor feeds." } };
    } else if (classification === "CLASS_VERIFY") {
      replyText = `### 🛡️ NCEI Regulatory Endorsement Intermediary
Greetings **${userContext.username}**, I have classified your query as an Academic Audit or Scoring Endorsement.

For institutional confidence, startup profiles require a "Human-in-the-loop" approval score. Researchers assess Tam, team coherence, and cashflow.
- **Recommended Action**: Toggle your active role to **NCEI Admin** on the sandbox dashboard, then click **Verify Entity** and set a high score.
- **Audit Benefit**: This activates the project on global partner feeds (UNDP / GCC Commercial Attachés) automatically.`;
      actionTaken = { type: "system_guidance", target: "ncei_cms", params: { advice: "Request Ghassan Youssef to review pending Pitch decks." } };
    } else {
      replyText = `### 📊 Milestone and Status Tracker
Greetings **${userContext.username}**, I have classified your request as a Negotiation Tracking or Status query.

Active Sandboxed collaborations are tracked below. Statuses:
- **Pending**: Auto-match established, waiting for introductory protocol.
- **Vetted**: Under review by NCEI academic team.
- **Accepted**: High-level NDA signed, active feasibility reviews on-going.
- **Settled / Closed**: Capital ticket committed via fresh channels.`;
      actionTaken = { type: "system_guidance", target: "milestones", params: { advice: "Observe active milestones logs." } };
    }
  }

  res.json({
    classification,
    reply: replyText,
    actionTaken,
    userContext,
    activeEntity
  });
});


// =========================================================================
// --- USER SIGNUP, REGISTRATION & ADMIN MANAGEMENT SYSTEMS ---
// =========================================================================

interface StartupRegistration {
  id: string;
  userId: string;
  email: string;
  username: string;
  step: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  // PART 1: FOUNDER & TEAM DOSSIER
  founderNames?: string;
  founderBio?: string;
  teamExpertise?: string;
  linkedinUrls?: string;
  // PART 2: PROJECT & IDEATION
  projectName?: string;
  developmentStage?: string;
  timeframeScalability?: string;
  fundingHistory?: string;
  tamSomAssessment?: string;
  // PART 3: ECONOMIC ALIGNMENT & MACRO-DEVELOPMENT
  nationalImpact?: string;
  exportPotentialPay?: string;
  jobCreation?: string;
  sdgIntegration?: string;
  resilienceSustainability?: string;
  // PART 4: FINANCIALS, STRATEGY & THE ASK
  totalCapitalRequired?: string;
  capitalAllocation?: string;
  investmentVehicle?: string;
  nonCapitalServices?: string;
  marketingPlan?: string;
  // PART 5: RISK MITIGATION & EXIT STRATEGY
  operationalResilience?: string;
  financialHedging?: string;
  exitObjective?: string;
  targetBuyerUniverse?: string;
  // PART 6: SUPPORTING DOCUMENTATION
  documentLinks?: string;
  // TERMS
  acceptedTerms?: boolean;
}

export interface InstitutionalEngagement {
  id: string;
  userId?: string;
  contactName: string;
  contactEmail: string;
  organizationName: string;
  identity: string;
  objectives: string[];
  ticketSize: string;
  operationalFocus: string;
  prioritySectors: string[];
  stagePreference: string;
  impactGoals: string;
  willingnessToEngage: string;
  institutionalRequirements: string;
  riskAppetite: number;
  localRetention: string;
  collaboration: string;
  acceptedTerms: boolean;
  createdAt: string;
  updatedAt: string;
}

let institutionalEngagements: InstitutionalEngagement[] = [
  {
    id: "inst-1",
    userId: "",
    contactName: "Jean-Marc Jabre",
    contactEmail: "jm.jabre@levantcapital.com",
    organizationName: "Levant Horizon Ventures",
    identity: "VC/Investment Firm",
    objectives: ["Capital Deployment", "Strategic Partnership"],
    ticketSize: "$250k+",
    operationalFocus: "GCC & Western Europe",
    prioritySectors: ["FinTech", "ICT/AI", "Agri-Tech"],
    stagePreference: "MVP/Early Revenue",
    impactGoals: "Job Creation & Food Security through AgTech exports",
    willingnessToEngage: "Active: Attend live 'Institutional Tank' pitch sessions",
    institutionalRequirements: "Requires standard Cayman Master-Feeder structuring, compliance under KYC directives.",
    riskAppetite: 4,
    localRetention: "Yes, absolutely",
    collaboration: "Yes, very interested",
    acceptedTerms: true,
    createdAt: "2026-06-09T08:15:00Z",
    updatedAt: "2026-06-09T08:15:00Z"
  },
  {
    id: "inst-2",
    userId: "",
    contactName: "Nadia Ghorra",
    contactEmail: "n.ghorra@un-development.org",
    organizationName: "International Impact Alliance (NGO)",
    identity: "International Institutional Partner (NGO/Development Body)",
    objectives: ["Technical Mentorship", "Strategic Partnership", "CSR/Impact"],
    ticketSize: "N/A - Non-investor",
    operationalFocus: "Beirut & Geneva",
    prioritySectors: ["Agri-Tech", "MedTech", "Creative/Professional Services"],
    stagePreference: "Prototype",
    impactGoals: "SDG 8 (Job Creation & Decent Work), SDG 5 (Gender Parity)",
    willingnessToEngage: "Strategic: Provide mentorship or serve as an industry advisor",
    institutionalRequirements: "Grant-aligned reporting, strictly tracked local operations audit.",
    riskAppetite: 2,
    localRetention: "Yes, absolutely",
    collaboration: "Yes, very interested",
    acceptedTerms: true,
    createdAt: "2026-06-10T11:45:00Z",
    updatedAt: "2026-06-10T11:45:00Z"
  }
];

let registeredUsers: { id: string; email: string; username: string; password?: string }[] = [
  { id: "u-1", email: "farid@agridrone.xyz", username: "Farid Abou Sleiman", password: "password123" },
  { id: "u-2", email: "rayan@greencedars.com", username: "Rayan Al-Sayegh", password: "password123" }
];

let startupRegistrations: StartupRegistration[] = [
  {
    id: "reg-1",
    userId: "u-1",
    email: "farid@agridrone.xyz",
    username: "Farid Abou Sleiman",
    step: 7,
    completed: true,
    createdAt: "2026-06-08T10:00:00Z",
    updatedAt: "2026-06-08T14:22:00Z",
    founderNames: "Farid Abou Sleiman, Dr. Toufic Warde",
    founderBio: "Farid Abou Sleiman: AUB MSc Agricultural Technologies. 10 years experience in Drone avionics.\nDr. Toufic Warde: PhD Crop Science from UC Davis.",
    teamExpertise: "Sensor telemetry integration & microgrid routing protocols. Extremely skilled field operations team.",
    linkedinUrls: "https://linkedin.com/in/farid-agri-drone, https://linkedin.com/in/toufic-warde",
    projectName: "AgriDrone Bio",
    developmentStage: "MVP Testing",
    timeframeScalability: "MVP already deployed. Break-even projected in 12 months. Local expansion by Q4 2026.",
    fundingHistory: "$250K angel capital raised from regional agri-tech partners.",
    tamSomAssessment: "TAM: $45M across Levant region. SOM: $12M over next 3 years based on local customer pipelines.",
    nationalImpact: "Substitutes imported chemical fertilizers. Reduces diesel dependency for inspection setups.",
    exportPotentialPay: "Potential servicing contracts into GCC Jordan. 3-year export FX projection of $2.5M USD.",
    jobCreation: "14 skilled telemetry operators and agronomy field engineers over two years.",
    sdgIntegration: "Goal 2 (Zero Hunger), Goal 9 (Industry, Innovation and Infrastructure), Goal 13 (Climate Action).",
    resilienceSustainability: "Complete solar backup micro-arrays power the localized drone inspection modules.",
    totalCapitalRequired: "350000",
    capitalAllocation: "R&D: 40% | Operational deployment: 30% | Marketing: 15% | Hiring: 15%",
    investmentVehicle: "SAFE (Simple Agreement for Future Equity)",
    nonCapitalServices: "Licensing assistance, foreign partnership introduction, strategic legal counsel.",
    marketingPlan: "Direct-to-farm model supported by agricultural cooperatives in Beqaa.",
    operationalResilience: "Multiple drone batteries, redundant backup sensors, and local secure maintenance desk.",
    financialHedging: "Pre-billing in fresh USD linked directly to international clearing accounts.",
    exitObjective: "Acquisition by regional Agri-Intelligence Conglomerate.",
    targetBuyerUniverse: "Regional Agritech Conglomerates, Global GIS enterprises, or GCC Sovereign Wealth agricultural funds.",
    documentLinks: "Pitch Deck: https://z961combinator.xyz/agridrone-pitchdeck.pdf\nFinancials: https://z961combinator.xyz/agridrone-financials.pdf",
    acceptedTerms: true
  }
];

// --- AUTHENTICATION ENDPOINTS ---

app.post("/api/auth/signup", (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ error: "Email, Username, and Password are required." });
  }
  const exists = registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(400).json({ error: "User with this email already exists." });
  }
  
  const newUser = { id: `u-${Date.now()}`, email, username, password };
  registeredUsers.push(newUser);
  
  // Create their initial empty Registration object
  const newReg: StartupRegistration = {
    id: `reg-${Date.now()}`,
    userId: newUser.id,
    email: newUser.email,
    username: newUser.username,
    step: 1,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  startupRegistrations.push(newReg);

  res.status(201).json({ id: newUser.id, email: newUser.email, username: newUser.username });
});

app.post("/api/auth/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required." });
  }
  const user = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }
  res.json({ id: user.id, email: user.email, username: user.username });
});

// --- USER STARTUP REGISTRATION ENDPOINTS ---

app.get("/api/registration/my/:userId", (req, res) => {
  const reqUserId = req.params.userId;
  let reg = startupRegistrations.find(r => r.userId === reqUserId);
  if (!reg) {
    const user = registeredUsers.find(u => u.id === reqUserId);
    if (!user) {
      return res.status(404).json({ error: "User or registration profile not found." });
    }
    reg = {
      id: `reg-${Date.now()}`,
      userId: reqUserId,
      email: user.email,
      username: user.username,
      step: 1,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    startupRegistrations.push(reg);
  }
  res.json(reg);
});

app.post("/api/registration/save", (req, res) => {
  const { userId, data } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }
  const regIndex = startupRegistrations.findIndex(r => r.userId === userId);
  if (regIndex === -1) {
    return res.status(404).json({ error: "Registration record matching this user not found." });
  }
  
  startupRegistrations[regIndex] = {
    ...startupRegistrations[regIndex],
    ...data,
    updatedAt: new Date().toISOString()
  };
  res.json(startupRegistrations[regIndex]);
});

// --- ADMIN SYSTEM ENDPOINTS (Maan70939779 Password Verified) ---

app.get("/api/admin/registrations", (req, res) => {
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword !== "Maan70939779") {
    return res.status(401).json({ error: "Unauthorized access: Invalid admin authorization password." });
  }
  res.json(startupRegistrations);
});

app.put("/api/admin/registrations/:id", (req, res) => {
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword !== "Maan70939779") {
    return res.status(401).json({ error: "Unauthorized." });
  }
  const regIndex = startupRegistrations.findIndex(r => r.id === req.params.id);
  if (regIndex === -1) {
    return res.status(404).json({ error: "Registration profile not found to update." });
  }
  
  startupRegistrations[regIndex] = {
    ...startupRegistrations[regIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  res.json(startupRegistrations[regIndex]);
});

app.delete("/api/admin/registrations/:id", (req, res) => {
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword !== "Maan70939779") {
    return res.status(401).json({ error: "Unauthorized." });
  }
  const regIndex = startupRegistrations.findIndex(r => r.id === req.params.id);
  if (regIndex === -1) {
    return res.status(404).json({ error: "Registration details not found to delete." });
  }
  startupRegistrations.splice(regIndex, 1);
  res.json({ success: true });
});

// Manage Stories in NewsAggregator via Admin
app.put("/api/admin/stories/:id", (req, res) => {
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword !== "Maan70939779") {
    return res.status(401).json({ error: "Unauthorized." });
  }
  const storyIndex = stories.findIndex(s => s.id === req.params.id);
  if (storyIndex === -1) {
    return res.status(404).json({ error: "Site story not found to edit." });
  }
  stories[storyIndex] = {
    ...stories[storyIndex],
    ...req.body,
    comments: stories[storyIndex].comments || [] // preserve comments
  };
  res.json(stories[storyIndex]);
});

app.delete("/api/admin/stories/:id", (req, res) => {
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword !== "Maan70939779") {
    return res.status(401).json({ error: "Unauthorized." });
  }
  const storyIndex = stories.findIndex(s => s.id === req.params.id);
  if (storyIndex === -1) {
    return res.status(404).json({ error: "Story not found to delete." });
  }
  stories.splice(storyIndex, 1);
  res.json({ success: true });
});


// --- INSTITUTIONAL ENGAGEMENT ENDPOINTS ---

app.post("/api/institutional/submit", (req, res) => {
  const data = req.body;
  if (!data || !data.contactEmail || !data.contactName) {
    return res.status(400).json({ error: "Contact Name and Email are required to register institutional engagement." });
  }

  const newEngagement: InstitutionalEngagement = {
    id: `inst-${Date.now()}`,
    userId: data.userId || "",
    contactName: data.contactName,
    contactEmail: data.contactEmail,
    organizationName: data.organizationName || "",
    identity: data.identity || "",
    objectives: Array.isArray(data.objectives) ? data.objectives : [],
    ticketSize: data.ticketSize || "",
    operationalFocus: data.operationalFocus || "",
    prioritySectors: Array.isArray(data.prioritySectors) ? data.prioritySectors : [],
    stagePreference: data.stagePreference || "",
    impactGoals: data.impactGoals || "",
    willingnessToEngage: data.willingnessToEngage || "",
    institutionalRequirements: data.institutionalRequirements || "",
    riskAppetite: Number(data.riskAppetite) || 3,
    localRetention: data.localRetention || "",
    collaboration: data.collaboration || "",
    acceptedTerms: !!data.acceptedTerms,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  institutionalEngagements.push(newEngagement);
  res.status(201).json(newEngagement);
});

app.get("/api/admin/institutionals", (req, res) => {
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword !== "Maan70939779") {
    return res.status(401).json({ error: "Unauthorized access: Invalid admin authorization password." });
  }
  res.json(institutionalEngagements);
});

app.put("/api/admin/institutionals/:id", (req, res) => {
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword !== "Maan70939779") {
    return res.status(401).json({ error: "Unauthorized." });
  }
  const index = institutionalEngagements.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Institutional engagement profile not found to update." });
  }

  institutionalEngagements[index] = {
    ...institutionalEngagements[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  res.json(institutionalEngagements[index]);
});

app.delete("/api/admin/institutionals/:id", (req, res) => {
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword !== "Maan70939779") {
    return res.status(401).json({ error: "Unauthorized." });
  }
  const index = institutionalEngagements.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Institutional engagement profile not found to delete." });
  }
  institutionalEngagements.splice(index, 1);
  res.json({ success: true });
});


// --- Server routing configuration (Vite integration) ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[961 Combinator] server booting at http://0.0.0.0:${PORT}`);
  });
}

startServer();
