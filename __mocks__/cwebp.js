const write = jest.fn(() => {
  return Promise.resolve("success");
});

const mock = jest.fn().mockImplementation(() => {
  return { write };
});

exports.write = write;
exports.CWebp = mock;
