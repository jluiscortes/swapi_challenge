import mysql from "mysql";
import { MYSQL } from "./utils/db-constants";

const connection = mysql.createConnection({
  host: MYSQL.HOST,
  user: MYSQL.USER,
  password: MYSQL.PASSWORD,
  database: MYSQL.DATABASE,
});

export default connection;
