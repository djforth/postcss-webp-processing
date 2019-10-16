var postcss = require("postcss");
var plugin = require("../src");
jest.mock("cwebp");

jest.mock("make-dir", () => jest.fn(() => Promise.resolve("success")));

function run(input, outputs, opts) {
  return postcss([plugin(opts)])
    .process(input)
    .then(function(result) {
      outputs.forEach(output => {
        expect(result.css).toEqual(expect.stringContaining(output));
      });

      expect(result.warnings()).toHaveLength(0);
    });
}

describe("postcss-webp-processing", () => {
  it("should add webp if options", async function() {
    const css = ".foo{background: url('~images/foo.jpg') no-repeat;}";

    const expected = [
      ".foo{background: url('~images/foo.jpg') no-repeat;}",
      ".webp .foo{background: url('~webp/foo.webp') no-repeat;}"
    ];
    return await run(css, expected, {});
  });

  it("should add webp if options if  environment set and matches", async function() {
    const css = ".foo{background: url('~images/foo.jpg') no-repeat;}";

    const expected = [
      ".foo{background: url('~images/foo.jpg') no-repeat;}",
      ".webp .foo{background: url('~webp/foo.webp') no-repeat;}"
    ];
    return await run(css, expected, {
      env: "production",
      environments: "production"
    });
  });

  it("should not add webp if options if  environment set and doesn't matches", async function() {
    const css = ".foo{background: url('~images/foo.jpg') no-repeat;}";

    const expected = [".foo{background: url('~images/foo.jpg') no-repeat;}"];
    return await run(css, expected, {
      env: "development",
      environments: "production"
    });
  });

  it("should add webp if options if  environment set as array and matches", async function() {
    const css = ".foo{background: url('~images/foo.jpg') no-repeat;}";

    const expected = [
      ".foo{background: url('~images/foo.jpg') no-repeat;}",
      ".webp .foo{background: url('~webp/foo.webp') no-repeat;}"
    ];
    return await run(css, expected, {
      env: "production",
      environments: ["production", "staging"]
    });
  });

  it("should not add webp if options if  environment set and doesn't matches", async function() {
    const css = ".foo{background: url('~images/foo.jpg') no-repeat;}";

    const expected = [".foo{background: url('~images/foo.jpg') no-repeat;}"];
    return await run(css, expected, {
      env: "development",
      environments: ["production", "staging"]
    });
  });
});
