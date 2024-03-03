import {http} from "@deepkit/http";
import {rpc} from "@deepkit/rpc";

export const dummyUser = () => {
  return {first: "John", last: "Do", age: 42};
}

@http.controller("/users")
@rpc.controller("UserController")
export class UserController {

  constructor() {
  }

  @http.GET("/dummy")
  @rpc.action()
  async getDummyUser() {
    return dummyUser();
  }
}
