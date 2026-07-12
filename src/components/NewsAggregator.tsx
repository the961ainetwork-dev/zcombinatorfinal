import React, { useState } from "react";
import { Story, Comment } from "../types";
import { ArrowUp, CornerDownRight, MessageSquare, Plus, Search, Tag, ExternalLink, RefreshCw, X, User, Clock, Share2, Copy, Check } from "lucide-react";

// Robust, deterministic reading time calculation helper based on the story type and content length
const calculateReadingTime = (story: Story, wpm: number = 200) => {
  const titleWordsCount = story.title ? story.title.split(/\s+/).filter(Boolean).length : 0;
  const textWordsCount = story.text ? story.text.split(/\s+/).filter(Boolean).length : 0;
  let totalWords = titleWordsCount + textWordsCount;

  if (story.url) {
    // Generate a consistent pseudo-random word count between 350 and 1500 words for the external article
    const idNum = parseInt(story.id.replace(/\D/g, ""), 10) || story.title.length || 7;
    const estimatedWebWords = 350 + ((idNum * 17) % 1150);
    totalWords += estimatedWebWords;
  } else if (!story.text) {
    // Standard quick stub story
    const idNum = parseInt(story.id.replace(/\D/g, ""), 10) || story.title.length || 5;
    totalWords += 50 + ((idNum * 11) % 100);
  }

  const minutes = Math.max(1, Math.round(totalWords / wpm));
  return {
    minutes,
    words: totalWords,
  };
};

interface NewsAggregatorProps {
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
  categoryFilter: "all" | "tech" | "economy" | "news" | "ask" | "show";
  onUpvote: (id: string) => Promise<void>;
  onSubmitStory: (storyData: {
    title: string;
    url?: string;
    text?: string;
    author: string;
    category: "tech" | "economy" | "ask" | "show";
  }) => Promise<void>;
  onAddComment: (storyId: string, commentData: { author: string; text: string }) => Promise<void>;
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export default function NewsAggregator({
  stories,
  setStories,
  categoryFilter,
  onUpvote,
  onSubmitStory,
  onAddComment,
  searchQuery: externalSearchQuery,
  setSearchQuery: setExternalSearchQuery,
  isLoading = false,
  onRefresh,
}: NewsAggregatorProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : localSearchQuery;
  const setSearchQuery = setExternalSearchQuery !== undefined ? setExternalSearchQuery : setLocalSearchQuery;
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [sharingStory, setSharingStory] = useState<Story | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);
  const [copiedStoryIds, setCopiedStoryIds] = useState<Record<string, boolean>>({});
  const [activeShareTab, setActiveShareTab] = useState<"twitter" | "linkedin" | "whatsapp">("twitter");
  const [internalLoading, setInternalLoading] = useState(false);
  const activeLoading = isLoading || internalLoading;

  const handleCopyStoryLink = async (e: React.MouseEvent, storyId: string) => {
    e.stopPropagation();
    const link = typeof window !== "undefined"
      ? `${window.location.origin}/?story=${encodeURIComponent(storyId)}`
      : `https://ais-pre-ozodkckudhuljbtn66jpv7-276616341447.europe-west3.run.app/?story=${encodeURIComponent(storyId)}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(link);
        setCopiedStoryIds((prev) => ({ ...prev, [storyId]: true }));
        setTimeout(() => {
          setCopiedStoryIds((prev) => ({ ...prev, [storyId]: false }));
        }, 1800);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // Submission Form State
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState<"tech" | "economy" | "ask" | "show">("tech");
  const [submitError, setSubmitError] = useState("");

  // Comment Form State
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentError, setCommentError] = useState("");

  const [sortBy, setSortBy] = useState<"points" | "newest" | "comments">("points");
  const [readingSpeed, setReadingSpeed] = useState<number>(200); // WPM (150 = Relaxed, 200 = Standard, 250 = Fast, 300 = Speed)

  // Helper to parse relative timestamp into milliseconds estimate
  const parseRelativeTime = (timestamp: string): number => {
    if (!timestamp) return 0;
    const lower = timestamp.toLowerCase().trim();
    if (lower === "just now" || lower.includes("just now")) {
      return Date.now();
    }
    const matchMin = lower.match(/(\d+)\s*(min|minute|mins)/);
    if (matchMin) {
      return Date.now() - parseInt(matchMin[1], 10) * 60 * 1000;
    }
    const matchHour = lower.match(/(\d+)\s*(hour|hr|hours)/);
    if (matchHour) {
      return Date.now() - parseInt(matchHour[1], 10) * 60 * 60 * 1000;
    }
    const matchDay = lower.match(/(\d+)\s*(day|days|dy)/);
    if (matchDay) {
      return Date.now() - parseInt(matchDay[1], 10) * 24 * 60 * 60 * 1000;
    }
    const parsed = Date.parse(timestamp);
    if (!isNaN(parsed)) {
      return parsed;
    }
    return 0;
  };

  // Filter and Search Stories (Stage 1 & 2)
  const rawFilteredStories = stories.filter((story) => {
    // Stage 1: Category Filter
    if (categoryFilter !== "all" && story.category !== categoryFilter) return false;

    // Stage 2: Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchTitle = story.title.toLowerCase().includes(query);
      const matchAuthor = story.author.toLowerCase().includes(query);
      const matchText = story.text?.toLowerCase().includes(query) || false;
      return matchTitle || matchAuthor || matchText;
    }
    return true;
  });

  // Sort raw filtered stories based on active mode
  const filteredStories = [...rawFilteredStories].sort((a, b) => {
    if (sortBy === "points") {
      return b.points - a.points;
    } else if (sortBy === "comments") {
      return b.commentsCount - a.commentsCount;
    } else {
      // "newest" sorting
      const timeA = parseRelativeTime(a.timestamp);
      const timeB = parseRelativeTime(b.timestamp);
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      // Fallback
      return b.id.localeCompare(a.id);
    }
  });

  // Handle Post Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setSubmitError("Title is required");
      return;
    }
    if (!newAuthor.trim()) {
      setSubmitError("Author pen-name is required");
      return;
    }
    if (newUrl.trim() && !newUrl.startsWith("http://") && !newUrl.startsWith("https://")) {
      setSubmitError("URL must start with http:// or https://");
      return;
    }

    try {
      await onSubmitStory({
        title: newTitle,
        url: newUrl.trim() || undefined,
        text: newText.trim() || undefined,
        author: newAuthor,
        category: newCategory,
      });

      // Reset
      setNewTitle("");
      setNewUrl("");
      setNewText("");
      setNewAuthor("");
      setNewCategory("tech");
      setSubmitError("");
      setShowSubmitModal(false);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit story");
    }
  };

  // Helper to calculate the live estimated reading time for draft content in submission modal
  const getDraftReadingTime = () => {
    const titleWords = newTitle ? newTitle.trim().split(/\s+/).filter(Boolean).length : 0;
    const textWords = newText ? newText.trim().split(/\s+/).filter(Boolean).length : 0;
    let totalWords = titleWords + textWords;
    if (newUrl) {
      totalWords += 350; // default estimated external article words count
    }
    const mins = Math.max(1, Math.round(totalWords / readingSpeed));
    return { minutes: mins, words: totalWords };
  };

  // Handle Comment Submit
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStory) return;
    if (!commentText.trim()) {
      setCommentError("Comment body is required");
      return;
    }
    if (!commentAuthor.trim()) {
      setCommentError("Your name/handle is required");
      return;
    }

    try {
      await onAddComment(selectedStory.id, {
        author: commentAuthor,
        text: commentText,
      });

      // Reload selected story reference from active database array to reflect comments immediately
      const refreshedStory = stories.find((s) => s.id === selectedStory.id);
      if (refreshedStory) {
        setSelectedStory(refreshedStory);
      }

      setCommentText("");
      setCommentAuthor("");
      setCommentError("");
    } catch (err: any) {
      setCommentError(err.message || "Failed to add comment");
    }
  };

  // Helper mapping category identifiers to beautiful human tags
  const getCategoryTagClass = (category: string) => {
    switch (category) {
      case "tech":
        return "bg-black text-white border-black font-black";
      case "economy":
        return "bg-zinc-100 text-black border-zinc-500 font-medium";
      case "ask":
        return "bg-zinc-800 text-white border-black font-semibold";
      case "show":
        return "bg-zinc-300 text-black border-black font-extrabold";
      default:
        return "bg-white text-black border-zinc-400";
    }
  };

  const getStoryDomain = (url?: string) => {
    if (!url) return null;
    try {
      const hostname = new URL(url).hostname;
      return hostname.startsWith("www.") ? hostname.substring(4) : hostname;
    } catch (_) {
      return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans text-black" id="news_agg_container">
      {/* Side Details/Threads Panel or Main list block */}
      <div className={`${selectedStory ? "lg:col-span-7" : "lg:col-span-12"} flex flex-col gap-4`} id="news_list_section">
        {/* Actions bar */}
        <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 max-w-full sm:max-w-xs flex-1 bg-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Search className="w-4 h-4 text-black shrink-0" />
            <input
              id="search_news_input"
              type="text"
              placeholder="Search hacker news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-transparent outline-none w-full text-black placeholder-gray-500 font-mono uppercase"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-black hover:text-zinc-600 cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Premium Neo-Brutalist Sorting Dropdown */}
          <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all text-xs font-mono" id="stories_sorting_dropdown_box">
            <span className="font-bold text-gray-500 uppercase select-none shrink-0">Sort:</span>
            <select
              id="stories_sort_select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "points" | "newest" | "comments")}
              className="bg-transparent border-none outline-none font-black uppercase text-black cursor-pointer pr-1"
            >
              <option value="points" className="bg-white text-black font-mono">Most Points (Default)</option>
              <option value="newest" className="bg-white text-black font-mono">Newest</option>
              <option value="comments" className="bg-white text-black font-mono">Most Commented</option>
            </select>
          </div>

          {/* Premium Neo-Brutalist Reading Speed Control */}
          <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all text-xs font-mono" id="stories_reading_speed_box">
            <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="font-bold text-gray-500 uppercase select-none shrink-0">WPM:</span>
            <select
              id="stories_speed_select"
              value={readingSpeed}
              onChange={(e) => setReadingSpeed(Number(e.target.value))}
              className="bg-transparent border-none outline-none font-black uppercase text-black cursor-pointer pr-1"
            >
              <option value={150} className="bg-white text-black font-mono">150 WPM (Relaxing)</option>
              <option value={200} className="bg-white text-black font-mono">200 WPM (Standard)</option>
              <option value={250} className="bg-white text-black font-mono">250 WPM (Quick)</option>
              <option value={300} className="bg-white text-black font-mono">300 WPM (Rapid)</option>
            </select>
          </div>

          <button
            id="sync_feed_btn"
            onClick={() => {
              if (onRefresh) {
                onRefresh();
              } else {
                setInternalLoading(true);
                setTimeout(() => {
                  setInternalLoading(false);
                }, 1300);
              }
            }}
            disabled={activeLoading}
            className="flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-black font-mono font-black border-2 border-black px-3.5 py-1.5 text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer transition-all disabled:opacity-50"
            title="Force refresh database pipeline feed"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-black ${activeLoading ? "animate-spin" : ""}`} />
            <span>Sync Feed</span>
          </button>

          <button
            id="open_submit_modal_btn"
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-1.5 bg-black hover:bg-neutral-800 text-white font-bold border-2 border-black px-4 py-2 text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1.5px] active:translate-y-[1.5px] cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Submit Story</span>
          </button>
        </div>

        {/* Stories List Feed */}
        <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] divide-y-2 divide-black overflow-hidden mb-8">
          {activeLoading ? (
            // Modern premium skeleton screens for visual data feedback
            Array.from({ length: 4 }).map((_, skeletonIdx) => (
              <div
                key={`story_skeleton_${skeletonIdx}`}
                className="p-4 flex gap-4 items-start bg-white border-b border-zinc-100 last:border-b-0"
              >
                {/* Index number and pulsing upvote box skeleton */}
                <div className="flex flex-col items-center gap-1.5 pt-0.5" id={`skeleton_vote_box_${skeletonIdx}`}>
                  <span className="text-xs font-mono font-bold text-zinc-300 w-5 text-right select-none">
                    {skeletonIdx + 1}.
                  </span>
                  <div className="w-6 h-6 bg-zinc-200 border-2 border-dashed border-zinc-300 rounded-none animate-pulse shrink-0"></div>
                </div>

                {/* Main cell content placeholder skeleton */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="space-y-2">
                    <div className="h-4 bg-zinc-200 border border-zinc-300 w-3/4 animate-pulse rounded-none"></div>
                    <div className="h-3 bg-zinc-100 border border-zinc-200 w-1/4 animate-pulse rounded-none"></div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs">
                    <div className="h-4 w-16 bg-zinc-150 border border-zinc-250 animate-pulse rounded-none"></div>
                    <span className="text-zinc-300">•</span>
                    <div className="h-4 w-20 bg-zinc-100 border border-zinc-150 animate-pulse rounded-none"></div>
                    <span className="text-zinc-300">•</span>
                    <div className="h-4 w-24 bg-zinc-150 border border-zinc-200 animate-pulse rounded-none"></div>
                    <span className="text-zinc-300">•</span>
                    <div className="h-4 w-12 bg-amber-50/50 border border-orange-200/50 animate-pulse rounded-none"></div>
                    <div className="h-4 w-14 bg-zinc-200 border border-zinc-200 animate-pulse rounded-none ml-auto"></div>
                  </div>
                </div>
              </div>
            ))
          ) : filteredStories.length === 0 ? (
            <div className="p-12 text-center text-gray-500 font-sans" id="empty_stories_prompt">
              <p className="font-semibold text-lg uppercase font-display text-black">No news found</p>
              <p className="text-sm text-gray-500 mt-1">Be the first to submit a tech breakthrough or financial commentary for Lebanon!</p>
            </div>
          ) : (
            filteredStories.map((story, idx) => {
              const isSelected = selectedStory?.id === story.id;
              return (
                <div
                  key={story.id}
                  id={`story_row_${story.id}`}
                  className={`p-4 flex gap-4 items-start transition hover:bg-zinc-50 ${
                    isSelected ? "bg-zinc-100" : "bg-white"
                  }`}
                >
                  {/* index number and upvote */}
                  <div className="flex flex-col items-center gap-1.5 pt-0.5" id={`vote_box_${story.id}`}>
                    <span className="text-xs font-mono font-bold text-black w-5 text-right select-none">
                      {idx + 1}.
                    </span>
                    <button
                      id={`upvote_btn_${story.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpvote(story.id);
                      }}
                      className="group bg-white hover:bg-black border-2 border-black rounded-none p-1 transition-all shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px]"
                      title="Upvote story"
                    >
                      <ArrowUp className="w-3.5 h-3.5 text-black group-hover:text-white transition" />
                    </button>
                  </div>

                  {/* Main cell information */}
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setSelectedStory(story)}>
                    <div className="flex flex-wrap items-baseline gap-1.5 mb-1.5">
                      <h2 className="font-syne font-bold text-black text-sm sm:text-base leading-snug hover:text-zinc-600 transition-colors uppercase tracking-tight">
                        {story.title}
                      </h2>
                      {story.url && (
                        <a
                          href={story.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] text-gray-500 hover:text-black font-mono flex items-center gap-0.5 inline-flex"
                        >
                          <span>({getStoryDomain(story.url)})</span>
                          <ExternalLink className="w-2.5 h-2.5 text-black animate-pulse" />
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-gray-600 font-mono">
                      <span className="font-bold text-black bg-zinc-100 border border-black px-1.5 py-0.2">{story.points} points</span>
                      <span className="text-black font-semibold">by @{story.author}</span>
                      <span>{story.timestamp}</span>
                      <span className="text-zinc-400">•</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStory(story);
                        }}
                        className="flex items-center gap-1 text-black font-bold hover:text-neutral-600 transition cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-black" />
                        <span>{story.commentsCount} comments</span>
                      </button>
                      <span className="text-zinc-400">•</span>
                      <span 
                        className="flex items-center gap-1 text-zinc-750 dark:text-zinc-350 bg-amber-50 dark:bg-zinc-805 border border-black px-1.5 py-0.2 select-none" 
                        title={`Estimated based on ${calculateReadingTime(story, readingSpeed).words} words in full target article at ${readingSpeed} WPM`}
                      >
                        <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0 animate-pulse" />
                        <span>{calculateReadingTime(story, readingSpeed).minutes} min read</span>
                      </span>
                      <span className="text-zinc-400">•</span>
                      <button
                        id={`share_btn_${story.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSharingStory(story);
                        }}
                        className="flex items-center gap-1 text-black font-black hover:text-amber-500 transition cursor-pointer bg-amber-200/50 hover:bg-amber-100 border border-black px-1.5 py-0.2 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px]"
                        title="Share this story"
                      >
                        <Share2 className="w-3 h-3 text-black" />
                        <span>Share</span>
                      </button>
                      <span className="text-zinc-400">•</span>
                      <button
                        id={`story_copy_link_btn_${story.id}`}
                        onClick={(e) => handleCopyStoryLink(e, story.id)}
                        className={`flex items-center gap-1 font-black transition cursor-pointer border border-black px-1.5 py-0.2 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] ${
                          copiedStoryIds[story.id]
                            ? "bg-emerald-100 text-emerald-800 border-zinc-900"
                            : "bg-zinc-100 hover:bg-zinc-50 text-black hover:text-amber-600"
                        }`}
                        title="Copy direct shareable link for this story"
                      >
                        {copiedStoryIds[story.id] ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-black animate-none" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                      <span className={`text-[10px] px-2 py-0.5 border ${getCategoryTagClass(story.category)} ml-auto font-mono font-bold uppercase`}>
                        {story.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT/DRAWER SIDE: Nested Discussion Thread Pane */}
      {selectedStory && (
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 animate-fade-in" id="comments_thread_panel">
          <div className="bg-zinc-50 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[85vh]">
            {/* Thread Header */}
            <div className="bg-black p-4 border-b-2 border-black flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-white fill-white" />
                <h3 className="font-syne font-bold text-sm uppercase tracking-tight">
                  Discussion Thread
                </h3>
              </div>
              <button
                id="close_comments_btn"
                onClick={() => setSelectedStory(null)}
                className="text-white hover:text-zinc-300 p-1 border-2 border-black bg-neutral-900 transition font-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Story Main Body in thread */}
            <div className="p-4 border-b-2 border-black bg-white overflow-y-auto">
              <h4 className="font-syne font-bold text-black uppercase text-sm mb-2 leading-tight">
                {selectedStory.title}
              </h4>
              {selectedStory.url && (
                <a
                  href={selectedStory.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-black font-bold hover:underline flex items-center gap-1 mb-2 inline-flex"
                >
                  <span>Go to website</span>
                  <ExternalLink className="w-3 h-3 text-black" />
                </a>
              )}
              {selectedStory.text && (
                <div className="text-xs text-black bg-zinc-100 p-3.5 border border-black font-mono leading-relaxed mt-2 uppercase">
                  {selectedStory.text}
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-[10px] font-mono text-gray-500">
                <span className="font-bold text-black">{selectedStory.points} points</span>
                <span>•</span>
                <span>Posted by @{selectedStory.author}</span>
                <span>•</span>
                <span>{selectedStory.timestamp}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-black text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 select-none text-[9px]">
                  <Clock className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                  <span>{calculateReadingTime(selectedStory, readingSpeed).minutes} MIN READ ({calculateReadingTime(selectedStory, readingSpeed).words} WDS AT {readingSpeed} WPM)</span>
                </span>
              </div>
            </div>

            {/* Nested Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              <div className="text-[10px] font-bold text-black font-mono uppercase tracking-wider mb-2">
                Comments ({selectedStory.comments.length})
              </div>

              {selectedStory.comments.length === 0 ? (
                <p className="text-xs text-gray-400 italic text-center py-6 font-mono uppercase font-bold">No comments yet. Share your thoughts!</p>
              ) : (
                selectedStory.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2.5 items-start bg-zinc-100 p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <CornerDownRight className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-black text-black">
                          @{comment.author}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-gray-800 leading-relaxed font-sans select-text">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Area */}
            <div className="p-4 bg-zinc-50 border-t-2 border-black font-sans">
              <form onSubmit={handleCommentSubmit} className="space-y-3" id="add_comment_form">
                <div>
                  <label className="block text-[9px] font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Your Name/Handle
                  </label>
                  <input
                    id="comment_author_input"
                    type="text"
                    required
                    placeholder="e.g. cedar_builder"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Your Comment
                  </label>
                  <textarea
                    id="comment_text_textarea"
                    required
                    rows={2}
                    placeholder="Provide logical economic insight, advice, or feedback..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-pulse"
                  />
                </div>

                {commentError && (
                  <p className="text-xs text-rose-600 font-mono bg-rose-50 p-2 border-2 border-rose-500">
                    {commentError}
                  </p>
                )}

                <button
                  id="submit_comment_btn"
                  type="submit"
                  className="w-full bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-850 font-bold uppercase text-[10px] py-2 transition-all cursor-pointer font-mono"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="story_submit_modal_overlay">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full overflow-hidden text-black rounded-none">
            <div className="bg-zinc-100 p-4 border-b-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-black text-bold stroke-[3]" />
                <h3 className="font-syne font-bold text-sm text-black uppercase tracking-tight">
                  Submit to 961 Combinator
                </h3>
              </div>
              <button
                id="close_story_modal_btn"
                onClick={() => setShowSubmitModal(false)}
                className="text-black hover:text-zinc-650 p-1 border-2 border-black bg-white transition hover:translate-x-[1px] hover:translate-y-[1px] font-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 space-y-4" id="submit_story_form">
              <div>
                <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  id="submit_story_title"
                  type="text"
                  required
                  placeholder="Keep it informative and objective"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1 flex items-center gap-1">
                  <span>URL Link</span>
                  <span className="text-[10px] text-gray-500 lowercase">(optional)</span>
                </label>
                <input
                  id="submit_story_url"
                  type="url"
                  placeholder="https://economylebanon.org/article-example"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1 flex items-center gap-1">
                  <span>Or Text Discussion</span>
                  <span className="text-[10px] text-gray-500 lowercase">(optional)</span>
                </label>
                <textarea
                  id="submit_story_text"
                  rows={3}
                  placeholder="Tell the community about your SaaS, tech problem, or economic policy advice..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:ring-1 focus:ring-black"
                />
              </div>

              {/* Dynamic Draft Read-time Estimation Badge */}
              <div className="bg-orange-50 border-2 border-dashed border-orange-400 p-2.5 flex items-center justify-between font-mono text-[11px] text-orange-950" id="draft_readtime_badge">
                <div className="flex items-center gap-1.5 font-bold">
                  <Clock className="w-4 h-4 text-orange-600 animate-pulse shrink-0" />
                  <span>ESTIMATED READ TIME:</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-orange-800">{getDraftReadingTime().minutes} MIN READ </span>
                  <span className="text-gray-500">({getDraftReadingTime().words} words at {readingSpeed} WPM)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Category Tag *
                  </label>
                  <select
                    id="submit_story_category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <option value="tech">Tech</option>
                    <option value="economy">Economy</option>
                    <option value="ask">Ask 961</option>
                    <option value="show">Show 961</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-wider mb-1">
                    Your Pen-Name *
                  </label>
                  <input
                    id="submit_story_author"
                    type="text"
                    required
                    placeholder="e.g. beirut_innovator"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>

              {submitError && (
                <p className="text-xs text-rose-600 font-mono bg-rose-50 p-2.5 border-2 border-rose-500">
                  {submitError}
                </p>
              )}

              <div className="pt-4 border-t-2 border-black flex items-center justify-end gap-3">
                <button
                  type="button"
                  id="cancel_submission_btn"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-bold uppercase bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="confirm_submission_btn"
                  className="px-5 py-2 text-xs font-black uppercase text-white bg-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
                >
                  Post Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {sharingStory && (() => {
        const shareLink = typeof window !== "undefined" ? `${window.location.origin}/?story=${encodeURIComponent(sharingStory.id)}` : `https://ais-pre-ozodkckudhuljbtn66jpv7-276616341447.europe-west3.run.app/?story=${encodeURIComponent(sharingStory.id)}`;
        
        const twitterDraft = `Check out this startup story from @961Combinator: "${sharingStory.title}" by @${sharingStory.author} \n\n#Lebanon #Tech #VentureCapital`;
        const linkedinDraft = `I highly recommend reading "${sharingStory.title}" by @${sharingStory.author} on Z961-Combinator Exchange - a key forum where Lebanon's engineering excellence meets diaspora venture capital.`;
        const whatsappDraft = `Hey! Check out this startup story on Z961-Combinator: "${sharingStory.title}" by @${sharingStory.author} - ${shareLink}`;

        let currentDraftText = "";
        let platformIntentUrl = "";
        let platformName = "";

        if (activeShareTab === "twitter") {
          currentDraftText = twitterDraft;
          platformName = "X (Twitter)";
          platformIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterDraft)}&url=${encodeURIComponent(shareLink)}`;
        } else if (activeShareTab === "linkedin") {
          currentDraftText = linkedinDraft;
          platformName = "LinkedIn";
          platformIntentUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`;
        } else {
          currentDraftText = whatsappDraft;
          platformName = "WhatsApp";
          platformIntentUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappDraft)}`;
        }

        const handleCopyLink = async () => {
          try {
            await navigator.clipboard.writeText(shareLink);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
          } catch (err) {
            console.error("Could not copy:", err);
          }
        };

        const handleCopyTemplate = async () => {
          try {
            await navigator.clipboard.writeText(currentDraftText);
            setCopiedPlatform(activeShareTab);
            setTimeout(() => setCopiedPlatform(null), 2000);
          } catch (err) {
            console.error("Could not copy template:", err);
          }
        };

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="story_share_modal_overlay">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full overflow-hidden text-black rounded-none">
              
              {/* Modal Header */}
              <div className="bg-amber-400 p-4 border-b-4 border-black flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-black stroke-[3]" />
                  <h3 className="font-syne font-black text-sm text-black uppercase tracking-tight">
                    Share Platform Story
                  </h3>
                </div>
                <button
                  id="close_share_modal_btn"
                  onClick={() => {
                    setSharingStory(null);
                    setCopiedLink(false);
                    setCopiedPlatform(null);
                  }}
                  className="text-black hover:text-white p-1 border-2 border-black bg-white hover:bg-black transition font-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4 font-mono text-xs">
                {/* Story Info Cards */}
                <div className="bg-zinc-50 border-2 border-black p-3.5 space-y-1" id="share_preview_box">
                  <span className="text-[9px] bg-black text-amber-400 px-1.5 py-0.5 font-bold uppercase w-fit block text-[8px]">Story Selected</span>
                  <h4 className="font-syne font-extrabold text-sm text-black uppercase leading-snug pt-1">{sharingStory.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-650 pt-1 font-semibold">
                    <span>by @{sharingStory.author}</span>
                    <span>•</span>
                    <span>{sharingStory.points} points</span>
                    <span>•</span>
                    <span className="text-orange-600 uppercase font-bold">{sharingStory.category}</span>
                  </div>
                </div>

                {/* Raw generated copy-to-clipboard link */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-black uppercase tracking-wider">
                    Generated Direct Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="share_link_input"
                      type="text"
                      readOnly
                      value={shareLink}
                      className="w-full text-xs bg-zinc-50 border-2 border-black p-2.5 outline-none text-black font-semibold select-all rounded-none"
                    />
                    <button
                      id="copy_link_btn"
                      onClick={handleCopyLink}
                      className="flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-black font-black border-2 border-black px-4 py-2 uppercase shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer whitespace-nowrap"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                          <span className="text-emerald-800">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-black" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Pre-filled social media text templates */}
                <div className="space-y-2 pt-2 border-t-2 border-zinc-200">
                  <label className="block text-[10px] font-bold text-black uppercase tracking-wider mb-2">
                    Select Social Media Format & Template
                  </label>
                  
                  {/* Neon Brutalist Tabs */}
                  <div className="grid grid-cols-3 gap-2" id="share_tabs_list">
                    <button
                      type="button"
                      onClick={() => setActiveShareTab("twitter")}
                      className={`py-1.5 px-2 border-2 border-black text-center font-bold uppercase text-[10px] transition-all cursor-pointer ${
                        activeShareTab === "twitter"
                          ? "bg-black text-white shadow-none"
                          : "bg-zinc-100 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-50"
                      }`}
                    >
                      X (Twitter)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveShareTab("linkedin")}
                      className={`py-1.5 px-2 border-2 border-black text-center font-bold uppercase text-[10px] transition-all cursor-pointer ${
                        activeShareTab === "linkedin"
                          ? "bg-black text-white shadow-none"
                          : "bg-zinc-100 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-50"
                      }`}
                    >
                      LinkedIn
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveShareTab("whatsapp")}
                      className={`py-1.5 px-2 border-2 border-black text-center font-bold uppercase text-[10px] transition-all cursor-pointer ${
                        activeShareTab === "whatsapp"
                          ? "bg-black text-white shadow-none"
                          : "bg-zinc-100 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-50"
                      }`}
                    >
                      WhatsApp
                    </button>
                  </div>

                  {/* Active Tab Preview / Output box */}
                  <div className="bg-zinc-50 border-2 border-black p-3 space-y-3 mt-2" id="selected_share_tab_details">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-zinc-500 font-bold uppercase block">Pre-Filled Draft Template</span>
                    </div>
                    <textarea
                      readOnly
                      rows={4}
                      value={currentDraftText}
                      className="w-full text-xs font-mono font-medium text-black bg-white border border-zinc-400 p-2.5 outline-none select-all rounded-none resize-none leading-relaxed"
                    />

                    {/* Action buttons inside Tab */}
                    <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-dashed border-zinc-305">
                      <button
                        type="button"
                        id="copy_template_draft_btn"
                        onClick={handleCopyTemplate}
                        className="flex items-center gap-1.5 bg-white hover:bg-zinc-100 text-black font-black border-2 border-black px-3.5 py-1.5 uppercase text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer transition-all"
                      >
                        {copiedPlatform === activeShareTab ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-705 stroke-[3]" />
                            <span className="text-emerald-805">Template Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-black" />
                            <span>Copy Template</span>
                          </>
                        )}
                      </button>

                      <a
                        href={platformIntentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-black hover:bg-neutral-850 text-white font-black border-2 border-black px-4 py-2 uppercase text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer transition-all"
                        id="open_platform_intent_link"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                        <span>Share on {platformName}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Footer disclaimer */}
                <p className="text-[9px] uppercase tracking-wide text-zinc-400 leading-tight text-center pt-2">
                  * Social share popups may be blocked inside the frame. Prefer "Copy Template" or open the app in a new tab for seamless intent redirection.
                </p>
              </div>

              {/* Close footer button */}
              <div className="border-t-2 border-black bg-zinc-100 p-4 flex justify-end">
                <button
                  type="button"
                  id="close_share_modal_bottom_btn"
                  onClick={() => {
                    setSharingStory(null);
                    setCopiedLink(false);
                    setCopiedPlatform(null);
                  }}
                  className="px-5 py-2 text-xs font-black uppercase bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-50 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>

            </div>
          </div>
        );
      })()}
    </div>
  );
}
