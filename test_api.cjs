
const fetch = require('node-fetch');

async function testApi() {
    try {
        const response = await fetch('http://localhost:3000/api/generate-ai-code-stream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: "Clone www.stripe.com",
                model: "google/gemini-1.5-pro-latest",
                context: {
                    sandboxId: "iewi2aawfe5dimjnq36dd"
                }
            })
        });

        if (!response.ok) {
            console.error('API Error:', response.status, response.statusText);
            const text = await response.text();
            console.error('Body:', text);
            return;
        }

        const reader = response.body; // node-fetch body is a stream

        reader.on('data', (chunk) => {
            console.log('Received chunk:', chunk.toString());
        });

        reader.on('end', () => {
            console.log('Stream finished');
        });

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testApi();
