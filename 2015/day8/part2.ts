const setup = require("../setup.js");

// setup.createInput("8");
const input: string = setup.getInput("8-escaped");
const lines = input.split("\n");

const regexList = [/\\\\/g, /\\x[0-9a-z][0-9a-z]/g, /\\"/g];
const encodingregexList = [/\\x[0-9a-z][0-9a-z]/g, /\\\\/g, /\\"/g];

let stringChars = 0;
let memoryChars = 0;

lines.forEach((line) => {
  stringChars += line.length + 2;
  console.log(line.length, line);
  // // console.log(decodeURIComponent(line));
  // line = line.slice(1, line.length - 1);

  // // console.log(line);
  // line = line.replace(encodingregexList[0], "#####");
  // line = line.replace(encodingregexList[1], "####");
  // line = line.replace(encodingregexList[2], "####");

  // line = '"' + '\\"' + line + '\\"' + '"';

  // console.log(line.length, line);
  // console.log();

  // memoryChars += line.length;
});

console.log("stringChars: ", stringChars);
console.log("memoryChars: ", memoryChars);

console.log(memoryChars - stringChars);

export {};
