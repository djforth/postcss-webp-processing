const { CWebp } = require('cwebp')
const { resolve } = require('path')

const WEBP_REGEXP = /^(~images)([\w\d/\-_]+)(\.[jpe?g|png]+)/

const getImagePath = ({ imageFolder, resolvePath }, path) =>
  resolve(path.replace(imageFolder, resolvePath))

const getWebpPath = ({ webpFolder }, path) =>
  resolve(path.replace(WEBP_REGEXP, webpFolder + '$2.webp'))

module.exports = async (options, path) => {
  let imagePath = getImagePath(options, path)
  let webpPath = getWebpPath(options, path)
  let encoder = new CWebp(imagePath)

  try {
    await encoder.write(webpPath)
  } catch (e) {
    console.error(e)
  }
}
