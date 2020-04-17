import React, { useState } from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { MockSvg } from "../../mocks";
import InternalCheckRadio from "./InternalCheckRadio";

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
  const wrapper = shallow(<InternalCheckRadio {...props} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

it("renders checkbox", () => {
  const wrapper = shallow(<InternalCheckRadio {...props} multiple={true} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

it("renders toggle", () => {
  const wrapper = shallow(<InternalCheckRadio {...props} toggle={true} />);

  expect(toJson(wrapper)).toMatchSnapshot();
});

it("should click", () => {
  const wrapper = shallow(<InternalCheckRadio {...props} />);

  wrapper.find("input").simulate("click");

  expect(props.onClick).toBeCalled();
});

it("should change", () => {
  const wrapper = shallow(<InternalCheckRadio {...props} />);

  wrapper.find("input").simulate("change");

  expect(props.onChange).toBeCalled();
});

it("should focus", () => {
  const wrapper = shallow(<InternalCheckRadio {...props} />);

  expect(setState).not.toBeCalled();

  wrapper.find("input").simulate("focus");

  expect(setState).toBeCalledWith(true);
});

it("should blur", () => {
  const wrapper = shallow(<InternalCheckRadio {...props} />);

  expect(setState).not.toBeCalled();

  wrapper.find("input").simulate("blur");

  expect(setState).toBeCalledWith(false);
});
