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
			script: [
				{
					innerHTML: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1500438047674144');
fbq('track', 'PageView');`,
					type: 'text/javascript',
					tagPosition: 'head'
				}
			],
			noscript: [
				{
					innerHTML: '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1500438047674144&ev=PageView&noscript=1" />'
				}
			]
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
    },

    nitro: {
        prerender: {
            routes: [],
            ignore: ['/slice-simulator']
        }
    },

    hooks: {
        'pages:extend'(pages) {
            // Remove slice-simulator page during build
            const indexToRemove = pages.findIndex(page => page.path === '/slice-simulator')
            if (indexToRemove !== -1) {
                pages.splice(indexToRemove, 1)
            }
        }
    }
});