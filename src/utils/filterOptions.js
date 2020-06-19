import { isEmpty, without, rankFilterSort } from "./utils";
import { flattenOptions } from "./massageOptions";
import FuzzySet from "fuzzyset.js";

let fuzzySearch = (item, searchTerm) => {
  let fuzzy = FuzzySet();
  fuzzy.add(item.label.toLowerCase());
  let result = fuzzy.get(searchTerm);

  return result ? result.length : false;
};

let sortComparator = (a, b) =>
  b.rank - a.rank || a.item.label.localeCompare(b.item.label); // sort by rank, then alphabetically

let filterOptions = (props, searchTerm) => {
  let calculateRank = option => {
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
        "options"
      ),
      props.hasOptionGroups
    );
  }

  options = without(options, props.selection);

  if (props.hasOptionGroups) {
    // Remove child groups if parent is selected
    let groupsToRemove = props.selection
      .filter(selection => selection.childGroup)
      .map(selection => selection.childGroup);

    options = options.filter(
      option =>
        !option.group ||
        !groupsToRemove.some(group => option.group.startsWith(group))
    );
  }

  return options;
};

export default filterOptions;
