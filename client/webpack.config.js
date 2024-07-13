const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
 // TODO: Add and configure workbox plugins for a service worker and manifest file.

 // TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: './index.html',
        chunks: ['main']
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sx.js',
      }),
      new WebpackPwaManifest({
        // Fingerprints are used to cache bust the service worker.
        fingerprints: false,
        // Inject is set to true to inject the manifest into the html file.
        inject: true,
        // This is the manifest file name.
        name: "Just Another Text Editor",
        // This is the short name of the app.
        short_name: "JATE",
        // This is the description of the app.
        description: "A simple text editor",
        background_color: "#01579B",
        theme_color: "#01579B",
        // This is the start url of the app.
        start_url: "/",
        // This is the display mode of the app.
        publicPath: "./",
        display: "standalone",
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
          {
            src: path.resolve("./favicon.ico"),
            size: [48, 72, 96],
            destination: path.join("assets", "icons"),
            type: "image/ico",
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-object-rest-spread"],
            }
          }
        }
      ],
    },
  };
};



