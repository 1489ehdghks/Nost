const { override, addWebpackPlugin } = require('customize-cra');
const JavaScriptObfuscator = require('webpack-obfuscator');

process.env.GENERATE_SOURCEMAP = "false";

module.exports = override(
    addWebpackPlugin(
        new JavaScriptObfuscator({
            rotateStringArray: true,
            compact: true,
        }, ['excluded_bundle_name.js'])
    )
);
// "build": "react-app-rewired build",