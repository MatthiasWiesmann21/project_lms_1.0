/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });

    return config;
  },
  images: {
    domains: [
      "utfs.io", "localhost:3000/", "uploadthings.io"
    ]
  },
}

module.exports = {
  nextConfig,
  i18n,
}
