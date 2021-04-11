module.exports = {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links', 
    'storybook-addon-designs',
    '@storybook/addon-a11y',
    '@whitespace/storybook-addon-html'
  ],
  typescript: {
    check: false,
    checkOptions: {    
    },
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
}
