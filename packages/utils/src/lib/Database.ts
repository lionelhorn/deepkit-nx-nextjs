import {Database} from "@deepkit/orm";
import {User} from "./User.js";
import {parseConnectionString, PostgresDatabaseAdapter} from "@deepkit/postgres";
import {PoolConfig} from "pg";

const defaultSchemas = [
  User
];

export class PostgresDatabase extends Database {
  constructor(schemas: Array<any>) {
    let connectionString = "postgres://postgres:root@localhost:5439/postgres";
    let config = parseConnectionString(connectionString);

    if (process?.env?.PG_CONNECTION_STRING) {
      config = parseConnectionString(process.env.PG_CONNECTION_STRING);
    }

    console.log(config)
    super(new PostgresDatabaseAdapter(config), schemas);
  }
}

export class CurrentDatabase extends PostgresDatabase {
  constructor(schemas: Array<any> = defaultSchemas) {
    super(schemas);
  }
}
