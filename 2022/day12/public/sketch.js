var socket = io();
let pointArray = [];
let routeArray = [];

socket.on("goodNode", function (msg) {
  pointArray.push(msg);
});

socket.on("route", function (msg) {
  console.log(msg);
  routeArray.push(msg);
});

function setup() {
  createCanvas(161 * 10, 41 * 10);
  textSize(12);
}

function draw() {
  background(20);
  fill(125);
  stroke(0);
  for (point of pointArray) {
    text(point.value, point.position.x * 10, point.position.y * 10);
  }

  stroke(0, 255, 0);
  if (routeArray.length > 1) {
    for (let i = 0; i < routeArray.length - 2; i++) {
      line(routeArray[i].x * 10 + 5, routeArray[i].y * 10 - 5, routeArray[i + 1].x * 10 + 5, routeArray[i + 1].y * 10 - 5);
    }
  }
}
