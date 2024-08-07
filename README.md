# Eloquium

Eloquium is a Java Script library that generates both names that sound realistic and fantasy names. It intends to provide an in-between with names that sound generally realistic but that are also different enough from real-life that they can be used as unique names in fiction.

It can also generate fictional names by merging different languages. For example: the included Dwarf language is merged from German and Norwegian.

18 real-world languages are supported, with 8 fantasy languages included.

**Access the demo here**: https://tukkek.github.io/eloquium

## Usage

```js
import * as eloquium from 'https://tukkek.github.io/eloquium/eloquium.js'

async function generate(){
  await eloquium.setup()

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
}
```
## Implementation

For each language, Eloquium takes 100 male, female and family names and divides them into sillables. To produce a name, it will then:

1. Choose a random name.
2. Replace the initial syllable from any name in the same gender.
3. Replace the middle syllables from any names in the same gender.
4. Replace the final syllable from any name in the same gender.

For example: picking the mexican name Guadalupe and dividing it into Gua-da-lu-pe, we could get a result of Car-li-a-la:

* Car- from Carmen
* -li- from Alicia
* -a- from Juana
* -la from Gabriela

The generator also incentivizes more common names over less common ones.

Nouns (names for things) are generated by using all names in a language (female, male and family) as a pool.

Fantasy languages are composite pools of other language's names.
