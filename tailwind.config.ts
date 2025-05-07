import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Geologica"', "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;
