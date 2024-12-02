const fs = require('fs');

let input;
let invalidCount = 0;

module.exports = {
  part1: function() {
    input = fs.readFileSync('Files/day4.txt').toString().split("\r\n\r\n");
    let validCount = 0;



    for (let i = 0; i < input.length; i++) {
      input[i] = input[i].split(/[ \n]/);

      if (checkValidity(input[i])) {
        validCount++;
      }
    }
    console.log("Valid Count:", validCount);
    console.log("Invalid Count:", invalidCount);
  },

  tests: function() {
    let testCases = [
      "byr:2002",
      "byr:2003",
      "hgt:60in",
      "hgt:190cm",
      "hgt:190in",
      "hgt:190",
      "hcl:#123abc",
      "hcl:#123abz",
      "hcl:123abz",
      "ecl:brn",
      "ecl:wat",
      "pid:000000001",
      "pid:0123456789",
    ]

    let testAnswers = []

    for (let i = 0; i < testCases.length; i++) {
      const elements = testCases[i].split(":");
      switch (elements[0]) {
        case "byr":
          testAnswers.push(validateBirthYear(elements[1]));
          break;
        case "iyr":
          testAnswers.push(validateIssueYear(elements[1]));
          break;
        case "eyr":
          testAnswers.push(validateExpirationYear(elements[1]));
          break;
        case "hgt":
          testAnswers.push(validateHeight(elements[1]));
          break;
        case "hcl":
          testAnswers.push(validateHairColour(elements[1]));
          break;
        case "ecl":
          testAnswers.push(validateEyeColour(elements[1]));
          break;
        case "pid":
          testAnswers.push(validatePassport(elements[1]));
          break;
      }
      console.log(elements + "::  " + testCases[i] + ": ", testAnswers[i]);
    }
  }
}

function checkValidity(input) {
  const keyEnum = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  for (let i = 0; i < input.length; i++) {
    const elements = input[i].split(":");
    if (keyEnum.includes(elements[0])) {
      const index = keyEnum.indexOf(elements[0]);
      if (index > -1) {
        switch (elements[0]) {
          case "byr":
            if (!validateBirthYear(elements[1])) {
              console.log("elements", elements);
              invalidCount++;
              return;
            } else {
              break;
            }
          case "iyr":
            if (!validateIssueYear(elements[1])) {
              console.log("elements", elements);
              invalidCount++;
              return;
            } else {
              break;
            }
          case "eyr":
            if (!validateExpirationYear(elements[1])) {
              console.log("elements", elements);
              invalidCount++;
              return;
            } else {
              break;
            }
          case "hgt":
            if (!validateHeight(elements[1])) {
              console.log("elements", elements);
              invalidCount++;
              return;
            } else {
              break;
            }
          case "hcl":
            if (!validateHairColour(elements[1])) {
              console.log("elements", elements);
              invalidCount++;
              return;
            } else {
              break;
            }
          case "ecl":
            if (!validateEyeColour(elements[1])) {
              console.log("elements", elements);
              invalidCount++;
              return;
            } else {
              break;
            }
          case "pid":
            if (!validatePassport(elements[1])) {
              console.log("elements", elements);
              invalidCount++;
              return;
            } else {
              break;
            }
          default:
            console.log("Something went wrong");
        }
        keyEnum.splice(index, 1);
      }
    }
  }
  return keyEnum.length == 0;
}

function validateBirthYear(value) {
  const regex = /^[0-9]{4}$/
  if (value.trim().match(regex)) {
    if (value.trim() >= 1920 && value.trim() <= 2002) {
      return true
    }
  }
  return false;
}

function validateIssueYear(value) {
  const regex = /^[0-9]{4}$/
  if (value.trim().match(regex)) {
    if (value.trim() >= 2010 && value.trim() <= 2020) {
      return true
    }
  }

  return false;
}

function validateExpirationYear(value) {
  const regex = /^[0-9]{4}$/
  if (value.trim().match(regex)) {
    if (value.trim() >= 2020 && value.trim() <= 2030) {
      return true
    }
  }

  return false;
}

function validateHeight(value) {
  const regex = /^[0-9].*(cm|in)$/
  if (value.trim().match(regex)) {
    const unit = value.trim().substr(value.length - 2);
    value = value.replace(/\D+$/, "");
    if (unit == "in" || unit == "n") {
      if (value >= 59 && value <= 76) {
        return true;
      }
    } else {
      if (value >= 150 && value <= 193) {
        return true;
      }
    } 
  }

  return false;
}

function validateHairColour(value) {
  const regex = /^#[0-9a-f]{6}$/
  if (value.trim().match(regex)) {
    return true;
  }

  return false;
}

function validateEyeColour(value) {
  const enums = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  if (enums.includes(value.trim())) {
    return true;
  }

  return false;
}

function validatePassport(value) {
  const regex = /^[0-9]{9}$/
  if (value.trim().match(regex)) {
    return true;
  }

  return false;
}