#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_CMD_FILE = 'cmd';
const DEFAULT_HISTORY_FILE = 'history.md';

function main() {
  // Get file names from command line arguments or use defaults
  const cmdFileName = process.argv[2] || DEFAULT_CMD_FILE;
  const historyFileName = process.argv[3] || DEFAULT_HISTORY_FILE;

  const cwd = process.cwd();
  const cmdPath = path.join(cwd, cmdFileName);
  const historyPath = path.join(cwd, historyFileName);

  // Check if command file exists
  if (!fs.existsSync(cmdPath)) {
    console.error(`Error: '${cmdFileName}' file not found in ${cwd}`);
    process.exit(1);
  }

  try {
    const cmdContent = fs.readFileSync(cmdPath, 'utf-8');
    const timestamp = new Date().toLocaleString();
    
    // Format the entry
    const entry = `
## [${timestamp}] Command Content

\`\`\`
${cmdContent}
\`\`\`

---
`;

    // Append to history file
    fs.appendFileSync(historyPath, entry);
    console.log(`Successfully appended content of '${cmdFileName}' to '${historyFileName}'`);

  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main();
