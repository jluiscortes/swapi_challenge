import * as mySQLSecrets from "./db-secrets";
import fs from "fs";
import path from "path";

// change the path to the CA certificate if needed
const pathToCA = path.join(
  __dirname,
  mySQLSecrets.CA_CERT_PATH_TEMPORARY ||
    "../files/ca-certificate-release-0.0.1.crt"
);
export const MYSQL_SSL_CA = fs.readFileSync(pathToCA || "");
export const DEFAULT_PORT = "3306";
export const MYSQL = {
  HOST: mySQLSecrets.MYSQL_HOST,
  USER: mySQLSecrets.MYSQL_USER,
  PORT: parseInt(mySQLSecrets.MYSQL_PORT || DEFAULT_PORT),
  PASSWORD: mySQLSecrets.MYSQL_PASSWORD,
  DATABASE: mySQLSecrets.MYSQL_DATABASE,
  CA_CERTIFICATE: MYSQL_SSL_CA,
};
export const NODE_DB_ENV = mySQLSecrets.NODE_ENV;
export const GET_PERSON_BY_ID = "SELECT * FROM person WHERE id = ?";
export const GET_PERSONS = "SELECT * FROM person";
export const INSERT_PERSON =
  "INSERT INTO person (name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, films, species, vehicles, starships, created, edited, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
