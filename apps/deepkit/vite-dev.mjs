import {createServer, createViteRuntime} from 'vite'
import {fileURLToPath} from "node:url";
import {deepkitType} from "@deepkit/vite";
import {resolve} from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import Inspect from 'vite-plugin-inspect'

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const config = {
  // Before putting esbuild to false, entity names and controllers in the debugger were being renamed.
  esbuild: false,
  resolve: {
    mainFields: ["default", "module"],
    conditions: ["default", "module"]
  },
  plugins: [
    Inspect(),
    deepkitType({
      // We need to set the tsconfig path here otherwise it may fail if no "cwd" set in nx task
      // https://github.com/deepkit/deepkit-framework/blob/c5642fac13ab3aa2cfb56588c2240d05af628a61/packages/vite/src/plugin.ts#L30
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
        "rootDir": "src",
        "jsx": "react"
      }
    }),
    tsconfigPaths({
      root: "../..",
      // Workaround code not running : https://github.com/aleclarson/vite-tsconfig-paths/issues/137#issuecomment-1974828940
      parseNative: true,
    })
  ]
};

(async () => {
  const server = await createServer(config)
  await server.listen()

  const runtime = await createViteRuntime(server, {
    hmr: false,
  })

  // Doesn't work yet.
  // No matching export in @deepkit/orm/dist/esm/browser.js for import "DatabaseRegistry"
  // Missing export in browser entrypoint?
  // https://discord.com/channels/759513055117180999/956485358382624790/1213802091001282570
  await runtime.executeEntrypoint('./src/app.ts')
})()
