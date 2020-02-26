# 1 - Beskrivande statistik

- Examinationsuppgift 1
- [GitBook](https://coursepress.gitbooks.io/1dv021/content/examinationsuppgifter/examinationsuppgift-1/)

>__VIKTIGT!__ Innan du börjar arbeta med examinationsuppgiften är det viktigt att du lägger till examinationsuppgiftens repo till ditt repo för examinationsuppgiften.

***

### OBS! OBS! OBS!

- Detta är en **obligatorisk** och **examinerande** uppgift som **du ska lösa helt på egen hand**.
- Du måste göra **regelbundna "commits" och "pushes"** av koden till ditt repo för uppgiften för att kursledningen ska kunna följa ditt arbetet med uppgiften.
- Du ska kunna förklara samtliga konstruktioner och satser som din lösning av uppgiften innehåller.

***

## Introduktion

I denna examinationsuppgift ska du slutföra ett påbörjat projekt som syftar till att presentera beskrivande statistik över stora datamängder.

Beskrivande statistik (eller _deskriptiv statistik_; eng. "_descriptive statistics_") är ett sätt att reducera stora datamängder för att presentera en sammanfattning av datamängden.

## Uppgift

Din uppgift är att slutföra implementationen av modulen `statistics.js` vars exporterade funktioner kan användas för att reducera den datamängd som skickas som argument, i form av en array med värden av typen `number`, till dem.

### statistics.js

Modulen ska exportera funktioner som kan bestämma maximum- och minimumvärden, variationsbredd ("_range_"), medelvärde ("_mean_"), median, standardavvikelse ("_standard deviation_") samt typvärde ("_mode_", som kan vara en array med värden). Det ska även finnas en funktion som returnera ett objekt innehållande samtliga värden. Objektets egenskapers namn och typ framgår av JSDOC-kommentaren av funktionen `descriptiveStatistics`, som du finner i modulen.

```js
/**
* Module for obtaining descriptive information about a set of data.
*
* @module src/statistics.js
* @author TODO: Write your name here.
* @version 1.1.0
*/

'use strict'

/**
 * Returns the descriptive information (maximum, mean, median, minimum,
 * mode, range and standard deviation) from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The argument must be an array.
 * @throws {Error} The argument can not be an empty array.
 * @throws {TypeError} The argument must be an array containing just numbers.
 * @returns {{maximum: number, mean: number, median: number, minimum: number, mode: number[], range: number, standardDeviation: number}}
 */
function descriptiveStatistics (numbers) {
  // TODO: Write your code here.
}

// TODO: Write your code here.

// Exports
exports.descriptiveStatistics = descriptiveStatistics
exports.maximum = undefined
exports.mean = undefined
exports.median = undefined
exports.minimum = undefined
exports.mode = undefined
exports.range = undefined
exports.standardDeviation = undefined
```

Av koden ovan framgår det att funktionerna `descriptiveStatistics`, `maximum`, `minimum`, `mean`, `median`, `minimum`, `mode`, `range` samt `standardDeviation` ska exporteras varför dessa måste implementeras. Funktionen `descriptiveStatistics` är redan deklarerad och exporterad men saknar implementation. Resterande funktioner saknar deklaration och måste dessutom exporteras.

Funktionerna i modulen `statistics.js` får inte ha några som helst sidoeffekter, utan ska var så kallade "_pure functions_".

De exporterade funktionerna ska kasta undantag (men inte fånga några!).

- Anropas någon av funktionerna med ett argument som inte är en array ska ett undantag av typen `TypeError` kastas innehållande meddelandet `The passed argument is not an array.`.
- Anropas någon av funktionerna med ett argument som refererar till en tom array, ska ett undantag av typen `Error` kastas innehållande meddelandet `The passed array contains no elements.`.
- Anropas någon av funktionerna med ett argument som refererar till en array vars element innehåller annat än bara värden av typen `number`, ska ett undantag av typen `TypeError` kastas innehållande meddelandet `The passed array contains not just numbers.`.

Undvik om lämpligt att upprepa kod och bryt därför inte mot principen DRY ("don't repeat yourself").

Dokumentera funktionerna genom att använda JSDOC-kommentarer (beskrivning ska finnas och dokumentation av parametrar, kastade undatag och returvärden). Använd även radkommentarer innuti funktioner i de fall det är befogat.

## Tips

- Medelvärde, median, typvärde och variationsbredd, [http://www.matteboken.se/lektioner/matte-1/sannolikhet-och-statistik/medelvarde-median-typvarde-och-variationsbredd](http://www.matteboken.se/lektioner/matte-1/sannolikhet-och-statistik/medelvarde-median-typvarde-och-variationsbredd)
- Standardavvikelse, [http://www.matteboken.se/lektioner/matte-2/statistik/standardavvikelse](http://www.matteboken.se/lektioner/matte-2/statistik/standardavvikelse)
- Genom att köra testerna som kommer med examinationsuppgiften kan du undersöka om koden du skrivit löst uppgiften (i alla fall enligt bifogade tester...).
