const setup = require("../setup.js");

const input = setup.getInput("10");
const grid = input.split("\n").map((line) => line.split(""));
const mappedNodes = [];
const unmappedNodes = [];
const startNodeSymbol = "7"; // Needs changing depending on data

class Node {
  constructor(symbol, position, distance, previous = null, connections = []) {
    this.symbol = symbol;
    this.position = position;
    this.distance = distance;
    this.previous = previous;
    this.connections = connections;
  }

  mapConnections() {
    if (mappedNodes.find((node) => isSamePosition(node.position, this.position))) {
      const index = unmappedNodes.findIndex((node) => isSamePosition(node.position, this.position));
      unmappedNodes.splice(index, 1);

      return;
    }

    this.connections = this.connections
      .map((connection) => {
        const duplicateNode = mappedNodes.find((node) => isSamePosition(node.position, connection.position));

        if (this.previous && isSamePosition(this.previous.position, connection.position)) return null;
        if (duplicateNode && duplicateNode.distance < this.distance + 1) return null;

        const node = new Node(
          connection.symbol,
          connection.position,
          this.distance + 1,
          this,
          getAjacentSymbols(connection.position.x, connection.position.y, connection.symbol)
        );

        if (duplicateNode) {
          const index = mappedNodes.findIndex((node) => isSamePosition(node.position, duplicateNode.position));
          mappedNodes.splice(index, 1);
        }

        return node;
      })
      .filter((node) => node);

    mappedNodes.push(this);
    const index = unmappedNodes.findIndex((node) => isSamePosition(node.position, this.position));
    unmappedNodes.splice(index, 1);

    unmappedNodes.push(...this.connections);
  }
}

const symbolMap = {
  "|": {
    connections: ["N", "S"],
  },
  "-": {
    connections: ["E", "W"],
  },
  L: {
    connections: ["N", "E"],
  },
  J: {
    connections: ["N", "W"],
  },
  7: {
    connections: ["S", "W"],
  },
  F: {
    connections: ["S", "E"],
  },
};

const startNode = findStartNode();
startNode.mapConnections();
// console.log(startNode.connections[0]);
// console.log(startNode);
function findStartNode() {
  for (y = 0; y < grid.length; y++) {
    for (x = 0; x < grid[0].length; x++) {
      if (grid[y][x] == "S") {
        return new Node(startNodeSymbol, { x: x, y: y }, 0, null, getAjacentSymbols(x, y, startNodeSymbol));
      }
    }
  }
}

let limit = 0;
while (unmappedNodes.length && limit < 10000) {
  unmappedNodes.forEach((node) => node.mapConnections());

  limit++;
}

mappedNodes.forEach((node) => console.log(`${node.symbol}: ${node.distance}`));
console.log(limit);

function getAjacentSymbols(x, y, currentSymbol) {
  if (x < 0 && x > grid[0].length - 1) return;
  if (y < 0 && y > grid.length - 1) return;

  const symbols = [];
  symbolMap[currentSymbol].connections.forEach((connection) => {
    symbols.push(getSymbol(x, y, connection));
  });

  return symbols;
}

function getSymbol(x, y, direction) {
  switch (direction) {
    case "N":
      return {
        position: { x: x, y: y - 1 },
        symbol: mapSymbolString(x, y - 1),
      };
    case "E":
      return {
        position: { x: x + 1, y: y },
        symbol: mapSymbolString(x + 1, y),
      };
    case "S":
      return {
        position: { x: x, y: y + 1 },
        symbol: mapSymbolString(x, y + 1),
      };
    case "W":
      return {
        position: { x: x - 1, y: y },
        symbol: mapSymbolString(x - 1, y),
      };
  }
}

function mapSymbolString(x, y) {
  if (grid[y][x] == "S") return startNodeSymbol;

  return grid[y][x];
}

function isSamePosition(a, b) {
  return a.x == b.x && a.y == b.y;
}
