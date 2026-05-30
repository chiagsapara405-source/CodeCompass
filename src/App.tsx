import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  BookOpen,
  Video,
  Github,
  FileText,
  GraduationCap,
  Newspaper,
  Loader2,
  ExternalLink,
  Sparkles,
  X,
  Clock,
  Filter,
  Map,
  ChevronRight,
  Clock3,
  Target,
  Zap,
  CheckCircle2,
  Circle,
  Play,
  Tv,
  Globe,
  Users,
  Compass,
  ArrowUp,
} from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Resource {
  title: string;
  url: string;
  description: string;
  resource_type: string;
  domain: string;
  favicon: string;
}

interface SearchResult {
  results: Resource[];
  cached: boolean;
}

interface RoadmapStep {
  step: number;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  resources: string[];
}

interface Roadmap {
  topic: string;
  summary: string;
  difficulty: string;
  estimated_time: string;
  steps: RoadmapStep[];
}

interface YouTubeChannel {
  name: string;
  handle: string;
  description: string;
  category: "hindi" | "global";
  subscribers: string;
  tags: string[];
  search_url: string;
  avatar_color: string;
}

const TYPE_CONFIG: Record<string, { label: string; icon: typeof BookOpen; color: string; bg: string; border: string }> = {
  video: { label: "Video", icon: Video, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  course: { label: "Course", icon: GraduationCap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  docs: { label: "Docs", icon: FileText, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  repo: { label: "Repo", icon: Github, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  article: { label: "Article", icon: Newspaper, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
};

const SUGGESTIONS = [
  "learn Python",
  "React hooks",
  "machine learning basics",
  "Rust programming",
  "Docker and containers",
  "TypeScript fundamentals",
  "system design",
  "data structures and algorithms",
];

function TypeBadge({ type }: { type: string }) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.article;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${config.bg} ${config.color} ${config.border}`}>
      <Icon size={12} />
      {config.label}
    </span>
  );
}

function ResourceCard({ resource, index }: { resource: Resource; index?: number }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-teal-500/30 hover:bg-zinc-800/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 backdrop-blur-sm animate-fadeIn"
      style={{ "--i": index ?? 0 } as React.CSSProperties}
    >
      <div className="flex items-start gap-3 mb-3">
        <img
          src={resource.favicon}
          alt=""
          className="w-5 h-5 mt-0.5 rounded-sm flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <h3 className="text-sm font-semibold text-zinc-100 leading-snug line-clamp-2 group-hover:text-white transition-colors flex-1">
          {resource.title}
        </h3>
        <ExternalLink size={14} className="text-zinc-600 group-hover:text-teal-400 transition-colors flex-shrink-0 mt-0.5" />
      </div>
      {resource.description && (
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 mb-3 group-hover:text-zinc-400 transition-colors">
          {resource.description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <TypeBadge type={resource.resource_type} />
        <span className="text-[11px] text-zinc-600 font-mono">{resource.domain}</span>
      </div>
    </a>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/20 to-transparent animate-shimmer" />
      <div className="flex items-start gap-3 mb-3 relative">
        <div className="w-5 h-5 bg-zinc-800 rounded-sm" />
        <div className="h-4 bg-zinc-800 rounded w-3/4" />
      </div>
      <div className="space-y-2 mb-3 relative">
        <div className="h-3 bg-zinc-800 rounded w-full" />
        <div className="h-3 bg-zinc-800 rounded w-2/3" />
      </div>
      <div className="flex items-center justify-between relative">
        <div className="h-5 w-16 bg-zinc-800 rounded-full" />
        <div className="h-3 w-20 bg-zinc-800 rounded" />
      </div>
    </div>
  );
}

function ChannelCard({ channel, index }: { channel: YouTubeChannel; index?: number }) {
  const isHindi = channel.category === "hindi";
  return (
    <a
      href={channel.search_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 hover:border-teal-500/30 hover:bg-zinc-800/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 backdrop-blur-sm animate-fadeIn"
      style={{ "--i": index ?? 0 } as React.CSSProperties}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
          style={{ backgroundColor: channel.avatar_color + "22", borderColor: channel.avatar_color + "44", borderWidth: "1.5px" }}
        >
          <Play size={14} style={{ color: channel.avatar_color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors truncate">
              {channel.name}
            </h4>
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded-full ${
              isHindi
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
            }`}>
              {isHindi ? <Globe size={8} /> : <Tv size={8} />}
              {isHindi ? "Hindi" : "Global"}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-zinc-600">
              <Users size={8} />
              {channel.subscribers}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2 group-hover:text-zinc-400 transition-colors">
            {channel.description}
          </p>
          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
            {channel.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-1.5 py-0.5 text-[9px] text-zinc-500 bg-zinc-800/50 rounded border border-zinc-700/30">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <ChevronRight size={14} className="text-zinc-600 group-hover:text-teal-400 transition-colors flex-shrink-0 mt-3" />
      </div>
    </a>
  );
}

function RoadmapSection({ roadmap }: { roadmap: Roadmap }) {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-teal-500/10 to-sky-500/10 border border-teal-500/20">
            <Map size={14} className="text-teal-400" />
          </div>
          <h2 className="text-sm font-bold text-white">Learning Roadmap</h2>
        </div>
        <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">{roadmap.summary}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 text-[10px] text-zinc-500">
            <Target size={10} className="text-teal-400" />
            {roadmap.difficulty}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-zinc-500">
            <Clock3 size={10} className="text-amber-400" />
            {roadmap.estimated_time}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-zinc-500">
            <Zap size={10} className="text-emerald-400" />
            {roadmap.steps.length} steps
          </div>
        </div>
      </div>

      <div className="relative">
        {roadmap.steps.map((step, i) => {
          const isExpanded = expandedStep === step.step;
          const isLast = i === roadmap.steps.length - 1;

          return (
            <div key={step.step} className="relative">
              {!isLast && (
                <div className="absolute left-[13px] top-7 bottom-0 w-px bg-zinc-800" />
              )}

              <button
                onClick={() => setExpandedStep(isExpanded ? null : step.step)}
                className="w-full text-left group"
              >
                <div className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${isExpanded ? "bg-zinc-800/50" : "hover:bg-zinc-800/30"}`}>
                  <div className="flex-shrink-0 mt-0.5">
                    {isExpanded ? (
                      <CheckCircle2 size={14} className="text-teal-400" />
                    ) : (
                      <Circle size={14} className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">Step {step.step}</span>
                      <span className="text-[9px] text-zinc-700">/</span>
                      <span className="text-[9px] text-zinc-600">{step.duration}</span>
                    </div>
                    <h3 className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  <ChevronRight
                    size={12}
                    className={`flex-shrink-0 mt-1 text-zinc-600 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="ml-[24px] mr-2 mb-2 pl-3 border-l border-zinc-800/50">
                  <p className="text-[11px] text-zinc-400 leading-relaxed mb-2">{step.description}</p>
                  <div className="mb-2">
                    <span className="text-[9px] uppercase tracking-wider text-zinc-600 font-medium mb-1 block">Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {step.skills.map((skill) => (
                        <span key={skill} className="px-1.5 py-0.5 text-[10px] text-zinc-400 bg-zinc-800/60 rounded border border-zinc-700/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-600 font-medium mb-1 block">Resources</span>
                    <div className="flex flex-wrap gap-1">
                      {step.resources.map((res) => (
                        <span key={res} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-sky-400/80 bg-sky-500/5 rounded border border-sky-500/10">
                          <BookOpen size={8} />
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SkeletonRoadmap() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/20 to-transparent animate-shimmer" />
        <div className="flex items-center gap-2.5 mb-2 relative">
          <div className="w-4 h-4 bg-zinc-800 rounded" />
          <div className="h-3.5 bg-zinc-800 rounded w-28" />
        </div>
        <div className="space-y-1.5 mb-3 relative">
          <div className="h-2.5 bg-zinc-800 rounded w-full" />
          <div className="h-2.5 bg-zinc-800 rounded w-3/4" />
        </div>
        <div className="flex gap-3 relative">
          <div className="h-2.5 w-20 bg-zinc-800 rounded" />
          <div className="h-2.5 w-16 bg-zinc-800 rounded" />
        </div>
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 p-2.5">
          <div className="w-[14px] h-[14px] bg-zinc-800 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 bg-zinc-800 rounded w-16" />
            <div className="h-3 bg-zinc-800 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonChannels() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/20 to-transparent animate-shimmer" />
        <div className="flex items-center gap-2.5 mb-2 relative">
          <div className="w-4 h-4 bg-zinc-800 rounded" />
          <div className="h-3.5 bg-zinc-800 rounded w-32" />
        </div>
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/20 to-transparent animate-shimmer" />
          <div className="flex items-start gap-3 relative">
            <div className="w-10 h-10 bg-zinc-800 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-zinc-800 rounded w-1/2" />
              <div className="h-2.5 bg-zinc-800 rounded w-3/4" />
              <div className="flex gap-1.5">
                <div className="h-4 w-12 bg-zinc-800 rounded-full" />
                <div className="h-4 w-10 bg-zinc-800 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Resource[]>([]);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [loadingChannels, setLoadingChannels] = useState(false);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [cached, setCached] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const saveRecentSearch = useCallback((topic: string) => {
    setRecentSearches((prev) => {
      const updated = [topic, ...prev.filter((s) => s !== topic)].slice(0, 8);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleSearch = useCallback(async (searchQuery?: string) => {
    const topic = (searchQuery || query).trim();
    if (!topic) return;

    setLoading(true);
    setLoadingRoadmap(true);
    setLoadingChannels(true);
    setError("");
    setActiveFilter("all");
    setCached(false);
    setRoadmap(null);
    setChannels([]);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Apikey: SUPABASE_ANON_KEY,
      };

      // Fire all three requests in parallel
      const [searchRes, roadmapRes, channelsRes] = await Promise.allSettled([
        fetch(`${SUPABASE_URL}/functions/v1/search-resources`, {
          method: "POST",
          headers,
          body: JSON.stringify({ topic }),
        }),
        fetch(`${SUPABASE_URL}/functions/v1/generate-roadmap`, {
          method: "POST",
          headers,
          body: JSON.stringify({ topic }),
        }),
        fetch(`${SUPABASE_URL}/functions/v1/youtube-channels`, {
          method: "POST",
          headers,
          body: JSON.stringify({ topic }),
        }),
      ]);

      // Process search results
      if (searchRes.status === "fulfilled" && searchRes.value.ok) {
        const data: SearchResult = await searchRes.value.json();
        setResults(data.results || []);
        setCached(data.cached || false);
      } else {
        setError("Search failed. Please try again.");
      }

      // Process roadmap
      if (roadmapRes.status === "fulfilled" && roadmapRes.value.ok) {
        const roadmapData = await roadmapRes.value.json();
        setRoadmap(roadmapData.roadmap || null);
      }

      // Process channels
      if (channelsRes.status === "fulfilled" && channelsRes.value.ok) {
        const channelsData = await channelsRes.value.json();
        setChannels(channelsData.channels || []);
      }

      setQuery(topic);
      saveRecentSearch(topic.toLowerCase());
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setLoadingRoadmap(false);
      setLoadingChannels(false);
    }
  }, [query, saveRecentSearch]);

  const filteredResults = activeFilter === "all" ? results : results.filter((r) => r.resource_type === activeFilter);

  const typeCounts = results.reduce<Record<string, number>>((acc, r) => {
    acc[r.resource_type] = (acc[r.resource_type] || 0) + 1;
    return acc;
  }, {});

  const presentTypes = Object.keys(typeCounts);
  const hasResults = results.length > 0 || roadmap !== null || channels.length > 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-zinc-800/50">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-teal-400 to-sky-500 shadow-lg shadow-teal-500/25">
              <Compass size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              <span className="bg-gradient-to-r from-teal-300 via-sky-300 to-teal-200 bg-clip-text text-transparent">codeCompass</span>
            </h1>
          </div>
          <p className="text-zinc-500 text-sm mb-8 ml-11">
            Discover resources, get a personalized roadmap, and find top YouTube channels — all in one place.
          </p>

          {/* Search */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-xl bg-sky-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity -m-0.5" />
            <div className="relative flex items-center">
              <Search size={18} className="absolute left-4 text-zinc-500 group-focus-within:text-teal-400 transition-colors" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="What do you want to learn?"
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-11 pr-24 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all"
                aria-label="Search for learning topics"
              />
              <div className="absolute right-3 flex items-center gap-2">
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] text-zinc-600 bg-zinc-800 rounded border border-zinc-700">
                  <span className="text-[10px]">&#8984;</span>K
                </kbd>
                <button
                  onClick={() => handleSearch()}
                  disabled={loading}
                  className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600 text-white rounded-lg transition-all duration-200 active:scale-95"
                  aria-label="Search"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
          </div>

          {/* Suggestions & Recent */}
          <div className="mt-4 flex flex-wrap gap-2 ml-0.5">
              {recentSearches.slice(0, 4).map((s) => (
                <button
                  key={s}
                  onClick={() => handleSearch(s)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-500 hover:text-teal-300 bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800/50 hover:border-teal-500/30 rounded-lg transition-all duration-200"
                >
                  <Clock size={10} />
                  {s}
                </button>
              ))}
              {recentSearches.length === 0 &&
                SUGGESTIONS.slice(0, 4).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSearch(s)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-600 hover:text-teal-300 bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800/50 hover:border-teal-500/30 rounded-lg transition-all duration-200"
                  >
                    <Sparkles size={10} />
                    {s}
                  </button>
                ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <X size={16} />
            {error}
          </div>
        )}

        {/* Three-column layout when results exist */}
        {hasResults && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Roadmap */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-8">
                {loadingRoadmap ? <SkeletonRoadmap /> : roadmap && <RoadmapSection roadmap={roadmap} />}
              </div>
            </div>

            {/* Center: Resource Cards */}
            <div className="lg:col-span-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-300">
                    {results.length} resources
                  </span>
                  {cached && (
                    <span className="text-[10px] uppercase tracking-wider text-teal-500 bg-teal-500/10 border border-teal-500/20 px-1.5 py-0.5 rounded">
                      cached
                    </span>
                  )}
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-2 scrollbar-none">
                <div className="flex items-center gap-1 text-teal-500 mr-0.5">
                  <Filter size={12} />
                </div>
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`flex-shrink-0 px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all ${
                    activeFilter === "all"
                      ? "bg-gradient-to-r from-teal-500 to-sky-500 text-white shadow-lg shadow-teal-500/20"
                      : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                  }`}
                >
                  All ({results.length})
                </button>
                {presentTypes.map((type) => {
                  const config = TYPE_CONFIG[type] || TYPE_CONFIG.article;
                  const Icon = config.icon;
                  return (
                    <button
                      key={type}
                      onClick={() => setActiveFilter(type)}
                      className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all ${
                        activeFilter === type
                          ? `${config.bg} ${config.color} border ${config.border}`
                          : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 border border-transparent"
                      }`}
                    >
                      <Icon size={10} />
                      {config.label} ({typeCounts[type]})
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredResults.map((resource, i) => (
                  <ResourceCard key={resource.url + i} resource={resource} index={i} />
                ))}
              </div>

              {filteredResults.length === 0 && (
                <div className="text-center py-12 text-zinc-600 text-sm">
                  No resources match the selected filter.
                </div>
              )}
            </div>

            {/* Right: YouTube Channels */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-8">
                {loadingChannels ? (
                  <SkeletonChannels />
                ) : channels.length > 0 ? (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                          <Tv size={14} className="text-rose-400" />
                        </div>
                        <h2 className="text-sm font-bold text-white">Top YouTube Channels</h2>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        Curated creators for this topic. Click to search their content on YouTube.
                      </p>
                    </div>
                    {channels.map((ch, i) => (
                      <ChannelCard key={ch.handle} channel={ch} index={i} />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* Loading state (no results yet) */}
        {loading && !hasResults && (
          <div>
            <div className="flex items-center gap-2 mb-6 text-zinc-500">
              <Loader2 size={16} className="animate-spin text-teal-400" />
              <span className="text-sm">Charting your course across the web...</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        )}

        {/* Loading state (results coming in) */}
        {loading && hasResults && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3"><SkeletonRoadmap /></div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-4"><SkeletonChannels /></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !hasResults && !error && (
          <div className="text-center py-20 animate-fadeIn">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500/10 to-sky-500/10 border border-teal-500/20 mb-6 mx-auto">
              <Compass size={36} className="text-teal-400" />
            </div>
            <h2 className="text-xl font-bold text-zinc-300 mb-2">Set your learning direction</h2>
            <p className="text-sm text-zinc-600 mb-8 max-w-md mx-auto leading-relaxed">
              Enter a topic above to get a personalized roadmap, curated resources, and top YouTube channels — all pointing you toward mastery.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSearch(s)}
                  className="px-3 py-1.5 text-xs text-zinc-500 hover:text-teal-300 bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800/50 hover:border-teal-500/30 rounded-lg transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-zinc-600">
          <span className="flex items-center gap-1.5">
            <Compass size={10} className="text-teal-500" />
            codeCompass — Discover. Learn. Build.
          </span>
          <span>Powered by open APIs</span>
        </div>
      </footer>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-teal-600 to-sky-600 text-white shadow-lg shadow-teal-500/25 hover:from-teal-500 hover:to-sky-500 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 z-50 animate-fadeIn"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}

export default App;
