import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-black-100": "#171717",
      },
    },
  },
  plugins: [],
};

export default config;
