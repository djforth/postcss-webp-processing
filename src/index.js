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
  replaceFrom: /\.(jpe?g|png)/,
  resolvePath: 'app/javascript/images',
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

  return function (root) {
    // Transform CSS AST here
    if (!checkEnvironment(options)) return
    root.walkRules(rule => {
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

          let dec = postcss.decl({
            prop: decl.prop,
            value: v
          })

          root.append({
            selector: '.webp ' + rule.selector,
            nodes: [dec]
          })
        }
      })
    })
  }
})
