module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: '.',
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
      },
    ],
    /**
     * CAUTION: Plugin has to be listed last. (required by react-native-reanimated)
     * https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation#babel-plugin
     * */
    'react-native-reanimated/plugin',
  ],
};
