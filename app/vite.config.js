import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "tos.png", "tos.png", "icon.png",  "icon.png", "robots.txt"],
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,jsx,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Mi Aplicación linda",
        short_name: "ReactPWA",
        description: "Una increíble aplicación creada por mí",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#090836",
        screenshots: [
          {
            
            src: "/img/gastos.png",
            sizes: "1280x581",
            type: "image/png",
            form_factor: "narrow", //es para pantallas pequeñas como móviles 
          },
          {
            src: "/img/gastos.png",
            sizes: "1280x581",
            type: "image/png",
            form_factor: "wide",
          },
        ],
        icons: [
          {
            src: "/img/icono.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/img/icono.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});