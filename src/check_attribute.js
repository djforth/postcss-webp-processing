module.exports = ({ imageFolder, replaceFrom }, { value }) => {
  return (
    /url/.test(value) &&
    !/webp/.test(value) &&
    replaceFrom.test(value) &&
    imageFolder.test(value)
  )
}
