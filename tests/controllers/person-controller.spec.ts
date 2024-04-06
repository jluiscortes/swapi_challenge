import {
  getPerson,
  getPersonsDb,
} from "../../src/infrastructure/http/controllers/person-controller";
import PersonRepository from "../../src/domain/entites/person/person-repository";
import { MessagesHTTP } from "../../src/application/controllers/utils/controller-constants";
import {
  mockGetPersonPayload,
  mockSwapiKeysTranslate,
} from "./mocks/swapi-person-mock";
import { StatusCodes } from "http-status-codes";
import { APIGatewayProxyEvent } from "aws-lambda";
import { PersonSwapiTranslate } from "../../src/domain/entites/person/utils/person-model";

describe("getPerson", () => {
  it("should return the translated person data when successful", async () => {
    const mockEvent = {} as APIGatewayProxyEvent;

    jest
      .spyOn(PersonRepository, "getDataSwapi")
      .mockResolvedValue(mockGetPersonPayload);
    jest
      .spyOn(PersonRepository, "translate")
      .mockResolvedValue(mockSwapiKeysTranslate);

    const result = await getPerson(mockEvent);

    expect(result.statusCode).toBe(StatusCodes.OK);
    expect(result.body).toBe(JSON.stringify(mockSwapiKeysTranslate));
  });

  it("should return a not found response when translation fails", async () => {
    const mockEvent = {} as APIGatewayProxyEvent;

    jest
      .spyOn(PersonRepository, "getDataSwapi")
      .mockResolvedValue(mockGetPersonPayload);
    jest.spyOn(PersonRepository, "translate").mockResolvedValue(null);

    const result = await getPerson(mockEvent);

    expect(result.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(result.body).toBe(MessagesHTTP.NOT_FOUND);
  });

  it("should return an internal server error response when an error occurs", async () => {
    const mockEvent = {} as APIGatewayProxyEvent;

    jest
      .spyOn(PersonRepository, "getDataSwapi")
      .mockRejectedValue(new Error("Error getting data from SWAPI"));

    const result = await getPerson(mockEvent);

    expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toBe(MessagesHTTP.ERROR);
  });
});

describe("getPersonsDb", () => {
  it("should return the translated persons data when successful", async () => {
    const mockEvent = {} as APIGatewayProxyEvent;
    const mockPersons = [mockGetPersonPayload];
    const mockPersonsTranslated: PersonSwapiTranslate[] = [
      {
        ...mockSwapiKeysTranslate,
        peliculas: mockSwapiKeysTranslate.peliculas.join(", "),
        especies: mockSwapiKeysTranslate.especies.join(", "),
        vehiculos: mockSwapiKeysTranslate.vehiculos.join(", "),
        naves_estelares: mockSwapiKeysTranslate.naves_estelares.join(", "),
      },
    ];
    jest.spyOn(PersonRepository, "getPersons").mockResolvedValue(mockPersons);
    jest
      .spyOn(PersonRepository, "translate")
      .mockImplementation(() => Promise.resolve(mockPersonsTranslated[0]));

    const result = await getPersonsDb(mockEvent);

    expect(result.statusCode).toBe(StatusCodes.OK);
    expect(result.body).toBe(JSON.stringify(mockPersonsTranslated));
  });

  it("should return a not found response when no persons are found", async () => {
    const mockEvent = {} as APIGatewayProxyEvent;

    jest
      .spyOn(PersonRepository, "getPersons")
      .mockResolvedValue(Promise.resolve([]));

    const result = await getPersonsDb(mockEvent);

    expect(result.statusCode).toBe(StatusCodes.OK);
    expect(result.body).toBe(JSON.stringify([]));
  });

  it("should return an internal server error response when an error occurs", async () => {
    const mockEvent = {} as APIGatewayProxyEvent;

    jest
      .spyOn(PersonRepository, "getPersons")
      .mockRejectedValue(new Error("Error getting persons"));

    const result = await getPersonsDb(mockEvent);

    expect(result.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toBe(MessagesHTTP.ERROR);
  });
});
