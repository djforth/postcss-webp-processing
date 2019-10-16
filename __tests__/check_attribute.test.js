const CheckAttribute = require("../src/check_attribute");
const Curry = require("../helpers/curry");

describe("Should split the image path from attribute value", () => {
  let checker;
  beforeAll(() => {
    checker = Curry(CheckAttribute, {
      imageFolder: /~images/,
      replaceFrom: /\.(jpe?g|png)/
    });
  });

  test("should return false if no url", () => {
    expect(checker({ value: "foo" })).toBeFalse();
  });

  test("should return false if  url contains wepb", () => {
    expect(checker({ value: "url('foo.webp')" })).toBeFalse();
  });

  test("should return false if  url contains jpg, but not in image folder", () => {
    expect(checker({ value: "url('foo.jpg')" })).toBeFalse();
  });

  test("should return false if  url contains gif & in image folder", () => {
    expect(checker({ value: "url('~images/foo.gif')" })).toBeFalse();
  });

  test("should return true if  url contains jpg & image folder", () => {
    expect(checker({ value: "url('~images/foo.jpg')" })).toBeTrue();
  });

  test("should return true if  url contains png & in image folder", () => {
    expect(checker({ value: "url('~images/foo.png')" })).toBeTrue();
  });
});
