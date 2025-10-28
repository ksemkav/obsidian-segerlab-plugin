import { App, getLanguage, PluginSettingTab, Setting } from "obsidian";
import SegerlabPlugin from "../main";

export class SegerlabPluginSettingsTab extends PluginSettingTab {
  plugin: SegerlabPlugin;

  constructor(app: App, plugin: SegerlabPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const {containerEl} = this;
    containerEl.empty();
    const currentLanguage = getLanguage();

    const dictionary = {
      "ru": {
        "settingsTitle": "Настройки segerlab плагина",
        "showMoreCoefficients": "Отображать больше коэффициентов в калькуляторе",
        "showMoreCoefficientsDesc": "Перезагрузите Obsidian после изменения"
      },
      "en": {
        "settingsTitle": "Segerlab plugin settings",
        "showMoreCoefficients": "Show more coefficients in calculator",
        "showMoreCoefficientsDesc": "Restart Obsidian after changing"
      }
    };

    const t = currentLanguage === "ru" ? dictionary.ru : dictionary.en;

    new Setting(containerEl).setName(t.settingsTitle).setHeading();

    new Setting(containerEl)
      .setName(t.showMoreCoefficients)
      .setDesc(t.showMoreCoefficientsDesc)
      .addToggle(toggle => toggle.setValue(this.plugin.settings.showMoreCoefficients).onChange(async (value) => {
        this.plugin.settings.showMoreCoefficients = value;
        await this.plugin.saveSettings();
      }));
  }
}
