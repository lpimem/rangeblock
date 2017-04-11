# rangeblock
Provide an easy API to measure and serialize layouts of selected text ranges in a webpage.

## Install 

```
npm install rangeblock --save
```

## Usage 

```TypeScript
// TypeScript
import * as blocks from "rangeblock"

let block = extractSelectedBlock(window, document);

if (block){
  console.info("Text layout: " + JSON.stringify(block.dimensions));
}
```
