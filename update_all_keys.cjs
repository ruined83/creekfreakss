const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
let envContent = '';

try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (err) {
    console.log('Creating new .env.local file');
}

const updates = {
    'FIRECRAWL_API_KEY': process.env.FIRECRAWL_API_KEY || 'YOUR_FIRECRAWL_KEY',
    'OPENAI_API_KEY': process.env.OPENAI_API_KEY || 'YOUR_OPENAI_KEY',
    'ANTHROPIC_API_KEY': process.env.ANTHROPIC_API_KEY || 'YOUR_ANTHROPIC_KEY',
    'GEMINI_API_KEY': process.env.GEMINI_API_KEY || 'YOUR_GEMINI_KEY',
    'VERCEL_TOKEN': process.env.VERCEL_TOKEN || 'YOUR_VERCEL_TOKEN',
    'E2B_API_KEY': process.env.E2B_API_KEY || 'YOUR_E2B_KEY',
    'SANDBOX_PROVIDER': 'e2b'
};

const lines = envContent.split('\n');
const existingKeys = new Set();

// Update existing keys
for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('#')) {
        const [key] = line.split('=');
        if (key && updates[key]) {
            lines[i] = `${key}=${updates[key]}`;
            existingKeys.add(key);
        }
    }
}

// Add new keys
for (const [key, value] of Object.entries(updates)) {
    if (!existingKeys.has(key)) {
        lines.push(`${key}=${value}`);
    }
}

fs.writeFileSync(envPath, lines.join('\n'));
console.log('✅ Updated .env.local with all API keys');
console.log('Keys updated:', Object.keys(updates).join(', '));
