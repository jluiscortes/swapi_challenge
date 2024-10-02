import {
  Person,
  PersonSwapi,
  PersonSwapiTranslate,
} from "../entites/person/utils/person-model";
import i18next from "i18next";
import * as Translate from "../../../infrastructure/config/i18n";
import {
  splitData,
  splitDataToDb,
  URL_SWAPI,
} from "../entites/person/utils/person-constanst";
import connectionMysql from "../../../infrastructure/database/db";
import {
  GET_PERSONS,
  GET_PERSON_BY_ID,
  INSERT_PERSON,
} from "../../../infrastructure/database/utils/db-constants";
import { QueryResult } from "mysql2";

export class PersonRepository {
  async getPersonFromSwapi(id: number): Promise<PersonSwapi> {
    return fetch(`${URL_SWAPI}${id.toString()}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error(error));
  }

  async translate(data: PersonSwapi | null): Promise<PersonSwapiTranslate> {
    await Translate.build();
    const translatedData: PersonSwapiTranslate = {} as PersonSwapiTranslate;
    if (!data) return translatedData;

    Object.keys(data).forEach(async (key) => {
      const keyTranslate = i18next.t(key);
      translatedData[keyTranslate] = data[key];
    });

    return translatedData;
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
        if (err) reject(err);

        const data = result.map((person) => splitData(person));
        resolve(data);
      });
    });
  }
  async createPerson(person: PersonSwapi): Promise<QueryResult> {
    const personToInsert = splitDataToDb(person);
    return new Promise((resolve, reject) => {
      connectionMysql.query(
        INSERT_PERSON,
        personToInsert,
        (err, result: QueryResult) => {
          if (err) reject(err);

          resolve(result);
        }
      );
    });
  }
}
