const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV == 'development';

const mode = isDevelopment ? 'development' : 'production';

const stylesHandler = 'style-loader';

const base = {
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
}

const mainConfig = {
  entry: './src/main/index.ts',
  target: 'electron-main',
  mode,
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/main'),
  },
  module: base.module,
  resolve: base.resolve,
}

const uiConfig = {
  entry: './src/ui/index.tsx',
  target: 'electron-renderer',
  mode,
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/ui'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          context: './src/ui',
          from: '**/*.html',
        },
        {
          context: './src/ui',
          from: 'assets/**/*',
        }
      ]
    }),
  ],
  module: base.module,
  resolve: base.resolve,
};

const uiHighScoresConfig = {
  ...uiConfig,
  entry: './src/ui-high-scores/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/ui-high-scores'),
  },
}

module.exports = () => {
  return [ mainConfig, uiConfig, uiHighScoresConfig ];
};
