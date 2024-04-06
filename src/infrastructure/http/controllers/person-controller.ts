import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import PersonController from "../../../application/controllers/person-controller";

const controllerPerson = new PersonController();

export const getPerson = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return controllerPerson.getPerson(_event);
};

export const getPersonsDb = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return controllerPerson.getPersonsDb(_event);
};

export const savePerson = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return controllerPerson.savePerson(_event);
};
