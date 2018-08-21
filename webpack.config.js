const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const entryObj = { // order matters for properties
    polyfill: ['./node_modules/custom-elements/dist/CustomElements.min.js', './node_modules/custom-elements/dist/MutationObserver.min.js'],
    main: './index.ts'
};

const config = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3229
    },
    devtool: 'inline-source-map',
    entry: entryObj,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Simple-Components Demo',
            favicon: './src/assets/favicon.ico',
            template: './index.html'
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TSConfigPathsPlugin({ configFile: './tsconfig.json' })]
    },
    target: 'web'
};

module.exports = config;