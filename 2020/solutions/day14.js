const fs = require('fs');
let input = fs.readFileSync('Files/day14.txt').toString().split("\r\n");

let currentMask;
let results = [];

module.exports = {
  part1: function() {
    for(let i = 0; i < input.length; i++) {
      let object = parseLine(input[i].split(" = "));
      if (object.Type == "MASK") {
        currentMask = object.Value;
      } else {
        const maskedValue = maskValue(currentMask, object.Value[1]);
        let result = results.find(item => item.Position == object.Value[0]);
        if (result) {
          results[results.indexOf(result)] = {Position: object.Value[0], Value: parseInt(maskedValue, 2)};
        } else {
          results.push({Position: object.Value[0], Value: parseInt(maskedValue, 2)});
        }
      }
    }
    
    console.log(results);
    let sum = 0;
    for(let i = 0; i < results.length; i++) {
      sum += results[i].Value;
    }
    console.log(sum);
  }
}

function parseLine(line) {
  if (line[0] == "mask") {
    return {
      Type: "MASK",
      Value: line[1]
    }
  } else {
    const rawInput = line[0].split("[")[1];
    const position = rawInput.substring(0, rawInput.length - 1);
    return {
      Type: "MEM",
      Value: [position, convertToBinary(parseInt(line[1]))]
    }
  }
}

function convertToBinary(value) {
  let binaryString = "";
  let currentMultiplier = Math.pow(2, 35);

  for (let i = 0; i < 35; i++) {
    if (value - currentMultiplier >= 0) {
      binaryString += "1";
      value -= currentMultiplier;
    } else {
      binaryString += "0";
    }
    currentMultiplier /= 2;
  }

  binaryString += value % 2;

  return binaryString;
}

function maskValue(mask, value) {
  let valueArray = value.split("");
  for(let i = 0; i < mask.length; i++) {
    if (mask[i] == "1") {
      valueArray[i] = "1";
    }
  }

  return valueArray.join("");
}

function searchForKey(key) {
  for (let i = 0; i < results.length; i++) {
    if (results[i].Position == key) {
      return results[i];
    }
  }
}