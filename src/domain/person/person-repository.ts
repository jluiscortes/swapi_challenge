//import connection from "@src/infrastructure/database/db";

import { Person, PersonSwapi } from "@src/domain/person/person-model";
import i18next from "i18next";
import * as Translate from "../../infrastructure/config/i18n";
import { URL_SWAPI } from "./constants/person-constanst";

class PersonRepository {
  getUserById(id: number): Person {
    return {
      id: id,
      name: "John Doe",
    };
  }
  async getDataSwapi(): Promise<any> {
    return fetch(URL_SWAPI)
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
}

export default new PersonRepository();
