import React, { MouseEventHandler, ReactElement } from "react";
import { Item } from "../../utils/SelectTypes";
import { withKeys, noop } from "../../utils/utils";

const preventBlur = (e) => e.preventDefault();

interface Props {
  className: string;
  itemList: Item[];
  removable: boolean;
  onClick: MouseEventHandler<HTMLUListElement>;
  noItemsText: string;
  onMouseOver: MouseEventHandler<HTMLUListElement>;
  onMouseOut: MouseEventHandler<HTMLUListElement>;
  Item: ReactElement;
  svg_Remove: ReactElement;
}

function ItemList(props: Props) {
  let styles = withKeys(props, "styles_");
  let Item = props.Item;

  let renderItem = (item) => (
    <Item
      item={item}
      removable={props.removable}
      key={item.value || item.label}
      svg_Remove={props.svg_Remove}
      {...styles}
    />
  );

  let hasItems = !!props.itemList.length;
  let onClick = hasItems ? props.onClick : noop;
  let onMouseOver = hasItems ? props.onMouseOver : noop;
  let onMouseOut = hasItems ? props.onMouseOut : noop;

  return (
    <ul
      className={props.className}
      onClick={onClick}
      onMouseDown={preventBlur}
      onTouchStart={preventBlur}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {props.itemList.map(renderItem)}
      {!hasItems && props.noItemsText && (
        <Item
          item={{ value: "", label: props.noItemsText }}
          removable={false}
          {...styles}
        />
      )}
    </ul>
  );
}

ItemList.defaultProps = {
  removable: false,
};

export default ItemList;
