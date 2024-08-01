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
        '@/plugins/primevue-toastservice.ts',
        '@/plugins/directive.clickOutside.ts',
        '@/plugins/firebase.ts'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['@/assets/css/main.css', '@/assets/postcss/main.pcss'],
    modules: [
        '@nuxtjs/tailwindcss',
        '@primevue/nuxt-module',
        '@pinia/nuxt',
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
    pinia: {
        storesDirs: ['./stores/**'],
    },
    runtimeConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        public: {
            firebase: {
                apiKey: process.env.FIREBASE_API_KEY,
                authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                projectId: process.env.FIREBASE_PROJECT_ID,
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
                appId: process.env.FIREBASE_APP_ID,
            }
        }
    },
})