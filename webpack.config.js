const path = require('path');  
const NodePolyfillPlugin = require ("node-polyfill-webpack-plugin");
console.log('test, ', __dirname);
module.exports = {
    mode: 'development',
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
   entry: {
      PreloginLib: path.resolve(__dirname, './features/cdx-prelogin/preloginlib/index.tsx')
   },
    plugins: [
        new NodePolyfillPlugin(),
    ],
   externals: {
    'react': {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        umd: 'react',
        root: 'React'
    },
    'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        umd: 'react-dom',
        root: 'ReactDOM'
    }
   },
   module: {
    rules: [
        {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-react",
                    "@babel/preset-typescript"
                ]
            }
        }
       
    }]
   },
   output: {
    path: path.resolve(__dirname, 'dist/bundles'),
    filename: 'prelogin/react-prelogin.js',
    library: 'prelogin',
    libraryTarget: 'umd',
    publicPath: ''
   }


}