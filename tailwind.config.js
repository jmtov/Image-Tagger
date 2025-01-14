import plugin from 'tailwindcss/plugin';

const DEFAULT_NTH_CHILD = 30;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateAreas: '',
    },
  },
  plugins: [
    plugin(function ({ addBase, addUtilities }) {
      addBase({
        ...Object.fromEntries(
          Array(DEFAULT_NTH_CHILD)
            .fill(null)
            .map((_, index) => [`.delayed:nth-child(${index})`, { '--index': `${index}` }]),
        ),
      });

      addUtilities({
        '.delayed': {
          '--delay': 'calc((var(--index, 0) - var(--offset, 0)) * 25ms) !important',
        },
        '.fade-in-left': {
          transition:
            'opacity var(--speed-normal) ease-in-out, transform var(--speed-normal) ease-in-out',
          'transition-delay': 'calc(var(--delay, 0))',
        },
        '.fade-in-center': {
          transition:
            'opacity var(--speed-normal) ease-in-out, transform var(--speed-normal) ease-in-out',
          'transition-delay': 'calc(var(--delay, 0))',
        },
      });
    }),
  ],
};
