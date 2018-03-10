const path = require('path');

const config = {
    devtool: 'inline-source-map',
    entry: {
        main: "./index.ts",
        polyfill: ['./node_modules/custom-elements/dist/CustomElements.min.js', "./node_modules/custom-elements/dist/MutationObserver.min.js"]
    },
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    target: "web"
};

module.exports = config;