import { defineConfig } from "vitest/config";
import { deepkitType } from "@deepkit/vite";
import { resolve } from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  return {
    // Before putting esbuild to false, entity names and controllers in the debugger were being renamed.
    esbuild: false,
    build: {
      sourcemap: "inline",
      modulePreload: false,
      minify: false,
      rollupOptions: {
        preserveEntrySignatures: "strict",
        output: {
          esModule: true,
          format: "commonjs",
          ...(mode === "development"
            ? {
              entryFileNames: `[name].js`,
              chunkFileNames: `[name].js`,
              assetFileNames: `[name].[ext]`
            }
            : {})
        }
      }
    },
    resolve: {
      mainFields: ["module"]
    },
    plugins: [
      deepkitType({
        // We need to set the tsconfig path here otherwise it may fail if no "cwd" set in nx task
        // https://github.com/deepkit/deepkit-framework/blob/c5642fac13ab3aa2cfb56588c2240d05af628a61/packages/vite/src/plugin.ts#L30
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
          "rootDir": "src",
          "jsx": "react"
        }
      }),
      tsconfigPaths({
        root: "../..",
        parseNative: true
      })
    ]
  };
});
