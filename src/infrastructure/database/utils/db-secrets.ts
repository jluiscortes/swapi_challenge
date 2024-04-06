import dotenv from "dotenv";
dotenv.config();

export const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  CA_CERT_PATH_TEMPORARY,
  NODE_ENV,
} = process.env;
