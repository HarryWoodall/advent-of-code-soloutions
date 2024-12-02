const setup = require("../setup");
let input = setup.getInput("12");
let divider = "\n";

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/visualization.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  calculatePath();
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

// Non server stuff

const Direction = {
  Up: "UP",
  Down: "DOWN",
  Left: "LEFT",
  Right: "RIGHT",
};

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Grid {
  constructor() {
    this.cells = [];
    this.currentLocation = new Vector(0, 0);
    this.startLocations = [];
    this.endLocation = [];

    let gridRows = input.split(divider);

    for (let row of gridRows) {
      this.cells.push(row.split(""));
    }

    for (let y = 0; y < this.cells.length; y++) {
      for (let x = 0; x < this.cells[y].length; x++) {
        if (this.cells[y][x] == "S") this.startLocations.push(new Vector(x, y));
        if (this.cells[y][x] == "E") this.endLocation = new Vector(x, y);
      }
    }
  }

  getCell(position) {
    return this.cells[position.y][position.x];
  }

  getCurrentCell() {
    return this.cells[this.currentLocation.y][this.currentLocation.x];
  }

  getAjecent(position, direction) {
    switch (direction) {
      case Direction.Up:
        if (position.y <= 0) return null;
        return { position: new Vector(position.x, position.y - 1), value: this.getCell(new Vector(position.x, position.y - 1)) };

      case Direction.Down:
        if (position.y >= this.cells.length - 1) return null;
        return { position: new Vector(position.x, position.y + 1), value: this.getCell(new Vector(position.x, position.y + 1)) };

      case Direction.Left:
        if (position.x <= 0) return null;
        return { position: new Vector(position.x - 1, position.y), value: this.getCell(new Vector(position.x - 1, position.y)) };

      case Direction.Right:
        if (position.x >= this.cells[0].length - 1) return null;
        return { position: new Vector(position.x + 1, position.y), value: this.getCell(new Vector(position.x + 1, position.y)) };
    }
  }

  canMove(previous, next) {
    if (next == "S" || previous == "E") return false;
    if (previous == "S") return next == "a";
    if (next == "E") return previous == "z";
    // return Math.abs(previous.charCodeAt(0) - next.charCodeAt(0)) <= 1;
    return next.charCodeAt(0) - 1 <= previous.charCodeAt(0);
  }
}

class Graph {
  constructor() {
    this.traversed = 0;
    this.nodes = [];
    this.availableNodes = [];
    this.startNode;
    this.startNodeIndex;
    this.endNode;
  }

  getNode(position) {
    return this.nodes.find((node) => node.position.x == position.x && node.position.y == position.y);
  }

  getEndNode() {
    let highestNode = null;

    for (let node of this.nodes) {
      if (highestNode == null || (node.distance != Infinity && highestNode.distance < node.distance)) highestNode = node;
    }

    return highestNode;
  }
}

class Node {
  constructor(position) {
    this.position = position;
    this.links = [];
    this.distance = Infinity;
    this.visited = false;
    this.previousNode = null;
  }
}

function calculatePath() {
  const grid = new Grid();
  const graph = new Graph();
  const shortestPath = Infinity;

  for (let y = 0; y < grid.cells.length; y++) {
    for (let x = 0; x < grid.cells[y].length; x++) {
      let node = new Node(new Vector(x, y));
      if (grid.getCell(new Vector(x, y)) == "E") graph.endNode = node;

      // if (grid.getCell(new Vector(x, y)) == "S") {
      //   graph.startLocation = node;
      //   node.distance = 0;
      // }

      graph.nodes.push(node);
    }
  }

  for (let node of graph.nodes) {
    let cell = grid.getCell(node.position);

    let ajecentCells = [
      grid.getAjecent(node.position, Direction.Up),
      grid.getAjecent(node.position, Direction.Down),
      grid.getAjecent(node.position, Direction.Left),
      grid.getAjecent(node.position, Direction.Right),
    ];

    ajecentCells = ajecentCells.filter((ajecent) => ajecent !== null);
    ajecentCells = ajecentCells.filter((ajecent) => grid.canMove(cell, ajecent.value));

    ajecentCells.forEach((_) => {
      node.links.push(graph.getNode(_.position));
      // console.log(grid.getCell(_.position));
    });
  }

  for (let start of grid.startLocations) {
    let startNode = graph.getNode(start);
    graph.startLocation = startNode;
    startNode.distance = 0;

    let currentNode = graph.startLocation;
    let visitedNodeSet = new Set();

    graph.availableNodes.push(graph.startLocation);

    while (graph.availableNodes.length > 0) {
      currentNode = graph.availableNodes.shift();
      traverseNode(currentNode, visitedNodeSet);
    }

    console.log(graph.endLocation);
    console.log(graph.endNode);
    console.log(grid.getCell(graph.endNode.position));
    // console.log(visitedNodeSet);

    let currentEndPoint = graph.endNode;
    let endIndex = 0;

    while (currentEndPoint.previousNode != null) {
      if (endIndex % 10 == 0) {
        console.log("Sending route " + endIndex);
      }
      if (endIndex > 1000) return;
      endIndex++;

      io.emit("route", currentEndPoint.position);
      currentEndPoint = currentEndPoint.previousNode;
    }
  }

  function traverseNode(currentNode, visitedNodeSet) {
    for (linkNode of currentNode.links) {
      if (!visitedNodeSet.has(JSON.stringify(currentNode.position))) graph.availableNodes.push(linkNode);
      if (!visitedNodeSet.has(JSON.stringify(currentNode.position)) && linkNode.distance > currentNode.distance + 1) {
        linkNode.distance = currentNode.distance + 1;
        linkNode.previousNode = currentNode;
      }

      if (!visitedNodeSet.has(JSON.stringify(currentNode.position))) {
        graph.traversed++;
        if (graph.traversed % 20 == 0) {
          console.log(graph.traversed + " traversed");
          console.log("available nodes: " + graph.availableNodes.length);
        }
      }
    }

    visitedNodeSet.add(JSON.stringify(currentNode.position));
    currentNode.visited = true;
    io.emit("goodNode", { position: currentNode.position, value: grid.getCell(currentNode.position) });
  }
}
