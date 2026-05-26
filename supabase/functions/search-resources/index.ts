import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface Resource {
  title: string;
  url: string;
  description: string;
  resource_type: string;
  domain: string;
  favicon: string;
}

function classifyResource(url: string, title: string): string {
  const lower = url.toLowerCase();
  const lowerTitle = title.toLowerCase();
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "video";
  if (lower.includes("github.com")) return "repo";
  if (
    lower.includes("udemy.com") ||
    lower.includes("coursera.org") ||
    lower.includes("edx.org") ||
    lower.includes("pluralsight.com") ||
    lower.includes("linkedin.com/learning") ||
    lower.includes("skillshare.com") ||
    lower.includes("codecademy.com") ||
    lower.includes("freecodecamp.org") ||
    lowerTitle.includes("course") ||
    lowerTitle.includes("tutorial")
  ) return "course";
  if (
    lower.includes("docs.") ||
    lower.includes("documentation") ||
    lower.includes("readthedocs.io") ||
    lower.includes("wiki") ||
    lower.includes("mdn") ||
    lower.includes("/reference") ||
    lower.includes("/api/") ||
    lowerTitle.includes("documentation") ||
    lowerTitle.includes("docs") ||
    lowerTitle.includes("reference") ||
    lowerTitle.includes("handbook")
  ) return "docs";
  return "article";
}

function getFavicon(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}

async function searchGitHub(topic: string): Promise<Resource[]> {
  const query = encodeURIComponent(topic);
  const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=5`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "resource-finder" },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((item: any) => ({
      title: item.full_name + (item.description ? " - " + item.description.slice(0, 80) : ""),
      url: item.html_url,
      description: item.description || `Repository with ${item.stargazers_count} stars`,
      resource_type: "repo",
      domain: "github.com",
      favicon: getFavicon("github.com"),
    }));
  } catch {
    return [];
  }
}

async function searchWikipedia(topic: string): Promise<Resource[]> {
  const query = encodeURIComponent(topic);
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&srlimit=3&origin=*`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.query?.search || []).map((item: any) => ({
      title: item.title,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
      description: item.snippet?.replace(/<[^>]*>/g, "") || "",
      resource_type: "docs",
      domain: "en.wikipedia.org",
      favicon: getFavicon("en.wikipedia.org"),
    }));
  } catch {
    return [];
  }
}

async function searchStackExchange(topic: string): Promise<Resource[]> {
  const query = encodeURIComponent(topic);
  const url = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${query}&site=stackoverflow&pagesize=3&filter=withbody`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((item: any) => ({
      title: item.title,
      url: item.link,
      description: item.body?.replace(/<[^>]*>/g, "").slice(0, 150) || "Stack Overflow question",
      resource_type: "article",
      domain: "stackoverflow.com",
      favicon: getFavicon("stackoverflow.com"),
    }));
  } catch {
    return [];
  }
}

async function searchDuckDuckGo(topic: string): Promise<Resource[]> {
  const enhancedQuery = encodeURIComponent(topic + " tutorial course learn");
  const url = `https://html.duckduckgo.com/html/?q=${enhancedQuery}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ResourceFinder/1.0)" },
    });
    if (!res.ok) return [];
    const html = await res.text();
    const resources: Resource[] = [];
    const resultRegex = /<a rel="nofollow" class="result__a" href="([^"]+)">(.*?)<\/a>/g;
    const snippetRegex = /<a class="result__snippet"[^>]*>(.*?)<\/a>/g;
    const urls: string[] = [];
    const titles: string[] = [];
    let match;
    while ((match = resultRegex.exec(html)) !== null && urls.length < 10) {
      const decodedUrl = decodeURIComponent(match[1].replace(/^\/\/duckduckgo.com\/l\/\?uddg=/, ""));
      urls.push(decodedUrl);
      titles.push(match[2].replace(/<[^>]*>/g, "").trim());
    }
    const snippets: string[] = [];
    while ((match = snippetRegex.exec(html)) !== null && snippets.length < 10) {
      snippets.push(match[1].replace(/<[^>]*>/g, "").trim());
    }
    for (let i = 0; i < urls.length; i++) {
      const u = urls[i];
      if (u.includes("duckduckgo.com")) continue;
      try {
        const domain = new URL(u).hostname;
        resources.push({
          title: titles[i] || domain,
          url: u,
          description: snippets[i] || "",
          resource_type: classifyResource(u, titles[i] || ""),
          domain,
          favicon: getFavicon(domain),
        });
      } catch {
        continue;
      }
    }
    return resources;
  } catch {
    return [];
  }
}

async function searchDevTo(topic: string): Promise<Resource[]> {
  const query = encodeURIComponent(topic);
  const url = `https://dev.to/api/articles?per_page=4&tag=${query.split(" ")[0]}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data || []).map((item: any) => ({
      title: item.title,
      url: item.url,
      description: item.description || "",
      resource_type: "article",
      domain: "dev.to",
      favicon: getFavicon("dev.to"),
    }));
  } catch {
    return [];
  }
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

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check cache
    const { data: cached } = await supabase
      .from("searches")
      .select("results")
      .eq("topic", topic.trim().toLowerCase())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (cached && Array.isArray(cached.results) && cached.results.length >= 10) {
      return new Response(JSON.stringify({ results: cached.results, cached: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Search multiple sources in parallel
    const [github, wikipedia, stackexchange, duckduckgo, devto] = await Promise.all([
      searchGitHub(topic),
      searchWikipedia(topic),
      searchStackExchange(topic),
      searchDuckDuckGo(topic),
      searchDevTo(topic),
    ]);

    // Merge and deduplicate by URL
    const allResources = [...github, ...wikipedia, ...stackexchange, ...duckduckgo, ...devto];
    const seen = new Set<string>();
    const deduped: Resource[] = [];
    for (const r of allResources) {
      if (!seen.has(r.url)) {
        seen.add(r.url);
        deduped.push(r);
      }
    }

    // Cache results
    if (deduped.length > 0) {
      await supabase.from("searches").upsert(
        { topic: topic.trim().toLowerCase(), results: deduped },
        { onConflict: "topic" }
      );
    }

    return new Response(JSON.stringify({ results: deduped, cached: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
