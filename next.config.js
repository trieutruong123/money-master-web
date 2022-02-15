/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({
  imagesFolder: "public/images",
  handleImages: ["png"],
  images: {
    disableStaticImages: true,
  },
});
