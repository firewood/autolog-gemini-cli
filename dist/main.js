#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
    }
    catch (error) {
        console.error('An error occurred:', error);
        process.exit(1);
    }
}
main();
