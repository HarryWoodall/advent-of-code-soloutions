const fs = require('fs');
let input = fs.readFileSync('Files/day13.txt').toString().split("\r\n");

module.exports = {
  part1: function() {
    const time = parseInt(input[0]);
    const busses = input[1].split(",");

    console.log(time + "\n");

    let currentClosestTime = 1000000000;
    let currentclosestBus = null;

    for(let i = 0; i < busses.length; i++) {
      let currentTime = 0;;
      if (busses[i] != "x") {
        while (currentTime < time) {
          currentTime += parseInt(busses[i]);
        }
        console.log(`Bus: ${busses[i]}, Time: ${currentTime}`);
        if (currentClosestTime > currentTime) {
          currentClosestTime = currentTime;
          currentclosestBus = busses[i];
        }
      }
    }

    console.log("\n" + currentclosestBus * (currentClosestTime - time));
  }
}