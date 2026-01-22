
async function testApi() {
    console.log("Testing POST /api/search with localhost URL...");
    try {
        const res = await fetch("http://localhost:3000/api/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: "http://localhost:8080" })
        });

        console.log(`Status: ${res.status}`);
        const data = await res.json();
        console.log("Response:", JSON.stringify(data, null, 2));

    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

testApi();
