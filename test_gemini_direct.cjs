// Test script to directly check Gemini API
const { createGoogleGenerativeAI } = require('@ai-sdk/google');
const { generateText } = require('ai');

async function testGemini() {
    console.log('Testing Gemini API directly...\n');

    const apiKey = 'AIzaSyB6-b3zOFVgwGgZgroT9SMD-E8dZFu_M38';
    console.log('API Key:', apiKey.substring(0, 20) + '...');

    const google = createGoogleGenerativeAI({
        apiKey: apiKey
    });

    // Try different models
    const modelsToTest = [
        'gemini-2.0-flash-exp',
        'gemini-1.5-flash',
        'gemini-1.5-pro'
    ];

    for (const modelName of modelsToTest) {
        try {
            console.log(`\n--- Testing ${modelName} ---`);
            const result = await generateText({
                model: google(modelName),
                prompt: 'Say hello in one word',
                maxTokens: 10
            });

            console.log(`✅ SUCCESS with ${modelName}`);
            console.log('Response:', result.text);
            console.log('Usage:', result.usage);
            break; // If successful, stop testing

        } catch (error) {
            console.log(`❌ FAILED with ${modelName}`);
            console.log('Error:', error.message);
            if (error.statusCode) console.log('Status:', error.statusCode);
        }
    }
}

testGemini().catch(console.error);
