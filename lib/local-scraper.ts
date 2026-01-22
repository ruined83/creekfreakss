import puppeteer from 'puppeteer';

export async function scrapeLocal(url: string) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        // Set viewport to desktop size
        await page.setViewport({ width: 1280, height: 800 });

        // Navigate to URL
        await page.goto(url, {
            waitUntil: 'networkidle0', // Wait until network is idle (no requests for 500ms)
            timeout: 30000,
        });

        // Get page content
        const content = await page.content();
        const title = await page.title();

        // Simple HTML scraping (you might want to convert to Markdown here using separate prod)
        // For now returning HTML content

        // Extract metadata
        const description = await page.$eval('meta[name="description"]', element => element.getAttribute('content')).catch(() => "");

        // Convert to simple markdown (very basic)
        const markdown = await page.evaluate(() => {
            let text = document.body.innerText;
            return text;
        });

        return {
            success: true,
            data: {
                title,
                content: content, // Full HTML
                description,
                markdown: markdown,
                html: content,
                metadata: {
                    title,
                    description,
                    sourceURL: url,
                }
            }
        };

    } catch (error) {
        console.error("Local scrape error:", error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
