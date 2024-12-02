const setup = require("../setup.js");
// setup.createInput("7");
const input: string = setup.getInput("7");

import { findAllWithinChars } from "../../utils/common";

const strings = input.split("\n");
var ammount = 0;

for (let testStrings of strings) {
  const charsResult = findAllWithinChars(testStrings, "[", "]");

  var hasOutsideAbba = false;
  var hasInsideAbba = false;
  for (let result of charsResult) {
    const abbaResult = isAbba(result.characters);

    // console.log(`${result.isInside ? "Is Inside" : "Is Outside"}`, abbaResult);

    if (result.isInside && abbaResult) hasInsideAbba = true;
    if (!result.isInside && abbaResult) hasOutsideAbba = true;
  }

  const finalResult = !hasInsideAbba && hasOutsideAbba;
  if (finalResult) {
    ammount++;
  }
}

console.log(ammount);

function isAbba(value: string[]) {
  var isAbba = false;
  for (let i = 0; i < value.length - 3; i++) {
    if (value[i] == value[i + 3] && value[i + 1] == value[i + 2] && value[i] != value[i + 1]) {
      isAbba = true;
    }
  }

  return isAbba;
}
