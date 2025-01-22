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

export interface Props {
  className: string;
  itemList: ItemType[];
  onClick: MouseEventHandler<HTMLUListElement>;
  noItemsText: string;
  truncateOptions?: number;
  text_truncatedHide?: string;
  text_truncatedShow?: string;
  showTruncated?: boolean;
  onMouseOver: MouseEventHandler<HTMLUListElement>;
  onMouseOut: MouseEventHandler<HTMLUListElement>;
  Item: AnyReactComponent;
}

export type ListProps = Props & MassagedSelectProps;

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
  text_truncatedHide,
  text_truncatedShow,
  showTruncated,
  truncateOptions,
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
  let truncatedItemsCount =
    truncateOptions == null
      ? 0
      : Math.max(itemList.length - truncateOptions, 0);

  return (
    <ul
      className={className}
      onClick={onClick}
      onMouseDown={preventBlur}
      onTouchStart={preventBlurTouch}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {itemList
        .slice(
          0,
          truncateOptions == null || showTruncated
            ? itemList.length
            : truncateOptions
        )
        .map(renderItem)}
      {hasItems && !!truncatedItemsCount && !showTruncated && (
        <Item
          item={{
            label: text_truncatedShow,
          }}
          key="truncateItemsHidden"
          className="truncate-show"
          removable={false}
          {...styles}
        />
      )}
      {hasItems && !!truncatedItemsCount && showTruncated && (
        <Item
          item={{
            label: text_truncatedHide,
          }}
          key="truncateItemsShown"
          className="truncate-hide"
          removable={false}
          {...styles}
        />
      )}
      {!hasItems && noItemsText && (
        <Item
          item={{ value: "", label: noItemsText }}
          key="noItems"
          removable={false}
          {...styles}
        />
      )}
    </ul>
  );
}

export default ItemList;
