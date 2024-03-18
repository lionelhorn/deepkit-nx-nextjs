import {App} from "@deepkit/app";
import {CurrentDatabase} from "../src";
import {ApplicationServer, FrameworkModule} from "@deepkit/framework";
import {ApiConsoleModule} from "@deepkit/api-console-module";
import {DatabaseSession, onDatabaseError} from "@deepkit/orm";
import {describe, expect, test} from "vitest";
import {Person} from "./types";
import {rpc, RpcWebSocketClient} from "@deepkit/rpc";
import {DbEventsListener} from "../src/lib/listeners/DbEventsListener";

describe("deepkit with db events listener", () => {
  test("db events & rpc", async () => {
    @rpc.controller("RpcPersonController")
    class RpcPersonController {
      constructor(private db: CurrentDatabase) {
      }

      @rpc.action()
      async insertPerson() {
        const newPerson = Person.createDummy();
        await this.db.persist(newPerson);
        return newPerson;
      }
    }

    const app = new App({
      providers: [
        {provide: CurrentDatabase},
      ],
      controllers: [
        RpcPersonController
      ],
      listeners: [
        DbEventsListener
      ],
      imports: [
        new FrameworkModule({
          debug: true,
          broker: {
            startOnBootstrap: true
          },
          port: 8042
        }),
        new ApiConsoleModule({
          path: '/api',
        }),
      ]
    });

    await app.get(CurrentDatabase).migrate();
    await app.get(ApplicationServer).start();

    const client = new RpcWebSocketClient("ws://127.0.0.1:8042");
    const rc = client.controller<RpcPersonController>("RpcPersonController");

    {
      const echoed = await rc.insertPerson();
      const stats = app.get(DbEventsListener);
      expect(echoed.firstName).toEqual(Person.createDummy().firstName);

      expect(stats.events).toHaveLength(3);
      expect(stats.errorEvents).toHaveLength(0);
    }
  });
})
