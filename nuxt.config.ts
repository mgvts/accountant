// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        baseURL: '/accountant/'
    },
    compatibilityDate: '2024-07-14',
    devtools: {enabled: true},

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['~/assets/css/main.css'],
    modules: ["@nuxt/ui", '@nuxtjs/tailwindcss']
})