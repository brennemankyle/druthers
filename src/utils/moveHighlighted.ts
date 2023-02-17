import { Item } from "./SelectTypes";

function decreaseOneAbsolute(num: number): number {
  if (num === 0) return num;

  return num > 0 ? num - 1 : num + 1;
}

function moveHighlighted(
  items: Item[],
  distance: number,
  highlighted: string | null,
  defaultLast = false
): string | undefined {
  if (items.length === 0 || items.every((item) => !item.selectable)) {
    return undefined;
  }

  let defaultIndex = defaultLast ? items.length - 1 : 0;
  let index =
    highlighted == null
      ? defaultIndex + decreaseOneAbsolute(distance)
      : items.map((item) => item.value).indexOf(highlighted) + distance;

  if (index < 0) index = items.length + index;
  index = index % items.length; // Wrap around

  if (!items[index].selectable || items[index].value == null) {
    // Has no value, continue
    return moveHighlighted(
      items,
      distance < 0 || Object.is(distance, -0) // negative 0 or below
        ? distance - 1
        : distance + 1,
      highlighted,
      defaultLast
    );
  } else {
    return items[index].value;
  }
}

export default moveHighlighted;
