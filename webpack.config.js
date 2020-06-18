const webpack = require("webpack"); //to access built-in plugins
const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/server.js",
    output: {
        path: resolve(__dirname, "dist"),
        filename: "server.js"
    },
    module: {

    },
    resolve: {
        extensions: [ ".js", ".json", ".ts" ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin()
    ],
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty",
        module: "empty",
        dns: "empty",
        child_process: "empty",
    }
};