import React, { ReactElement, useState } from "react";
import ReactDOM from "react-dom/client";
import Druthers from "./components/Druthers/Druthers";

function Example(): ReactElement {
  const [selection, setSelection] = useState<string>();
  let options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ];

  return (
    <Druthers
      name="example"
      selection={selection}
      onChange={(e) => setSelection(e.target.value)}
      options={options}
    />
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>
);
