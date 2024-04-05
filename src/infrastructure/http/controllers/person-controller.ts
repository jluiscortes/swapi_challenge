import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import PersonRepository from "../../../domain/person/person-repository";
import { OK, StatusCodes } from "http-status-codes";
import {
  buildResponse,
  MessagesHTTP,
  TEXT,
} from "./utils/controller-constants";
import { PersonSwapiTranslate } from "@src/domain/person/utils/person-model";

export const getPerson = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const personId = parseInt(_event.pathParameters?.id || TEXT.EMPTY);
    const swapiPayload = await PersonRepository.getDataSwapi(personId);
    const swapiKeysTranslate = await PersonRepository.translate(swapiPayload);
    if (!swapiKeysTranslate)
      return buildResponse(StatusCodes.NOT_FOUND, MessagesHTTP.NOT_FOUND);
    return buildResponse(StatusCodes.OK, JSON.stringify(swapiKeysTranslate));
  } catch (err) {
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, MessagesHTTP.ERROR);
  }
};

export const getPersonsDb = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const persons = await PersonRepository.getPersons();
    if (!persons)
      return buildResponse(StatusCodes.NOT_FOUND, MessagesHTTP.NOT_FOUND);
    const personsTranslated: PersonSwapiTranslate[] = [];
    for (const person of persons) {
      const swapiKeysTranslate = await PersonRepository.translate(person);
      personsTranslated.push(swapiKeysTranslate);
    }
    return buildResponse(StatusCodes.OK, JSON.stringify(personsTranslated));
  } catch (err) {
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, MessagesHTTP.ERROR);
  }
};

export const savePerson = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const bodyRequest = JSON.parse(_event.body || TEXT.EMPTY);
    const personId = bodyRequest.id;
    const swapiPayload = await PersonRepository.getDataSwapi(personId);
    const response = await PersonRepository.savePerson(swapiPayload);
    return buildResponse(StatusCodes.OK, JSON.stringify({ response }));
  } catch (err) {
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, MessagesHTTP.ERROR);
  }
};
