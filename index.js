'use strict';

module.exports = {
  name: require('./package').name,

  included: function (app) {
    this._super.included(app);
    console.log(app);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import({
        development: 'node_modules/masonry-layout/dist/masonry.pkgd.js',
        production: 'node_modules/masonry-layout/dist/masonry.pkgd.min.js'
      });

      app.import({
        development: 'node_modules/imagesloaded/imagesloaded.pkgd.js',
        production: 'node_modules/imagesloaded/imagesloaded.pkgd.min.js'
      });
    }
  }
};
