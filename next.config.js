const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  poweredByHeader: false,
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});
