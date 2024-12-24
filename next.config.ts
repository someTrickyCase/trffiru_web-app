import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        WC_KEY: "ck_922d6032c4a4e08b7d56d77e9add1c937d9b0af1",
        WC_SECRET: "cs_ac7aa592c1360c9ddbce52ff17729479164a9c9c",
        BITRIX_KEY: "8qh76a58yasowacf",

        // ALLOWED_METHODS: "GET, POST, PUT, DELETE, OPTIONS",
        // ALLOWED_ORIGIN: "*",
        // ALLOWED_HEADERS: "Content-Type, Authorization",
        // DOMAIN_URL: "http://localhost:3000",
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "troffi.ru",
            },
        ],
    },
};

export default nextConfig;
