/// <reference types="vite/client" />
import {ApiConsoleModule} from '@deepkit/api-console-module';
import {App} from '@deepkit/app';
import {ApplicationServer, FrameworkModule} from '@deepkit/framework';
import {UserController} from "@lionelhorn/utils";
import {ApolloGraphQLModule} from "@deepkit-graphql/apollo";

const app = new App({
  providers: [],
  listeners: [],
  controllers: [
    UserController
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
    new ApolloGraphQLModule({
      introspection: true
    })
  ]
});

app.loadConfigFromEnv({prefix: 'APP_'});
app.get(ApplicationServer).start()

