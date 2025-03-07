// Mengimpor modul path dari Node.js
const path = require('path');
// Mengimpor plugin HtmlWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Mengimpor plugin CopyWebpackPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // Menentukan file entry point untuk aplikasi
    entry: path.join(__dirname, 'src/app.js'),
    // Menentukan konfigurasi output
    output: {
        // Menentukan direktori output
        path: path.join(__dirname, 'dist'),
        // Menentukan nama file output
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                // Menentukan aturan untuk file CSS
                test: /\.css$/,
                // Menggunakan style-loader dan css-loader untuk memproses file CSS
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        // Menggunakan plugin HtmlWebpackPlugin untuk menghasilkan file HTML
        new HtmlWebpackPlugin({
            // Menentukan template HTML
            template: path.join(__dirname, 'index.html'),
            // Menentukan nama file output HTML
            filename: 'index.html',
        }),
    ],
};