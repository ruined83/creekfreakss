import { NextRequest, NextResponse } from 'next/server';
import { scrapeLocal } from "@/lib/local-scraper";

export async function POST(req: NextRequest) {
  console.log("SEARCH ROUTE HIT - REVISION 3");
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // HANDLE LOCALHOST - Treat as direct scrape
    if (query.includes("localhost") || query.includes("127.0.0.1")) {
      console.log(`Localhost query detected: "${query}"`);

      let targetUrl = query;
      if (!targetUrl.startsWith("http")) {
        targetUrl = `http://${targetUrl}`;
      }

      try {
        console.log(`Attempting to scrape: ${targetUrl}`);
        const scrapeResult = await scrapeLocal(targetUrl);

        if (scrapeResult.success && scrapeResult.data) {
          return NextResponse.json({
            results: [{
              url: targetUrl,
              title: scrapeResult.data.title,
              description: scrapeResult.data.description,
              markdown: scrapeResult.data.markdown,
              screenshot: null
            }]
          });
        }
      } catch (e) {
        console.error("Local scrape in search failed:", e);
        return NextResponse.json({ error: `Failed to scrape local site: ${e instanceof Error ? e.message : String(e)}` }, { status: 500 });
      }

      // If we got here, something unexpected happened with local scrape
      return NextResponse.json({ error: "Local scrape failed" }, { status: 500 });
    }

    // Use Firecrawl search to get top 10 results with screenshots
    const searchResponse = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        limit: 10,
        scrapeOptions: {
          formats: ['markdown', 'screenshot'],
          onlyMainContent: true,
        },
      }),
    });

    if (!searchResponse.ok) {
      throw new Error('Search failed');
    }

    const searchData = await searchResponse.json();

    // Format results with screenshots and markdown
    const results = searchData.data?.map((result: any) => ({
      url: result.url,
      title: result.title || result.url,
      description: result.description || '',
      screenshot: result.screenshot || null,
      markdown: result.markdown || '',
    })) || [];

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}