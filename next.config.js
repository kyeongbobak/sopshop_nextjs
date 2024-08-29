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
  async redirects() {
    return [
      {
        source: `/search-results/products/:id`,
        destination: `/products/:id`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
