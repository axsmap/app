// next.config.js
module.exports = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "s3.amazonaws.com",
      "maps.googleapis.com",
      "platform-lookaside.fbsbx.com",
    ], // Correct way to allow images from s3.amazonaws.com
  },
};
