const CreateNewPath = require("../src/create_new_path");

describe("CreateNewPath", () => {
  test("should return the url if no params sent", () => {
    const path = CreateNewPath(
      {},
      {
        file: "foo.jpg",
        folder: "~images/foo/",
        url: "~images/foo/foo.jpg"
      }
    );
    expect(path).toEqual("~webp/foo/foo.webp");
  });

  test("should return the url if replaceTo is sent as regexp", () => {
    const path = CreateNewPath(
      {
        replaceTo: /^(assets)([\w\d\/\-\_]+)(\.[jpe?g|png]+)/,
        webpPath: "webp/path"
      },
      { file: "foo.jpg", folder: "assets/foo/", url: "assets/foo/foo.jpg" }
    );
    expect(path).toEqual("webp/path/foo/foo.webp");
  });

  test("should return the url if replaceTo is sent as function", () => {
    const path = CreateNewPath(
      {
        replaceTo: ({ url }) => {
          const regexp = /^(assets)([\w\d\/\-\_]+)(\.[jpe?g|png]+)/;

          return url.replace(regexp, "/my/webp/folder$2$3.webp");
        },
        webpPath: "webp/path"
      },
      { file: "foo.jpg", folder: "assets/foo/", url: "assets/foo/foo.jpg" }
    );
    expect(path).toEqual("/my/webp/folder/foo/foo.jpg.webp");
  });
});
