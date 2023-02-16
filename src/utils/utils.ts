export const noop = () => {};

export function castArray<T>(value: T[] | T): T[] {
  return Array.isArray(value) ? value : [value];
}

export function without<T>(array: T[], values: T[]): T[] {
  let filtered = array.filter((value) => !castArray(values).includes(value));

  return filtered.length === array.length ? array : filtered;
}

export function isEmpty(value: any): boolean {
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
      if (value.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export function last<T>(array: T[]): T | undefined {
  let length = array == null ? 0 : array.length;

  return length ? array[length - 1] : undefined;
}

export function inRange(number: number, start: number, end: number): boolean {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  return number >= Math.min(start, end) && number < Math.max(start, end);
}

export interface RankItem<T> {
  rank: number;
  item: T;
}

export type Comparator<C> = (a: C, b: C) => number;

export function rankFilterSor<T>(
  items: T[],
  calculateRank: (item: T) => number,
  comparator: Comparator<RankItem<T>> = (a, b) => b.rank - a.rank,
  childrenKey = "children",
  onParentRankZero = (item: RankItem<T>) => item
) {
  let internalRankFilterSort = (items: T[]) => {
    let accRank = 0;

    let filteredItems = items
      .map((item) => {
        let newItem = item;
        let rank = calculateRank(newItem);

        if (item[childrenKey]) {
          let { childSum, ...other } = internalRankFilterSort(
            item[childrenKey]
          );

          newItem = {
            ...newItem,
            [childrenKey]: other[childrenKey],
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
          item: newItem,
        };
      })
      .filter((ranker) => ranker.rank > 0) // Remove ranks with 0
      .sort(comparator)
      .map((ranker) => ranker.item); // return to just array of items

    return {
      [childrenKey]: filteredItems,
      childSum: accRank,
    };
  };

  return internalRankFilterSort(items)[childrenKey];
}

export function withKeys<T extends object>(
  obj: T,
  startsWith: string | string[],
  not = false
): Partial<T> {
  return Object.keys(obj).reduce((acc, key) => {
    let condition = castArray(startsWith).some((word) => key.startsWith(word));
    condition = not ? !condition : condition;
    if (condition) acc[key] = obj[key];

    return acc;
  }, {});
}

export function withoutKeys<T extends object>(
  obj: T,
  startsWith: string | string[]
): Partial<T> {
  return withKeys(obj, startsWith, true);
}
