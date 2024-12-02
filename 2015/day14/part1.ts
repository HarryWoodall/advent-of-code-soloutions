const setup = require("../setup.js");
const fs = require("fs");

setup.createInput("14");
let input: string = setup.getInput("14");
const lines = input.split("\n");
const time = 2503;

type ReindeerStats = {
  name: string;
  fly: {
    speed: number;
    time: number;
  };
  rest: number;
  distance: number;
};

const stats: ReindeerStats[] = [];

lines.forEach((item) => {
  const name = item.split(" ")[0];
  const speed = parseInt(item.split(" ")[3]);
  const time = parseInt(item.split(" ")[6]);
  const rest = parseInt(item.split(" ")[13]);

  stats.push({
    name: name,
    fly: {
      speed: speed,
      time: time,
    },
    rest: rest,
    distance: 0,
  });
});

console.log(JSON.stringify(stats, null, 2));

stats.forEach((stat) => {
  let timeRemaining = time;

  while (timeRemaining > 0) {
    const flyTime = Math.min(stat.fly.time, timeRemaining);
    stat.distance += stat.fly.speed * flyTime;
    timeRemaining -= flyTime;

    const restTime = Math.min(stat.rest, timeRemaining);
    timeRemaining -= restTime;
  }
});

console.log(JSON.stringify(stats, null, 2));

export {};
