import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NewsAggregator from "./components/NewsAggregator";
import StartupDirectory from "./components/StartupDirectory";
import JobsBoard from "./components/JobsBoard";
import PitchLab from "./components/PitchLab";
import Prospectus from "./components/Prospectus";
import PolicyFramework from "./components/PolicyFramework";
import CoreValues from "./components/CoreValues";
import ResourcesHub from "./components/ResourcesHub";
import InitiativeSandbox from "./components/InitiativeSandbox";
import HeroSection from "./components/HeroSection";
import NdaRegistration from "./components/NdaRegistration";
import TorRules from "./components/TorRules";
import FaqHub from "./components/FaqHub";
import TheMag from "./components/TheMag";
import SignupWizard from "./components/SignupWizard";
import AdminPanel from "./components/AdminPanel";
import InstitutionalEngagement from "./components/InstitutionalEngagement";
import GetStarted from "./components/GetStarted";
import KickoffSeminar from "./components/KickoffSeminar";
import AiStartupBootcamp from "./components/AiStartupBootcamp";
import { Story, Startup, Job } from "./types";
import { Info, Mail, Phone, MapPin, Loader2, Sparkles } from "lucide-react";

export default function App() {
  // --- Precheck client fallback seeds to guarantee instantaneous paint and 100% menu navigation resilience ---
  const INITIAL_STORIES: Story[] = [
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
          id: "c-11",
          author: "charbel_t",
          text: "This is saving some entire households. Remote work bypassing physical constraints is the absolute best thing that happened to Lebanese talent in the last decade.",
          timestamp: "1 hour ago",
        },
        {
          id: "c-12",
          author: "nour_k",
          text: "True, but setting up direct fresh USD wires is still painful. Many rely on alternative setups or global virtual banks.",
          timestamp: "45 mins ago",
        },
        {
          id: "c-13",
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
          id: "c-14",
          author: "fadi_b",
          text: "The resilience of their dispatch algorithm is insane. When fuel prices fluctuated daily, they dynamically computed rates using real-time solar tracking integrations and bulk pre-purchases.",
          timestamp: "3 hours ago",
        },
        {
          id: "c-15",
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
          id: "c-16",
          author: "tech_lawyer_lb",
          text: "A UK LTD paired with Wise/Airwallex is currently the fastest to register. Delaware is solid but tax compliance makes it heavier unless you are raising institutional VC money.",
          timestamp: "6 hours ago",
        },
        {
          id: "c-17",
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
          id: "c-18",
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
          id: "c-19",
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
          id: "c-20",
          author: "agro_expert",
          text: "Agriculture is our most valuable sector next to tourism, but irrigation fuel bills were killing the margins. Solar IoT is the perfect remedy.",
          timestamp: "18 hours ago",
        }
      ]
    },
  ];

  const INITIAL_STARTUPS: Startup[] = [];

  const INITIAL_JOBS: Job[] = [
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
      commentsCount: 8,
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
      commentsCount: 3,
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
      commentsCount: 9,
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
      commentsCount: 2,
    }
  ];

  const [currentTab, setTab] = useState<"news" | "ask" | "show" | "startups" | "jobs" | "pitch-lab" | "prospectus" | "policy" | "values" | "resources" | "sandbox" | "nda" | "tor" | "faq" | "mag" | "register" | "admin" | "institutional" | "get-started" | "kickoff" | "bootcamp">("get-started");
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [startups, setStartups] = useState<Startup[]>(INITIAL_STARTUPS);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [searchQuery, setSearchQuery] = useState("");

  // Global High-Contrast Theme State
  const [theme, setTheme] = useState<"light" | "night">(() => {
    const saved = localStorage.getItem("Z961_theme");
    return saved === "light" || saved === "night" ? saved : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("Z961_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "night" : "light"));
  };

  // Loading States
  const [initLoading, setInitLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const [dismissedSyncError, setDismissedSyncError] = useState(false);

  // Upvote history tracked locally in localStorage to block double voting
  const [upvotedStories, setUpvotedStories] = useState<string[]>([]);

  // Local user token id
  const [userId, setUserId] = useState<string>("");

  // User auth state details
  const [activeUserId, setActiveUserId] = useState<string>("");
  const [activeUsername, setActiveUsername] = useState<string>("");
  const [activeEmail, setActiveEmail] = useState<string>("");

  useEffect(() => {
    // Check pathnames to sync routing tabs inside this single page application
    const path = window.location.pathname;
    if (path === "/admin") {
      setTab("admin");
    } else if (path === "/register") {
      setTab("register");
    } else if (path === "/institutional") {
      setTab("institutional");
    } else if (path === "/get-started") {
      setTab("get-started");
    } else if (path === "/kickoff") {
      setTab("kickoff");
    } else if (path === "/bootcamp") {
      setTab("bootcamp");
    } else {
      setTab("get-started");
    }

    // Generate simple unique client userId or grab from cache
    let id = localStorage.getItem("961_comb_user_token");
    if (!id) {
      id = "user-" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("961_comb_user_token", id);
    }
    setUserId(id);

    // Retrieve logged user details
    const cachedUserId = localStorage.getItem("Z961_user_id");
    const cachedUsername = localStorage.getItem("Z961_username");
    const cachedEmail = localStorage.getItem("Z961_email");
    if (cachedUserId && cachedUsername && cachedEmail) {
      setActiveUserId(cachedUserId);
      setActiveUsername(cachedUsername);
      setActiveEmail(cachedEmail);
    }

    // Grab list of already upvoted stories
    const savedUpvotes = localStorage.getItem("961_comb_voted_stories");
    if (savedUpvotes) {
      setUpvotedStories(JSON.parse(savedUpvotes));
    }

    // Trigger REST Fetch
    loadInitialData();
  }, []);

  const handleAuthSuccess = (id: string, name: string, email: string) => {
    setActiveUserId(id);
    setActiveUsername(name);
    setActiveEmail(email);
    localStorage.setItem("Z961_user_id", id);
    localStorage.setItem("Z961_username", name);
    localStorage.setItem("Z961_email", email);
  };

  const handleAuthLogout = () => {
    setActiveUserId("");
    setActiveUsername("");
    setActiveEmail("");
    localStorage.removeItem("Z961_user_id");
    localStorage.removeItem("Z961_username");
    localStorage.removeItem("Z961_email");
    setTab("prospectus");
    window.history.pushState({}, "", "/");
  };

  const loadInitialData = async () => {
    setIsSyncing(true);
    setErrorStatus("");
    try {
      const [storiesRes, startupsRes, jobsRes] = await Promise.all([
        fetch("/api/stories"),
        fetch("/api/startups"),
        fetch("/api/jobs")
      ]);

      if (!storiesRes.ok || !startupsRes.ok || !jobsRes.ok) {
        throw new Error("Failed to synchronize with startup database pipelines.");
      }

      const storiesData = await storiesRes.json();
      const startupsData = await startupsRes.json();
      const jobsData = await jobsRes.json();

      if (storiesData && storiesData.length > 0) setStories(storiesData);
      if (startupsData && startupsData.length > 0) setStartups(startupsData);
      if (jobsData && jobsData.length > 0) setJobs(jobsData);
      
      // Successfully fetched, clear any errors
      setErrorStatus("");
    } catch (err: any) {
      console.warn("API Sync failure - using client fallback seeds:", err);
      setErrorStatus(err.message || "Failed to establish full data synchronizations.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Upvote Action Handler
  const handleUpvote = async (id: string) => {
    try {
      const response = await fetch(`/api/stories/${id}/upvote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();

        // Update local client storage indicator
        let nextUpvotes = [...upvotedStories];
        if (data.voted) {
          nextUpvotes.push(id);
        } else {
          nextUpvotes = nextUpvotes.filter((vid) => vid !== id);
        }
        setUpvotedStories(nextUpvotes);
        localStorage.setItem("961_comb_voted_stories", JSON.stringify(nextUpvotes));

        // Sync points count inside state story
        setStories((prev) =>
          prev.map((story) => (story.id === id ? { ...story, points: data.points } : story))
        );
      }
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };

  // Submit Story Handler
  const handleSubmitStory = async (storyData: {
    title: string;
    url?: string;
    text?: string;
    author: string;
    category: "tech" | "economy" | "ask" | "show";
  }) => {
    const res = await fetch("/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storyData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to publish story.");
    }

    const newStory = await res.json();
    setStories((prev) => [newStory, ...prev]);
  };

  // Add Comment Handler
  const handleAddComment = async (storyId: string, commentData: { author: string; text: string }) => {
    const res = await fetch(`/api/stories/${storyId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed post comments.");
    }

    const newComment = await res.json();

    setStories((prev) =>
      prev.map((story) => {
        if (story.id === storyId) {
          return {
            ...story,
            commentsCount: story.commentsCount + 1,
            comments: [...story.comments, newComment],
          };
        }
        return story;
      })
    );
  };

  // Submit Startup Profile
  const handleSubmitStartup = async (startupData: Omit<Startup, "id" | "founded">) => {
    const res = await fetch("/api/startups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(startupData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to pin company.");
    }

    const newStartup = await res.json();
    setStartups((prev) => [newStartup, ...prev]);
  };

  // Submit Job Board Posting
  const handleSubmitJob = async (jobData: Omit<Job, "id" | "timestamp">) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to publish position.");
    }

    const newJob = await res.json();
    setJobs((prev) => [newJob, ...prev]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between" id="app_frame">
      {/* Upper Navigation Header */}
      <Header
        currentTab={currentTab}
        setTab={(tab) => {
          setTab(tab);
          setSearchQuery(""); // Clear search on tab transition
          
          // Browser history path synchronizer
          if (tab === "admin") {
            window.history.pushState({}, "", "/admin");
          } else if (tab === "register") {
            window.history.pushState({}, "", "/register");
          } else if (tab === "institutional") {
            window.history.pushState({}, "", "/institutional");
          } else if (tab === "get-started") {
            window.history.pushState({}, "", "/get-started");
          } else if (tab === "kickoff") {
            window.history.pushState({}, "", "/kickoff");
          } else if (tab === "bootcamp") {
            window.history.pushState({}, "", "/bootcamp");
          } else {
            window.history.pushState({}, "", "/");
          }
          
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        stats={{
          startupsCount: startups.length,
          jobsCount: jobs.length,
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Core Content Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full" id="root_main_content">
        {/* Subtle synchronization info */}
        {isSyncing && (
          <div className="mb-4 bg-zinc-100 border-2 border-black p-3 text-xs font-mono font-bold flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-black animate-spin" />
              <span>SYNCING PLATFORM DATABASE PROTOCOLS WITH BEIRUT DESK (+961)...</span>
            </span>
          </div>
        )}
        
        {errorStatus && !dismissedSyncError && (
          <div className="mb-4 bg-zinc-950 text-white border-2 border-black p-3.5 text-xs font-mono font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden" id="ambient_sync_banner">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-550/10 via-transparent to-transparent pointer-events-none"></div>
            <div className="flex items-center gap-2.5 z-10">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0"></span>
              <span className="tracking-wide">
                LOCAL RESILIENCE FEED ACTIVE: {errorStatus} (Offline Sandbox Fallback Enabled)
              </span>
            </div>
            <div className="flex items-center gap-2 z-10 shrink-0">
              <button
                onClick={() => {
                  setDismissedSyncError(false);
                  loadInitialData();
                }}
                className="bg-white text-black border border-black text-[9px] uppercase font-black px-2.5 py-1 hover:bg-zinc-250 cursor-pointer transition-colors"
                title="Retry Database Synchronization"
              >
                Retry Sync
              </button>
              <button
                onClick={() => setDismissedSyncError(true)}
                className="bg-zinc-805 text-zinc-400 hover:text-white border border-zinc-700 text-[9px] uppercase font-black px-2.5 py-1 hover:bg-zinc-800 cursor-pointer transition-colors"
                title="Dismiss Warning"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Editorial Hero Banner for primary landing views */}
        {["prospectus", "news", "ask", "show", "policy", "values", "resources", "nda", "tor", "kickoff", "get-started", "faq", "institutional"].includes(currentTab) && (
          <HeroSection
            currentTab={currentTab}
            setTab={(tab) => {
              setTab(tab);
              setSearchQuery(""); // Clear search on tab transition
              
              // Browser history path synchronizer
              if (tab === "admin") {
                window.history.pushState({}, "", "/admin");
              } else if (tab === "register") {
                window.history.pushState({}, "", "/register");
              } else if (tab === "institutional") {
                window.history.pushState({}, "", "/institutional");
              } else if (tab === "get-started") {
                window.history.pushState({}, "", "/get-started");
              } else if (tab === "kickoff") {
                window.history.pushState({}, "", "/kickoff");
              } else if (tab === "bootcamp") {
                window.history.pushState({}, "", "/bootcamp");
              } else {
                window.history.pushState({}, "", "/");
              }
              
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {/* Kickoff Seminar Call to Action Section under Hero Section */}
        {currentTab !== "kickoff" && (
          <div className="bg-red-50 border-4 border-black p-5 sm:p-7 mb-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 uppercase tracking-tight" id="seminar_lead_under_hero">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-red-650 font-mono text-[10px] font-black tracking-widest bg-red-100 border border-red-250 px-2 py-0.5 inline-block">
                <Sparkles className="w-3.5 h-3.5 text-red-600 fill-red-500 animate-pulse" />
                <span>HOT ENTRANCE SPOTLIGHT: CONFERENCE 2026</span>
              </div>
              <h3 className="font-syne font-black text-xl sm:text-2xl text-black uppercase tracking-tighter leading-none mt-1">
                Z961 COMBINATOR KICKOFF SEMINAR & VENTURE ECONOMIC SUMMIT
              </h3>
              <p className="font-mono text-[10px] sm:text-xs text-gray-700 leading-snug font-extrabold normal-case">
                Join 150+ regional developers, digital nomads, and elite diaspora venture capitalists for an intensive 2-Day bootcamp at Beirut Digital District (BDD). Day 1: Global Capital Rails. Day 2: AI Automation Scale Workshop.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0">
              <button
                onClick={() => {
                  setTab("kickoff");
                  window.history.pushState({}, "", "/kickoff");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                type="button"
                className="bg-black text-white border-2 border-black font-syne font-black text-xs uppercase px-5 py-3 hover:bg-zinc-800 transition-all cursor-pointer text-center"
              >
                Explore 2-Day Timetable
              </button>
              
              <button
                onClick={() => {
                  setTab("kickoff");
                  window.history.pushState({}, "", "/kickoff");
                  // Wait a short tick and scroll to passenger module
                  setTimeout(() => {
                    const el = document.getElementById("seminar_passenger_module");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                type="button"
                className="bg-red-600 text-white border-2 border-black font-syne font-black text-xs uppercase px-5 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer text-center"
              >
                Register Your Seat
              </button>
            </div>
          </div>
        )}

        <div className="animate-fade-in" id="active_view_root">
          {/* View dispatch matching tab selection */}
          {currentTab === "news" && (
            <NewsAggregator
              stories={stories}
              setStories={setStories}
              categoryFilter="all"
              onUpvote={handleUpvote}
              onSubmitStory={handleSubmitStory}
              onAddComment={handleAddComment}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoading={isSyncing}
              onRefresh={loadInitialData}
            />
          )}

          {currentTab === "ask" && (
            <NewsAggregator
              stories={stories}
              setStories={setStories}
              categoryFilter="ask"
              onUpvote={handleUpvote}
              onSubmitStory={handleSubmitStory}
              onAddComment={handleAddComment}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoading={isSyncing}
              onRefresh={loadInitialData}
            />
          )}

          {currentTab === "show" && (
            <NewsAggregator
              stories={stories}
              setStories={setStories}
              categoryFilter="show"
              onUpvote={handleUpvote}
              onSubmitStory={handleSubmitStory}
              onAddComment={handleAddComment}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoading={isSyncing}
              onRefresh={loadInitialData}
            />
          )}

          {currentTab === "startups" && (
            <StartupDirectory
              startups={startups}
              onSubmitStartup={handleSubmitStartup}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {currentTab === "jobs" && (
            <JobsBoard
              jobs={jobs}
              onSubmitJob={handleSubmitJob}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {currentTab === "pitch-lab" && <PitchLab />}

          {currentTab === "prospectus" && (
            <Prospectus
              onVisitMag={() => {
                setTab("mag");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {currentTab === "policy" && (
            <PolicyFramework
              onApplyNow={() => {
                setTab("startups");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onEngage={() => {
                setTab("jobs");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {currentTab === "values" && (
            <CoreValues
              onApplyNow={() => {
                setTab("startups");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onLearnMore={() => {
                setTab("prospectus");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {currentTab === "resources" && <ResourcesHub />}

          {currentTab === "kickoff" && (
            <KickoffSeminar 
              onJoinEcosystem={() => setTab("register")}
              onOpenNda={() => setTab("nda")}
            />
          )}

          {currentTab === "sandbox" && <InitiativeSandbox />}

          {currentTab === "nda" && <NdaRegistration />}

          {currentTab === "tor" && <TorRules />}

          {currentTab === "faq" && <FaqHub />}

          {currentTab === "mag" && <TheMag />}

          {currentTab === "register" && (
            <SignupWizard
              onSuccess={handleAuthSuccess}
              activeUserId={activeUserId}
              activeUsername={activeUsername}
              activeEmail={activeEmail}
              onLogout={handleAuthLogout}
            />
          )}

          {currentTab === "admin" && (
            <AdminPanel
              stories={stories}
              setStories={setStories}
              onReloadData={loadInitialData}
            />
          )}

          {currentTab === "institutional" && (
            <InstitutionalEngagement
              activeUserId={activeUserId}
              activeUsername={activeUsername}
              activeEmail={activeEmail}
            />
          )}

          {currentTab === "get-started" && (
            <GetStarted setTab={setTab} />
          )}

          {currentTab === "bootcamp" && (
            <AiStartupBootcamp onJoinEcosystem={() => setTab("register")} />
          )}
        </div>
      </main>

      {/* Clean elegant footer */}
      <footer className="bg-white border-t-2 border-black py-8 mt-12 text-black font-sans" id="main_footer_961">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {/* About Column */}
          <div className="space-y-2 border-2 border-black p-4 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-syne font-black text-black uppercase tracking-tight flex items-center gap-1 text-base">
              <Sparkles className="w-4 h-4 text-black fill-black" />
              <span>961 Combinator</span>
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed font-sans font-medium">
              Premium retro-modern tech ecosystem sandbox connecting remote Lebanese software engineers, startup builders, and offshore capital. Styled after Hacker News with modern AI optimizations.
            </p>
          </div>

          {/* Guidelines Column */}
          <div className="space-y-1.5 border-2 border-black p-4 bg-zinc-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-mono text-xs font-black text-black uppercase tracking-wider">Community Guidelines</h4>
            <ul className="text-xs text-gray-700 space-y-1 font-mono font-bold">
              <li>• ALWAYS POST CONSTRUCTIVE, LOGICAL ANALYSES.</li>
              <li>• HIGHLIGHT FRESH CURRENCY GENERATION (+961).</li>
              <li>• EMPHASIZE REAL EXECUTION OVER SPECULATION.</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-1.5 border-2 border-black p-4 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs text-black font-mono font-bold">
            <h4 className="text-xs font-black text-black uppercase tracking-wider">Contact & Desk</h4>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-black" />
              <span>BYBLOS / BEIRUT, LEBANON</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-black" />
              <span>INFO@Z961COMBINATOR.XYZ</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">© {new Date().getFullYear()} 961 COMBINATOR. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
