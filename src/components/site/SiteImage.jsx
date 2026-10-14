import Image from "next/image";

// next/image for photos that may come from anywhere (pasted links, uploads).
// Local files and Cloudinary uploads get optimized; any other link is shown
// as-is instead of crashing the page.
export default function SiteImage({ src, ...props }) {
  const optimizable = !/^https?:\/\//.test(src) || src.startsWith("https://res.cloudinary.com/");
  return <Image src={src} unoptimized={!optimizable} {...props} />;
}
