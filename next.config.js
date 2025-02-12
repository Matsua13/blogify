// eslint-disable-next-line @typescript-eslint/no-require-imports
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { isServer }) => {
    // Fournir des fallbacks pour certains modules Node côté client
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      module: false,
      net: false,
      tls: false,
      child_process: false,
      'node-gyp': false,
      npm: false,
    };

    // Ajout d'une règle pour charger les fichiers HTML dans @mapbox/node-pre-gyp
    config.module.rules.push({
      test: /\.html$/,
      include: /node_modules[\\\/]@mapbox[\\\/]node-pre-gyp/,
      use: 'raw-loader',
    });

    // Ignore certains modules inutiles via IgnorePlugin
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /(node-gyp|npm|mock-aws-s3|nock)/,
      })
    );

    // Pour le bundle client (ou pour le middleware), externaliser certains modules problématiques
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push((context, request, callback) => {
        // Ajoutez npmlog à la liste, ainsi que bcrypt, node-pre-gyp et fs.realpath
        if (/^(bcrypt|@mapbox\/node-pre-gyp|node-pre-gyp|fs\.realpath|npmlog)$/.test(request)) {
          return callback(null, 'commonjs ' + request);
        }
        callback();
      });
    }

    return config;
  },
};
