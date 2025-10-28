import { getLanguage, Plugin } from "obsidian";
import { processCalculatorBlock } from "./src/calculator-block";
import { initializeLocalization } from "src/localization/localization";
import { SegerlabPluginSettingsTab } from "./src/segerlab-plugin-settings-tab";

interface SegerlabPluginSettings {
  showMoreCoefficients: boolean;
}

const DEFAULT_SETTINGS: SegerlabPluginSettings = {
  showMoreCoefficients: false
}

export default class SegerlabPlugin extends Plugin {
  settings: SegerlabPluginSettings;

	async onload() {
    await this.loadSettings();
    const currentLanguage = getLanguage();
		await initializeLocalization(currentLanguage);
		this.registerMarkdownCodeBlockProcessor(
			"segerlab-calculator",
			processCalculatorBlock(this.settings.showMoreCoefficients)
		);
    this.addSettingTab(new SegerlabPluginSettingsTab(this.app, this));
	}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

	onunload() {}
}
