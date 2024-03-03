/// <reference types="vite/client" />
import {ApiConsoleModule} from '@deepkit/api-console-module';
import {App, onAppShutdown} from '@deepkit/app';
import {ApplicationServer, FrameworkModule, onServerMainBootstrapDone, onServerShutdown} from '@deepkit/framework';
import {LoggerInterface} from "@deepkit/logger";
import {eventDispatcher} from "@deepkit/event";
import {CurrentDatabase, UserController} from "@lionelhorn/utils";

class ServerListener {
  constructor(private database: CurrentDatabase, private logger: LoggerInterface) {
  }

  @eventDispatcher.listen(onServerMainBootstrapDone)
  async onMainBoostrap() {
    await this.database.migrate();
  }

  @eventDispatcher.listen(onServerShutdown)
  onServerShutdown() {
  }
}

const app = new App({
  providers: [CurrentDatabase],
  listeners: [ServerListener],
  controllers: [
    UserController
    // , MyOrmBrowserController
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
    // TODO: when https://github.com/deepkit/deepkit-framework/commit/69c56ebaa4c80bc612d784b84011d4a557f2853c
    // is released, remove line below
    await app.dispatch(onAppShutdown)
  });
}


