import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import PersonRepository from "../../domain/entites/person/person-repository";
import { StatusCodes } from "http-status-codes";
import {
  buildResponse,
  MessagesHTTP,
  TEXT,
} from "./utils/controller-constants";
import { PersonSwapiTranslate } from "../../domain/entites/person/utils/person-model";

export default class PersonController {
  getPerson = async (
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
      return buildResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        MessagesHTTP.ERROR
      );
    }
  };

  getPersonsDb = async (
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
      return buildResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        MessagesHTTP.ERROR
      );
    }
  };

  savePerson = async (
    _event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const bodyRequest = JSON.parse(_event.body || TEXT.EMPTY);
      const personId = bodyRequest.id;
      const swapiPayload = await PersonRepository.getDataSwapi(personId);
      const response = await PersonRepository.savePerson(swapiPayload);
      return buildResponse(StatusCodes.OK, JSON.stringify({ response }));
    } catch (err) {
      return buildResponse(
        StatusCodes.INTERNAL_SERVER_ERROR,
        MessagesHTTP.ERROR
      );
    }
  };
}
