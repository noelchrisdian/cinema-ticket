import { type Config } from "tailwindcss";

const config: Config = {
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
	],
	theme: {
        extend: {
            spacing: {}
        },
	},
	plugins: []
}

export default config;