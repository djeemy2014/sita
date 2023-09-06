//import webpack from "webpack";
//const webpack = require('webpack');

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports ={
	// Other rules...
    resolve:{
        fallback:{
            "zlib": require.resolve("browserify-zlib"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http")
        }
    },
	plugins: [
		new NodePolyfillPlugin()
	]
};
/* module.exports = function override(config, env) {
    config.resolve.fallback = {
                "url": false ,
                "zlib": false,
                "https": false,
                //"https": false,
                //"https": require.resolve("https-browserify"),
                "http": false,
                buffer: false 
            }
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );
    return config;
} */