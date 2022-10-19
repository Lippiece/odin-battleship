import path from "node:path";
import url from "node:url";
import glob from "glob";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
export default {
  entry: glob.sync("./src/**/*.js"),
  // Entry    : "/src/main/script.js",
  mode: "development",
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Battleships",
      templateContent: `
	<!DOCTYPE html>
    <html>
			<head>
				<link rel="stylesheet" href="https://use.typekit.net/ysp2yzy.css">
		    <link rel="stylesheet" href="https://meyerweb.com/eric/tools/css/reset/reset.css">
				<meta name="viewport" content="width=device-width, initial-scale=1">
			</head>
    </html>
  `,
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "dist"),
    clean: true,
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|jfif|webp)$/i,
        type: "asset",
      },
      // compress images
      {
        test: /\.(png|svg|jpg|jpeg|gif|jfif|webp)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                  plugins: [
                    "imagemin-gifsicle",
                    "imagemin-mozjpeg",
                    "imagemin-pngquant",
                    "imagemin-svgo",
                  ],
                },
              },
            },
          },
        ],
      },
      {
        test: /\.m?js/,
        type: "javascript/auto",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  devServer: {
    compress: true,
  },
};
