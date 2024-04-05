import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import PersonRepository from "../../../domain/person/person-repository";
import { StatusCodes } from "http-status-codes";
import { buildResponse, MessagesHTTP } from "./constants/controller-constants";

export const getPerson = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    //const personId = parseInt(_event.pathParameters?.id || "");
    const swapiPayload = await PersonRepository.getDataSwapi();
    const swapiKeysTranslate = await PersonRepository.translate(swapiPayload);
    if (!swapiKeysTranslate)
      return buildResponse(StatusCodes.NOT_FOUND, MessagesHTTP.NOT_FOUND);
    return buildResponse(StatusCodes.OK, JSON.stringify(swapiKeysTranslate));
  } catch (err) {
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, MessagesHTTP.ERROR);
  }
};

export const savePerson = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const bodyRequest = JSON.parse(_event.body || "");
    const response = {
      statusCode: 200,
      body: JSON.stringify(bodyRequest),
    };
    return response;
  } catch (err) {
    return buildResponse(StatusCodes.INTERNAL_SERVER_ERROR, MessagesHTTP.ERROR);
  }
};
