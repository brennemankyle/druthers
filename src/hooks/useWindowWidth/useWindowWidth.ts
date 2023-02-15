import { useState, useEffect } from "react";
import debounce from "debounce";

function useWindowWidth(): number {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = debounce(() => setWidth(window.innerWidth), 50); // Debounce to improve performance
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return width;
}

export default useWindowWidth;
