/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    // Photos are shrunk in the browser first (src/utils/compressImage.js); this is the
    // ceiling for what's left. Vercel rejects request bodies over ~4.5 MB anyway.
    serverActions: { bodySizeLimit: "4mb" },
  },
  images: {
    // Photos uploaded through the site are stored on Cloudinary.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }],
  },
};

export default nextConfig;
