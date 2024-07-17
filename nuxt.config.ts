// https://nuxt.com/docs/api/configuration/nuxt-config

import dotenv from 'dotenv'
import Aura from '@primevue/themes/aura'

dotenv.config({path: `.env.${process.env.NODE_ENV}`})
export default defineNuxtConfig({
    alias: {
      "@/": './'
    },
    ssr: false,
    app: {
        baseURL: process.env.NODE_ENV == 'production'
            ? '/accountant'
            : '/'
    },
    compatibilityDate: '2024-07-14',
    devtools: {enabled: true},
    plugins: [
        '@/plugins/dexie.ts',
        '@/plugins/primevue-toastservice.ts'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['@/assets/css/main.css', '@/assets/scss/main.scss'],
    modules: [
        '@nuxtjs/tailwindcss',
        '@primevue/nuxt-module'
    ],
    primevue: {
        autoImport: true,
        components: {
            include: '*',
        },
        directives: {
            include: '*'
        },
        options: {
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: '.p-dark',
                    cssLayer: false,
                },
            }
        }
    },
})