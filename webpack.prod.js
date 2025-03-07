// Mengimpor fungsi merge dari webpack-merge
const { merge } = require('webpack-merge');
// Mengimpor konfigurasi umum dari webpack.common.js
const common = require('./webpack.common');

module.exports = merge(common, {
    // Menentukan mode produksi
    mode: 'production',
    // Konfigurasi module
    module: {
        rules: [
            {
                // Menentukan aturan untuk file JavaScript
                test: /\.js$/,
                // Mengecualikan direktori node_modules
                exclude: /node_modules/,
                // Menggunakan babel-loader untuk memproses file JavaScript
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // Menggunakan preset-env dari Babel
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
        ],
    },
});