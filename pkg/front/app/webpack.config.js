const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = 'development';

module.exports = (env, argv) => ({
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        "main": path.resolve("pkg/front/app/main.jsx")
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                enforce: "pre",
                use: ["source-map-loader"],
            }
        ]
    },
    resolveLoader: {
        modules: [
            path.resolve("bazel-out/darwin_arm64-fastbuild/bin/external/npm/node_modules"),
            "node_modules"
        ]
    },
    resolve: {symlinks: false},
    watch: true,
    watchOptions: {
        followSymlinks: true,
        ignored: [
            '**/node_modules/**',
            '**/node_modules',
        ],
    },
    output: {
        filename: '[name].js'
    },
    devServer: {
        hot: false,
        liveReload: true,
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname)
        },
        port: 8080
    },
    stats: {
        errorDetails: true
    },
    plugins: [
        new webpack.DefinePlugin({}),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ],
    resolve: {
        extensions: ['.wasm', '.mjs', '.json', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            process: "process/browser"
        }
    },
});