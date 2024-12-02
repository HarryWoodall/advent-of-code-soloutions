const setup = require("../setup.js");
// setup.createInput("7");
const input: string = setup.getInput("7");

import { findAllWithinChars } from "../../utils/common";

const strings = input.split("\n");
var ammount = 0;

for (let testStrings of strings) {
  const charsResult = findAllWithinChars(testStrings, "[", "]");
  const innerResults = charsResult.filter((x) => x.isInside);
  const outerResults = charsResult.filter((x) => !x.isInside);

  // var hasOutsideAbba = false;
  // var hasInsideAbba = false;

  const outerAbaResults = [];

  for (let result of outerResults) {
    const abaResults = testAba(result.characters);
    if (abaResults.isAba) {
      outerAbaResults.push(...abaResults.values);
    }
  }

  var isValid = false;
  for (let outer of outerAbaResults) {
    for (let innerResult of innerResults) {
      if (isBab(outer, innerResult.characters)) {
        isValid = true;
      }
    }
  }

  ammount += isValid ? 1 : 0;
  // console.log(isValid);
}

console.log(ammount);

function testAba(value: string[]) {
  var abaValues = [];
  for (let i = 0; i < value.length - 2; i++) {
    if (value[i] == value[i + 2] && value[i] != value[i + 1]) {
      abaValues.push([value[i], value[i + 1], value[i + 2]]);
    }
  }

  return {
    isAba: abaValues.length > 0,
    values: abaValues,
  };
}

function isBab(value: string[], aba: string[]) {
  var isBab = false;
  if (!testAba(value).isAba) {
    console.log(`${value} is not ABA`);
    return false;
  }

  console.log(`testing ${value} against ${aba}`);

  for (let i = 0; i < aba.length - 2; i++) {
    if (value[0] == value[2] && value[0] != value[1] && value[0] == aba[i + 1] && value[1] == aba[i] && value[1] == aba[i + 2] && value[2] == aba[i + 1]) {
      isBab = true;
    }
  }

  console.log(isBab ? "true" : "false");

  return isBab;
}
