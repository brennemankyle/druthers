import { Item } from "./SelectTypes";

function decreaseOneAbsolute(value: number): number {
  if (value === 0) return value;

  return value > 0 ? value - 1 : value + 1;
}

function moveHighlighted(
  items: Item[],
  distance: number,
  highlighted: string | null,
  defaultLast = false
): string | undefined {
  if (items.length === 0) {
    return undefined;
  }

  let defaultIndex = defaultLast ? items.length - 1 : 0;
  let index =
    highlighted == null
      ? defaultIndex + decreaseOneAbsolute(distance)
      : items.map((item) => item.value).indexOf(highlighted) + distance;

  if (index < 0) index = items.length + index;
  index = index % items.length; // Wrap around

  if (items[index].value == null) {
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
