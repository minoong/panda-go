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
  domains: ['upload.wikimedia.org', 'imagedelivery.net', 'videodelivery.net', 'localhost'],
 },
};
