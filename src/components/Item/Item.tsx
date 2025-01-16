import React, { ComponentType } from "react";
import { Item as ItemType, MassagedSelectProps } from "../../utils/SelectTypes";
import { RemoveProps } from "../svg/svg";

export interface Props {
  className: string;
  removable: boolean;
  item: ItemType;
  svg_Remove: ComponentType<RemoveProps>;
}

export type ItemProps = Props & MassagedSelectProps;

function Item(props: ItemProps) {
  let Remove = props.svg_Remove;

  return (
    <li className={props.className} data-val={props.item.value}>
      {props.item.displayElement ?? props.item.label}
      {props.removable && (
        <button
          className="remove"
          type="button"
          data-val={props.item.value}
          tabIndex={-1}
        >
          <Remove item={props.item} />
        </button>
      )}
    </li>
  );
}

export default Item;
