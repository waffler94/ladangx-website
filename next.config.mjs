/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'ladangxadmin.upplex.com.my',
            port: '',
            pathname: '/**',
        }, {
            protocol: 'https',
            hostname: 'static.zpao.com',
            port: '',
            pathname: '/**',
        },


        ],
    },
};

export default withNextIntl(nextConfig);
