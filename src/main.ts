#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

const CMD_FILE = 'cmd';
const HISTORY_FILE = 'history.md';

function main() {
  const cwd = process.cwd();
  const cmdPath = path.join(cwd, CMD_FILE);
  const historyPath = path.join(cwd, HISTORY_FILE);

  // Check if 'cmd' file exists
  if (!fs.existsSync(cmdPath)) {
    console.error(`Error: '${CMD_FILE}' file not found in ${cwd}`);
    process.exit(1);
  }

  try {
    const cmdContent = fs.readFileSync(cmdPath, 'utf-8');
    const timestamp = new Date().toLocaleString();
    
    // Format the entry
    // We'll wrap the content in a code block if it looks like code, 
    // but for general text, maybe just a quote or plain text. 
    // Let's use a clear delimiter.
    const entry = `
## [${timestamp}] Command Content

\`\`\`
${cmdContent}
\`\`\`

---
`;

    // Append to history.md
    fs.appendFileSync(historyPath, entry);
    console.log(`Successfully appended content of '${CMD_FILE}' to '${HISTORY_FILE}'`);

  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main();
