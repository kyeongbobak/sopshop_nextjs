/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bdpgjcdbblibzheyulfo.supabase.co",
        pathname: "/storage/v1/object/public/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
