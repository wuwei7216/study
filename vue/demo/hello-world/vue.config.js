// const { defineConfig } = require('@vue/cli-service')

// vue.config.js
var path = require('path');
var SpritesmithPlugin = require('webpack-spritesmith');
var templateFunction = function (data) {
  var shared = '.ico { background-image: url(I) }'
      .replace('I', data.sprites[0].image);
  var perSprite = data.sprites.map(function (sprite) {
      return '.ico-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
          .replace('N', sprite.name)
          .replace('W', sprite.width)
          .replace('H', sprite.height)
          .replace('X', sprite.offset_x)
          .replace('Y', sprite.offset_y);
  }).join('\n');

  return shared + '\n' + perSprite;
};
module.exports = {
  transpileDependencies: true,
  runtimeCompiler: true,
  configureWebpack: config => {
    config.resolve.modules = ["node_modules", "spritesmith-generated"]
    let plugins = [
      new SpritesmithPlugin({
        src: {
            cwd: path.resolve(__dirname, 'src/assets/icon'),
            glob: '*.png'
        },
        target: {
            image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
            css: [
              [path.resolve(__dirname, 'src/spritesmith-generated/sprite.css'), {
                format: 'handlebars_based_template'
              }]
            ]
        },
        customTemplates: {
          'handlebars_based_template': templateFunction,
        },
        apiOptions: {
            cssImageRef: "~sprite.png"
        }
      })
    ]
    config.plugins = [...config.plugins, ...plugins]
  }
}


// module.exports = defineConfig({
//   transpileDependencies: true,
//   runtimeCompiler: true
// })
