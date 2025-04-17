// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["s3.amazonaws.com", "maps.googleapis.com"], // Correct way to allow images from s3.amazonaws.com
  },
};
