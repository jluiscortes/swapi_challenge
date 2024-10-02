import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as PersonApplicationController from "../../../application/controllers/person-controller";

export const searchPerson = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> =>
  PersonApplicationController.searchPerson(_event);

export const searchPersons = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> =>
  PersonApplicationController.searchPersonsDb(_event);

export const createPerson = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> =>
  PersonApplicationController.createPerson(_event);
