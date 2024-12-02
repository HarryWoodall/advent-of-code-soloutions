const setup = require("../setup.js");

type Node = {
  name: string;
  ajacentNodes: {
    nodeName: string;
    distance: number;
  }[];
  path: {
    nodeName: string;
    distance: number;
    visited: boolean;
  }[];
};

type CalculatedRoute = {
  route: string[];
  distance: number;
};

const nodes: Node[] = [];
let routes: string[][] = [];
const calculatedRoutes: CalculatedRoute[] = [];

// setup.createInput("9");
const input: string = setup.getInput("9");
const lines = input.split("\n");

lines.forEach((line) => {
  const words = line.split(" ");
  const startLocation = words[0];
  const endLocation = words[2];
  const distance = parseInt(words[4]);

  let startNode = nodes.find((node) => node.name == startLocation);
  if (!startNode) {
    startNode = {
      name: startLocation,
      path: [],
      ajacentNodes: [],
    };
    startNode.path.push({
      nodeName: startLocation,
      distance: 0,
      visited: true,
    });
    nodes.push(startNode);
  }

  let endNode = nodes.find((node) => node.name == endLocation);
  if (!endNode) {
    endNode = {
      name: endLocation,
      path: [],
      ajacentNodes: [],
    };
    endNode.path.push({
      nodeName: endLocation,
      distance: 0,
      visited: true,
    });
    nodes.push(endNode);
  }

  startNode.ajacentNodes.push({
    nodeName: endLocation,
    distance: distance,
  });

  endNode.ajacentNodes.push({
    nodeName: startLocation,
    distance: distance,
  });
});

nodes.forEach((node) => {
  nodes
    .filter((n) => n.name != node.name)
    .forEach((unvisitedNode) => {
      node.path.push({
        nodeName: unvisitedNode.name,
        distance: Infinity,
        visited: false,
      });
    });
});

const permutations = (arr: string[]) => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  return arr.reduce((acc, item, i) => acc.concat(permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val) => [item, ...val])), []);
};

function getNode(name: string) {
  return nodes.find((node) => node.name == name);
}

function getNextNodes(node: Node) {
  const visitedNodes = node.path.filter((n) => n.visited).map((p) => p.nodeName);

  // Get ajacent node Objects
  let visitedNodeAjacent = visitedNodes
    .map((vNode) => getNode(vNode))
    .flatMap((vNode) =>
      vNode.ajacentNodes.map((n) => {
        return {
          node: n.nodeName,
          distance: n.distance,
          previousNode: vNode,
        };
      })
    );

  // Remove nodes already visited
  visitedNodeAjacent = visitedNodeAjacent.filter((n) =>
    node.path
      .filter((p) => !p.visited)
      .map((p) => p.nodeName)
      .includes(n.node)
  );

  // Calculate distances
  return visitedNodeAjacent.map((n) => {
    return {
      node: n.node,
      distance: n.distance + node.path.find((nodePathItem) => nodePathItem.nodeName == n.previousNode.name).distance,
    };
  });
}

let currentItteration = 0;

function traverseNode(currentNode: Node) {
  currentItteration = 0;
  while (currentItteration < 1000) {
    const nextNodes = getNextNodes(currentNode);
    // console.log(nextNodes);

    if (nextNodes.length == 0) {
      console.log("No more nodes");
      return;
    }

    const shortestDistanceNode = nextNodes.sort((a, b) => a.distance - b.distance)[0];
    // console.log("Closest new node: ", shortestDistanceNode.node.name);
    // console.log("Distance: ", shortestDistanceNode.distance);

    const currentNodeInPath = currentNode.path.find((pathNode) => pathNode.nodeName == shortestDistanceNode.node);
    currentNodeInPath.distance = shortestDistanceNode.distance;
    currentNodeInPath.visited = true;

    currentItteration++;
  }
}

function calculateRouteLength(route: string[]) {
  let distance = 0;
  route.forEach((nodeName, index) => {
    if (index == 0) return;

    const previousNode = getNode(route[index - 1]);

    // console.log(`${route[index - 1]} -> ${nodeName}`);
    // console.log("distance", previousNode.path.find((item) => item.nodeName == nodeName).distance);
    // console.log();

    distance += previousNode.path.find((item) => item.nodeName == nodeName).distance;
  });

  return {
    route: route,
    distance: distance,
  };
}

routes = permutations(nodes.map((node) => node.name)) as string[][];
console.log(routes);

// traverseNode(nodes[0]);

// console.log(`Path for node ${nodes[0].name}`);
// nodes[0].path.map((item) => {
//   console.log(item.nodeName, item.distance);
// });

// traverseNode(nodes[1]);

// console.log(`Path for node ${nodes[1].name}`);
// nodes[1].path.map((item) => {
//   console.log(item.nodeName, item.distance);
// });

// console.log(JSON.stringify(nodes, null, 2));

nodes.forEach((node) => {
  traverseNode(node);

  console.log(`\nPath for node ${node.name}`);
  node.path.map((item) => {
    console.log(item.nodeName, item.distance);
  });
});

routes.forEach((route) => {
  calculatedRoutes.push(calculateRouteLength(route));
});

calculatedRoutes.sort((a, b) => a.distance - b.distance);
console.log(calculatedRoutes[0]);

export {};
