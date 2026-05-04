#!/usr/bin/env node
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

type CodingAgent = 'claude' | 'codex' | 'gemini';
const CODING_AGENTS: readonly CodingAgent[] = ['claude', 'codex', 'gemini'];

function isCodingAgent(value: string): value is CodingAgent {
  return CODING_AGENTS.includes(value as CodingAgent);
}

function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let input = '';

    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (chunk) => {
      input += chunk;
    });
    process.stdin.on('end', () => {
      resolve(input);
    });
    process.stdin.on('error', reject);
  });
}

function formatTimestamp(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function main() {
  const agent = process.argv[2];
  const projectDir = process.argv[3];

  if (!agent || !projectDir) {
    console.error('Usage: autolog-gemini-cli <claude|codex|gemini> <project-directory>');
    process.exit(1);
  }

  if (!isCodingAgent(agent)) {
    console.error(`Error: unsupported coding agent '${agent}'. Expected one of: ${CODING_AGENTS.join(', ')}`);
    process.exit(1);
  }

  const resolvedProjectDir = path.resolve(projectDir);

  if (!fs.existsSync(resolvedProjectDir) || !fs.statSync(resolvedProjectDir).isDirectory()) {
    console.error(`Error: project directory not found: ${resolvedProjectDir}`);
    process.exit(1);
  }

  const projectName = path.basename(resolvedProjectDir);
  const historyFileName = path.join('vibe-coding-memo', projectName, 'history.md');
  const historyPath = path.join(os.homedir(), historyFileName);

  try {
    const input = await readStdin();
    const payload = JSON.parse(input);
    const prompt = payload.prompt;
    if (typeof prompt !== 'string') {
      console.error('Error: input JSON must contain a string prompt field');
      process.exit(1);
    }
    const timestamp = formatTimestamp(new Date());
    const entry = `
## ${timestamp} ${agent}
${prompt}

--

`;
    fs.mkdirSync(path.dirname(historyPath), { recursive: true });
    fs.appendFileSync(historyPath, entry);
    console.log(`Successfully appended prompt to '${historyFileName}'`);

  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main();
