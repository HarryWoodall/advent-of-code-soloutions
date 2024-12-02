export type CharactersResult = {
  startIndex: number;
  endIndex: number;
  isInside: boolean;
  characters: string[];
};

export function findAllWithinChars(value: string, start: string, end: string): CharactersResult[] {
  var result = [];
  var charactersBetween = [];

  var currentItem: CharactersResult;
  var isInside = false;

  for (let i = 0; i < value.length; i++) {
    if (isInside) {
      if (value[i] != end) {
        currentItem.characters.push(value[i]);
      } else {
        isInside = false;
        currentItem.endIndex = i;
        result.push(currentItem);
        currentItem = null;
      }
      continue;
    }

    if (value[i] == start) {
      if (currentItem) {
        currentItem.endIndex = i;
        result.push(currentItem);
      }

      isInside = true;
      currentItem = {
        startIndex: i,
        endIndex: -1,
        isInside: true,
        characters: [],
      };

      continue;
    }

    if (!currentItem) {
      currentItem = {
        startIndex: i,
        endIndex: -1,
        isInside: false,
        characters: [],
      };
    }

    currentItem.characters.push(value[i]);

    if (i == value.length - 1) {
      currentItem.endIndex = i;
      result.push(currentItem);
    }
  }

  return result;
}
