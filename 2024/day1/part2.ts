const setup = require("../setup.js");
// setup.createInput("1");
const input: string = setup.getInput("1");
const lines = input.split("\n");

const list1 = lines.map((x) => parseInt(x.split(" ")[0]));
const list2 = lines.map((x) => parseInt(x.split(" ").pop()));

list1.sort();
list2.sort();

var simmScore = 0;

function getSimmilarity() {
  for (let i = 0; i < list1.length; i++) {
    simmScore += list1[i] * getFrequency(list2, list1[i]);
  }
}

function getFrequency(list: number[], number: number) {
  let freq = 0;
  for (let i = 0; i < list1.length; i++) {
    if (list[i] == number) freq++;
  }

  return freq;
}

getSimmilarity();

console.log(simmScore);
