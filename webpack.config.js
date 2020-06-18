const webpack = require("webpack"); //to access built-in plugins
const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const TerserJSPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");


module.exports = {
    mode: "development",
    target: "node",
    entry: "./src/server.js",
    devtool: "source-map",
    output: {
        path: resolve(__dirname, "dist"),
        filename: "server.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    },
    resolve: {
        extensions: [ ".js", ".json", ".ts" ],
    },
    externals: [
        nodeExternals()
    ],
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({}),
        ],
    }
};