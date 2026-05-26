const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

function generateRoadmap(topic: string): Roadmap {
  const lower = topic.toLowerCase();
  const steps: RoadmapStep[] = [];

  // Detect domain context
  const isWebDev = /react|vue|angular|svelte|next\.?js|nuxt|frontend|front.?end|html|css|javascript|js|typescript|ts|tailwind|node|express|web.?dev/.test(lower);
  const isPython = /python|django|flask|fastapi|pandas|numpy|scipy|pytorch|tensorflow|jupyter/.test(lower);
  const isML = /machine.?learning|ml|deep.?learning|ai|neural.?network|nlp|computer.?vision|gpt|llm|transformer/.test(lower);
  const isDevOps = /docker|kubernetes|k8s|devops|ci.?cd|terraform|aws|cloud|deploy|container/.test(lower);
  const isDataSci = /data.?science|data.?analy|sql|database|etl|big.?data|spark|hadoop|tableau|power.?bi/.test(lower);
  const isSystems = /rust|go|golang|c\+\+|system.?prog|os|kernel|embedded|compiler|algo|data.?struct/.test(lower);
  const isMobile = /mobile|android|ios|swift|kotlin|flutter|react.?native|expo/.test(lower);

  // Generic topic extraction
  const cleanTopic = topic.replace(/^(learn|study|master|understand|how to|guide to|intro to)\s+/i, "").trim();

  if (isWebDev) {
    steps.push(
      { step: 1, title: "Understand the Fundamentals", description: `Start with the core building blocks of web development. Learn HTML semantics, CSS layout systems (Flexbox, Grid), and JavaScript ES6+ fundamentals before touching any framework.`, duration: "2-3 weeks", skills: ["HTML5", "CSS3", "JavaScript ES6+"], resources: ["MDN Web Docs", "javascript.info", "CSS-Tricks"] },
      { step: 2, title: "Master Your Chosen Technology", description: `Deep dive into ${cleanTopic}. Understand component lifecycle, state management, routing, and the rendering model. Build small projects to internalize each concept.`, duration: "3-4 weeks", skills: [cleanTopic, "Component Architecture", "State Management"], resources: ["Official documentation", "Egghead.io", "Frontend Masters"] },
      { step: 3, title: "Build a Full Project", description: `Create a complete application that includes CRUD operations, authentication, API integration, and responsive design. This consolidates everything you've learned into practical experience.`, duration: "2-3 weeks", skills: ["Project Architecture", "API Integration", "Responsive Design"], resources: ["GitHub project templates", "Vercel/Netlify deployment guides"] },
      { step: 4, title: "Learn Testing & Quality", description: "Add unit tests, integration tests, and end-to-end tests to your project. Understand testing libraries, mocking, and CI/CD basics for code quality.", duration: "1-2 weeks", skills: ["Unit Testing", "E2E Testing", "CI/CD"], resources: ["Testing Library docs", "Jest/Vitest docs", "Playwright docs"] },
      { step: 5, title: "Performance & Optimization", description: "Learn bundle analysis, lazy loading, code splitting, caching strategies, and Core Web Vitals. Optimize your project for production-grade performance.", duration: "1-2 weeks", skills: ["Performance Profiling", "Bundle Optimization", "Caching"], resources: ["web.dev", "Chrome DevTools docs"] },
      { step: 6, title: "Advanced Patterns & Production", description: "Study design patterns, server-side rendering, incremental static generation, and advanced state management. Deploy a production-ready application.", duration: "2-3 weeks", skills: ["SSR/SSG", "Design Patterns", "Production Deployment"], resources: ["Pattern.dev", "Architecture decision records"] },
    );
  } else if (isML) {
    steps.push(
      { step: 1, title: "Math & Statistics Foundations", description: "Build a solid foundation in linear algebra, calculus, probability, and statistics. These are the language of machine learning -- without them, algorithms will feel like black boxes.", duration: "3-4 weeks", skills: ["Linear Algebra", "Probability", "Statistics", "Calculus"], resources: ["3Blue1Brown (YouTube)", "Khan Academy", "StatQuest"] },
      { step: 2, title: "Python for Data & ML", description: "Learn Python with a focus on NumPy, Pandas, and Matplotlib. Practice data manipulation, cleaning, and visualization -- the bulk of real ML work.", duration: "2-3 weeks", skills: ["Python", "NumPy", "Pandas", "Matplotlib"], resources: ["Python official tutorial", "Kaggle Learn"] },
      { step: 3, title: "Classical Machine Learning", description: "Study supervised and unsupervised learning: regression, classification, clustering, decision trees, SVMs, ensemble methods. Use scikit-learn extensively.", duration: "3-4 weeks", skills: ["Scikit-learn", "Supervised Learning", "Unsupervised Learning", "Model Evaluation"], resources: ["scikit-learn docs", "Andrew Ng's Coursera course", "Hands-On ML book"] },
      { step: 4, title: "Deep Learning Fundamentals", description: `Move to neural networks: perceptrons, backpropagation, CNNs, RNNs, and Transformers. Use PyTorch or TensorFlow to implement architectures from scratch.`, duration: "3-4 weeks", skills: ["Neural Networks", "PyTorch/TensorFlow", "CNNs", "Transformers"], resources: ["fast.ai course", "PyTorch tutorials", "Deep Learning book"] },
      { step: 5, title: `Applied ${cleanTopic}`, description: `Apply ML techniques directly to ${cleanTopic}. Work through datasets, build models, tune hyperparameters, and iterate. Focus on end-to-end ML pipelines.`, duration: "2-3 weeks", skills: ["ML Pipelines", "Feature Engineering", "Hyperparameter Tuning"], resources: ["Kaggle competitions", "Papers With Code", "Hugging Face"] },
      { step: 6, title: "MLOps & Deployment", description: "Learn model versioning, experiment tracking, model serving, monitoring, and CI/CD for ML. Deploy a model to a cloud endpoint and build an API around it.", duration: "2-3 weeks", skills: ["MLflow", "Docker", "Model Serving", "Monitoring"], resources: ["MLflow docs", "Docker tutorial", "FastAPI docs"] },
    );
  } else if (isPython) {
    steps.push(
      { step: 1, title: "Python Core & Idioms", description: "Master Python syntax, data structures (lists, dicts, sets, tuples), control flow, functions, decorators, generators, and context managers. Write idiomatic Python.", duration: "2-3 weeks", skills: ["Python Syntax", "Data Structures", "Decorators", "Generators"], resources: ["Python official tutorial", "Automate the Boring Stuff", "Real Python"] },
      { step: 2, title: "Object-Oriented & Advanced Python", description: "Learn OOP, dunder methods, inheritance, composition, type hints, and async/await. Understand Python's memory model and the GIL.", duration: "2 weeks", skills: ["OOP", "Type Hints", "Async/Await", "Memory Model"], resources: ["Fluent Python book", "Python docs on typing"] },
      { step: 3, title: "Package Management & Tooling", description: "Learn pip, virtual environments (venv, poetry), linting (ruff), formatting (black), testing (pytest), and project structure. Set up a professional development workflow.", duration: "1 week", skills: ["Poetry/Pip", "Pytest", "Ruff/Black", "Project Structure"], resources: ["Poetry docs", "pytest docs", "Real Python tooling guides"] },
      { step: 4, title: `Applied ${cleanTopic}`, description: `Apply Python to ${cleanTopic}. Build real projects that use relevant libraries, APIs, and patterns. Focus on the ecosystem most relevant to your goal.`, duration: "3-4 weeks", skills: [cleanTopic, "API Development", "Database Integration"], resources: ["Official library docs", "Real Python tutorials", "Full Stack Python"] },
      { step: 5, title: "Testing & Code Quality", description: "Write comprehensive tests: unit, integration, and functional. Learn TDD principles, mocking, fixture patterns, and coverage analysis.", duration: "1-2 weeks", skills: ["TDD", "Mocking", "Coverage", "CI Integration"], resources: ["pytest docs", "Obey the Testing Goat"] },
      { step: 6, title: "Production & Deployment", description: "Learn Docker containerization, CI/CD pipelines, logging, monitoring, and cloud deployment. Ship a production-grade Python application.", duration: "2-3 weeks", skills: ["Docker", "CI/CD", "Logging", "Cloud Deployment"], resources: ["Docker docs", "GitHub Actions docs", "12-Factor App"] },
    );
  } else if (isDevOps) {
    steps.push(
      { step: 1, title: "Linux & Networking Foundations", description: "Master the Linux command line, file systems, process management, and networking fundamentals (DNS, TCP/IP, HTTP, SSH). These are non-negotiable for DevOps.", duration: "2-3 weeks", skills: ["Linux CLI", "Networking", "SSH", "Process Management"], resources: ["Linux Journey", "The Missing Semester (MIT)", "TCP/IP Illustrated"] },
      { step: 2, title: "Version Control & Scripting", description: "Deep-dive into Git workflows, branching strategies. Learn Bash scripting and at least one scripting language (Python) for automation tasks.", duration: "2 weeks", skills: ["Git", "Bash Scripting", "Python Automation"], resources: ["Pro Git book", "Bash Academy", "Python for SysAdmins"] },
      { step: 3, title: `Core ${cleanTopic}`, description: `Deep dive into ${cleanTopic}. Understand the core concepts, configuration, best practices, and common patterns used in production environments.`, duration: "3-4 weeks", skills: [cleanTopic, "Containerization/Orchestration", "IaC"], resources: ["Official documentation", "KodeKloud", "Linux Academy"] },
      { step: 4, title: "CI/CD Pipelines", description: "Build automated pipelines for building, testing, and deploying applications. Learn Jenkins, GitHub Actions, or GitLab CI. Implement pipeline-as-code.", duration: "2 weeks", skills: ["GitHub Actions", "Pipeline-as-Code", "Artifact Management"], resources: ["GitHub Actions docs", "Jenkins docs"] },
      { step: 5, title: "Monitoring & Observability", description: "Set up logging, metrics, tracing, and alerting. Learn Prometheus, Grafana, and log aggregation. Build dashboards for system health.", duration: "2 weeks", skills: ["Prometheus", "Grafana", "Log Aggregation", "Alerting"], resources: ["Prometheus docs", "Grafana tutorials", "OpenTelemetry"] },
      { step: 6, title: "Security & Production Hardening", description: "Implement security best practices: secrets management, RBAC, network policies, vulnerability scanning, and compliance. Harden production environments.", duration: "2 weeks", skills: ["Secrets Management", "RBAC", "Security Scanning", "Compliance"], resources: ["CIS Benchmarks", "OWASP DevSecOps", "Vault docs"] },
    );
  } else if (isDataSci) {
    steps.push(
      { step: 1, title: "Statistics & Probability", description: "Learn descriptive statistics, probability distributions, hypothesis testing, and Bayesian fundamentals. This is the backbone of all data analysis.", duration: "2-3 weeks", skills: ["Statistics", "Probability", "Hypothesis Testing"], resources: ["Khan Academy Statistics", "StatQuest (YouTube)", "Think Stats book"] },
      { step: 2, title: "Data Manipulation & SQL", description: "Master SQL (joins, window functions, CTEs) and Python data tools (Pandas, NumPy). Practice data cleaning and transformation -- the reality of data work.", duration: "3-4 weeks", skills: ["SQL", "Pandas", "Data Cleaning", "ETL"], resources: ["SQLBolt", "Pandas docs", "Mode Analytics SQL tutorial"] },
      { step: 3, title: "Data Visualization & Communication", description: "Learn to tell stories with data. Master Matplotlib, Seaborn, and a BI tool. Understand chart types, when to use them, and how to present findings.", duration: "2 weeks", skills: ["Matplotlib", "Seaborn", "Storytelling", "Dashboard Design"], resources: ["Storytelling with Data book", "Seaborn gallery"] },
      { step: 4, title: `Applied ${cleanTopic}`, description: `Apply your skills to ${cleanTopic}. Work with real datasets, build analyses, and create end-to-end data pipelines. Focus on the specific domain and tools.`, duration: "3-4 weeks", skills: [cleanTopic, "Data Pipelines", "Domain Knowledge"], resources: ["Kaggle datasets", "Official tool docs"] },
      { step: 5, title: "Advanced Analytics & Modeling", description: "Learn A/B testing, regression analysis, time series forecasting, and basic ML models. Understand when to use each technique.", duration: "2-3 weeks", skills: ["A/B Testing", "Regression", "Time Series", "Scikit-learn"], resources: ["Google's A/B testing course", "Forecasting: Principles & Practice"] },
      { step: 6, title: "Production Data Systems", description: "Learn data warehousing, lakehouse architecture, orchestration (Airflow), and data quality. Build production-grade data systems.", duration: "2-3 weeks", skills: ["Data Warehousing", "Airflow", "Data Quality", "dbt"], resources: ["Airflow docs", "dbt docs", "The Data Warehouse Toolkit"] },
    );
  } else if (isSystems) {
    steps.push(
      { step: 1, title: "Language Fundamentals", description: `Master ${cleanTopic} syntax, memory model, ownership/borrowing (Rust), pointers (C++), or goroutines (Go). Build small programs to internalize core concepts.`, duration: "3-4 weeks", skills: [cleanTopic, "Memory Model", "Core Syntax"], resources: ["The Book (Rust)", "Effective Go", "LearnCpp.com"] },
      { step: 2, title: "Systems Programming Concepts", description: "Learn memory management, concurrency models, system calls, file I/O, and networking at the OS level. Understand how your code interacts with hardware.", duration: "3-4 weeks", skills: ["Memory Management", "Concurrency", "System Calls", "Networking"], resources: ["OSTEP (University of Wisconsin)", "CSAPP book"] },
      { step: 3, title: "Data Structures & Algorithms", description: "Implement core data structures (linked lists, trees, hash maps, graphs) and algorithms (sorting, searching, graph traversal) in your language. Focus on performance characteristics.", duration: "3-4 weeks", skills: ["Data Structures", "Algorithms", "Complexity Analysis"], resources: ["CLRS book", "Algorithm Visualizer", "LeetCode"] },
      { step: 4, title: `Applied ${cleanTopic}`, description: `Build a substantive project: a web server, database, compiler, operating system component, or CLI tool. Apply systems thinking to a real problem.`, duration: "3-4 weeks", skills: [cleanTopic, "Systems Design", "Project Architecture"], resources: ["Build Your Own X (GitHub)", "Project-based learning repo"] },
      { step: 5, title: "Testing & Benchmarking", description: "Write comprehensive tests, learn property-based testing, benchmarking, and profiling. Optimize for throughput and latency with data-driven decisions.", duration: "1-2 weeks", skills: ["Property Testing", "Benchmarking", "Profiling", "Optimization"], resources: ["Criterion.rs", "Go testing docs", "Google Benchmark"] },
      { step: 6, title: "Production & Open Source", description: "Publish a library or tool. Learn packaging, CI/CD, documentation, and community engagement. Contribute to open-source projects in the ecosystem.", duration: "2-3 weeks", skills: ["Packaging", "Documentation", "Open Source", "CI/CD"], resources: ["crates.io publishing guide", "Go module docs"] },
    );
  } else if (isMobile) {
    steps.push(
      { step: 1, title: "Platform Fundamentals", description: `Learn the core concepts of ${cleanTopic}: UI components, navigation, lifecycle management, and platform conventions. Start with the official getting-started guide.`, duration: "2-3 weeks", skills: [cleanTopic, "UI Components", "Navigation", "Lifecycle"], resources: ["Official documentation", "Ray Wenderlich tutorials"] },
      { step: 2, title: "State Management & Architecture", description: "Study state management patterns (Redux, Provider, BLoC, etc.), app architecture (MVVM, Clean Architecture), and dependency injection.", duration: "2-3 weeks", skills: ["State Management", "MVVM", "Dependency Injection"], resources: ["Architecture sample repos", "Official state management guides"] },
      { step: 3, title: "Networking & Data Persistence", description: "Learn REST API integration, GraphQL, local storage, SQLite/CoreData/Room, and offline-first patterns. Build apps that work with real backends.", duration: "2-3 weeks", skills: ["REST APIs", "Local Storage", "Offline-First"], resources: ["Retrofit/Alamofire docs", "Room/CoreData docs"] },
      { step: 4, title: `Applied ${cleanTopic}`, description: `Build a complete app with ${cleanTopic}: authentication, real-time data, push notifications, and polished UI. Ship it to a test track or TestFlight.`, duration: "3-4 weeks", skills: [cleanTopic, "Auth", "Push Notifications", "App Store Submission"], resources: ["App Store guidelines", "Play Console docs"] },
      { step: 5, title: "Testing & Quality", description: "Write unit tests, widget/integration tests, and UI tests. Learn mocking, snapshot testing, and test automation for mobile.", duration: "1-2 weeks", skills: ["Unit Testing", "Widget/UI Testing", "Test Automation"], resources: ["Testing docs", "Patrol/EarlGrey docs"] },
      { step: 6, title: "Performance & Release", description: "Optimize app size, startup time, memory usage, and battery. Learn profiling tools, crash reporting, analytics, and App Store optimization.", duration: "2 weeks", skills: ["Profiling", "Crash Reporting", "ASO", "Release Management"], resources: ["Platform profiling guides", "Firebase docs"] },
    );
  } else {
    // Generic roadmap for any topic
    steps.push(
      { step: 1, title: "Understand the Landscape", description: `Research the ${cleanTopic} ecosystem: key concepts, terminology, major tools/frameworks, and how professionals in this area work. Read introductory articles and watch overview videos.`, duration: "1-2 weeks", skills: ["Domain Vocabulary", "Conceptual Overview", "Tool Ecosystem"], resources: ["Wikipedia", "YouTube overviews", "Introductory blog posts"] },
      { step: 2, title: "Learn the Fundamentals", description: `Study the core principles and building blocks of ${cleanTopic}. Focus on understanding WHY things work, not just HOW. Build small experiments to test your understanding.`, duration: "2-3 weeks", skills: ["Core Concepts", "First-Principles Thinking", "Basic Implementation"], resources: ["Official documentation", "Beginner tutorials", "Free courses"] },
      { step: 3, title: "Hands-On Practice", description: `Start building! Work through guided tutorials, then modify them. Create small projects that solve real problems. The goal is to build muscle memory and encounter real edge cases.`, duration: "2-3 weeks", skills: ["Practical Implementation", "Debugging", "Problem Solving"], resources: ["Tutorial sites", "GitHub examples", "Code-along videos"] },
      { step: 4, title: `Intermediate ${cleanTopic}`, description: `Deepen your knowledge: study design patterns, best practices, common pitfalls, and advanced techniques. Read code written by experienced practitioners.`, duration: "2-3 weeks", skills: ["Design Patterns", "Best Practices", "Code Review"], resources: ["Advanced tutorials", "Open-source codebases", "Technical blogs"] },
      { step: 5, title: "Build a Portfolio Project", description: `Design and implement a substantial project in ${cleanTopic} that demonstrates comprehensive understanding. Document your decisions and process.`, duration: "3-4 weeks", skills: ["Project Planning", "Full Implementation", "Documentation"], resources: ["Project templates", "Architecture guides", "Community feedback"] },
      { step: 6, title: "Community & Continuous Learning", description: `Join ${cleanTopic} communities, contribute to open source, write about what you've learned, and stay current with new developments. Teaching others is the best way to solidify knowledge.`, duration: "Ongoing", skills: ["Community Engagement", "Technical Writing", "Mentoring"], resources: ["Discord/Slack communities", "Stack Overflow", "Dev.to / Medium"] },
    );
  }

  // Determine difficulty and total time
  let difficulty = "Beginner to Intermediate";
  let estimatedTime = "3-4 months";

  if (isML || isSystems) {
    difficulty = "Intermediate to Advanced";
    estimatedTime = "5-6 months";
  } else if (isDevOps || isDataSci) {
    difficulty = "Beginner to Advanced";
    estimatedTime = "4-5 months";
  }

  return {
    topic: cleanTopic,
    summary: `A structured, step-by-step learning path for mastering ${cleanTopic}. This roadmap takes you from fundamentals to production-level proficiency, with concrete milestones and recommended resources at each stage.`,
    difficulty,
    estimated_time: estimatedTime,
    steps,
  };
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

    const roadmap = generateRoadmap(topic.trim());

    return new Response(JSON.stringify({ roadmap }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
