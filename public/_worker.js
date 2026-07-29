export default {
  async fetch(request, env, ctx) {
    const accept = request.headers.get("accept") || request.headers.get("Accept") || "";
    
    if (accept.includes("text/markdown")) {
      // Fetch llms.txt as markdown payload
      const llmsUrl = new URL("/llms.txt", request.url);
      const markdownResponse = await env.ASSETS.fetch(llmsUrl);
      
      if (markdownResponse.ok) {
        const markdownText = await markdownResponse.text();
        return new Response(markdownText, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "x-markdown-tokens": "450",
            "Vary": "Accept",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
    }
    
    // Default pass-through to static HTML assets for human browsers
    return env.ASSETS.fetch(request);
  }
};
