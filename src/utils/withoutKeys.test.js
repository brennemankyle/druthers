import withKeys from "./withKeys";
import withoutKeys from "./withoutKeys";

jest.mock("./withKeys");
withKeys.mockImplementation(() => jest.fn());

it("should call withKeys", () => {
  withoutKeys({}, "start");

  expect(withKeys).toBeCalledWith({}, "start", true);
});
