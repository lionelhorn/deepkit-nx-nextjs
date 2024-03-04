"use client";

import {updateUserAge} from "../actions/UserActions";
import {FC} from "react";
import {User} from "@lionelhorn/utils";

export const UserView: FC<{ user: User }> = ({user}) => {
  return (
    <div>
      {user.first} {user.last}👋
      <div
        onClick={async () => {
          console.log(await updateUserAge());
        }}
      >
        {user.age}
      </div>
    </div>
  )
}
