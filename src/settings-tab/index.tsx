import { App, PluginSettingTab, Setting } from "obsidian";
import SegerlabPlugin from "../main";
import { createRoot } from "react-dom/client";
import React from "react";
import { t } from "i18next";
import { RecipeSearchTemplateSetting } from "./recipe-search-template-setting";

export default class SegerlabPluginSettingsTab extends PluginSettingTab {
  plugin: SegerlabPlugin;

  constructor(app: App, plugin: SegerlabPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    /** Settings Header */
    new Setting(containerEl).setName(t("Settings.Title")).setHeading();

    /** Show more coefficients setting */
    new Setting(containerEl)
      .setName(t("Settings.ShowMoreCoefficients.Title"))
      .setDesc(t("Settings.ShowMoreCoefficients.Description"))
      .addToggle(toggle => toggle.setValue(this.plugin.settings.showMoreCoefficients).onChange(async (value) => {
        this.plugin.settings.showMoreCoefficients = value;
        await this.plugin.saveSettings();
      }));

    /** Recipe search template setting */
    const recipeSearchTemplateSettings = createRoot(new Setting(containerEl).settingEl);
    const handleValueChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      this.plugin.settings.recipeSearchTemplate = event.target.value.trim();
      await this.plugin.saveSettings();
    };
    recipeSearchTemplateSettings.render(
      <RecipeSearchTemplateSetting
        defaultValue={this.plugin.settings.recipeSearchTemplate}
        onChange={handleValueChange} />,
    );
  }
}
