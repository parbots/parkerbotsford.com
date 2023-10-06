/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: {
        relative: true,

        files: [
            "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
        ],
    },
    theme: {
        extend: {},
    },
    plugins: [],
};
