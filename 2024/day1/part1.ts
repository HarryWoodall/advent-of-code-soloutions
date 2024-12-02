const setup = require("../setup.js");
// setup.createInput("1");
const input: string = setup.getInput("1");
const lines = input.split("\n");

const list1 = lines.map((x) => parseInt(x.split(" ")[0]));
const list2 = lines.map((x) => parseInt(x.split(" ").pop()));

console.log(list1);
console.log(list2);

list1.sort();
list2.sort();

console.log(list1);
console.log(list2);

var diffSum = 0;

function getDiffs() {
  for (let i = 0; i < list1.length; i++) {
    const itemDiff = Math.abs(list1[i] - list2[i]);
    diffSum += itemDiff;
  }
}

getDiffs();

console.log(diffSum);
