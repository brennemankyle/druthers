import { useState as useStateMock } from "react";
import { fireEvent } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import debounce from "debounce";
import useWindowWidth from "./useWindowWidth";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn()
}));
useStateMock.mockImplementation(jest.requireActual("react").useState);

jest.mock("debounce");
debounce.mockImplementation(immediate => immediate());

global.innerWidth = 200;

it("Should get default", () => {
  const { result } = renderHook(() => useWindowWidth());

  expect(result.current).toBe(200);
});

it("Should set state on resize", async () => {
  const setState = jest.fn();
  useStateMock.mockImplementation(init => [init, setState]);

  renderHook(() => useWindowWidth());

  act(() => {
    fireEvent(global, new Event("resize"));
  });

  expect(setState).toBeCalled();
});
