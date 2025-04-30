// next.config.js
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
    return config;
  },
  images: {
    domains: [
      "s3.amazonaws.com",
      "maps.googleapis.com",
      "platform-lookaside.fbsbx.com",
    ], // Correct way to allow images from s3.amazonaws.com
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
