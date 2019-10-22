'use strict';

module.exports = {
  name: require('./package').name,

  included: function (app) {
    this._super.included(app);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import({
        development: 'vendor/masonry-layout/dist/masonry.pkgd.js',
        production: 'vendor/masonry-layout/dist/masonry.pkgd.min.js'
      });

      app.import({
        development: 'vendor/imagesloaded/imagesloaded.pkgd.js',
        production: 'vendor/imagesloaded/imagesloaded.pkgd.min.js'
      });
    }
  }
};
