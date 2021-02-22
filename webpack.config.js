const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const miniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };
    if (isProd) {
        config.minimizer = [
            new TerserWebpackPlugin(),
            new OptimizeCSSAssetsWebpackPlugin()
        ]
    }
    return config;
}
const fileName = (ext) => {
    return isProd ? `[name].[contenthash].${ext}` : `[name].${ext}`
}
const cssLoaders = (extra) => {
    //Webpack reads from right to left. The order of loaders matters! First in - last out: the last element in the array will be read first.
    const loaders = [
        {
            loader: miniCSSExtractPlugin.loader,
            options: {
                publicPath: path.resolve(__dirname, 'dist')
            }
        },
        'css-loader'
    ]
    if (extra) loaders.push(extra);
    return loaders;
}
const babelOptions = (extraPreset) => {
    const options = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    }
    if (extraPreset) {
        options.presets.push(extraPreset)
    }
    return options;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ["@babel/polyfill", './index.jsx'],
        analytics: './analytics.ts'
    },
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.png'],//the order of extensions matters: Webpack can resolve files with equal names but different extensions in this order
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4300
    },
    devtool: !isProd ? 'source-map' : '',
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            //Patterns property is an array, where every object is an entity, 
            //that specifies files or entire directories, which already exist and need
            //to be copied to the build directory.
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }

            ]
        }
        ),
        new miniCSSExtractPlugin({
            filename: fileName('css'),
        }),
        new ESLintPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpeg|svg|gif)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions()
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions('@babel/preset-react')
                }
            }
        ]
    }
}