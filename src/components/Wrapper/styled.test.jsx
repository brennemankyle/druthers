import React from "react";
import renderer from "react-test-renderer";
import { mockStyles, MockElement } from "../../mocks";
import { Wrapper, OptionsWrapper } from "./styled";

describe("Wrapper", () => {
  it("styles", () => {
    const wrapper = renderer.create(
      <Wrapper {...mockStyles}>
        <MockElement />
      </Wrapper>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("styles_rightToLeft = true", () => {
    const wrapper = renderer.create(
      <Wrapper {...mockStyles} styles_rightToLeft={true}>
        <MockElement />
      </Wrapper>
    );

    expect(wrapper).toMatchSnapshot();
  });
});

describe("OptionsWrapper", () => {
  it("styles", () => {
    const wrapper = renderer.create(
      <OptionsWrapper {...mockStyles}>
        <MockElement />
      </OptionsWrapper>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("styles_hasOptions = false and styles_multiple = false", () => {
    const wrapper = renderer.create(
      <OptionsWrapper
        {...mockStyles}
        styles_hasOptions={false}
        styles_multiple={false}
      >
        <MockElement />
      </OptionsWrapper>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
