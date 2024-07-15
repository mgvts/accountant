// https://nuxt.com/docs/api/configuration/nuxt-config

import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
console.log(process.env.BASE_URL)

export default defineNuxtConfig({
    app: {
        baseURL: process.env.BASE_URL || '/' // dynamically set baseURL
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