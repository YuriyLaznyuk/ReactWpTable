const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin =require('mini-css-extract-plugin')
const ESLintWpPluginReact = require('eslint-webpack-plugin');

module.exports = {
    // output bundle file
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js'
    },
    devServer: {
        port: 5000,
        watchContentBase: true
    },
    // Loaders rules
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // use: [
                //     'babel-loader',
                //     'eslint-loader'
                //
                // ]

                use: {
                    loader: "babel-loader",
                    options:{
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                        ],
                    },
                },



            },
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader',
                'sass-loader']
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin(),new ESLintWpPluginReact({
            extensions:["js","jsx",]
        })
    ],
}