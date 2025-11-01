import { MarkdownPostProcessorContext } from "obsidian";
import { createRoot } from "react-dom/client";
import * as React from "react";
import { Calculator } from "./calculator-view";
import { ObsidianCalculatorViewV1 } from "../obsidian-segerlab-dtos";
import { ErrorMessage } from "../error-boundary";

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
      } catch (error) {
        el.empty();
        const container = el.createDiv("csv-react-container");
        const root = createRoot(container);
        root.render(React.createElement(ErrorMessage, {
          message: `Error: ${error.message}`,
        }));
      }
    };
