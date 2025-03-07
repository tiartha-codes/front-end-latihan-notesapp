// Mengimpor fungsi merge dari webpack-merge
const { merge } = require('webpack-merge');
// Mengimpor konfigurasi umum dari webpack.common.js
const common = require('./webpack.common.js');

module.exports = merge(common, {
    // Menentukan mode pengembangan
    mode: 'development',
    // Konfigurasi devServer
    devServer: {
        // Menentukan direktori statis
        static: './dist',
    },
});