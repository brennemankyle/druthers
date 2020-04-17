import React, { useState } from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { MockSvg } from "../../mocks";
import SingleCheckRadio from "./SingleCheckRadio";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn()
}));

const props = {
  name: "test",
  value: "value",
  className: "test",
  label: "test label",
  disabled: false,
  toggle: false,
  checked: false,
  multiple: false,
  svg_Checkmark: MockSvg,
  onChange: jest.fn(),
  onClick: jest.fn()
};

const setState = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  useState.mockImplementation(init => [init, setState]);
});

it("renders radio", () => {
  const wrapper = shallow(<SingleCheckRadio {...props} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

it("renders checkbox", () => {
  const wrapper = shallow(<SingleCheckRadio {...props} multiple={true} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

it("renders toggle", () => {
  const wrapper = shallow(<SingleCheckRadio {...props} toggle={true} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

it("should click", () => {
  const wrapper = shallow(<SingleCheckRadio {...props} />);

  wrapper.find("input").simulate("click");

  expect(props.onClick).toBeCalled();
});

it("should change", () => {
  const wrapper = shallow(<SingleCheckRadio {...props} />);

  wrapper.find("input").simulate("change");

  expect(props.onChange).toBeCalled();
});

it("should focus", () => {
  const wrapper = shallow(<SingleCheckRadio {...props} />);

  expect(setState).not.toBeCalled();

  wrapper.find("input").simulate("focus");

  expect(setState).toBeCalledWith(true);
});

it("should blur", () => {
  const wrapper = shallow(<SingleCheckRadio {...props} />);

  expect(setState).not.toBeCalled();

  wrapper.find("input").simulate("blur");

  expect(setState).toBeCalledWith(false);
});
