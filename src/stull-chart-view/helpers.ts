import { ObsidianCalculatorViewV1 } from "../obsidian-segerlab-dtos";

export function parseObsidianCalculatorViews(markdown: string): ObsidianCalculatorViewV1[] {
  const results: ObsidianCalculatorViewV1[] = [];

  // Regex to match segerlab-calculator code blocks with optional inline JSON or multiline content
  const codeBlockRegex = /[`~]{3}segerlab-calculator\s*([^`]*?)[`~]{3}/gs;

  let match;
  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    const jsonContent = match[1].trim();

    if (!jsonContent) continue;

    try {
      const parsed = JSON.parse(jsonContent);
      results.push(parsed as ObsidianCalculatorViewV1);
    } catch {
      // Skip malformed JSON blocks silently
    }
  }

  return results;
}
