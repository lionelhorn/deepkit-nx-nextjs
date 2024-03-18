import {App} from "@deepkit/app";
import {CurrentDatabase, dummyUser, UserController} from "../src";
import {ApplicationServer, FrameworkModule} from "@deepkit/framework";
import {ApiConsoleModule} from "@deepkit/api-console-module";
import {DatabaseSession, onDatabaseError} from "@deepkit/orm";
import {describe, expect, test} from "vitest";
import {Person} from "./types";
import {rpc, RpcWebSocketClient} from "@deepkit/rpc";
import {sleep} from "@deepkit/core";

describe("deepkit app with event listener", () => {

  test("db events", async () => {
    const db = new CurrentDatabase([Person]);
    expect(db).toBeDefined();

    const personEntity = await db.getEntity("Person");
    expect(personEntity).toBeDefined();

    let events: Array<any> = []
    let errorEvents: Array<any> = []

    db.listen(onDatabaseError, e => errorEvents.push(e));

    db.listen(DatabaseSession.onCommitPre, async event => {
      events.push(event)
    });

    db.listen(DatabaseSession.onInsertPre, async event => {
      events.push(event)
    });

    db.listen(DatabaseSession.onInsertPost, async event => {
      events.push(event)
    });

    const app = new App({
      providers: [CurrentDatabase],
      imports: [
        new FrameworkModule({
          debug: true,
          broker: {
            startOnBootstrap: false
          }
        }),
        new ApiConsoleModule({
          path: '/api'
        }),
      ]
    });

    app.loadConfigFromEnv({prefix: 'APP_'});
    await app.get(ApplicationServer).start()

    await db.persist(Person.createDummy());
    expect(events).toHaveLength(3);
    expect(errorEvents).toHaveLength(0);
  });

  test("db events & rpc", async () => {
    const person = Person.createDummy();

    @rpc.controller("RpcUserController")
    class RpcUserController {
      constructor(private db: CurrentDatabase) {
      }

      @rpc.action()
      async insertPerson() {
        await this.db.persist(person);
        return person;
      }
    }

    const db = new CurrentDatabase([Person]);
    await db.migrate();

    let events: Array<any> = []
    let errorEvents: Array<any> = []

    db.listen(onDatabaseError, e => errorEvents.push(e));

    db.listen(DatabaseSession.onCommitPre, async event => {
      events.push(event)
    });

    db.listen(DatabaseSession.onInsertPre, async event => {
      events.push(event)
    });

    db.listen(DatabaseSession.onInsertPost, async event => {
      events.push(event)
    });

    const app = new App({
      providers: [
        {provide: CurrentDatabase, useValue: db, scope: 'rpc'},
      ],
      controllers: [
        RpcUserController
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

    await app.get(ApplicationServer).start();

    const client = new RpcWebSocketClient("ws://127.0.0.1:8042");
    const rc = client.controller<RpcUserController>("RpcUserController");

    {
      const echoed = await rc.insertPerson();
      expect(echoed.firstName).toEqual(person.firstName);

      expect(events).toHaveLength(3);
      expect(errorEvents).toHaveLength(0);
    }
  });
})
