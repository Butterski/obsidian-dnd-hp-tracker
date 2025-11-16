import { Plugin, WorkspaceLeaf } from 'obsidian';
import { HPTrackerSettings, DEFAULT_SETTINGS } from './settings';
import { VIEW_TYPE_HP_TRACKER } from './constants';
import { HPTrackerView } from './HPTrackerView';
import { HPTrackerSettingTab } from './HPTrackerSettingTab';

export default class HPTrackerPlugin extends Plugin {
	settings: HPTrackerSettings;

	async onload() {
		await this.loadSettings();

		this.registerView(
			VIEW_TYPE_HP_TRACKER,
			(leaf) => new HPTrackerView(leaf, this)
		);

		this.addRibbonIcon('heart', 'D&D HP Tracker', () => {
			this.activateView();
		});

		this.addCommand({
			id: 'open-hp-tracker',
			name: 'Open HP Tracker',
			callback: () => {
				this.activateView();
			}
		});

		this.addSettingTab(new HPTrackerSettingTab(this.app, this));
	}

	async activateView() {
		const { workspace } = this.app;
		
		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_HP_TRACKER);

		if (leaves.length > 0) {
			leaf = leaves[0];
		} else {
			leaf = workspace.getRightLeaf(false);
			if (leaf) {
				await leaf.setViewState({ type: VIEW_TYPE_HP_TRACKER, active: true });
			}
		}

		if (leaf) {
			workspace.revealLeaf(leaf);
		}
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_HP_TRACKER);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
