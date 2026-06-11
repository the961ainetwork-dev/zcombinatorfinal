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
    timestamp: "1 day ago"
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
    timestamp: "2 days ago"
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
    timestamp: "4 days ago"
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
    timestamp: "1 week ago"
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
