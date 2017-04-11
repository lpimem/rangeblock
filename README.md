# rangeblock

`rangeblock` is a JavaScript library that makes it easy to locate, measure, and represent layouts of text ranges in a web page. 

<img align="right" height="100" src="https://raw.githubusercontent.com/lpimem/rangeblock/master/icons/150x150.png">

It provides a more precise function than `Element.getClientRects()` which returns dimensions for each _[border box](https://developer.mozilla.org/en-US/docs/Web/API/Element/getClientRects#Returns)_. 


## Why do I need it?

`rangeblock` does 2 things for you:

- __It gives you detailed layout information of a range of text__ in the form of an array of dimensions, each representing a line or block of text. 

- __It provides a text representation for `Range` objects__ in the format of [unique path](#unique-path), so that you can persistant the range. Then you can shared it across users, browsers, or simpled between servers and clients.


## How is it useful?

Its possible application is quite open-ended. For example, 

- build _non-intrusive_ web annotation browswer plug-ins 
  - [hlc](https://github.com/lpimem/hlc)
- add annotation functions to your existing webistes
- create high-precision text locator extensions

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

