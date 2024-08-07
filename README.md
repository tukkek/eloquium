# Eloquium

Eloquium is a Java Script library that generates both names that sound realistic and fantasy names. It intends to provide an in-between with names that sound generally realistic but that are also different enough from real-life that they can be used as unique names in fiction.

It can also generate fictional names by merging different languages. For example: the included Dwarf language is merged from German and Norwegian.

18 real-world languages are supported, with 8 fantasy languages included.

**Access the demo here** (may take a few seconds to load): https://tukkek.github.io/eloquium

## Usage

```js
import * as eloquium from 'https://tukkek.github.io/eloquium/eloquium.js'

let spanish=eloquium.countries.get('Mexico')
console.log(spanish.female,spanish.family)
// Ala Jinolez
console.log('Welcome to the city of',spanish.noun)
// Welcome to the city of Lourmucorca

let dwarven=new eloquium.Language()
dwarven.merge(eloquium.countries.get('Germany'))
dwarven.merge(eloquium.countries.get('Norway'))
console.log(dwarven.male,dwarven.family)
// Güneten Ludyer
console.log('Check out my cool axe, its name is',dwarven.noun)
// Check out my cool axe, its name is Rolfmarenz
```
