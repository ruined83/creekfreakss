
async function testApi() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/generate-ai-code-stream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: "Write a React component that says Hello World",
                model: "google/gemini-2.0-flash-exp",
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

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            console.log('Received chunk:', decoder.decode(value));
        }
        console.log('Stream finished');

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testApi();
