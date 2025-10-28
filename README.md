# Segerlab Plugin for Obsidian

A plugin that brings calculation views from Segerlab into your Obsidian notes.

## Features

- **Calculator Rendering**: Transforms markdown code blocks with language `segerlab-calculation` into interactive calculator views
- **Extended Coefficients**: Optional setting to display additional coefficients in the calculator interface
- **Multi-language Support**: Interface available in English and Russian, automatically adapts to your Obsidian language setting

## Installation

### From Community Plugins _(not available yet)_
1. Open Obsidian Settings
2. Go to Community Plugins
3. Search for "Segerlab"
4. Install and enable the plugin

### Manual Installation
1. Download the latest release from the [releases page](https://github.com/ksemkav/obsidian-segerlab-plugin/releases)
2. Extract the files to your vault's `.obsidian/plugins/segerlab/` directory
3. Enable the plugin in Obsidian settings

## Usage

1. Open some recipe in Segerlab and find a calculator you want to see in your Obsidian note.
2. Press the button with Obsidian logo. It will copy current state of the calculator into clipboard.

	 <img alt="obsidian_button.png" src="obsidian_button.png" width="300"/>
	 
3. Paste the clipboard content into your Obsidian note. After moving cursor out of the code block, it will be rendered as a calculator.
	 
### Example:

<img alt="example.png" src="example.png" width="720"/>

````markdown
```segerlab-calculator
{
  "recipeId": 8345,
  "calculationId": 36955,
  "name": "Matte glaze △6",
  "formulaViewType": "SegerFormula",
  "includeAdditionsIntoCalculations": false,
  "versionCreatedAt": "2025-10-28T17:57:40+01:00",
  "ingredients": [
    {
      "name": "Chalk (Calcium Carbonate)",
      "value": 40,
      "isAddition": false,
      "index": 0
    },
    {
      "name": "Nepheline Syenite Spectrum N-45",
      "value": 30,
      "isAddition": false,
      "index": 1
    },
    {
      "name": "Quarz Powder (Silbermond M8)",
      "value": 20,
      "isAddition": false,
      "index": 2
    },
    {
      "name": "Kaolin 233 (Carl Jäger)",
      "value": 10,
      "isAddition": false,
      "index": 3
    },
    {
      "name": "Cobalt Carbonate, CoCO3",
      "value": 7,
      "isAddition": true,
      "index": 4
    }
  ],
  "calculationResult": {
    "formula": {
      "GFormers": {
        "SiO2": 1.45
      },
      "Stabs": {
        "Al2O3": 0.226,
        "TiO2": 0.002
      },
      "Alcali": {
        "Na2O": 0.08,
        "K2O": 0.064
      },
      "AEarth": {
        "MgO": 0.001,
        "CaO": 0.853,
        "Fe2O3": 0.001
      }
    },
    "stullChartPoint": {
      "al2O3Value": 0.226,
      "siO2Value": 1.45
    },
    "ingredientsOverallSum": 100,
    "alcaliSum": 0.144,
    "aEarthSum": 0.855,
    "siliconAluminumOxidesRatio": 6.416,
    "molarThermalExpansion": 9.11,
    "molecularMassThermalExpansion": 9.18,
    "calculatedFluxibility": {
      "temperature": 1194,
      "coefficient": 0.306,
      "temperatureZone": "Within"
    },
    "acidityRatio": 0.863
  }
}
```
````
