import { isEmpty, without, sortBy } from "./essentialLodash";
import FuzzySet from "fuzzyset.js";

let fuzzySearch = (item, searchTerm) => {
  let fuzzy = FuzzySet();
  fuzzy.add(item.label.toLowerCase());
  let result = fuzzy.get(searchTerm);

  return result ? result.length : false;
};

let filterOptions = (props, searchTerm) => {
  let options = without(props.options, props.selection);

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
  if (isEmpty(searchTerm)) return options;

  searchTerm = searchTerm.toLowerCase();
  let filter = item =>
    item.label.toLowerCase().includes(searchTerm) ||
    (item.value != null && item.value.toLowerCase() === searchTerm) ||
    fuzzySearch(item, searchTerm);

  options = options.filter(item => item.parent || filter(item));

  if (props.hasOptionGroups) {
    // Remove empty groups
    options
      .reduce((acc, item, index) => {
        if (item.parent && !filter(item)) acc.push(index);

        return acc;
      }, [])
      .reverse()
      .forEach(index => {
        if (
          options[index + 1] == null ||
          options[index].group !== options[index + 1].group
        ) {
          options.splice(index, 1);
        }
      });
  }

  options = sortBy(options, [
    item => item.group,
    item => item.label.toLowerCase() === searchTerm,
    item => item.value != null && item.value.toLowerCase() === searchTerm,
    item => item.label.toLowerCase().startsWith(searchTerm),
    item => item.label.toLowerCase().endsWith(searchTerm),
    item => fuzzySearch(item, searchTerm)
  ]);

  return options;
};

export default filterOptions;
