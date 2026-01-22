
const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

// Get args from command line
const key = process.argv[2];
const value = process.argv[3];

if (!key || !value) {
    console.error('Usage: node update_env.cjs KEY VALUE');
    // Fallback to the hardcoded E2B update behavior if no args provided (for compatibility)
    if (!key && !value) {
        // ... (original logic could go here, but let's just exit to be safe)
        process.exit(1);
    }
}

try {
    let content = '';
    if (fs.existsSync(envPath)) {
        content = fs.readFileSync(envPath, 'utf8');
    }

    const lines = content.split('\n');
    let found = false;
    const newLines = lines.map(line => {
        if (line.trim().startsWith(`${key}=`)) {
            found = true;
            return `${key}=${value}`;
        }
        return line;
    });

    if (!found) {
        newLines.push(`${key}=${value}`);
    }

    fs.writeFileSync(envPath, newLines.join('\n'));
    console.log(`Updated .env.local: Set ${key}=${value.substring(0, 5)}...`);

} catch (e) {
    console.error('Failed to update .env.local:', e);
}
