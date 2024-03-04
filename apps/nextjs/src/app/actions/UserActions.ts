"use server";

import {RpcWebSocketClient} from "@deepkit/rpc";
import {UserController} from "@lionelhorn/utils";

export async function updateUserAge() {
  "use server";

  const rpcClient = new RpcWebSocketClient('ws://127.0.0.1:8080');
  const rc = rpcClient.controller<UserController>('UserController');
  const user = await rc.updateUserAge()
  return user;
}
