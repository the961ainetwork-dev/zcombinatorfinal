import React, { useState } from "react";
import { Story, Comment } from "../types";
import { ArrowUp, CornerDownRight, MessageSquare, Plus, Search, Tag, ExternalLink, RefreshCw, X, User } from "lucide-react";

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
}: NewsAggregatorProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : localSearchQuery;
  const setSearchQuery = setExternalSearchQuery !== undefined ? setExternalSearchQuery : setLocalSearchQuery;
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

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

  const [sortBy, setSortBy] = useState<"newest" | "points" | "comments">("newest");

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
        return "bg-emerald-100 text-emerald-950 border-black";
      case "economy":
        return "bg-amber-100 text-amber-950 border-black";
      case "ask":
        return "bg-sky-100 text-sky-950 border-black";
      case "show":
        return "bg-fuchsia-100 text-fuchsia-950 border-[#000000]";
      default:
        return "bg-gray-100 text-gray-950 border-black";
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="news_agg_container">
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
              <button onClick={() => setSearchQuery("")} className="text-black hover:text-[#FF6600]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Premium Neo-Brutalist Sorting Toggles */}
          <div className="flex items-center gap-1.5 bg-[#F6F6EF] border-2 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] font-mono leading-none" id="stories_sorting_toggle_box">
            <span className="px-1 font-bold text-gray-500 uppercase select-none">Sort:</span>
            
            <button
              type="button"
              id="sort_filter_newest"
              onClick={() => setSortBy("newest")}
              className={`px-2 py-1.5 font-black border transition-all cursor-pointer ${
                sortBy === "newest"
                  ? "bg-black text-[#FF6600] border-black"
                  : "bg-white text-black border-black hover:bg-orange-50 hover:translate-x-[0.5px] hover:translate-y-[0.5px]"
              }`}
            >
              NEWEST
            </button>
            
            <button
              type="button"
              id="sort_filter_points"
              onClick={() => setSortBy("points")}
              className={`px-2 py-1.5 font-black border transition-all cursor-pointer ${
                sortBy === "points"
                  ? "bg-black text-[#FF6600] border-black"
                  : "bg-white text-black border-black hover:bg-orange-50 hover:translate-x-[0.5px] hover:translate-y-[0.5px]"
              }`}
            >
              POINTS
            </button>
            
            <button
              type="button"
              id="sort_filter_comments"
              onClick={() => setSortBy("comments")}
              className={`px-2 py-1.5 font-black border transition-all cursor-pointer ${
                sortBy === "comments"
                  ? "bg-black text-[#FF6600] border-black"
                  : "bg-white text-black border-black hover:bg-orange-50 hover:translate-x-[0.5px] hover:translate-y-[0.5px]"
              }`}
            >
              COMMENTS
            </button>
          </div>

          <button
            id="open_submit_modal_btn"
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-1.5 bg-[#FF6600] hover:bg-[#ff8533] text-white font-bold border-2 border-black px-4 py-2 text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1.5px] active:translate-y-[1.5px] cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Submit Story</span>
          </button>
        </div>

        {/* Stories List Feed */}
        <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] divide-y-2 divide-black overflow-hidden mb-8">
          {filteredStories.length === 0 ? (
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
                  className={`p-4 flex gap-4 items-start transition hover:bg-[#F6F6EF] ${
                    isSelected ? "bg-[#FFF9E6]" : "bg-white"
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
                      className="group bg-white hover:bg-[#FF6600] border-2 border-black rounded-none p-1 transition-all shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px]"
                      title="Upvote story"
                    >
                      <ArrowUp className="w-3.5 h-3.5 text-black group-hover:text-white transition" />
                    </button>
                  </div>

                  {/* Main cell information */}
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setSelectedStory(story)}>
                    <div className="flex flex-wrap items-baseline gap-1.5 mb-1.5">
                      <h2 className="font-display font-black text-black text-sm sm:text-base leading-snug hover:text-[#FF6600] transition-colors uppercase tracking-tight">
                        {story.title}
                      </h2>
                      {story.url && (
                        <a
                          href={story.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] text-gray-500 hover:text-[#FF6600] font-mono flex items-center gap-0.5 inline-flex"
                        >
                          <span>({getStoryDomain(story.url)})</span>
                          <ExternalLink className="w-2.5 h-2.5 text-black" />
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-gray-600 font-mono">
                      <span className="font-bold text-[#FF6600] bg-[#FFF9E6] border border-black px-1.5 py-0.2">{story.points} points</span>
                      <span className="text-black font-semibold">by @{story.author}</span>
                      <span>{story.timestamp}</span>
                      <span className="text-gray-400">•</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStory(story);
                        }}
                        className="flex items-center gap-1 text-black font-bold hover:text-[#FF6600] transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-black" />
                        <span>{story.commentsCount} comments</span>
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
          <div className="bg-[#FFF9E6] border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[85vh]">
            {/* Thread Header */}
            <div className="bg-black p-4 border-b-2 border-black flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#FF6600] fill-[#FF6600]" />
                <h3 className="font-display font-black text-sm uppercase tracking-tight">
                  Discussion Thread
                </h3>
              </div>
              <button
                id="close_comments_btn"
                onClick={() => setSelectedStory(null)}
                className="text-white hover:text-[#FF6600] p-1 border-2 border-black bg-neutral-900 transition font-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Story Main Body in thread */}
            <div className="p-4 border-b-2 border-black bg-white overflow-y-auto">
              <h4 className="font-display font-black text-black uppercase text-sm mb-2 leading-tight">
                {selectedStory.title}
              </h4>
              {selectedStory.url && (
                <a
                  href={selectedStory.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#FF6600] font-bold hover:underline flex items-center gap-1 mb-2 inline-flex"
                >
                  <span>Go to website</span>
                  <ExternalLink className="w-3 h-3 text-black" />
                </a>
              )}
              {selectedStory.text && (
                <div className="text-xs text-black bg-[#F6F6EF] p-3.5 border-2 border-black font-mono leading-relaxed mt-2 uppercase">
                  {selectedStory.text}
                </div>
              )}
              <div className="flex items-center gap-2 mt-4 text-[10px] font-mono text-gray-500">
                <span className="font-bold text-[#FF6600]">{selectedStory.points} points</span>
                <span>•</span>
                <span>Posted by @{selectedStory.author}</span>
                <span>•</span>
                <span>{selectedStory.timestamp}</span>
              </div>
            </div>

            {/* Nested Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              <div className="text-[10px] font-bold text-[#FF6600] font-mono uppercase tracking-wider mb-2">
                Comments ({selectedStory.comments.length})
              </div>

              {selectedStory.comments.length === 0 ? (
                <p className="text-xs text-gray-500 italic text-center py-6 font-mono uppercase font-bold">No comments yet. Share your thoughts!</p>
              ) : (
                selectedStory.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2.5 items-start bg-[#F6F6EF] p-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <CornerDownRight className="w-4 h-4 text-[#FF6600] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-black text-black">
                          @{comment.author}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-black leading-relaxed font-sans select-text">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Area */}
            <div className="p-4 bg-[#FFF9E6] border-t-2 border-black font-sans">
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
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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
                  className="w-full bg-[#FF6600] text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black font-bold uppercase text-[10px] py-2 transition-all cursor-pointer font-mono"
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
            <div className="bg-[#FFF9E6] p-4 border-b-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#FF6600] text-bold stroke-[3]" />
                <h3 className="font-display font-black text-base text-black uppercase tracking-tight">
                  Submit to 961 Combinator
                </h3>
              </div>
              <button
                id="close_story_modal_btn"
                onClick={() => setShowSubmitModal(false)}
                className="text-black hover:text-[#FF6600] p-1 border-2 border-black bg-white transition hover:translate-x-[1px] hover:translate-y-[1px] font-black cursor-pointer"
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
                  className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
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
                  className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
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
                  className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
                />
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
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
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
                    className="w-full text-xs bg-white border-2 border-black p-2 outline-none text-black font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(255,102,0,1)]"
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
                  className="px-5 py-2 text-xs font-black uppercase text-white bg-[#FF6600] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
                >
                  Post Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
