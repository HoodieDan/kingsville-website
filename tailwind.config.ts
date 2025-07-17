import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/components/**/*.{vue,js,ts}",
		"./src/layouts/**/*.vue",
		"./src/pages/**/*.vue",
		"./app.vue",
	],
	important: true, // 👈 forces all Tailwind utilities to be !important
	theme: {
		extend: {
			fontFamily: {
				sans: ["'Satoshi'", "sans-serif"],
				serif: ["'Zenith'", "serif"],
				satoshi: ["Satoshi"],
				zenith: ["Zenith"],
			},
			colors: {
				grey: "#E3E3E3",
			},
		},
	},
	plugins: [],
};

export default config;
