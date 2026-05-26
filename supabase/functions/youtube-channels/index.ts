const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

const HINDI_CHANNELS: Record<string, YouTubeChannel[]> = {
  webdev: [
    { name: "CodeWithHarry", handle: "CodeWithHarry", description: "Hindi tutorials on web dev, Python, JS, and more. One of the most popular Indian coding channels.", category: "hindi", subscribers: "6M+", tags: ["web dev", "javascript", "python", "hindi"], search_url: "", avatar_color: "#ef4444" },
    { name: "Thapa Technical", handle: "ThapaTechnical", description: "Deep-dive Hindi tutorials on React, Node.js, MERN stack, and frontend development.", category: "hindi", subscribers: "1.5M+", tags: ["react", "node.js", "mern", "frontend"], search_url: "", avatar_color: "#f59e0b" },
    { name: "Chai aur Code", handle: "chaiaurcode", description: "Modern Hindi web dev tutorials -- React, Next.js, TypeScript with a conversational teaching style.", category: "hindi", subscribers: "500K+", tags: ["react", "next.js", "typescript", "web dev"], search_url: "", avatar_color: "#10b981" },
    { name: "Apna College", handle: "ApnaCollegeOfficial", description: "Hindi programming tutorials covering C, C++, Java, web dev, and DSA for beginners.", category: "hindi", subscribers: "5M+", tags: ["c++", "java", "dsa", "web dev", "beginner"], search_url: "", avatar_color: "#8b5cf6" },
    { name: "Clever Programmer", handle: "CleverProgrammer", description: "Hindi/English mixed web dev and Python project-based tutorials.", category: "hindi", subscribers: "1M+", tags: ["python", "web dev", "projects"], search_url: "", avatar_color: "#06b6d4" },
  ],
  python: [
    { name: "CodeWithHarry", handle: "CodeWithHarry", description: "Comprehensive Hindi Python tutorials from basics to Django and data science.", category: "hindi", subscribers: "6M+", tags: ["python", "django", "flask", "hindi"], search_url: "", avatar_color: "#ef4444" },
    { name: "Apna College", handle: "ApnaCollegeOfficial", description: "Python for beginners in Hindi with practical examples and mini projects.", category: "hindi", subscribers: "5M+", tags: ["python", "beginner", "projects"], search_url: "", avatar_color: "#8b5cf6" },
    { name: "Thapa Technical", handle: "ThapaTechnical", description: "Python and backend development tutorials in Hindi.", category: "hindi", subscribers: "1.5M+", tags: ["python", "backend", "api"], search_url: "", avatar_color: "#f59e0b" },
    { name: "Jenny's Lectures CS IT", handle: "JennysLecturesCSIT", description: "Hindi Python and CS fundamentals for university students.", category: "hindi", subscribers: "1M+", tags: ["python", "cs fundamentals", "academics"], search_url: "", avatar_color: "#ec4899" },
  ],
  dsa: [
    { name: "Apna College", handle: "ApnaCollegeOfficial", description: "DSA in Hindi with visual explanations. Great for placement prep.", category: "hindi", subscribers: "5M+", tags: ["dsa", "algorithms", "placement", "c++"], search_url: "", avatar_color: "#8b5cf6" },
    { name: "CodeHelp - by Babbar", handle: "CodeHelp", description: "Hindi DSA and placement prep focused on C++ with industry-level problem solving.", category: "hindi", subscribers: "2M+", tags: ["dsa", "c++", "placement", "interview"], search_url: "", avatar_color: "#3b82f6" },
    { name: "Jenny's Lectures CS IT", handle: "JennysLecturesCSIT", description: "Data structures and algorithms in Hindi with academic approach.", category: "hindi", subscribers: "1M+", tags: ["dsa", "algorithms", "academics"], search_url: "", avatar_color: "#ec4899" },
    { name: "Take U Forward", handle: "takeUforward", description: "Advanced DSA in Hindi/English -- Striver's A2Z DSA sheet and interview problems.", category: "hindi", subscribers: "1M+", tags: ["dsa", "interview", "advanced"], search_url: "", avatar_color: "#14b8a6" },
  ],
  ml: [
    { name: "CodeWithHarry", handle: "CodeWithHarry", description: "ML and AI basics in Hindi with Python implementations.", category: "hindi", subscribers: "6M+", tags: ["ml", "ai", "python", "hindi"], search_url: "", avatar_color: "#ef4444" },
    { name: " Krish Naik", handle: "krishnaik06", description: "ML, deep learning, and data science in Hindi/English. Feature engineering and deployment focus.", category: "hindi", subscribers: "1M+", tags: ["ml", "deep learning", "data science", "deployment"], search_url: "", avatar_color: "#f97316" },
    { name: "CampusX", handle: "campusx-official", description: "Data science and ML tutorials in Hindi with project-based learning.", category: "hindi", subscribers: "500K+", tags: ["data science", "ml", "numpy", "pandas"], search_url: "", avatar_color: "#6366f1" },
  ],
  devops: [
    { name: "Thapa Technical", handle: "ThapaTechnical", description: "DevOps and cloud tutorials in Hindi covering Docker, AWS basics.", category: "hindi", subscribers: "1.5M+", tags: ["devops", "docker", "aws"], search_url: "", avatar_color: "#f59e0b" },
    { name: "Tech World with Nana", handle: "TechWorldwithNana", description: "DevOps concepts explained in Hindi/English -- Kubernetes, Docker, CI/CD.", category: "hindi", subscribers: "500K+", tags: ["kubernetes", "docker", "cicd"], search_url: "", avatar_color: "#a855f7" },
  ],
  general: [
    { name: "CodeWithHarry", handle: "CodeWithHarry", description: "The go-to Hindi programming channel. Covers nearly every topic.", category: "hindi", subscribers: "6M+", tags: ["programming", "hindi", "tutorials"], search_url: "", avatar_color: "#ef4444" },
    { name: "Apna College", handle: "ApnaCollegeOfficial", description: "Popular Hindi programming and CS channel for students.", category: "hindi", subscribers: "5M+", tags: ["programming", "cs", "hindi"], search_url: "", avatar_color: "#8b5cf6" },
    { name: "Thapa Technical", handle: "ThapaTechnical", description: "Web dev and programming tutorials in Hindi.", category: "hindi", subscribers: "1.5M+", tags: ["web dev", "programming", "hindi"], search_url: "", avatar_color: "#f59e0b" },
  ],
};

const GLOBAL_CHANNELS: Record<string, YouTubeChannel[]> = {
  webdev: [
    { name: "freeCodeCamp", handle: "freecodecamp", description: "Free full-length courses on every web technology. The gold standard.", category: "global", subscribers: "10M+", tags: ["web dev", "full stack", "free courses"], search_url: "", avatar_color: "#22c55e" },
    { name: "Traversy Media", handle: "TraversyMedia", description: "Crash courses and project builds for modern web technologies.", category: "global", subscribers: "2.5M+", tags: ["javascript", "react", "projects"], search_url: "", avatar_color: "#3b82f6" },
    { name: "Web Dev Simplified", handle: "WebDevSimplified", description: "Simplified web dev concepts, CSS tricks, and JS deep dives.", category: "global", subscribers: "1.5M+", tags: ["css", "javascript", "simplified"], search_url: "", avatar_color: "#eab308" },
    { name: "Fireship", handle: "Fireship", description: "100-second overviews and practical modern web dev. Fast-paced, high signal.", category: "global", subscribers: "3M+", tags: ["modern web", "quick overviews", "firebase"], search_url: "", avatar_color: "#f97316" },
    { name: "The Net Ninja", handle: "NetNinja", description: "Structured playlists for React, Vue, Firebase, Node.js, and more.", category: "global", subscribers: "1.5M+", tags: ["react", "vue", "firebase"], search_url: "", avatar_color: "#6366f1" },
  ],
  python: [
    { name: "freeCodeCamp", handle: "freecodecamp", description: "Full Python courses from beginner to advanced, entirely free.", category: "global", subscribers: "10M+", tags: ["python", "free courses"], search_url: "", avatar_color: "#22c55e" },
    { name: "Corey Schafer", handle: "coreyms", description: "High-quality Python tutorials -- OOP, decorators, generators, Flask.", category: "global", subscribers: "1M+", tags: ["python", "flask", "oop"], search_url: "", avatar_color: "#0ea5e9" },
    { name: "Tech With Tim", handle: "TechWithTim", description: "Python projects, game dev, and AI/ML tutorials.", category: "global", subscribers: "1.5M+", tags: ["python", "projects", "ai"], search_url: "", avatar_color: "#ef4444" },
    { name: "Sentdex", handle: "sentdex", description: "Python for ML, finance, and data analysis. Project-focused.", category: "global", subscribers: "1.5M+", tags: ["python", "ml", "finance"], search_url: "", avatar_color: "#14b8a6" },
  ],
  dsa: [
    { name: "NeetCode", handle: "NeetCode", description: "Blind 75 problems explained clearly. Best for interview DSA prep.", category: "global", subscribers: "1M+", tags: ["dsa", "leetcode", "interview"], search_url: "", avatar_color: "#f59e0b" },
    { name: "Nick White", handle: "NickWhite", description: "LeetCode problem walkthroughs and coding challenges.", category: "global", subscribers: "500K+", tags: ["leetcode", "coding challenges"], search_url: "", avatar_color: "#eab308" },
    { name: "Back To Back SWE", handle: "BackToBackSWE", description: "Visual DSA explanations with whiteboard-style walkthroughs.", category: "global", subscribers: "500K+", tags: ["dsa", "visual", "whiteboard"], search_url: "", avatar_color: "#8b5cf6" },
  ],
  ml: [
    { name: "3Blue1Brown", handle: "3blue1brown", description: "Beautiful visual explanations of neural networks, linear algebra, and calculus.", category: "global", subscribers: "6M+", tags: ["ml", "math", "visual"], search_url: "", avatar_color: "#3b82f6" },
    { name: "Andrej Karpathy", handle: "AndrejKarpathy", description: "Neural networks from scratch, GPT explained. Former Tesla AI director.", category: "global", subscribers: "500K+", tags: ["deep learning", "gpt", "from scratch"], search_url: "", avatar_color: "#ef4444" },
    { name: "StatQuest with Josh Starmer", handle: "statquest", description: "Statistics and ML concepts made fun and accessible. BAM!", category: "global", subscribers: "1.5M+", tags: ["statistics", "ml", "fun"], search_url: "", avatar_color: "#22c55e" },
    { name: "Two Minute Papers", handle: "TwoMinutePapers", description: "Latest AI research explained in under 5 minutes. Great for staying current.", category: "global", subscribers: "1.5M+", tags: ["ai research", "papers", "quick"], search_url: "", avatar_color: "#f97316" },
  ],
  devops: [
    { name: "Tech World with Nana", handle: "TechWorldwithNana", description: "Comprehensive DevOps roadmaps -- Docker, K8s, Terraform, CI/CD.", category: "global", subscribers: "500K+", tags: ["devops", "docker", "k8s"], search_url: "", avatar_color: "#a855f7" },
    { name: "KodeKloud", handle: "KodeKloud", description: "Hands-on DevOps labs and courses. Practice over watching.", category: "global", subscribers: "500K+", tags: ["devops", "labs", "practice"], search_url: "", avatar_color: "#06b6d4" },
    { name: "NetworkChuck", handle: "NetworkChuck", description: "Networking, Linux, and cloud concepts made entertaining.", category: "global", subscribers: "3M+", tags: ["networking", "linux", "cloud"], search_url: "", avatar_color: "#22c55e" },
  ],
  systems: [
    { name: "Low Level Learning", handle: "LowLevelLearning", description: "OS concepts, C, Rust, and low-level programming explained.", category: "global", subscribers: "500K+", tags: ["os", "c", "rust", "low level"], search_url: "", avatar_color: "#f97316" },
    { name: "Creel", handle: "Creel", description: "Computer architecture, CPUs, and how hardware really works.", category: "global", subscribers: "500K+", tags: ["architecture", "cpu", "hardware"], search_url: "", avatar_color: "#3b82f6" },
  ],
  data: [
    { name: "Alex the Analyst", handle: "AlexTheAnalyst", description: "Data analytics tutorials, SQL, Python, and portfolio projects.", category: "global", subscribers: "500K+", tags: ["data analytics", "sql", "portfolio"], search_url: "", avatar_color: "#06b6d4" },
    { name: "Ken Jee", handle: "KenJee_ds", description: "Data science career advice, projects, and interview prep.", category: "global", subscribers: "500K+", tags: ["data science", "career", "interviews"], search_url: "", avatar_color: "#22c55e" },
  ],
  general: [
    { name: "freeCodeCamp", handle: "freecodecamp", description: "Free full-length courses on virtually every programming topic.", category: "global", subscribers: "10M+", tags: ["programming", "free courses", "all topics"], search_url: "", avatar_color: "#22c55e" },
    { name: "Fireship", handle: "Fireship", description: "Quick, entertaining overviews of modern dev tools and concepts.", category: "global", subscribers: "3M+", tags: ["modern dev", "quick", "entertaining"], search_url: "", avatar_color: "#f97316" },
    { name: "The Coding Train", handle: "TheCodingTrain", description: "Creative coding with Processing/p5.js. Fun and beginner-friendly.", category: "global", subscribers: "2M+", tags: ["creative coding", "beginner", "processing"], search_url: "", avatar_color: "#ef4444" },
    { name: "CS Dojo", handle: "CSDojo", description: "Algorithms, data structures, and interview questions explained clearly.", category: "global", subscribers: "1.5M+", tags: ["algorithms", "interviews", "dsa"], search_url: "", avatar_color: "#eab308" },
  ],
};

function detectCategory(topic: string): string {
  const lower = topic.toLowerCase();
  if (/react|vue|angular|svelte|next\.?js|frontend|front.?end|html|css|javascript|js|typescript|tailwind|node|express|web.?dev|mern|full.?stack/.test(lower)) return "webdev";
  if (/machine.?learning|^ml$|deep.?learning|ai|neural.?network|nlp|computer.?vision|gpt|llm|transformer/.test(lower)) return "ml";
  if (/docker|kubernetes|k8s|devops|ci.?cd|terraform|aws|cloud|deploy|container/.test(lower)) return "devops";
  if (/data.?science|data.?analy|sql|database|etl|big.?data|spark|tableau|power.?bi/.test(lower)) return "data";
  if (/rust|go|golang|c\+\+|system.?prog|os|kernel|embedded|compiler/.test(lower)) return "systems";
  if (/algo|data.?struct|dsa|leetcode|competitive|interview.?prep|placement/.test(lower)) return "dsa";
  if (/python|django|flask|fastapi|pandas|numpy|pytorch|tensorflow|jupyter/.test(lower)) return "python";
  return "general";
}

function isHindiQuery(topic: string): boolean {
  const lower = topic.toLowerCase();
  return /\bhindi\b/.test(lower);
}

function buildSearchUrl(topic: string, channelName: string, isHindi: boolean): string {
  const encodedTopic = encodeURIComponent(topic.replace(/\s*hindi\s*/gi, "").trim());
  const encodedChannel = encodeURIComponent(channelName);
  if (isHindi) {
    return `https://www.youtube.com/results?search_query=learn+${encodedTopic}+in+hindi+by+${encodedChannel}`;
  }
  return `https://www.youtube.com/results?search_query=learn+${encodedTopic}+by+${encodedChannel}`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Topic is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cleanTopic = topic.trim();
    const category = detectCategory(cleanTopic);
    const isHindi = isHindiQuery(cleanTopic);

    const hindiChannels = (HINDI_CHANNELS[category] || HINDI_CHANNELS.general).map((ch) => ({
      ...ch,
      search_url: buildSearchUrl(cleanTopic, ch.name, isHindi),
    }));

    const globalChannels = (GLOBAL_CHANNELS[category] || GLOBAL_CHANNELS.general).map((ch) => ({
      ...ch,
      search_url: buildSearchUrl(cleanTopic, ch.name, isHindi),
    }));

    // If Hindi query, put Hindi channels first; otherwise global first
    const channels = isHindi
      ? [...hindiChannels, ...globalChannels.slice(0, 3)]
      : [...globalChannels, ...hindiChannels.slice(0, 3)];

    return new Response(JSON.stringify({ channels }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
