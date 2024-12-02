const fs = require('fs');

let input;

module.exports = {
  part1: function() {
    input = fs.readFileSync('Files/day3.txt').toString().split("\n");
    for (let i = 0; i < input.length; i++) {
      input[i] = input[i].split("");
    }

    let ords = [0,0];
    let treeCount = 0;


    for (let i = 0; i < input.length - 1; i++) {
      ords = move(ords[0], ords[1], input, 3, 1);
      if (input[ords[1]][ords[0]] == "#") {
        treeCount++;
      }
    }

    console.log(treeCount);
    
  },

  part2: function() {
    input = fs.readFileSync('Files/day3.txt').toString().split("\n");
    for (let i = 0; i < input.length; i++) {
      input[i] = input[i].split("");
    }

    let deltas = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
    let treeCounts = [];

    for (let i = 0; i < deltas.length; i++) {

      let ords = [0,0];
      let treeCount = 0;

      for (let j = 0; j < input.length - 1; j++) {
        ords = move(ords[0], ords[1], input, deltas[i][0], deltas[i][1]);
        if (ords[1] < input.length && input[ords[1]][ords[0]] == "#") {
          treeCount++;
        }
      }

      treeCounts.push(treeCount);
    }

    console.log(treeCounts);
    let sum = treeCounts[0];
    for (let i = 1; i < treeCounts.length; i++) {
      sum *= treeCounts[i];
    }
    console.log(sum);
  }
}

function move(currentX, currentY, input, deltaX, deltaY) {
  const maxX = input[0].length - 1;

  const newX = (currentX += deltaX) % maxX;
  const newY = currentY + deltaY;

  return [newX, newY];
}