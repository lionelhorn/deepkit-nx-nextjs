import {Database} from "@deepkit/orm";
import { User } from "./User.js";
import { PostgresDatabaseAdapter } from "@deepkit/postgres";

const schemas = [
  User
];

export class PostgresDatabase extends Database {
  constructor() {
    super(new PostgresDatabaseAdapter({
      host: process?.env["DB_HOST"] ?? "localhost",
      port: +(process?.env["DB_PORT"] ?? 5439),
      user: process?.env["DB_USER"] ?? "postgres",
      password: process?.env["DB_PASSWD"] ?? "root",
      database: process?.env["DB_DATABASE"] ?? "postgres"
    }), schemas);
  }
}

export class CurrentDatabase extends PostgresDatabase {
  constructor() {
    super();
  }
}
