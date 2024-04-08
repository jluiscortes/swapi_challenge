import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import { MessagesHTTP } from "../../../src/application/controllers/utils/controller-constants";
import { SearchPersonSwapi } from "../../../src/core/domain/entites/person/use-cases/search-person-swapi";
import { TranslatePerson } from "../../../src/core/domain/entites/person/use-cases/translate-person";
import {
  mockSwapiKeysTranslate,
  mockGetPersonPayload,
} from "./mocks/swapi-person-mock";
import { searchPerson } from "../../../src/infrastructure/http/controllers/person-controller";
import { SearchPersons } from "../../../src/core/domain/entites/person/use-cases/search-persons-db";
import { searchPersonsDb } from "../../../src/application/controllers/person-controller";
import { EMPTY, ERROR, EXECUTE_METHOD } from "./utils/person-constant";

describe("searchPerson", () => {
  it("should return the translated person data when successful", async () => {
    const mockEvent = {} as APIGatewayProxyEvent;

    jest
      .spyOn(SearchPersonSwapi.prototype, EXECUTE_METHOD)
      .mockResolvedValue(mockGetPersonPayload);
    jest
      .spyOn(TranslatePerson.prototype, EXECUTE_METHOD)
      .mockResolvedValue(mockSwapiKeysTranslate);

    const result = await searchPerson(mockEvent);

    expect(result.statusCode).toBe(StatusCodes.OK);
    expect(result.body).toBe(JSON.stringify(mockSwapiKeysTranslate));
  });

  it("should return a not found response when translation fails", async () => {
    const mockEvent = {} as APIGatewayProxyEvent;

    jest
      .spyOn(SearchPersonSwapi.prototype, EXECUTE_METHOD)
      .mockResolvedValue(EMPTY.NULLABLE);
    jest
      .spyOn(TranslatePerson.prototype, EXECUTE_METHOD)
      .mockResolvedValue(EMPTY.NULLABLE);

    const result = await searchPerson(mockEvent);

    expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(result.body).toBe(MessagesHTTP.NOT_FOUND);
  });

  it("should return an internal server error response when an error occurs", async () => {
    const mockEvent = {} as APIGatewayProxyEvent;

    jest
      .spyOn(SearchPersonSwapi.prototype, EXECUTE_METHOD)
      .mockRejectedValue(ERROR.ERROR_GETTING_DATA);

    const result = await searchPerson(mockEvent);

    expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toBe(MessagesHTTP.ERROR);
  });
});

describe("searchPersons", () => {
  it("should return the translated persons data when successful", async () => {
    const mockEvent = {} as APIGatewayProxyEvent;

    jest
      .spyOn(SearchPersons.prototype, EXECUTE_METHOD)
      .mockResolvedValue([mockGetPersonPayload]);
    jest
      .spyOn(TranslatePerson.prototype, EXECUTE_METHOD)
      .mockResolvedValue(mockSwapiKeysTranslate);

    const result = await searchPersonsDb(mockEvent);

    expect(result.statusCode).toBe(StatusCodes.OK);
    expect(result.body).toBe(JSON.stringify([mockSwapiKeysTranslate]));
  });

  it("should return a not found response when no persons found", async () => {
    const mockEvent = {} as APIGatewayProxyEvent;

    jest
      .spyOn(SearchPersons.prototype, EXECUTE_METHOD)
      .mockResolvedValue(EMPTY.ARRAY);

    const result = await searchPersonsDb(mockEvent);

    expect(result.statusCode).toBe(StatusCodes.OK);
    expect(result.body).toBe(EMPTY.JSON_ARRAY);
  });

  it("should return an internal server error response when an error occurs", async () => {
    const mockEvent = {} as APIGatewayProxyEvent;

    jest
      .spyOn(SearchPersons.prototype, EXECUTE_METHOD)
      .mockRejectedValue(ERROR.ERROR_GETTING_DATA);

    const result = await searchPersonsDb(mockEvent);

    expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toBe(MessagesHTTP.ERROR);
  });
});
