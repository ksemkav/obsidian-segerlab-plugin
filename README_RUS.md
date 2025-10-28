# Segerlab плагин для Obsidian

[Segerlab](https://segerlab.ru) — это записная книжка для керамистов и гончаров, которые делают собственные глазури.

Этот плагин позволяет отображать калькуляторы в привычном виде прямо в ваших заметках Obsidian.

## Функционал

- **Отображение калькуляторов**: Трансформирует markdown блоки, помеченные как `segerlab-calculation`, в калькуляторы
- **Больше коэффициентов**: Такая же опция «Отображать больше коэффициентов в калькуляторе», чтобы показывать больше расчтёных коэффициентов в калькуляторе.
- **Поддержка разных языков**: Интерфейс калькулятора доступен как на русском, так и на английском языках. Зависит от языковых настроек Obsidian.

## Установка

### Включите настройку «Я использую Obsidian» в Segerlab
Чтобы видеть кнопку Obsidian в калькуляторах, включите соответствующую настройку на странице «Мой профиль» (нажмите на иконку шестерёнки в левом нижнем углу).

### Установка плагина из списка «Плагины сообщества» _(пока недоступно)_
1. Откройте настройки Obsidian
2. Перейдите в раздел «Плагины сообщества»
3. Найдите плагин «Segerlab»
4. Установите и включите плагин

### Ручная установка
1. Скачайте файлы `main.js` и `manifest.json` из последнего релиза плагина на [Github](https://github.com/ksemkav/obsidian-segerlab-plugin/releases)
2. Создайте папку `.obsidian/plugins/segerlab/` в вашем хранилище Obsidian, если её ещё нет и скопируйте туда скачанные файлы
3. Откройте настройки Obsidian, перейдите в раздел «Сторонние плагины» → «Управление плагинами» и включите плагин «Segerlab»
4. Если хотите видеть все расчётные коэффициенты в калькуляторе, перейдите в настройки плагина и включите опцию «Показывать больше коэффициентов в калькуляторе»

## Использование

1. Откройте какой-нибудь рецепт в Segerlab и найдите калькулятор, который хотите видеть в вашей заметке.
2. Нажмите кнопку с логотипом Obsidian. Это скопирует текущее состояние калькулятора в буфер обмена.

	  <img alt="obsidian_button.png" src="obsidian_button.png" width="300"/>
3. Вставьте содержимое буфера обмена в вашу заметку. После того, как вы переместите курсор за пределы блока кода, он будет отображён как калькулятор.

### Пример:

<img alt="example.png" src="example.png" width="720"/>

#### Пример содержимого блока кода, скопированного калькулятора:

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
