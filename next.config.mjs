/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_NAME: 'GalleryX',
    NEXT_PUBLIC_MONGODB_DB_NAME: 'GalleryX',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;

