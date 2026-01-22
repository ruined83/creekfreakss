import puppeteer from 'puppeteer';
import fs from 'fs';

async function testScrape() {
    console.log("Starting scrape of http://localhost:8080...");
    const url = 'http://localhost:8080';
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        console.log("Navigation complete.");

        // Extract clearer markdown-like content
        const content = await page.evaluate(() => {
            return document.body.innerText;
        });

        const title = await page.title();

        const finalOutput = `# Scraped Context: ${title}\n\nURL: ${url}\n\n${content}`;

        fs.writeFileSync('creek_freaks_context.md', finalOutput);
        console.log("Successfully wrote to creek_freaks_context.md");

    } catch (error) {
        console.error("Scrape failed:", error);
    } finally {
        if (browser) await browser.close();
    }
}

testScrape();
