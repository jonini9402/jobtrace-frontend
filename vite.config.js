import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // 개발 환경에서도 PWA 활성화
      },
      manifest: {
        name: "JobTrace",
        short_name: "잡트",
        description: "모든 관심 채용 공고를 한눈에",
        theme_color: "#111111",
        background_color: "#f9f9f8",
        display: "standalone",
        start_url: "/jobs",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
});
