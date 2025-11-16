# 🎲 D&D HP Tracker for Obsidian

A simple and intuitive hit point tracker for your D&D characters, right in your Obsidian vault!

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Obsidian](https://img.shields.io/badge/obsidian-0.15.0+-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Visual HP Tracking** - See your character's health at a glance with a color-coded HP bar
  - 🟢 Green when healthy (>50% HP)
  - 🟡 Yellow when wounded (25-50% HP)
  - 🔴 Red when critical (<25% HP)

- **Temporary Hit Points** - Track temporary HP separately, automatically applied before regular HP

- **Damage Modifiers** - Apply resistance or vulnerability to damage calculations
  - **Normal** - Full damage
  - **Resist (÷2)** - Half damage (rounded down)
  - **Vuln (×2)** - Double damage

- **Quick Actions**
  - Take damage with modifier support
  - Heal your character
  - Add temporary HP (automatically takes the higher value)
  - Long Rest - instantly restore to max HP and clear temp HP

- **Mobile Friendly** - Works on desktop and mobile Obsidian

## 🚀 Installation

### From Obsidian Community Plugins (Coming Soon)

1. Open **Settings** → **Community plugins**
2. Select **Browse** and search for "D&D HP Tracker"
3. Select **Install**
4. Enable the plugin in your Community plugins list

## 🎮 Usage

### Opening the HP Tracker

There are three ways to open the HP Tracker:

1. **Click the heart icon** (❤️) in the ribbon (left sidebar)
2. **Use the command palette** (Ctrl/Cmd + P) and search for "Open HP Tracker"
3. The tracker opens in the right sidebar by default

### Tracking HP

1. **Set your max HP** in the plugin settings (**Settings** → **D&D HP Tracker**)
2. Enter a damage or healing amount in the input field
3. Select a modifier if needed (Normal, Resist, or Vuln)
4. Click the appropriate action button:
   - **Take Damage** - Apply damage (temp HP absorbed first)
   - **Heal** - Restore HP (up to max)
   - **Add Temp HP** - Add temporary hit points
   - **Long Rest** - Full HP restoration

### Example Combat Scenario

1. Your character has 50 max HP and 20 current HP
2. A friendly cleric casts *Aid*, giving you 5 temp HP
3. An enemy hits you for 12 damage, but you have resistance
   - Select "Resist (÷2)", enter 12, click "Take Damage"
   - The plugin calculates 6 damage (12 ÷ 2)
   - Your 5 temp HP absorbs the first 5, leaving 1 damage to regular HP
   - Result: 19 HP, 0 temp HP
4. After combat, you click "Long Rest"
   - HP restored to 50/50

## ⚙️ Settings

Configure your character in **Settings** → **D&D HP Tracker**:

- **Max HP** - Your character's maximum hit points
- **Current HP** - Your current hit point total (also changes with tracker actions)
- **Temp HP** - Current temporary hit points (also changes with tracker actions)

## 🛠️ Development

Want to contribute or customize the plugin?

```bash
# Clone the repository
git clone https://github.com/yourusername/obsidian-dnd-hp-tracker.git

# Install dependencies
npm install

# Start development with auto-rebuild
npm run dev

# Build for production
npm run build
```

### Project Structure

```
src/
  main.ts              # Plugin entry point
  settings.ts          # Settings interface and defaults
  constants.ts         # View type constants
  HPTrackerView.ts     # Main HP tracker UI
  HPTrackerSettingTab.ts # Settings UI
```

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests

Please feel free to open an issue or pull request on GitHub!

## 📋 Roadmap

Future features under consideration:

- [ ] Multiple character support
- [ ] Death saving throws tracker
- [ ] Conditions and status effects
- [ ] Hit dice tracking for short rests
- [ ] Import character data from D&D Beyond
- [ ] Spell slot tracking
- [ ] Initiative tracker

## 📜 License

This plugin is released under the MIT License. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

Built with ❤️ for the D&D and Obsidian communities.

Special thanks to:
- The Obsidian team for their excellent plugin API
- The D&D community for inspiration and feedback

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/obsidian-dnd-hp-tracker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/obsidian-dnd-hp-tracker/discussions)

---

*Roll for initiative! 🎲*
