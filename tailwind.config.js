// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',  // This will include all files in the `src` folder with these extensions
    './public/index.html',  // Ensure this path is correct based on where your index.html is located
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
