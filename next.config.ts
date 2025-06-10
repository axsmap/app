// next.config.js
module.exports = {
  // reactStrictMode: true,
  images: {
    domains: [
      "s3.amazonaws.com",
      "maps.googleapis.com",
      "platform-lookaside.fbsbx.com",
      "www.flaticon.com",
      "lh3.googleusercontent.com"
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
