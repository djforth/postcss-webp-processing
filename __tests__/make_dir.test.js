const Maker = require("../src/make_dir");

const { resolve } = require("path");

jest.mock(
  "make-dir",
  () =>
    jest
      .fn()
      .mockReturnValueOnce(Promise.resolve("success"))
      .mockReturnValue(Promise.reject("fail"))
  // .mockReturnValue("success")
);

const makeDir = require("make-dir");

describe("MakeDir", () => {
  test("should create directory", async () => {
    expect.assertions(1);
    await Maker(
      { imageFolder: /~images/, webpFolder: "tmp/webp" },
      "~images/foo"
    );

    expect(makeDir).toHaveBeenCalledWith(
      expect.stringContaining("tmp/webp/foo")
    );
  });

  test("fails to create directory", async () => {
    // expect.assertions(1);
    try {
      await Maker(
        { imageFolder: /~images/, webpFolder: "tmp/webp" },
        "~images/foo"
      );
    } catch (e) {
      console.log("error", e);
      expect(e).toMatch(new Error("fail"));
    }
  });
});
