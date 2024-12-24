import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                special: "var(--font-climate-crisis)",
                oi: "var(--font-oi-sans)",
            },
            colors: {
                background: "var(--background)",
                "background-secondary": "var(--background-secondary)",
                foreground: "var(--foreground)",
                accent: "var(--accent)",
                hint: "var(--hint)",
            },
        },
    },
    plugins: [],
} satisfies Config;
