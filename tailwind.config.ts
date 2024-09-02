import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.white'),
            h1: { color: theme('colors.white') },
            h2: { color: theme('colors.white') },
            h3: { color: theme('colors.white') },
            h4: { color: theme('colors.white') },
            h5: { color: theme('colors.white') },
            h6: { color: theme('colors.white') },
            blockquote: { color: theme('colors.white') },
            table: {
              color: theme('colors.white'),
              borderCollapse: 'collapse',
              width: '100%',
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.4'),
              borderSpacing: '0',
              border: `1px solid ${theme('colors.gray.700')}`,
              borderRadius: theme('borderRadius.lg'),
              th: {
                border: `1px solid ${theme('colors.gray.700')}`,
                padding: theme('spacing.2'),
                textAlign: 'left',
                fontWeight: theme('fontWeight.bold'),
              },
              td: {
                border: `1px solid ${theme('colors.gray.700')}`,
                padding: theme('spacing.2'),
              },
              thead: {
                th: {
                  backgroundColor: theme('colors.gray.800'),
                },
              },
              tbody: {
                tr: {
                  '&:nth-child(1)': {
                    backgroundColor: theme('colors.gray.800'),
                  },
                },
              },
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};


export default config;
