import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { deepkitType } from "@deepkit/vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/

console.log("vite.config.ts", __dirname);

export default defineConfig({
  plugins: [
    react(),
    deepkitType({
      tsConfig: resolve(__dirname, "tsconfig.json"),
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
    //https://github.com/benjamine/jsondiffpatch/issues/315
    process: {}, //fix chalk error which is used by jsondiffpatch
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
