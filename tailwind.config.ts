/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    content: [
        "./src/components/**/*.{js,vue,ts}",
        "./src/layouts/**/*.vue",
        "./src/pages/**/*.vue",
        "./src/plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    plugins: [require('@savvywombat/tailwindcss-grid-areas')],
    theme: {
        extend: {
            aspectRatio: {
                auto: 'auto',
                square: '1 / 1',
                video: '16 / 9'
            },
            padding: {
                '4.5': '1.5rem',
            },
            width: {
                '100': '100%',
                '1/1': '100%'
            },
        }
    },
}


