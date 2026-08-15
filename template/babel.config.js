module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@': './src',
        },
      },
    ],
    // zod v4 ships `export * as x from '...'` in its entry files, which
    // @react-native/babel-preset doesn't transform on its own.
    '@babel/plugin-transform-export-namespace-from',
    'react-native-worklets/plugin',
  ],
};
