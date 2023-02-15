import { isEmpty, without, rankFilterSort } from "./utils";
import { flattenOptions } from "./massageOptions";
import FuzzySet from "fuzzyset";
import { Item, MassagedSelectProps } from "./SelectTypes";

interface Comparable {
  rank: number;
  item: Item;
}

interface RankItem extends Omit<Item, "value"> {
  value?: string;
}

export type FilterOptions = typeof filterOptions;

function fuzzySearch(item: Item, searchTerm: string): boolean {
  let fuzzy = FuzzySet();
  fuzzy.add(item.label.toLowerCase());
  let result = fuzzy.get(searchTerm);

  return result ? result.length > 0 : false;
}

function sortComparator(a: Comparable, b: Comparable): number {
  return b.rank - a.rank || a.item.label.localeCompare(b.item.label); // sort by rank, then alphabetically
}

function onParentRankZeroRemoveValue(item: RankItem): RankItem {
  delete item.value; // Don't allow rank 0 parent to be selectable during searching

  return item;
}

function filterOptions(props: MassagedSelectProps, searchTerm: string): Item[] {
  let calculateRank = (option: Item) => {
    if (option.label.toLowerCase() === searchTerm) return 32;
    else if (option.value != null && option.value.toLowerCase() === searchTerm)
      return 16;
    else if (option.label.toLowerCase().startsWith(searchTerm)) return 8;
    else if (option.label.toLowerCase().endsWith(searchTerm)) return 4;
    else if (option.label.toLowerCase().includes(searchTerm)) return 2;
    else if (fuzzySearch(option, searchTerm)) return 1;
    else return 0;
  };

  let options = props.options;

  if (!isEmpty(searchTerm)) {
    searchTerm = searchTerm.toLowerCase();

    options = flattenOptions(
      rankFilterSort(
        props.hierarchicalOptions,
        calculateRank,
        sortComparator,
        "options",
        onParentRankZeroRemoveValue
      ),
      props.hasOptionGroups
    );
  }

  options = without(options, props.selection);

  if (props.hasOptionGroups) {
    // Remove child groups if parent is selected
    let groupsToRemove = props.selection
      .map((selection) => selection.childGroup)
      .filter((childGroup) => childGroup) as string[];

    options = options.filter(
      (option) =>
        !option.group ||
        !groupsToRemove.some((group) => option.group.startsWith(group))
    );
  }

  return options;
}

export default filterOptions;
