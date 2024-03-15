import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { deepkitType } from "@deepkit/vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/

console.log("vitest.config.ts", __dirname);

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom"
  },
  plugins: [
    react(),
    deepkitType({
      tsConfig: resolve(__dirname, "tsconfig.spec.json"),
      compilerOptions: {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "module": "ES2020",
        "target": "ES2020",
        "moduleResolution": "node",
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        // Needed for proper line mapping.
        // https://discordapp.com/channels/759513055117180999/1161961227413622864/1162425695650201680
        "sourceMap": true,
        "esModuleInterop": true,
        "declaration": true,
        "composite": true,
        // "rootDir": "src",
        "jsx": "react",
      }
    }),
    tsconfigPaths({
      root: "../..",
      parseNative: true
    })
  ],
  define: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: [
        "..",
        "../..",
        "/node_modules/vite/dist/client"
      ]
    }
  }
});
