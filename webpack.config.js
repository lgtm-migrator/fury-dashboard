const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const AutomaticVendorFederation = require('@module-federation/automatic-vendor-federation');
const packageJson = require('./package.json');
const exclude = ['babel', 'plugin', 'preset', 'webpack', 'loader', 'serve'];
const ignoreVersion = ['react', 'react-dom'];
const automaticVendorFederation = AutomaticVendorFederation({
  exclude,
  ignoreVersion,
  packageJson,
  shareFrom: ['dependencies', 'peerDependencies'],
  ignorePatchVersion: false,
});
module.exports = {
  mode: 'development',
  devServer: {
    port: 8082,
  },
  // optimization: {
  //   minimize: false
  // },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
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
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env' /* to transfer any advansed ES to ES5 */,
            '@babel/preset-react',
          ], // to compile react to ES5
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]']
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin(
      {
        name: 'Dashboard',
        // filename: 'remoteEntry.js',
	      exposes: {},
        remotes: {
          FuryConnectSwitchUI: 'FuryConnectSwitchUI@http://localhost:8083/remoteEntry.js',
          // furyConnectSwitchToggle: 'fury_connect_switch_toggle@http://localhost:3003/toggleUi.js',
          // furyConnectSwitchInterface: 'fury_connect_switch_interface@http://localhost:3002/userInterface.js',
        },
        shared: {
          ...automaticVendorFederation,
          react: {
            eager: false,
            singleton: false,
            requiredVersion: packageJson.dependencies.react,
          },
          'react-dom': {
            eager: false,
            singleton: false,
            requiredVersion: packageJson.dependencies['react-dom'],
          },
          'fury-design-system': {
            eager: false,
            singleton: false,
            requiredVersion: packageJson.dependencies['fury-design-system'],
          },
        },
      }
    ),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      manifest: './public/manifest.json'
    }),
  ],
};