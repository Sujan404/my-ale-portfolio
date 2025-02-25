/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite/**/*.js',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}'
  ],
  theme: {
    fontFamily: {
      roboto: ['Roboto Mono', 'monospace']
    },
    extend: {}
  },
  plugins: [flowbitePlugin]
}
