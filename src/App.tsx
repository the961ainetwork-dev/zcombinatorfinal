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
import { Story, Startup, Job } from "./types";
import { Info, Mail, Phone, MapPin, Loader2, Sparkles } from "lucide-react";

export default function App() {
  const [currentTab, setTab] = useState<"news" | "ask" | "show" | "startups" | "jobs" | "pitch-lab" | "prospectus" | "policy" | "values" | "resources" | "sandbox">("news");
  const [stories, setStories] = useState<Story[]>([]);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  // Loading States
  const [initLoading, setInitLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState("");

  // Upvote history tracked locally in localStorage to block double voting
  const [upvotedStories, setUpvotedStories] = useState<string[]>([]);

  // Local user token id
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    // Generate simple unique client userId or grab from cache
    let id = localStorage.getItem("961_comb_user_token");
    if (!id) {
      id = "user-" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("961_comb_user_token", id);
    }
    setUserId(id);

    // Grab list of already upvoted stories
    const savedUpvotes = localStorage.getItem("961_comb_voted_stories");
    if (savedUpvotes) {
      setUpvotedStories(JSON.parse(savedUpvotes));
    }

    // Trigger REST Fetch
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setInitLoading(true);
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

      setStories(storiesData);
      setStartups(startupsData);
      setJobs(jobsData);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || "Failed to establish full data synchronizations.");
    } finally {
      setInitLoading(false);
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
          // Auto-scroll to top of active page layout
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        stats={{
          startupsCount: startups.length,
          jobsCount: jobs.length,
        }}
      />

      {/* Main Core Content Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full" id="root_main_content">
        {initLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#FFF9E6] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#FF6600] text-center p-8 max-w-lg mx-auto" id="syncing_loader">
            <Loader2 className="w-10 h-10 text-[#FF6600] animate-spin mb-3" />
            <h3 className="font-display font-black text-lg text-black uppercase tracking-tight">Synchronizing database...</h3>
            <p className="text-xs text-gray-700 font-mono mt-1 font-bold">DOWNLOADING REGIONAL FEEDS & CLEARING INDEX RATES (+961)</p>
          </div>
        ) : errorStatus ? (
          <div className="bg-[#FFD1CE] border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black max-w-md mx-auto space-y-3 text-center" id="syncing_error">
            <Info className="w-8 h-8 text-[#FF6600] mx-auto" />
            <h3 className="font-display font-black text-base text-black uppercase">Pipeline Offline</h3>
            <p className="text-xs font-mono font-bold leading-relaxed">{errorStatus}</p>
            <button
              onClick={loadInitialData}
              className="mt-2 bg-white text-black border-2 border-black font-mono font-bold uppercase px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-none transition-all cursor-pointer text-xs"
            >
              Retry Sync
            </button>
          </div>
        ) : (
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
              />
            )}

            {currentTab === "startups" && (
              <StartupDirectory startups={startups} onSubmitStartup={handleSubmitStartup} />
            )}

            {currentTab === "jobs" && <JobsBoard jobs={jobs} onSubmitJob={handleSubmitJob} />}

            {currentTab === "pitch-lab" && <PitchLab />}

            {currentTab === "prospectus" && <Prospectus />}

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

            {currentTab === "sandbox" && <InitiativeSandbox />}
          </div>
        )}
      </main>

      {/* Clean elegant footer */}
      <footer className="bg-white border-t-2 border-black py-8 mt-12 text-black font-sans" id="main_footer_961">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {/* About Column */}
          <div className="space-y-2 border-2 border-black p-4 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <h4 className="font-display font-black text-black uppercase tracking-tight flex items-center gap-1 text-base">
              <Sparkles className="w-4 h-4 text-[#FF6600] fill-[#FF6600]" />
              <span>961 Combinator</span>
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed font-sans font-medium">
              Premium retro-modern tech ecosystem sandbox connecting remote Lebanese software engineers, startup builders, and offshore capital. Styled after Hacker News with modern AI optimizations.
            </p>
          </div>

          {/* Guidelines Column */}
          <div className="space-y-1.5 border-2 border-black p-4 bg-[#FFF9E6] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
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
              <MapPin className="w-3.5 h-3.5 text-[#FF6600]" />
              <span>BYBLOS / BEIRUT, LEBANON</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#FF6600]" />
              <span>INFO@Z961COMBINATOR.XYZ</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">© {new Date().getFullYear()} 961 COMBINATOR. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
