import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
		head: {
			title: "Kingsville Church",
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
					content:
						"Kingsville Church was commissioned on a beautiful Easter Sunday in 2009. With worshippers from all the senatorial districts of Lagos state, we are a cosmopolitan church with an uncompromising tradition of life in the Word and the Spirit. We are driven by a desire for self-actualization in God; where every worshipper has unforgettable encounters and experiences with the word of His grace.",
				},
				{
					property: "og:image",
					content:
						"https://kingsville-website.vercel.app//images/logo.png",
				},
				{
					property: "twitter:card",
					content: "summary_large_image",
				},
				{
					property: "twitter:url",
					content: "https://kingsvillechurch.org/",
				},
				{
					property: "twitter:title",
					content: "Kingsville Church",
				},
				{
					property: "twitter:description",
					content:
						"Kingsville Church was commissioned on a beautiful Easter Sunday in 2009. With worshippers from all the senatorial districts of Lagos state, we are a cosmopolitan church with an uncompromising tradition of life in the Word and the Spirit. We are driven by a desire for self-actualization in God; where every worshipper has unforgettable encounters and experiences with the word of His grace.",
				},
				{
					property: "twitter:image",
					content:
						"https://kingsville-website.vercel.app//images/logo.png",
				},
				{
					property: "og:title",
					content: "Kingsville Church",
				},
				{
					property: "og:description",
					content:
						"Kingsville Church was commissioned on a beautiful Easter Sunday in 2009. With worshippers from all the senatorial districts of Lagos state, we are a cosmopolitan church with an uncompromising tradition of life in the Word and the Spirit. We are driven by a desire for self-actualization in God; where every worshipper has unforgettable encounters and experiences with the word of His grace.",
				},
				{
					property: "og:url",
					content: "https://kingsvillechurch.org/",
				},
				{
					property: "og:type",
					content: "website",
				},
			],
			link: [
				{ rel: "icon", type: "image/png", href: "/images/logo.png" },
			],
		},
	},

    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui", "@nuxtjs/prismic"],
    css: ["./src/assets/css/main.css", "./src/styles/index.scss"],

    vite: {
		plugins: [tailwindcss()],
	},

    prismic: {
        endpoint: apiEndpoint || repositoryName
    }
});