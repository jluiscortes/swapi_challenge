import { PersonSwapi } from "./person-model";

export const URL_SWAPI = "https://swapi.dev/api/people/";
export const ELEMENTS_TO_ARRAY = ["films", "species", "vehicles", "starships"];
export const splitData = (person: PersonSwapi) => {
  Object.keys(person).forEach(async (key) => {
    if (ELEMENTS_TO_ARRAY.includes(key)) {
      person[key] = person[key].split(",");
    }
  });
  return person;
};
export const splitDataToDb = (person: PersonSwapi) => {
  Object.keys(person).forEach(async (key) => {
    if (ELEMENTS_TO_ARRAY.includes(key)) {
      person[key] = person[key].join(",");
    }
  });
  return personToArraySplit(person);
};

export const personToArraySplit = (person: PersonSwapi) => [
  person.name,
  person.height,
  person.mass,
  person.hair_color,
  person.skin_color,
  person.eye_color,
  person.birth_year,
  person.gender,
  person.homeworld,
  person.films,
  person.species,
  person.vehicles,
  person.starships,
  person.created,
  person.edited,
  person.url,
];
