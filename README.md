# npm-publish-helper

![](https://img.shields.io/badge/node->%3D4.0.0-brightgreen.svg) ![](https://img.shields.io/badge/npm-2.14.2-brightgreen.svg) ![](https://img.shields.io/badge/babel-7.4.3-brightgreen.svg)

追求友好的 npm publish，让你发布的包支持低版本 node 的运行环境

## Usage 🐾

firstly, install global by npm:

```bash
npm install npm-publish-helper-oh -g
```

then, go to the package root directory, (same as npm publish)

```bash
nph publish
```

## Based on babel

```json
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        "@babel/plugin-transform-runtime"
    ]
}
```


## Issues

有任何意见或建议都欢迎提 [issue](https://github.com/huangxutao/npm-publish-helper/issues)

## License

MIT
