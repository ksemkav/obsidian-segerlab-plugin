import { MarkdownPostProcessorContext } from "obsidian";
import { createRoot } from "react-dom/client";
import * as React from "react";
import { Calculator } from "./calculator-view";
import { ObsidianCalculatorViewV1 } from "../obsidian-segerlab-dtos";

export const processCalculatorBlock =
  (showMoreCoefficients: boolean) =>
    (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
      try {
        const calculatorData: ObsidianCalculatorViewV1 = JSON.parse(source);

        // Clear the element and create React component
        el.empty();

        const container = el.createDiv("csv-react-container");
        const root = createRoot(container);

        root.render(React.createElement(Calculator, {
          calculatorView: calculatorData,
          showMoreCoefficients: showMoreCoefficients,
        }));

        // Store root for cleanup if needed
        //(container as any)._reactRoot = root;
      } catch (error) {
        // Handle validation error - show error message in the element
        el.empty();
        el.createEl("div", {
          text: `Calculator block error: ${error.message}`,
          cls: "calculator-error",
        });
        return;
      }
    };
