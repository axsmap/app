// next.config.js
module.exports = {
  // reactStrictMode: true,
  images: {
    domains: [
      "s3.amazonaws.com",
      "maps.googleapis.com",
      "platform-lookaside.fbsbx.com",
      "lh3.googleusercontent.com",
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
