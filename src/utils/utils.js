function castArray(value) {
  return Array.isArray(value) ? value : [value];
}

function without(array, values) {
  let filtered = array.filter(value => !castArray(values).includes(value));

  return filtered.length === array.length ? array : filtered;
}

function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (Array.isArray(value) || typeof value == "string") {
    return !value.length;
  }

  if (value && value.size != null) {
    return !value.size;
  }

  if (typeof value === "object") {
    for (let key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false;
      }
    }

    return true;
  }

  return false;
}

function last(array) {
  let length = array == null ? 0 : array.length;

  return length ? array[length - 1] : undefined;
}

function inRange(number, start, end) {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  return number >= Math.min(start, end) && number < Math.max(start, end);
}

let rankFilterSort = (
  items,
  calculateRank,
  comparator = (a, b) => b.rank - a.rank,
  childrenKey = "children",
  onParentRankZero = item => item
) => {
  let internalRankFilterSort = items => {
    let accRank = 0;

    let filteredItems = items
      .map(item => {
        let newItem = item;
        let rank = calculateRank(newItem);

        if (item[childrenKey]) {
          let { childSum, ...other } = internalRankFilterSort(
            item[childrenKey]
          );

          newItem = {
            ...newItem,
            [childrenKey]: other[childrenKey]
          };

          if (newItem[childrenKey].length === 0) {
            delete newItem[childrenKey];
          }

          if (rank <= 0) {
            newItem = onParentRankZero(newItem);
          }

          rank += childSum;
        }

        accRank += rank;

        return {
          rank,
          item: newItem
        };
      })
      .filter(ranker => ranker.rank > 0) // Remove ranks with 0
      .sort(comparator)
      .map(ranker => ranker.item); // return to just array of items

    return {
      [childrenKey]: filteredItems,
      childSum: accRank
    };
  };

  return internalRankFilterSort(items)[childrenKey];
};

function withKeys(obj, startsWith, not = false) {
  return Object.keys(obj).reduce((acc, key) => {
    let condition = castArray(startsWith).some(word => key.startsWith(word));
    condition = not ? !condition : condition;
    if (condition) acc[key] = obj[key];

    return acc;
  }, {});
}

let withoutKeys = (obj, startsWith) => {
  return withKeys(obj, startsWith, true);
};

export {
  inRange,
  without,
  castArray,
  isEmpty,
  last,
  rankFilterSort,
  withKeys,
  withoutKeys
};
