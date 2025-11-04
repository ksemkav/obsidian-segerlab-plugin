import { addIcon, getLanguage, Plugin, WorkspaceLeaf } from "obsidian";
import { processCalculatorBlock } from "./calculator-block";
import { initializeLocalization } from "./localization/localization";
import { SegerlabPluginSettingsTab } from "./segerlab-plugin-settings-tab";
import { SegerlabView, VIEW_TYPE_SEGERLAB } from "./stull-chart-view/segerlab-view";
import SegerlabLogo from "./assets/icons/seger.svg";
import { renderToString } from "react-dom/server";
import React from "react";

interface SegerlabPluginSettings {
  showMoreCoefficients: boolean;
}

const DEFAULT_SETTINGS: SegerlabPluginSettings = {
  showMoreCoefficients: false,
};

export default class SegerlabPlugin extends Plugin {
  settings: SegerlabPluginSettings;

  async onload() {
    await this.loadSettings();
    const currentLanguage = getLanguage();
    await initializeLocalization(currentLanguage);

    this.registerMarkdownCodeBlockProcessor(
      "segerlab-calculator",
      processCalculatorBlock(this.settings.showMoreCoefficients),
    );
    this.addSettingTab(new SegerlabPluginSettingsTab(this.app, this));

    // This creates an icon in the left ribbon.
    addIcon("segerlab-icon", renderToString(React.createElement(SegerlabLogo)));
    this.addRibbonIcon("segerlab-icon", "Segerlab", async (_evt: MouseEvent) => {
      await this.activateView();
    });
    this.registerView(
      VIEW_TYPE_SEGERLAB,
      (leaf) => new SegerlabView(leaf),
    );
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async activateView() {
    const { workspace } = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_SEGERLAB);

    if (leaves.length > 0) {
      // A leaf with our view already exists, use that
      leaf = leaves[0];
    } else {
      // Our view could not be found in the workspace, create a new leaf
      // in the right sidebar for it
      leaf = workspace.getRightLeaf(false);
      await leaf?.setViewState({ type: VIEW_TYPE_SEGERLAB, active: true });
    }

    // "Reveal" the leaf in case it is in a collapsed sidebar
    if(leaf != null) {
      await workspace.revealLeaf(leaf);
    }
  }

  onunload() {}
}
