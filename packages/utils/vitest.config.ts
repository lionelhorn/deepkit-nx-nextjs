import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import {deepkitType} from "@deepkit/vite";
import {resolve} from "node:path";
import {defineConfig} from 'vitest/config'

// https://vitejs.dev/config/

console.log("vitest.config.ts", __dirname);
export default defineConfig({
    test: {},
    plugins: [
      react(),
      deepkitType({
        tsConfig: resolve(__dirname, "tsconfig.spec.json"),
      }),
      tsconfigPaths({
        root: "../..",
        parseNative: true
      })
    ]
  }
)
