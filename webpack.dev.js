const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = [
  {
    mode: 'development',
    entry: './src/electron.ts',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'electron.js',
    },
    target: 'electron-main',
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: 'last 2 versions, ie 11',
                      node: 'current',
                    },
                  },
                ],
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      }],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
  },
  {
    mode: 'development',
    entry: {
      login: ['babel-polyfill', './src/apps/login.tsx'],
      // dashboard: ['babel-polyfill', './src/apps/dashboard.tsx'],
      // terminal: ['babel-polyfill', './src/apps/terminal.tsx'],
      watcher: ['./src/watcher.tsx'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
    },
    target: 'electron-renderer',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: /src/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  'babel-plugin-styled-components',
                ],
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      modules: false,
                      targets: {
                        browsers: 'last 2 versions, ie 11',
                        node: 'current',
                      },
                    },
                  ],
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
              },
            },
          ],
        },
        {
          test: /\.hbs$/,
          include: /src/,
          use: [{ loader: 'handlebars-loader' }],
        },
        {
          test: /\.scss$/,
          include: /src/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        title: 'Wraithnet - Login',
        filename: 'login.html',
        template: './src/templates/index.hbs',
        chunks: ['login', 'watcher'],
        inject: true,
      }),
      // new HtmlWebpackPlugin({
      //   title: 'Wraithnet',
      //   filename: 'dashboard.html',
      //   template: './src/templates/index.hbs',
      //   chunks: ['dashboard', 'watcher'],
      //   inject: true,
      // }),
      // new HtmlWebpackPlugin({
      //   title: 'Wraithnet',
      //   filename: 'terminal.html',
      //   template: './src/templates/index.hbs',
      //   chunks: ['terminal', 'watcher'],
      //   inject: true,
      // }),
      new WebpackShellPluginNext({
        onBuildEnd: {
          scripts: ['npm run start:electron'],
          blocking: false,
          parallel: true,
        }
      })
    ],
  },
];
