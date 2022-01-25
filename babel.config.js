module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png',
          '.jpeg',
          '.jpg',
          '.svg',
        ],
        alias: {
          '@hooks': './src/hooks',
          '@components': './src/components',
          '@redux': './src/redux',
          '@pages': './src/pages',
          '@assets': './assets',
          '@services': './src/services',
          '@utils': './src/utils',
        },
      },
    ],
    ['module:react-native-dotenv'],
  ],
};
