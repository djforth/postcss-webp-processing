const makeDir = require('make-dir')
const { resolve } = require('path')

module.exports = ({ imageFolder, webpFolder }, folder) => {
  let webpPath = resolve(folder.replace(imageFolder, webpFolder))

  return makeDir(webpPath).catch(e => new Error(e))
}
