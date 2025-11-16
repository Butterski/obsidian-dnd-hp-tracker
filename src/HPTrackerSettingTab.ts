import { App, PluginSettingTab, Setting } from 'obsidian';
import type HPTrackerPlugin from './main';

export class HPTrackerSettingTab extends PluginSettingTab {
	plugin: HPTrackerPlugin;

	constructor(app: App, plugin: HPTrackerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "D&D HP Tracker Settings" });

		new Setting(containerEl)
			.setName("Maximum HP")
			.setDesc("Set your character's maximum hit points")
			.addText(text => text
				.setPlaceholder("20")
				.setValue(String(this.plugin.settings.maxHP))
				.onChange(async (value) => {
					const num = parseInt(value) || 20;
					this.plugin.settings.maxHP = num;
					if (this.plugin.settings.currentHP > num) {
						this.plugin.settings.currentHP = num;
					}
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Current HP")
			.setDesc("Set your character's current hit points")
			.addText(text => text
				.setPlaceholder("20")
				.setValue(String(this.plugin.settings.currentHP))
				.onChange(async (value) => {
					const num = Math.max(0, Math.min(this.plugin.settings.maxHP, parseInt(value) || 0));
					this.plugin.settings.currentHP = num;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Temporary HP")
			.setDesc("Set your character's temporary hit points")
			.addText(text => text
				.setPlaceholder("0")
				.setValue(String(this.plugin.settings.tempHP))
				.onChange(async (value) => {
					const num = Math.max(0, parseInt(value) || 0);
					this.plugin.settings.tempHP = num;
					await this.plugin.saveSettings();
				}));
	}
}
