import { Plugin } from "obsidian";
import { processCalculatorBlock } from "./src/index";
import { initializeLocalization } from "src/localization/localization";

export default class SegerlabPlugin extends Plugin {
	async onload() {
		await initializeLocalization();
		this.registerMarkdownCodeBlockProcessor(
			"calculator",
			processCalculatorBlock
		);
	}

	onunload() {}
}
