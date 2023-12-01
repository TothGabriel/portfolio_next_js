import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Vous pouvez maintenant utiliser la classe 'dark' pour activer le mode sombre
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {}, // Assure-toi que la virgule est correctement placée ici
  plugins: [
    require('flowbite/plugin'),
  ],
};

export default config;
