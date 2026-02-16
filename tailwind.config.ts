import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-archivo)", "system-ui", "sans-serif"],
        // Legacy aliases for backward compatibility during transition
        display: ["var(--font-cinzel)", "serif"],
        space: ["var(--font-cinzel)", "serif"],
      },
      fontSize: {
        '20vw': '20vw',
        '28vw': '28vw',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
