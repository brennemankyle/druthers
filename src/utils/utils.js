// Functions that we need from lodash, but implemented here so we don't have to install all of lodash

function castArray(value) {
  return Array.isArray(value) ? value : [value];
}

function without(array, values) {
  return array.filter(value => !castArray(values).includes(value));
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

function groupBy(array, funcs) {
  function convertToPriority(value) {
    if (typeof value === "boolean") return Number(!value);

    return typeof value === "string" || value instanceof String
      ? value
      : Number(value);
  }

  function isSorted(original, prioritized) {
    return original.every((item, index) => item === prioritized[index]);
  }

  let priority = value =>
    funcs.map(func => convertToPriority(func(value))).join(".");

  let prioritized = array
    .map(value => ({ value, priority: priority(value) }))
    .sort((a, b) => a.priority.localeCompare(b.priority))
    .map(item => item.value);

  return isSorted(array, prioritized) ? array : prioritized;
}

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
  groupBy,
  inRange,
  without,
  castArray,
  isEmpty,
  last,
  withKeys,
  withoutKeys
};
