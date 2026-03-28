import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@msg": path.resolve(__dirname, "./src/components/msg"),
      "@icons": path.resolve(__dirname, "./src/components/icons"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@screens": path.resolve(__dirname, "./src/screens"),
      "@public": path.resolve(__dirname, "./public"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@recoil": path.resolve(__dirname, "./src/recoil"),
      "@graphql": path.resolve(__dirname, "./src/graphql"),
      "@configs": path.resolve(__dirname, "./src/configs"),
    },
  },
});
