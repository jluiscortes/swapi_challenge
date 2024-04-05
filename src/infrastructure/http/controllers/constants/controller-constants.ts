import { APIGatewayProxyResult } from "aws-lambda";

export const MessagesHTTP = {
  NOT_FOUND: "Not found",
  ERROR: "An error occured",
};

export const buildResponse = (
  statusCode: number,
  body: string
): APIGatewayProxyResult => {
  return {
    statusCode,
    body,
  };
};
