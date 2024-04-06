import mysql from "mysql2";
import { MYSQL } from "./utils/db-constants";

let connection = mysql.createConnection({
  host: MYSQL.HOST,
  port: MYSQL.PORT,
  user: MYSQL.USER,
  password: MYSQL.PASSWORD,
  database: MYSQL.DATABASE,
});

export default connection;
