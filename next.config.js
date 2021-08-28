module.exports = {
  webpack(config) {
    config.module.rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] });
    return config;
  },
  images: {
    domains: ['cdn2.thedogapi.com'],
  },
};
