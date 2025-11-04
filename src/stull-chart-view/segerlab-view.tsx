import { debounce, Editor, ItemView, MarkdownView, WorkspaceLeaf } from "obsidian";
import { createRoot, Root } from "react-dom/client";
import { StullChartCalculatorPoint } from "../calculator-block/stull-chart/stull-chart";
import { StullChartView } from "./stull-chart-view";
import { WelcomeMessage } from "./welcome-message";
import { parseObsidianCalculatorViews } from "./helpers";

export const VIEW_TYPE_SEGERLAB = "segerlab-view";

export class SegerlabView extends ItemView {
  root: Root | null = null;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_SEGERLAB;
  }

  getDisplayText() {
    return "Stull chart";
  }

  getIcon(): string {
    return "segerlab-icon";
  }

  onOpen() {
    this.root = createRoot(this.contentEl);

    const render = debounce((displayText: string, document: string) => {
      if (!this.root) return;
      const calculators = parseObsidianCalculatorViews(document);
      const points: StullChartCalculatorPoint[] = calculators
        .map(c => ({
          id: c.calculationId,
          name: c.name,
          al2O3Value: c.calculationResult.stullChartPoint.al2O3Value,
          siO2Value: c.calculationResult.stullChartPoint.siO2Value,
        }));

      this.root.render(<StullChartView points={points} header={displayText} />);
    }, 3000, true);

    const onActiveLeafChange = (leaf: WorkspaceLeaf | null) => {
      if (leaf?.view.getViewType() === "markdown") {
        const displayText = leaf?.getDisplayText();
        if (displayText !== undefined) {
          const document = (leaf.view as MarkdownView).getViewData();
          render(displayText, document).run();
        }
      }
      if (leaf?.view.getViewType() === "empty") {
        this.root?.render(<WelcomeMessage />);
      }
    };

    const onEditorChange = (editor: Editor, markdownView: MarkdownView) => {
      const displayText = markdownView.getDisplayText();
      if (displayText !== undefined) {
        const doc = markdownView.getViewData();
        render(displayText, doc);
      }
    };

    this.registerEvent(this.app.workspace.on("active-leaf-change", onActiveLeafChange));
    this.registerEvent(this.app.workspace.on("editor-change", onEditorChange));

    // Initial render
    const displayText = this.app.workspace.getActiveViewOfType(MarkdownView)?.getDisplayText();
    const document = this.app.workspace.getActiveViewOfType(MarkdownView)?.getViewData() ?? "";
    if (displayText !== undefined) {
      render(displayText, document).run();
    }

    this.root.render(<WelcomeMessage />);
    return Promise.resolve();
  }

  onClose() {
    this.root?.unmount();
    return Promise.resolve();
  }
}
