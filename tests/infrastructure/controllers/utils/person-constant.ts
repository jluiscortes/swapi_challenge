export const EMPTY = {
  JSON_ARRAY: "[]",
  ARRAY: [],
  NULLABLE: null,
};
export const ERROR = {
  ERROR_GETTING_DATA: () => {
    throw new Error("Error getting data from SWAPI");
  },
};
export const EXECUTE_METHOD = "execute";
