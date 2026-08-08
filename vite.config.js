import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split the heavy third-party code so it caches independently
        // of the app code instead of shipping as one 1 MB chunk.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
          stripe: ["@stripe/stripe-js", "@stripe/react-stripe-js"],
          ui: ["@mui/joy", "react-slick", "react-toastify"],
        },
      },
    },
  },
});
