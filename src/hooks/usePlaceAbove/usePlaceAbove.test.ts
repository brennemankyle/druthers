// import { renderHook } from "@testing-library/react";
// import usePlaceAbove from "./usePlaceAbove";

// let rect;
// let optionsWrapperRect;

// beforeEach(() => {
//   rect = {
//     bottom: 80,
//     height: 80,
//     left: 0,
//     right: 200,
//     top: 0,
//     width: 200,
//     x: 0,
//     y: 600,
//   };

//   optionsWrapperRect = {
//     bottom: 80,
//     height: 80,
//     left: 0,
//     right: 200,
//     top: 0,
//     width: 200,
//     x: 0,
//     y: 600,
//   };

//   global.innerHeight = 1000;
//   global.scrollY = 200;
// });

// it("Should default to false", () => {
//   const { result } = renderHook(() => usePlaceAbove(rect, optionsWrapperRect));

//   expect(result.current).toBe(false);
// });

// it("Should place above", () => {
//   // Window height
//   global.innerHeight = 150;
//   global.scrollY = 150;

//   // Below height
//   rect.y = 100;
//   rect.height = 100;
//   optionsWrapperRect.height = 101;

//   const { result } = renderHook(() => usePlaceAbove(rect, optionsWrapperRect));

//   expect(result.current).toBe(false);
// });

// it("Should place below", () => {
//   // Window height
//   global.innerHeight = 150;
//   global.scrollY = 150;

//   // Below height
//   rect.y = 100;
//   rect.height = 100;
//   optionsWrapperRect.height = 100;

//   const { result } = renderHook(() => usePlaceAbove(rect, optionsWrapperRect));

//   expect(result.current).toBe(false);
// });

// it("Should place below if less space above", () => {
//   // Window height
//   global.innerHeight = 100;
//   global.scrollY = 100;

//   // Below height
//   rect.y = 50;
//   rect.height = 100;
//   optionsWrapperRect.height = 100;

//   const { result } = renderHook(() => usePlaceAbove(rect, optionsWrapperRect));

//   expect(result.current).toBe(false);
// });

// it("Should place below with no space", () => {
//   // Window height
//   global.innerHeight = 1;
//   global.scrollY = 1;

//   // Below height
//   rect.y = 0;
//   rect.height = 2;
//   optionsWrapperRect.height = 20;

//   const { result } = renderHook(() => usePlaceAbove(rect, optionsWrapperRect));

//   expect(result.current).toBe(false);
// });
