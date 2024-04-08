import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PersonRepository } from "../../core/domain/repositories/person-repository";
import { StatusCodes } from "http-status-codes";
import {
  buildResponse,
  MessagesHTTP,
  TEXT,
} from "./utils/controller-constants";
import { PersonSwapiTranslate } from "../../core/domain/entites/person/utils/person-model";
import { SearchPersonSwapi } from "../../core/domain/entites/person/use-cases/search-person-swapi";
("../../core/domain/entites/person/use-cases/search-person-swapi");
import { TranslatePerson } from "../../core/domain/entites/person/use-cases/translate-person";
import { SearchPersons } from "../../core/domain/entites/person/use-cases/search-persons-db";
import { CreatePerson } from "../../core/domain/entites/person/use-cases/create-person";

const personRepository = new PersonRepository();

export const searchPerson = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const personId = parseInt(_event.pathParameters?.id || TEXT.EMPTY);
    const searchPerson = new SearchPersonSwapi(personRepository);
    const swapiPayload = await searchPerson.execute(personId);
    const translatePerson = new TranslatePerson(personRepository);
    const swapiKeysTranslate = await translatePerson.execute(swapiPayload);
    if (!swapiKeysTranslate)
      return buildResponse(StatusCodes.NOT_FOUND, MessagesHTTP.NOT_FOUND);
    return buildResponse(StatusCodes.OK, JSON.stringify(swapiKeysTranslate));
  } catch (err) {
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, MessagesHTTP.ERROR);
  }
};

export const searchPersonsDb = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const searchPersons = new SearchPersons(personRepository);
    const persons = await searchPersons.execute();
    if (!persons)
      return buildResponse(StatusCodes.NOT_FOUND, MessagesHTTP.NOT_FOUND);
    const personsTranslated: PersonSwapiTranslate[] = [];
    const personTranslate = new TranslatePerson(personRepository);
    for (const person of persons) {
      const swapiKeysTranslate = await personTranslate.execute(person);
      if (swapiKeysTranslate) personsTranslated.push(swapiKeysTranslate);
    }
    return buildResponse(StatusCodes.OK, JSON.stringify(personsTranslated));
  } catch (err) {
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, MessagesHTTP.ERROR);
  }
};

export const createPerson = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const bodyRequest = JSON.parse(_event.body || TEXT.EMPTY);
    const personId = bodyRequest.id;
    if (!personId)
      return buildResponse(StatusCodes.BAD_REQUEST, MessagesHTTP.BAD_REQUEST);
    const searchPersonSwapi = new SearchPersonSwapi(personRepository);
    const swapiPayload = await searchPersonSwapi.execute(personId);
    const personCreate = new CreatePerson(personRepository);
    if (!swapiPayload)
      return buildResponse(StatusCodes.NOT_FOUND, MessagesHTTP.NOT_FOUND);
    const response = await personCreate.execute(swapiPayload);
    return buildResponse(StatusCodes.OK, JSON.stringify({ response }));
  } catch (err) {
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, MessagesHTTP.ERROR);
  }
};
