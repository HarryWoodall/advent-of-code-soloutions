const setup = require("../setup.js");
const fs = require("fs");

// setup.createInput("14");
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
};

type ReindeerState = {
  stats: ReindeerStats;
  isResting: boolean;
  restTimeRemaining: number;
  flyTimeRemaining: number;
  distance: number;
  points: number;
};

const stats: ReindeerStats[] = [];
const states: ReindeerState[] = [];

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
  });
});

stats.forEach((stat) => {
  states.push({
    stats: stat,
    distance: 0,
    flyTimeRemaining: stat.fly.time,
    isResting: false,
    restTimeRemaining: stat.rest,
    points: 0,
  });
});

for (let i = 0; i < time; i++) {
  states.forEach((state) => {
    if (state.isResting && state.restTimeRemaining == 0) {
      state.isResting = false;
      state.restTimeRemaining = state.stats.rest;
    }

    if (!state.isResting && state.flyTimeRemaining == 0) {
      state.isResting = true;
      state.flyTimeRemaining = state.stats.fly.time;
    }

    if (state.isResting) {
      state.restTimeRemaining--;
    } else {
      state.distance += state.stats.fly.speed;
      state.flyTimeRemaining--;
    }
  });

  states.sort((a, b) => b.distance - a.distance);
  const leader = states[0];

  states.filter((state) => state.distance == leader.distance).forEach((_) => _.points++);
}

console.log(JSON.stringify(states, null, 2));

export {};
