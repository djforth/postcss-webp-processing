const postcss = require('postcss')
const { env } = require('process')

const MakeDirectories = require('./make_dir')
const MakeWebp = require('./make_webp')
const GetImagePath = require('./get_image_path')
const CreateNewPath = require('./create_new_path')
const CheckAttribute = require('./check_attribute')
const CreateAttribute = require('./create_attribute')

const DEFAULT_OPTS = {
  env,
  environments: 'all',
  imageFolder: /~images/,
  quality: 60,
  replaceFrom: /\.(jpe?g|png)/,
  resolvePath: 'app/javascript/images',
  webpClass: '.webp',
  webpFolder: 'tmp/webp',
  webpPath: '~webp'
}

const makeAssets = async (options, { folder, url }) => {
  await MakeDirectories(options, folder)
  await MakeWebp(options, url)
}

const checkEnvironment = ({ environments, env: e }) => {
  if (environments === 'all') return true

  if (Array.isArray(environments)) return environments.includes(e)

  return environments === e
}

module.exports = postcss.plugin('postcss-webp-processing', (opts = {}) => {
  let options = { ...DEFAULT_OPTS, ...opts }
  /* eslint-disable */
  let tester = new RegExp(`^${ options.webpClass }`)
  /* eslint-enable */
  return function (root) {
    // Transform CSS AST here
    if (!checkEnvironment(options)) return
    root.walkRules(rule => {
      if (tester.test(rule.selector)) return
      let decs = []
      rule.walkDecls(/^background-?|border-image/, decl => {
        if (CheckAttribute(options, decl)) {
          let paths = GetImagePath(decl)
          let webpPath = CreateNewPath(options, paths)

          makeAssets(options, paths)
            .then(() => {
              // console.log("Asset webp create");
            })
            .catch(e => {
              console.error(e)
            })

          let v = CreateAttribute(decl.value, webpPath)

          decs.push(postcss.decl({
            prop: decl.prop,
            value: v
          }))
        } else if (decl.prop === 'background-size') {
          decs.push(postcss.decl({
            prop: decl.prop,
            value: decl.value
          }))
        }
      })

      if (decs.length > 0) {
        root.append({
          selector: `${ options.webpClass } ${ rule.selector }`,
          nodes: decs
        })
      }
    })
  }
})
