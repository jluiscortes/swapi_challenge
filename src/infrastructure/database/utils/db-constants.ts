export const MYSQL = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "",
  DATABASE: "swapi",
};
export const GET_PERSON_BY_ID = "SELECT * FROM person WHERE id = ?";
export const GET_PERSONS = "SELECT * FROM person";
export const INSERT_PERSON =
  "INSERT INTO person (name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, films, species, vehicles, starships, created, edited, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
