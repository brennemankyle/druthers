import React, { MouseEventHandler, TouchEventHandler } from "react";
import {
  AnyReactComponent,
  Item as ItemType,
  MassagedSelectProps,
} from "../../utils/SelectTypes";
import { withKeys, noop } from "../../utils/utils";

const preventBlur: MouseEventHandler<HTMLUListElement> = (e) =>
  e.preventDefault();

const preventBlurTouch: TouchEventHandler<HTMLUListElement> = (e) =>
  e.preventDefault();

interface Props {
  className: string;
  itemList: ItemType[];
  onClick: MouseEventHandler<HTMLUListElement>;
  noItemsText: string;
  onMouseOver: MouseEventHandler<HTMLUListElement>;
  onMouseOut: MouseEventHandler<HTMLUListElement>;
  Item: AnyReactComponent;
}

type ListProps = Props & MassagedSelectProps;

function ItemList({
  removable = false,
  Item,
  svg_Remove,
  itemList,
  onClick: baseOnClick,
  onMouseOver: baseOnMouseOver,
  onMouseOut: baseOnMouseOut,
  className,
  noItemsText,
  ...otherProps
}: ListProps) {
  let styles = withKeys(otherProps, "styles_");

  let renderItem = (item: ItemType) => (
    <Item
      item={item}
      removable={removable}
      key={item.value || item.label}
      svg_Remove={svg_Remove}
      {...styles}
    />
  );

  let hasItems = !!itemList.length;
  let onClick = hasItems ? baseOnClick : noop;
  let onMouseOver = hasItems ? baseOnMouseOver : noop;
  let onMouseOut = hasItems ? baseOnMouseOut : noop;

  return (
    <ul
      className={className}
      onClick={onClick}
      onMouseDown={preventBlur}
      onTouchStart={preventBlurTouch}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {itemList.map(renderItem)}
      {!hasItems && noItemsText && (
        <Item
          item={{ value: "", label: noItemsText }}
          removable={false}
          {...styles}
        />
      )}
    </ul>
  );
}

export default ItemList;
