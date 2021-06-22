/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const AutomaticVendorFederation = require("@module-federation/automatic-vendor-federation");
const webpack = require("webpack");
const dotenv = require("dotenv").config({ path: `${__dirname}/.env` });
const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");
const packageJson = require("./package.json");
// in case you run into any typescript error when configuring `devServer`
// DASHBOARD_CONFIG = {
//   DASHBOARD_ENDPOINT: "http://localhost:8087",
//   REMOTE_COMPONENTS: {
//     furyconnectswitchui: {
//       scope: "FuryConnectSwitchUI",
//       module: "./FurySupport",
//       url: "http://localhost:8084/remoteEntry.js",
//       params: { apiurl: "http://localhost:8083" },
//     },
//   },
// };

const FURY_DESIGN_SYSTEM_PATH = path.resolve(
  __dirname,
  "./node_modules/fury-design-system/dist/eui_theme_fury_community.css"
);
const exclude = ["babel", "plugin", "preset", "webpack", "loader", "serve"];
const ignoreVersion = ["react", "react-dom"];
const automaticVendorFederation = AutomaticVendorFederation({
  exclude,
  ignoreVersion,
  packageJson,
  shareFrom: ["dependencies", "peerDependencies"],
  ignorePatchVersion: false,
});

const yamlConfigToAppConfig = (offline, configPath) => {
  const file = fs.readFileSync(
    configPath || path.join(__dirname, "..", "config.yml"),
    "utf-8"
  );

  const yamlConfig = yaml.load(file);

  return {
    APP_ENV: yamlConfig.appEnv,
    SERVER_OFFLINE: offline,
    SERVER_BASE_PATH: yamlConfig.externalEndpoint,
    DASHBOARD_CONFIG: JSON.stringify({
      DASHBOARD_ENDPOINT: yamlConfig.externalEndpoint,
      remoteComponents: yamlConfig.remoteComponents,
    }),
  };
};

function envToAppConfig() {
  return {
    APP_ENV: process.env.APP_ENV,
    SERVER_OFFLINE: process.env.SERVER_OFFLINE,
    SERVER_BASE_PATH: process.env.SERVER_BASE_PATH
      ? process.env.SERVER_BASE_PATH
      : "",
  };
}

module.exports = (env) => {
  console.log(env);

  return {
    mode: "development",
    devtool: "inline-source-map",
    output: {
      publicPath: "/",
    },
    devServer: {
      port: 8082,
      publicPath: "/",
      historyApiFallback: {
        rewrites: [{ from: /./, to: "/index.htm" }],
      },
      index: "index.htm",
    },
    optimization: {
      minimize: false,
    },
    resolve: {
      fallback: {
        util: false,
        buffer: false,
        path: false,
        zlib: false,
        os: false,
        fs: false,
        http: false,
        https: false,
      },
      extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /bootstrap\.js$/,
          loader: "bundle-loader",
          options: {
            lazy: true,
          },
        },
        {
          test: /\.m?js$/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          /* The following line to ask babel
                    to compile any file with extension .js */
          test: /\.(js|jsx)?$/,
          /* exclude node_modules directory from babel.
                    Babel will not compile any files in this directory */
          exclude: /node_modules/,
          // To Use babel Loader
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env" /* to transfer any advansed ES to ES5 */,
              "@babel/preset-react",
            ], // to compile react to ES5
          },
        },
        // {
        //   test: /\.css$/i,
        //   include: [FURY_DESIGN_SYSTEM_PATH],
        //   use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        // },
        {
          test: /\.(css|scss)$/i,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          exclude: /node_modules/,
          use: ["file-loader?name=[name].[ext]"],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "index.css",
        chunkFilename: "index.css",
      }),
      new ModuleFederationPlugin({
        name: "Dashboard",
        // filename: 'remoteEntry.js',
        exposes: {},
        remotes: {
          // remotes will be loaded dinamically from the app.jsx
        },
        shared: {
          ...automaticVendorFederation,
          react: {
            eager: false,
            singleton: true,
            requiredVersion: packageJson.dependencies.react,
          },
          "react-dom": {
            eager: false,
            singleton: true,
            requiredVersion: packageJson.dependencies["react-dom"],
          },
          "fury-design-system": {
            eager: false,
            singleton: true,
            requiredVersion: packageJson.dependencies["fury-design-system"],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.htm",
        favicon: "./public/favicon.ico",
        manifest: "./public/manifest.json",
        filename: "index.htm",
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify({
          ...(dotenv.parsed ? dotenv.parsed : {}),
          ...(env.from_yaml
            ? yamlConfigToAppConfig(env.offline, env.config_path)
            : envToAppConfig()),
        }),
      }),
    ],
  };
};
