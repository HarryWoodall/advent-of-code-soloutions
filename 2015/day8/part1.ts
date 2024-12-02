const setup = require("../setup.js");

// setup.createInput("8");
const input: string = setup.getInput("8");
const lines = input.split("\n");

const regexList = [/\\\\/g, /\\x[0-9a-z][0-9a-z]/g, /\\"/g];

let stringChars = 0;
let memoryChars = 0;

lines.forEach((line) => {
  stringChars += line.length;
  console.log(line.length, line);
  // console.log(decodeURIComponent(line));
  line = line.slice(1, line.length - 1);

  console.log(line);

  // regexList.forEach((regex) => {
  //   line = line.replace(regex, "#");
  // });

  line = line.replace(regexList[0], "#");
  line = line.replace(regexList[1], "#");
  line = line.replace(regexList[2], "#");
  line = line.replace(regexList[3], "#");

  console.log(line);
  console.log();

  memoryChars += line.length;
});

console.log("stringChars: ", stringChars);
console.log("memoryChars: ", memoryChars);

console.log(stringChars - memoryChars);

export {};
