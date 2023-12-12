/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.imagin.studio"],
  },
  typescription: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
