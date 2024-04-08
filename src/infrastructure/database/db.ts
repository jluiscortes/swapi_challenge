import mysql from "mysql2";
import { MYSQL } from "./utils/db-constants";

const connectionDatabase = mysql.createConnection({
  host: MYSQL.HOST,
  port: MYSQL.PORT,
  user: MYSQL.USER,
  password: MYSQL.PASSWORD,
  database: MYSQL.DATABASE,
  ssl: {
    ca: MYSQL.CA_CERTIFICATE,
  },
});

export default connectionDatabase;
