const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const SRC_DIR = "src";
const DES_DIR = "build";

module.exports = {
    entry: path.join(__dirname, SRC_DIR, 'index.js'),
    output: {
        path: path.join(__dirname, DES_DIR),
        filename: 'index.bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        modules: [
            path.resolve(__dirname, SRC_DIR), 'node_modules'
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, SRC_DIR),
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.plain\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /^(?!.*?\.plain).*\.(css|scss)$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[local]___[hash:base64:5]"
                            },
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, SRC_DIR, 'index.html'),
            filename: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, SRC_DIR, 'assets'),
                    to: path.resolve(__dirname, DES_DIR)
                }
            ]
        }),
    ]

}