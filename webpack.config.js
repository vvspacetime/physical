"use strict";

const webpack = require('webpack');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        'webrtc-adapter',
        "./entry.js"
    ],
    output: {
        path: __dirname,
        filename: "./dist/physical.min.js",
        library: 'Spacetime',
        libraryTarget: 'umd'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-private-underscore', 'transform-regenerator']
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(
            'Physical JavaScript',
            'Date: ' + new Date().toISOString(),
            {
                entryOnly: true
            }
        ),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: true
        }),
        new UnminifiedWebpackPlugin()
    ],
    devtool: "source-map",

    jshint: {
        "esversion": 6,
        "globals": {
            "window": false,
            "console": false,
            "navigator": false
        }
    }
};