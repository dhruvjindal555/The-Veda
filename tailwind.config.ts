import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        garamond: ['"EB Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        ink:       '#1c0a00',
        paper:     '#fdf6ec',
        parchment: '#faf0dc',
        saffron:   '#c8671a',
        crimson:   '#8b1a1a',
        stone:     '#7a6a5a',
        chalk:     '#d4c4a8',
      },
    },
  },
  plugins: [],
}

export default config