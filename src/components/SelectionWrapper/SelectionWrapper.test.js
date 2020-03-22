import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { mockStyles, MockElement, MockInput, MockSvg } from "../../mocks";
import SelectionWrapper from "./SelectionWrapper";

let onFocus = jest.fn();
let onBlur = jest.fn();

it("renders", () => {
  const wrapper = shallow(
    <SelectionWrapper
      {...mockStyles}
      className="test"
      areOptionsOpen={false}
      onFocus={onFocus}
      onBlur={onBlur}
      SelectionList={MockElement}
      Search={MockInput}
      svg_Expand={MockSvg}
    />
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

it("renders disabled", () => {
  let styles = {
    ...mockStyles,
    styles_disabled: true
  };

  const wrapper = shallow(
    <SelectionWrapper
      {...styles}
      className="test"
      areOptionsOpen={false}
      onFocus={onFocus}
      onBlur={onBlur}
      SelectionList={MockElement}
      Search={MockInput}
      svg_Expand={MockSvg}
    />
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});

// ref searchRef.current.blur() doesn't continue event propogation
// it('should close', (done) => {
//   const wrapper = mount(<SelectionWrapper
//     {...mockStyles}
//     className="test"
//     areOptionsOpen={true}
//     onFocus={onFocus}
//     onBlur={onBlur}
//     SelectionList={<SelectionList />}
//     Search={<MockInput />} />)
//
//   setTimeout(() => {
//     wrapper.find('input').simulate('click')
//     expect(onBlur).toBeCalled()
//     done()
//   })
// })
