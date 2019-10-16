const GetImagePath = require("../src/get_image_path");

describe("Should split the image path from attribute value", () => {
  test('should split path if "', () => {
    const { file, folder, url } = GetImagePath({
      value: 'url("my/image/path.jpg")'
    });
    expect(file).toEqual("path.jpg");
    expect(folder).toEqual("my/image/");
    expect(url).toEqual("my/image/path.jpg");
  });

  test("should split path if '", () => {
    const { file, folder, url } = GetImagePath({
      value: "url('my/image/path.jpg') no-repeat"
    });
    expect(file).toEqual("path.jpg");
    expect(folder).toEqual("my/image/");
    expect(url).toEqual("my/image/path.jpg");
  });

  test("should split path if not in quotes", () => {
    const { file, folder, url } = GetImagePath({
      value: "url(my/image/path.jpg)  top bottom no-repeat"
    });
    expect(file).toEqual("path.jpg");
    expect(folder).toEqual("my/image/");
    expect(url).toEqual("my/image/path.jpg");
  });
});
