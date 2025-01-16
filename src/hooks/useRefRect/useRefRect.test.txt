// import { mockRect } from "../../mocks";
// import { renderHook } from "@testing-library/react";
// import useRefRect from "./useRefRect";

// let ref;

// beforeEach(() => {
//   let rect = mockRect;

//   rect.offsetLeft = ref = {
//     current: {
//       getClientRects: () => [
//         {
//           top: 10,
//           bottom: 110,
//           left: 20,
//           right: 220,
//           width: 200,
//           height: 100,
//         },
//       ],
//       offsetLeft: 15,
//       offsetTop: 25,
//     },
//   };
// });

// it("Should get default", () => {
//   ref = {
//     current: null,
//   };
//   global.innerWidth = 10;
//   global.innerHeight = 10;

//   const { result } = renderHook(() => useRefRect(ref));

//   expect(result.current).toStrictEqual({
//     bottom: 0,
//     height: 0,
//     left: 0,
//     right: 0,
//     top: 0,
//     width: 0,
//     x: -10,
//     y: -10,
//   });
// });

// it("Should get ref rectangle", () => {
//   const { result } = renderHook(() => useRefRect(ref));

//   expect(result.current).toStrictEqual({
//     top: 10,
//     bottom: 110,
//     left: 20,
//     right: 220,
//     width: 200,
//     height: 100,
//     x: 15,
//     y: 25,
//   });
// });
