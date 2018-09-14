const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    module: {
        rules: [
            // {
            //     test: /\.js$|\.jsx$/,
            //     exclude: [/node_modules/,/dist/],
            //     use:{
            //         loader: "eslint-loader",
            //         // preLoaders: "eslint-loader",
            //         query: {
            //             presets: ["es2015","react"]
            //         }
            //     }
            // },
            {
                test: /\.js$|\.jsx$/,
                exclude: [/node_modules/,/dist/],
                use:{
                    loader: "babel-loader",
                    // preLoaders: "eslint-loader",
                    query: {
                        presets: ["es2015","react"]
                    }
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: { limit: 40000 }
                  },
                  'image-webpack-loader'
                ]
            }
        ]
    },
    devServer: {
        inline: true,
        port: 8008
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};  