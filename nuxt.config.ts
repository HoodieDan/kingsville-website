import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			title: "Nuxt Starter",
			htmlAttrs: {
				lang: "en",
			},
			meta: [
				{ charset: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{ name: "format-detection", content: "telephone=no" },
				{
					name: "description",
					content: "This is a starter Nuxt project",
				},
				{
					property: "og:image",
					content: "",
				},
				{
					property: "twitter:card",
					content: "summary_large_image",
				},
				{
					property: "twitter:url",
					content: "https://pithafrica.com/",
				},
				{
					property: "twitter:title",
					content: "Nuxt Starter",
				},
				{
					property: "twitter:description",
					content: "This is a starter Nuxt project",
				},
				{
					property: "twitter:image",
					content: "",
				},
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		},
	},
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui"],
	css: ["./src/assets/css/main.css", "./src/styles/index.scss"],
	vite: {
		plugins: [tailwindcss()],
	},
});