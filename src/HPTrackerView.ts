import { ItemView, WorkspaceLeaf } from 'obsidian';
import { VIEW_TYPE_HP_TRACKER } from './constants';
import type HPTrackerPlugin from './main';

export class HPTrackerView extends ItemView {
	plugin: HPTrackerPlugin;

	constructor(leaf: WorkspaceLeaf, plugin: HPTrackerPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return VIEW_TYPE_HP_TRACKER;
	}

	getDisplayText() {
		return "HP Tracker";
	}

	getIcon() {
		return "heart";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.addClass("hp-tracker-container");

		this.renderView();
	}

	renderView() {
		const container = this.containerEl.children[1];
		container.empty();

		// HP Display
		const hpDisplay = container.createDiv({ cls: "hp-display" });
		
		const currentHPDiv = hpDisplay.createDiv({ cls: "hp-current" });
		currentHPDiv.createSpan({ text: `${this.plugin.settings.currentHP}`, cls: "hp-number" });
		currentHPDiv.createSpan({ text: ` / ${this.plugin.settings.maxHP}`, cls: "hp-max" });
		
		if (this.plugin.settings.tempHP > 0) {
			const tempHPDiv = hpDisplay.createDiv({ cls: "hp-temp" });
			tempHPDiv.createSpan({ text: `+${this.plugin.settings.tempHP} temp HP`, cls: "hp-temp-text" });
		}

		// HP Bar
		const hpBarContainer = container.createDiv({ cls: "hp-bar-container" });
		const hpBar = hpBarContainer.createDiv({ cls: "hp-bar" });
		const hpPercentage = Math.max(0, Math.min(100, (this.plugin.settings.currentHP / this.plugin.settings.maxHP) * 100));
		hpBar.style.width = `${hpPercentage}%`;
		
		if (hpPercentage > 50) {
			hpBar.addClass("hp-bar-healthy");
		} else if (hpPercentage > 25) {
			hpBar.addClass("hp-bar-wounded");
		} else {
			hpBar.addClass("hp-bar-critical");
		}

		// Input Section
		const inputSection = container.createDiv({ cls: "hp-input-section" });
		const input = inputSection.createEl("input", { 
			type: "number", 
			value: "0",
			cls: "hp-input"
		});

		// Modifier Buttons
		const modifierSection = container.createDiv({ cls: "hp-modifier-section" });
		modifierSection.createSpan({ text: "Modifier:", cls: "hp-label" });
		
		const modifierButtons = modifierSection.createDiv({ cls: "hp-button-group" });
		
		const normalBtn = modifierButtons.createEl("button", { text: "Normal", cls: "hp-btn hp-btn-active" });
		const resistBtn = modifierButtons.createEl("button", { text: "Resist (÷2)", cls: "hp-btn" });
		const vulnBtn = modifierButtons.createEl("button", { text: "Vuln (×2)", cls: "hp-btn" });
		
		let activeModifier: "normal" | "resist" | "vulnerable" = "normal";
		
		const setActiveButton = (btn: HTMLElement, modifier: "normal" | "resist" | "vulnerable") => {
			[normalBtn, resistBtn, vulnBtn].forEach(b => b.removeClass("hp-btn-active"));
			btn.addClass("hp-btn-active");
			activeModifier = modifier;
		};
		
		normalBtn.addEventListener("click", () => setActiveButton(normalBtn, "normal"));
		resistBtn.addEventListener("click", () => setActiveButton(resistBtn, "resist"));
		vulnBtn.addEventListener("click", () => setActiveButton(vulnBtn, "vulnerable"));

		// Action Buttons
		const actionSection = container.createDiv({ cls: "hp-action-section" });
		
		const damageBtn = actionSection.createEl("button", { text: "Take Damage", cls: "hp-btn hp-btn-damage" });
		const healBtn = actionSection.createEl("button", { text: "Heal", cls: "hp-btn hp-btn-heal" });
		const tempHPBtn = actionSection.createEl("button", { text: "Add Temp HP", cls: "hp-btn hp-btn-temp" });

		damageBtn.addEventListener("click", async () => {
			let damage = parseInt(input.value) || 0;
			if (damage <= 0) return;
			
			if (activeModifier === "resist") {
				damage = Math.floor(damage / 2);
			} else if (activeModifier === "vulnerable") {
				damage = damage * 2;
			}
			
			// Apply to temp HP first
			if (this.plugin.settings.tempHP > 0) {
				if (damage >= this.plugin.settings.tempHP) {
					damage -= this.plugin.settings.tempHP;
					this.plugin.settings.tempHP = 0;
				} else {
					this.plugin.settings.tempHP -= damage;
					damage = 0;
				}
			}
			
			// Apply remaining damage to HP
			this.plugin.settings.currentHP = Math.max(0, this.plugin.settings.currentHP - damage);
			await this.plugin.saveSettings();
			this.renderView();
		});

		healBtn.addEventListener("click", async () => {
			const healing = parseInt(input.value) || 0;
			if (healing <= 0) return;
			
			this.plugin.settings.currentHP = Math.min(
				this.plugin.settings.maxHP, 
				this.plugin.settings.currentHP + healing
			);
			await this.plugin.saveSettings();
			this.renderView();
		});

		tempHPBtn.addEventListener("click", async () => {
			const tempHP = parseInt(input.value) || 0;
			if (tempHP <= 0) return;
			
			// Temp HP doesn't stack, take the higher value
			this.plugin.settings.tempHP = Math.max(this.plugin.settings.tempHP, tempHP);
			await this.plugin.saveSettings();
			this.renderView();
		});

		// Quick Actions
		const quickSection = container.createDiv({ cls: "hp-quick-section" });
		quickSection.createSpan({ text: "Quick Actions:", cls: "hp-label" });
		
		const quickButtons = quickSection.createDiv({ cls: "hp-button-group" });
		
		const resetBtn = quickButtons.createEl("button", { text: "Long Rest", cls: "hp-btn hp-btn-secondary" });
		
		resetBtn.addEventListener("click", async () => {
			this.plugin.settings.currentHP = this.plugin.settings.maxHP;
			this.plugin.settings.tempHP = 0;
			await this.plugin.saveSettings();
			this.renderView();
		});
	}

	async onClose() {
		// Nothing to clean up
	}
}
