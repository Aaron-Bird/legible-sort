# legible-sort

High-performance natural sort.  
Sorts an array in numerical and alphabetical order in a string.  
Make the order more consistent with human reading habits.  
For large amounts of data and performance requirements.  

```shell
["20.txt", "10.txt", "2.txt", "1.txt"]
 ->
[ "1.txt", "2.txt", "10.txt", "20.txt" ]

["b1.txt", "B1.txt", "a1.txt", "A1.txt"]
->
[ "A1.txt", "a1.txt", "B1.txt", "b1.txt" ]
```

## Features

- Natural sort
- No dependency
- High performance
- Easy to use

## Installation

npm:

```shell
npm install legible-sort --save
```

yarn:

```shell
yarn add legible-sort
```

## Usage

```js
const legibleSort = require("legible-sort");

const list = ["20.txt", "10.txt", "2.txt", "1.txt"];
legibleSort(list);
console.log(list); // [ '1.txt', '2.txt', '10.txt', '20.txt' ]
```