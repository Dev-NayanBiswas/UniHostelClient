import daisyUi from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'logo-yellow': '#febd59',
        'gray-bg': '#3f3e3c',
      },
      fontFamily:{
        'heading':["Poppins", 'serif'],
        'para':["Roboto", 'serif'],
        'button':["Nunito", 'serif'],
      }
    },
  },
  daisyui: {
    themes: ["sunset", "lemonade"],
  },
  plugins: [daisyUi],
}