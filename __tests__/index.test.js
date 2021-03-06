let postcss = require('postcss')
var plugin = require('../src')
jest.mock('cwebp')

jest.mock('make-dir', () => jest.fn(() => Promise.resolve('success')))

function run (input, outputs, opts) {
  return postcss([plugin(opts)])
    .process(input)
    .then((result) => {
      outputs.forEach(output => {
        expect(result.css).toEqual(expect.stringContaining(output));
      });

      expect(result.warnings()).toHaveLength(0);
    })
}

describe('postcss-webp-processing', () => {
  it('should add webp if options', async () => {
    const css = ".foo{background: url('~images/foo.jpg') no-repeat;background-size:cover;}";

    const expected = [
      ".foo{background: url('~images/foo.jpg') no-repeat;background-size:cover;}",
      ".webp .foo{background: url('~webp/foo.webp') no-repeat;background-size: cover;}"
    ];
    return await run(css, expected, {});
  })

  it('should add webp if options if  environment set and matches', async () => {
    const css = ".foo{background: url('~images/foo.jpg') no-repeat; font-size: 1rem;}";

    const expected = [
      ".foo{background: url('~images/foo.jpg') no-repeat; font-size: 1rem;}",
      ".webp .foo{background: url('~webp/foo.webp') no-repeat;}"
    ];
    return await run(css, expected, {
      env: "production",
      environments: "production"
    });
  })

  it("should not add webp if options if  environment set and doesn't matches", async () => {
    const css = ".foo{background: url('~images/foo.jpg') no-repeat;}";

    const expected = [".foo{background: url('~images/foo.jpg') no-repeat;}"];
    return await run(css, expected, {
      env: "development",
      environments: "production"
    });
  })

  it('should add webp if options if  environment set as array and matches', async () => {
    const css = ".foo{background: url('~images/foo.jpg') no-repeat;}";

    const expected = [
      ".foo{background: url('~images/foo.jpg') no-repeat;}",
      ".webp .foo{background: url('~webp/foo.webp') no-repeat;}"
    ];
    return await run(css, expected, {
      env: "production",
      environments: ["production", "staging"]
    });
  })

  it("should not add webp if options if  environment set and doesn't matches", async () => {
    const css = ".foo{background: url('~images/foo.jpg') no-repeat;}";

    const expected = [".foo{background: url('~images/foo.jpg') no-repeat;}"];
    return await run(css, expected, {
      env: "development",
      environments: ["production", "staging"]
    });
  })
})
