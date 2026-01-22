const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
let envContent = '';

try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (err) {
    console.log('Creating new .env.local file');
}

const newKey = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_KEY';

const lines = envContent.split('\n');
let updated = false;

// Update existing OPENAI_API_KEY
for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('OPENAI_API_KEY=')) {
        lines[i] = `OPENAI_API_KEY=${newKey}`;
        updated = true;
        break;
    }
}

// Add if not found
if (!updated) {
    lines.push(`OPENAI_API_KEY=${newKey}`);
}

fs.writeFileSync(envPath, lines.join('\n'));
console.log('✅ Updated OPENAI_API_KEY in .env.local');
