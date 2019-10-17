# PostCSS Webp Processing

[PostCSS] plugin to process all png and jpg files to webp files. This has been designed to work with [webpacker](https://github.com/rails/webpacker) and [webpack](https://webpack.js.org/)

[postcss]: https://github.com/postcss/postcss

```css
.my-background {
  background: url("~image/foo.jpg") no-repeat;
}

.my-border-image {
  border-image: url("~image/borders/bar.png");
}

.my-background-image {
  background-image: url("~image/foobar.jpeg");
}
```

```css
.my-background {
  background: url("~image/foo.jpg") no-repeat;
}

.my-border-image {
  border-image: url("~image/borders/bar.png");
}

.my-background-image {
  background-image: url("~image/foobar.jpeg");
}

.webp .my-background {
  background: url("~webp/foo.webp") no-repeat;
}

.webp .webp.my-border-image {
  border-image: url("~webp/borders/bar.webp");
}

.webp .my-background-image {
  background-image: url("~webp/foobar.webp");
}
```

## Usage

```js
postcss([require("postcss-webp-processing")({ /* ...your config */ })]);
```
or in postcss.config.js

```js
const WebpProcessing = require("postcss-webp-processing");
module.exports = {
  plugins: [
    WebpProcessing({ /* ...your config */ })
  ]
}
```

Option | Description | default
:-------|:-------|:-------
environments| sets the enviroments that it will be triggered, can be string 'production' or array ['staging', 'production']  | 'all',
imageFolder| The expected image folder |  /~images/
replaceFrom | Files to replace | /\.(jpe?g\|png)/
resolvePath | Actual path to images | 'app/javascript/images'
webpFolder | Where webp images will be generated  | 'tmp/webp'
webpPath: | Image path to be set in css | '~webp'

Additional webpacker config:

```js
const { resolve } = require('path');
const { environment } = require('@rails/webpacker');
const config = require('@rails/webpacker/package/config');

environment.config.set('resolve.alias', {
  images: resolve(config.source_path, 'images'),
  webp: resolve('tmp', 'webp'),
});

```

Additional or your webpack.config.js:
```js
const { resolve } = require('path');

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
  resolve.: {
    alias: {
      images: resolve('path/to/images', 'images'),
      webp: resolve('tmp', 'webp'),
    }
  }
};

```

# Bug reports

If you discover any bugs, feel free to create an issue on GitHub. Please add as much information as possible to help us fixing the possible bug. We also encourage you to help even more by forking and sending us a pull request.

https://github.com/djforth/postcss-webp-processing/issues

## Contribute

If you'd like to contribute, postcss-webp-processing is written using babel and rollup in ES6.

Please make sure any additional code should be covered in tests (Jest).

If you need to run the test please use:

```bash

yarn test

```

or to rebuild the JS run:

```bash

yarn build

```

## Maintainers

Adrian Stainforth (https://github.com/djforth)

# License

postcss-webp-processing is an open source project falling under the MIT License. By using, distributing, or contributing to this project, you accept and agree that all code within the @morsedigital/select-filter project are licensed under MIT license.
