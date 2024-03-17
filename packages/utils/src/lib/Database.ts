import {Database} from "@deepkit/orm";
import { User } from "./User.js";
import { PostgresDatabaseAdapter } from "@deepkit/postgres";

const defaultSchemas = [
  User
];

export class PostgresDatabase extends Database {
  constructor(schemas: Array<any>) {
    const config = {
      host: process?.env["DB_HOST"] ?? "localhost",
      port: +(process?.env["DB_PORT"] ?? 5439),
      user: process?.env["DB_USER"] ?? "postgres",
      password: process?.env["DB_PASSWD"] ?? "root",
      database: process?.env["DB_DATABASE"] ?? "postgres"
    };
    console.log(config)

    super(new PostgresDatabaseAdapter(config), schemas);
  }
}

export class CurrentDatabase extends PostgresDatabase {
  constructor(schemas: Array<any> = defaultSchemas) {
    super(schemas);
  }
}
