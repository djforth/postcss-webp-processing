const { CWebp } = require("cwebp");
const MakeWebp = require("../src/make_webp");

jest.mock("cwebp");

describe("Make Webp", () => {
  beforeAll(async () => {
    await MakeWebp(
      {
        imageFolder: /~images/,
        resolvePath: "app/javascript/images",
        webpFolder: "tmp/webp"
      },
      "~images/foo/bar.jpg"
    );
  });

  test("should call CWebp", () => {
    expect(CWebp).toHaveBeenCalledWith(
      expect.stringContaining("app/javascript/images/foo/bar.jpg")
    );
  });

  // test("should call CWebp.write", () => {
  //   console.log(write.mock.calls);
  //   expect(write).toHaveBeenCalled();
  // });
});
