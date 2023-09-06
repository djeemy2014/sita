const path = require("path");

const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const HtmlTagsPlugin = require("html-webpack-tags-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (_env, args) => ({
    externals: {
      cesium: "Cesium",
    },
    plugins: [
        // ...
        new CopyWebpackPlugin({
          patterns: [
            { from: "node_modules/cesium/Build/Cesium/Workers", to: "Workers" },
            { from: "node_modules/cesium/Build/Cesium/ThirdParty", to: "ThirdParty" },
            { from: "node_modules/cesium/Build/Cesium/Assets", to: "Assets" },
            { from: "node_modules/cesium/Build/Cesium/Widgets", to: "Widgets" },
            {
              from: "node_modules/cesium/Build/Cesium",
              to: "cesium",
            },
          ],
        }),
        new HtmlPlugin({
          template: "index.html",
        }),
        new HtmlTagsPlugin({
          append: false,
          tags: ["cesium/Widgets/widgets.css", "cesium/Cesium.js"],
        }),
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify("/cesium"),
        }),
      ]
}
)