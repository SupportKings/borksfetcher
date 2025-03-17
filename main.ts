import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { load } from "https://deno.land/std@0.177.0/dotenv/mod.ts";

// Load environment variables
const env = await load();
const BORKS_API_KEY = Deno.env.get("BORKS_API_KEY") || env["BORKS_API_KEY"] || "";

async function fetchAllSenderEmails() {
  const config = {
    apiEndpoint: "https://send.borks.io/api/sender-emails",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${BORKS_API_KEY}`
    }
  };

  let allData: any[] = [];
  let nextPageUrl = config.apiEndpoint;
  let pageCount = 0;
  
  while (nextPageUrl) {
    console.log(`Fetching page ${++pageCount}...`);
    
    const response = await fetch(nextPageUrl, {
      headers: config.headers
    });
    
    const responseData = await response.json();
    
    if (Array.isArray(responseData.data)) {
      allData = allData.concat(responseData.data);
      console.log(`Added ${responseData.data.length} records. Total: ${allData.length}`);
    }
    
    nextPageUrl = responseData.links && responseData.links.next ? responseData.links.next : null;
  }
  
  return {
    success: true,
    recordCount: allData.length,
    data: allData
  };
}

function serveStatic(path: string): Response {
  try {
    const file = Deno.readFileSync(path);
    const contentType = path.endsWith(".html") 
      ? "text/html" 
      : path.endsWith(".css") 
        ? "text/css" 
        : path.endsWith(".js") 
          ? "application/javascript" 
          : "application/octet-stream";
    
    return new Response(file, {
      headers: {
        "content-type": contentType,
      },
    });
  } catch (e) {
    return new Response("Not found", { status: 404 });
  }
}

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;
  
  // Handle API request
  if (path === "/api" || path.startsWith("/api/")) {
    try {
      const data = await fetchAllSenderEmails();
      return new Response(JSON.stringify(data), {
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET",
          "access-control-allow-headers": "Content-Type",
        },
      });
    } catch (error) {
      console.error("Error:", error.message);
      return new Response(
        JSON.stringify({ success: false, error: error instanceof Error ? error.message : String(error) }),
        {
          status: 500,
          headers: {
            "content-type": "application/json",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET",
            "access-control-allow-headers": "Content-Type",
          },
        }
      );
    }
  }
  
  // Serve static files
  if (path === "/" || path === "") {
    return serveStatic("public/index.html");
  }
  
  if (path.startsWith("/")) {
    return serveStatic(`public${path}`);
  }
  
  return new Response("Not found", { status: 404 });
}

console.log("Server running on http://localhost:8000");
await serve(handler, { port: 8000 }); 