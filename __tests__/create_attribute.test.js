const CreateAttribute = require("../src/create_attribute");

describe("Create attribute", () => {
  const value = 'url("~images/foo.jpg") left top no-repeat';
  const webpPath = "~webp/foo.webp";
  test("should replace url with webp path", () => {
    expect(CreateAttribute(value, webpPath)).toEqual(
      'url("~webp/foo.webp") left top no-repeat'
    );
  });
});
