const path = require('path');

const config = {
    // common properties for all configs
};

const coreConfig = Object.assign({}, config, {
    entry: './index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
});

const polyfillConfig = Object.assign({}, config, {
    entry: ['./node_modules/custom-elements/dist/CustomElements.min.js', "./node_modules/custom-elements/dist/MutationObserver.min.js"],
    module: {
        rules: []
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        filename: 'polyfill.js',
        path: path.resolve(__dirname, 'dist')
    }
});

module.exports = [
    coreConfig,
    polyfillConfig
];