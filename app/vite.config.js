import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "img/icono.png"
      ],

      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },

      manifest: {
        name: "Mi Aplicación de Gastos",
        short_name: "Gastos",
        description: "Sistema de gestión de gastos",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#090836",

        screenshots: [
          {
            src: "/img/gastos.png",
            sizes: "1280x581",
            type: "image/png",
            form_factor: "narrow",
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

      devOptions: {
        enabled: true, 
      },
    }),
  ],
});