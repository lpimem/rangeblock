# rangeblock
Provide an easy API to measure and represent layouts of selected text ranges in a webpage.

## Why?  

`rangeblock` library can help you easily find the location and layout of any range of text in the current page. Its possible application is quite open-ended. For example, one can use it to build _non-intrusive_ annotation browswer plug-ins, add annotation functions to your existing webistes, or create high-precision text locator applications. 

## Install 

```
npm install rangeblock --save
```

## Usage 

```TypeScript
// TypeScript
import * as rb from "rangeblock"

// measure layouts
let block = rb.extractSelectedBlock(window, document);
if (!block){
  console.error("please select some text on the web page");
  return;
}
console.info("Text layout: " + JSON.stringify(block.dimensions));

// representation of the text range 
console.info("Text layout: " + JSON.stringify(block.rangeMeta));

// recreate range using RangeMeta
let meta :RangeMeta = ... ; 
block = rb.restoreBlock(window, document, meta);

```

## Unique Path

We define a text format called `Unique Path` to uniquely locate a node in a static DOM tree. It is formally described as

```
UPath = [/|#<id>]([/<nodeIndex>])+
```

## Known Issue
[Text kerning](https://en.wikipedia.org/wiki/Kerning) is not considered in current implementation. If you have a good suggestion, welcome to submit an issue or pull request. 

