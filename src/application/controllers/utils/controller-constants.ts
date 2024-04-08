import { APIGatewayProxyResult } from "aws-lambda";
import { BAD_REQUEST } from "http-status-codes";

export const MessagesHTTP = {
  NOT_FOUND: "Not found",
  ERROR: "An error occured",
  BAD_REQUEST: "Bad request",
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

export const TEXT = {
  EMPTY: "",
};
