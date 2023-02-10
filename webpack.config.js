const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const mode = isProduction ? 'production' : 'development';

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
        }
      ]
    }),
  ],
  module: base.module,
  resolve: base.resolve,
};

module.exports = () => {
  return [ mainConfig, uiConfig ];
};
