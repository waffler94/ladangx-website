/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
            pathname: '/**',
        },


        ],
    },
};

export default withNextIntl(nextConfig);
