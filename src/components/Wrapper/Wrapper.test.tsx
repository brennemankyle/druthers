// import React from "react";
// import { shallow, mount } from "enzyme";
// import { mockStyles } from "../../mocks";
// import Wrapper from "./Wrapper";

// it("adds className", () => {
//   const wrapper = shallow(<Wrapper {...mockStyles} className="test" />);

//   expect(wrapper.hasClass("test")).toBe(true);
// });

// it("renders children", () => {
//   const wrapper = shallow(
//     <Wrapper {...mockStyles}>
//       <div className="unique" />
//     </Wrapper>
//   );

//   expect(wrapper.contains(<div className="unique" />)).toBe(true);
// });

// it("pass props", () => {
//   const wrapper = shallow(<Wrapper {...mockStyles} otherProp="otherProp" />);

//   expect(wrapper.props().otherProp).toBe("otherProp");
// });

// it("forwards ref", () => {
//   const ref = React.createRef();
//   mount(<Wrapper {...mockStyles} ref={ref} />);

//   expect(ref.current).toBeDefined();
// });
