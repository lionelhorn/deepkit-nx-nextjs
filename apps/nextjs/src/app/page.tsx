import {RpcWebSocketClient} from "@deepkit/rpc";
import {UserController} from "@lionelhorn/utils";
import {UserView} from "./components/User";

export default async function Index() {
  const rpcClient = new RpcWebSocketClient('ws://127.0.0.1:8080');
  const rc = rpcClient.controller<UserController>('UserController');
  const user = await rc.getDummyUser()

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome
              <UserView user={user}/>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
