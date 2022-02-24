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

module.exports = {
  i18n: {
    /**
     * Provide the locales you want to support in your application
     */
    locales: ["vi","en"],
    /**
     * This is the default locale you want to be used when visiting
     * a non-locale prefixed path e.g. `/hello`
     */
    defaultLocale: "en",
  },
};