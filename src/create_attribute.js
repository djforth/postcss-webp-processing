const VALUE_REGEXP = /(url\(['|"]?)([\w\d/.~-]+)(['|"]?.+)/

module.exports = (value, webpPath) => {
  return value.replace(VALUE_REGEXP, '$1' + webpPath + '$3')
}
