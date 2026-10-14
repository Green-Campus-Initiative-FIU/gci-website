/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // Photos uploaded through the site are stored on Cloudinary.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }],
  },
};

export default nextConfig;
