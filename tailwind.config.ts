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
    plugins: [],
    theme: {
        extend: {
            aspectRatio: {
                auto: 'auto',
                square: '1 / 1',
                video: '16 / 9'
            }
        }
    }
}


