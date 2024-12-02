const fs = require('fs');
let input = fs.readFileSync('Files/day7.txt').toString().split("\r\n");

module.exports = {
  part1: function() {
    const looseBags = [];
    // console.log(input);

    for (let i = 0; i < 1; i++) {
      const bag = createBag(input[i]);
      let containerBag;
      for (let j = 0; j < looseBags; j++) {
        containerBag = searchBags(looseBags[i]);
      }
      if (containerBag) {
        containerBag.contents.push(bag);
      } else {
        looseBags.push(bag);
      }
    }
  }
}

function createBag(string) {
  const details = string.split(" bags contain ");
  const bagName = details[0];
  const bagItems = details[1].split(", ");
  const bagAmmounts = [];
  const bagContents = [];

  for (let i = 0; i < bagItems.length; i++) {
    const components = bagItems[i].split(" ")
    bagAmmounts.push(components[0]);
    bagContents.push(createEmptyBag(components[1] + " " + components[2]));
  }

  console.log(`Ammounts: ${bagAmmounts}, Contents: ${bagContents[0].name}`);
  const bag = {
    name: bagName,
    itemAmmounts: bagAmmounts,
    contents: bagContents
  };

  return bag;
}

function createEmptyBag(name) {
  const bag = {
    name: name,
    itemsAmmounts: [],
    contents: []
  }

  return bag;
}

function searchBags(bag, name) {
  let contents;
  for (let i = 0; i < bag.contents.length; i++) {
    content = searchBags(bag.contents[i], name);
    if (name == name) {
      return bag;
    }
  }

  if (contents == null) {
    return false;
  }
}