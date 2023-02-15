import React, { ReactElement } from "react";
import { Item } from "../../utils/SelectTypes";

interface Props {
  name: string;
  itemList: Item[];
}

function HtmlFieldData(props: Props): ReactElement {
  return (
    <input
      type="hidden"
      name={props.name}
      value={props.itemList.map((item) => item.value).join(",")}
    />
  );
}

export default HtmlFieldData;
