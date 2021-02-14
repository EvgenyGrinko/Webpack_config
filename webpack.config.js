const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png'],//the order of extensions matters: Webpack can resolve files with equal names but different extensions in this order
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']//wepack reads from right to left. The order of loaders matters! "css-loader" will be used first.
            },
            {
                test: /\.(png|jpeg|svg|gif)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            }
        ]
    }
}