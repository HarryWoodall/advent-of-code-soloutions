const fs = require('fs');
let input = fs.readFileSync('Files/day6.txt').toString().split("\r\n\r\n");

module.exports = {
  part1: function() {
    let count = 0;
    console.log(input);

    let testInput = ["abc", "abc", "abac", "aaaa", "b"]

    for(let i = 0; i < input.length; i++) {
      const answers = [];
      const regex = /[a-z]/;
      for (let j = 0; j < input[i].length; j++) {
        let char = input[i].charAt(j);
        if (char.match(regex) && !answers.includes(char)) {
          answers.push(char);
        }
      }
      count += answers.length;
    }

    console.log(count);
  },

  part2: function() {
    let groups = [];
    // input = ["abc", "a\r\nb\r\nc", "ab\r\nac", "a\r\na\r\na\r\na", "b"]
    for (let i = 0; i < input.length; i++) {
      people = input[i].split("\r\n");
      groups.push(people);
    }

    let count = 0;

    for(let i = 0; i < groups.length; i++) {
      let answers = [];
      const regex = /[a-z]/;
      for (let j = 0; j < groups[i].length; j++) {
        if (j == 0) {
          answers =groups[i][j];
        } else {
          nextPerson = [];
          for (let k = 0; k < groups[i][j].length; k++) {
            let char = groups[i][j].charAt(k);
            if (char.match(regex) && answers.includes(char)) {
              nextPerson.push(char);
            }
          }
          answers = nextPerson;
        }
      }
      count += answers.length;
    }
    console.log(count);
  }
  
}