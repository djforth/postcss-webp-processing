# PostCSS Webp Processing

[PostCSS] plugin to process all png and jpg files to webp files.

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
postcss([require("postcss-webp-processing")]);
```

Options

See [PostCSS] docs for examples for your environment.

test
