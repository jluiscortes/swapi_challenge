import { Person, PersonSwapi } from "../../entites/person/utils/person-model";
import i18next from "i18next";
import * as Translate from "../../../infrastructure/config/i18n";
import { splitData, splitDataToDb, URL_SWAPI } from "./utils/person-constanst";
import connectionMysql from "../../../infrastructure/database/db";
import {
  GET_PERSONS,
  GET_PERSON_BY_ID,
  INSERT_PERSON,
} from "../../../infrastructure/database/utils/db-constants";
import { QueryResult } from "mysql2";

class PersonRepository {
  getUserById(id: number): Person {
    return {
      id: id,
      name: "John Doe",
    };
  }
  async getDataSwapi(id: number): Promise<any> {
    return fetch(`${URL_SWAPI}${id.toString()}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error(error));
  }
  async translate(data: PersonSwapi): Promise<any> {
    await Translate.build();
    Object.keys(data).forEach(async (key) => {
      const keyTranslate = i18next.t(key);
      data[keyTranslate] = data[key];
      delete data[key];
    });
    return data;
  }
  async getPersonById(id: number): Promise<PersonSwapi> {
    return new Promise((resolve, reject) => {
      connectionMysql.query(GET_PERSON_BY_ID, [id], (err, result) => {
        if (err) reject(err);
        const data = splitData(result[0]);

        resolve(data);
      });
    });
  }
  async getPersons(): Promise<PersonSwapi[] | null> {
    return new Promise((resolve, reject) => {
      connectionMysql.query(GET_PERSONS, (err, result: PersonSwapi[]) => {
        if (err) {
          reject(err);
        }
        const data = result.map((person) => splitData(person));
        resolve(data);
      });
    });
  }
  async savePerson(person: PersonSwapi): Promise<QueryResult> {
    const personToInsert = splitDataToDb(person);
    return new Promise((resolve, reject) => {
      connectionMysql.query(
        INSERT_PERSON,
        personToInsert,
        (err, result: QueryResult) => {
          if (err) {
            console.log("ERROR", err);
            reject(err);
          }
          resolve(result);
        }
      );
    });
  }
}

export default new PersonRepository();
