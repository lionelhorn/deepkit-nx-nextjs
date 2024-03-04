import {http} from "@deepkit/http";
import {rpc} from "@deepkit/rpc";
import { User } from "./User";
import {cast} from "@deepkit/type";

export const dummyUser = cast<User>({first: "John", last: "Do", age: 50});

@http.controller("/users")
@rpc.controller("UserController")
export class UserController {

  constructor() {
  }

  @http.GET("/dummy")
  @rpc.action()
  async getDummyUser() {
    return dummyUser;
  }

  @rpc.action()
  async updateUserAge() {
    dummyUser.age += 1
    return dummyUser;
  }
}
