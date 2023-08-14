# wikidparse
[![NPM](https://img.shields.io/npm/v/wikidparse)](https://www.npmjs.com/package/wikidparse)
[![NPM](https://img.shields.io/npm/l/wikidparse)](https://github.com/thatcodechap/wikidparse/blob/main/LICENSE)

Fast and lightweight parser for Wikitionary pages

Wikitionary endpoint : https://en.wiktionary.org/w/api.php
## How to use
1. Install the package
```
npm install wikidparse
```
2. Import the parser in your code
```
import parsePage from 'wikidparse'
```
3. Pass fetched html page to `parsePage` function
```
parsePage(`html-string`)
```
## Example
```
import parsePage from 'wikidparse'
import fetch from 'node-fetch'

const ENDPOINT = 'https://en.wiktionary.org/w/api.php?action=parse&format=json&prop=text&page=';
const WORD = 'cat';
let URL = ENDPOINT + WORD;

fetch(URL)
.then(response=>response.json())
.then(responseInJson=>{
  let html = responseInJson.parse.text['*'];
  let output = parsePage(html);
})
```
### JSON Output (truncated)
```
{
  "English": {
    "Etymology 1": {
      "Alternative forms": {},
      "Noun": {
        "1": {
          "1": "A domesticated species (Felis catus) of feline animal, commonly kept as a house pet. ",
          "2": "Any similar animal of the family Felidae, which includes lions, tigers, bobcats, leopards, cougars, cheetahs, caracals, lynxes, and other such non-domesticated species.",
          "type": "An animal of the family Felidae:"
        },
        "2": "(uncountable) The meat of this animal, eaten as food.",
        "3": {
          "1": "(offensive) A spiteful or angry woman. ",
          "2": "An enthusiast or player of jazz.",
          "3": "(slang) A person (usually male).",
          "4": "(slang) A prostitute. ",
          "type": "A person:"
        },
        "4": "(nautical) A strong tackle used to hoist an anchor to the cathead of a ship.",
        "5": "(chiefly nautical) Short for cat-o'-nine-tails.",
        "6": "(archaic) A sturdy merchant sailing vessel (now only in \"catboat\").",
        "7": {
          "1": "(archaic, countable) The trap in that game.",
          "type": "(archaic, uncountable) The game of trap ball."
        },
        "8": "(archaic) The pointed piece of wood that is struck in the game of tipcat."
      }
    }
  }
}
```
## Future updates
1. Support for parse from non-api wikitionary pages like : https://en.wiktionary.org/wiki/cat
2. Parse media files
3. CommonJS module support