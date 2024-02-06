/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "utfs.io", "localhost:3000/", "uploadthings.io"
    ]
  },
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

module.exports = nextConfig;
