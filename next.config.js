const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  poweredByHeader: false,
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Optimizing the Development Environment
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    return config;
  },
  // Experimental Features (Improved Performance)
  experimental: {
    esmExternals: false,
  },
});
