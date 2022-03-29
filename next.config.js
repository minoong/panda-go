/** @type {import('next').NextConfig} */
module.exports = {
 reactStrictMode: true,
 experimental: {
  reactRoot: true,
  /*  runtime: "nodejs",
      serverComponents: true, */
  scrollRestoration: true,
 },
 images: {
  domains: ['imagedelivery.net', 'videodelivery.net'],
 },
};
