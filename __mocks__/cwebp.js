const write = jest.fn(() => {
  return Promise.resolve("success");
});

const quality = jest.fn();

const mock = jest.fn().mockImplementation(() => {
  return { quality, write };
});

exports.write = write;
exports.CWebp = mock;
