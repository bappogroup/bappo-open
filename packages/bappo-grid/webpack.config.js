const HtmlWebPackPlugin = require("html-webpack-plugin");
const babelOptions = require("../bappo-components/.babelrc");
const path = require("path");

module.exports = {
  entry: () => "./sample-app/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions
          },
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./sample-app/index.html",
      filename: "index.html"
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "bappo-components": path.join(__dirname, "../bappo-components/es"),
      react: path.join(__dirname, "./sample-app/node_modules/react"),
      "react-dom": path.join(__dirname, "./sample-app/node_modules/react-dom"),
      "./sample-app/node_modules/unstable-native-dependencies": path.join(
        __dirname,
        "./sample-app/node_modules/react-dom/unstable-native-dependencies"
      )
    }
  },
  devServer: {
    port: 9001
  }
};
