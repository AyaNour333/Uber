// babel.config.js
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
        ],
        plugins: [
        "react-native-reanimated/plugin", // Keep this, but REMOVE worklets plugin if you have it
        ],
    };
};