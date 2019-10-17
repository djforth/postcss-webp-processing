const WEBP_REGEXP = /^(~images)([\w\d/\-_]+)(\.[jpe?g|png]+)/

const checkReplaceTo = replaceTo =>
  replaceTo && typeof replaceTo === 'function'

const replaced = (path = '~webp') => {
  return path + '$2.webp'
}

module.exports = ({ replaceTo, webpPath }, { file, folder, url }) => {
  if (checkReplaceTo(replaceTo)) return replaceTo({ file, folder, url })

  let replacer = replaceTo || WEBP_REGEXP
  return url.replace(replacer, replaced(webpPath))
}
