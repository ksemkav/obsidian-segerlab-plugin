import { MarkdownPostProcessorContext } from "obsidian";
import { createRoot } from "react-dom/client";
import * as React from "react";
import { Calculator } from "./calculator-view";
import { RecipeCalculationDto } from "./dtos";

export function processCalculatorBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
  let calculatorData: RecipeCalculationDto;

  try {
    const parsed = JSON.parse(source);

    // Basic validation - check if required properties exist
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Invalid JSON structure");
    }

    // Add specific validation based on your RecipeCalculationDto interface
    // Example validations (adjust based on your actual DTO structure):
    // if (!parsed.recipeName || typeof parsed.recipeName !== 'string') {
    // 	throw new Error('Missing or invalid recipeName');
    // }

    // if (!Array.isArray(parsed.ingredients)) {
    // 	throw new Error('Missing or invalid ingredients array');
    // }

    calculatorData = parsed as RecipeCalculationDto;
  } catch (error) {
    // Handle validation error - show error message in the element
    el.empty();
    el.createEl("div", {
      text: `Calculator block error: ${error.message}`,
      cls: "calculator-error",
    });
    return;
  }

  // Clear the element and create React component
  el.empty();

  const container = el.createDiv("csv-react-container");
  const root = createRoot(container);

  root.render(React.createElement(Calculator, calculatorData));

  // Store root for cleanup if needed
  (container as any)._reactRoot = root;
}
