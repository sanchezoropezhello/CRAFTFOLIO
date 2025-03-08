
'use strict'
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackSimpleIncludePlugin = require("html-webpack-simple-include-plugin");
const autoprefixer = require('autoprefixer');


const rootDirectory = path.resolve(__dirname, "src");
const partialsDirectory = path.resolve(__dirname, "src/partials");

// Function to generate HtmlWebpackPlugin instances for each HTML file
function generateHtmlPlugins(rootDir) {
    const pages = [];
    const files = fs.readdirSync(rootDir);
    const htmlPageFiles = files.filter((file) => path.extname(file) === ".html");

    htmlPageFiles.forEach((file) => {
        pages.push(
            new HtmlWebpackPlugin({
                filename: file,
                template: path.join(rootDir, file),
            })
        );
    });

    return pages;
}

// Function to generate partial HTML plugins
function generatePartialHtmlPlugins(rootDir) {
    const partials = [];
    const files = fs.readdirSync(rootDir);
    const htmlPartialFiles = files.filter((file) => path.extname(file) === ".html");

    htmlPartialFiles.forEach((file) => {
        const baseName = path.basename(file, '.html');
        partials.push({
            tag: `<include-${baseName} />`,
            content: fs.readFileSync(path.join(rootDir, file), 'utf8')
        });
    });

    return new HtmlWebpackSimpleIncludePlugin(partials);
}

const htmlFiles = generateHtmlPlugins(rootDirectory);
const partialPlugins = generatePartialHtmlPlugins(partialsDirectory);


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/index.js',
        clean: true,
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        // open: true,
        hot: true,
        liveReload: true,
        watchFiles: ['src/**/*', 'src/partials/**/*'],
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(sc|sa|c|)ss$/i,
                use: [
                    {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader'
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer]
                            }
                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,  // Match font files
                type: 'asset/resource',  // Webpack 5 way to handle assets
                generator: {
                    filename: 'assets/fonts/[name][ext]',  // Output to 'assets/fonts'
                },
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: "asset/resource",
                generator: {
                    filename: 'assets/images/[name][ext]',
                },
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "assets/css/index.css",
        }),
        new CopyPlugin({
            patterns: [{ from: "src/assets/images", to: "assets/images" }],
        }),
        ...htmlFiles,
        partialPlugins

    ],
}