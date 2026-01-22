const fs = require('fs');
const path = 'app/api/generate-ai-code-stream/route.ts';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// 1-based indices to 0-based
const startLine = 1301 - 1;
const endLine = 1356 - 1;

// Verify content looks like garbage we expect
console.log('Line 1301:', lines[startLine]);
console.log('Line 1356:', lines[endLine]);

// Remove lines
lines.splice(startLine, endLine - startLine + 1);

// Insert correct closure at startLine
lines.splice(startLine, 0, "            },", "            {", "              role: 'user',", "              content: prompt", "            }", "          ],");

fs.writeFileSync(path, lines.join('\n'));
console.log('Fixed file.');
