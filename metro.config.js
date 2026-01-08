const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Chain the native wind config onto the default Expo config
module.exports = withNativeWind(config, { input: "./global.css" });