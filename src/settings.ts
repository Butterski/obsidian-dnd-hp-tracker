export interface HPTrackerSettings {
	maxHP: number;
	currentHP: number;
	tempHP: number;
}

export const DEFAULT_SETTINGS: HPTrackerSettings = {
	maxHP: 20,
	currentHP: 20,
	tempHP: 0
}
