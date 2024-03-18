/// <reference types="vite/client" />
import {ApiConsoleModule} from '@deepkit/api-console-module';
import {App} from '@deepkit/app';
import {ApplicationServer, FrameworkModule} from '@deepkit/framework';
import {CurrentDatabase, } from "@lionelhorn/utils";


const app = new App({
  providers: [CurrentDatabase],
  listeners: [],
  controllers: [
  ],
  imports: [
    new FrameworkModule({
      debug: true,
      broker: {
        startOnBootstrap: true
      }
    }),
    new ApiConsoleModule({
      path: '/api'
    }),
  ]
});

app.loadConfigFromEnv({prefix: 'APP_'});
app.get(ApplicationServer).start()

if (import.meta.hot) {
  import.meta.hot.on("vite:beforeFullReload", async () => {
    const server = app.get(ApplicationServer);
    console.log("[vite] Stopping deepkit server")
    await server.close(true);
  });
}


