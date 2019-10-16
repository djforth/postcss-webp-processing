const FOLDER_REGEXP = /url\(['|"]?([\w\d/.~-]+)['|"]?/

module.exports = decl => {
  /*eslint-disable */
  let [attr, url] = decl.value.match(FOLDER_REGEXP)
  /* eslint-enable */
  let i = url.lastIndexOf('/')
  if (i === -1) return { folder: '', file: url }
  let folder = url.slice(0, i + 1)
  let file = url.slice(i + 1)

  return {
    file,
    folder,
    url
  }
}
