/*
*/

import { BAD_REQUEST } from "../global.js";

export const checkIdMiddleware = (request, response, next) => {
  const { id } = request.params;

  if (+id) {
    return next();
  } else {
    return response.status(BAD_REQUEST).json({ message: '[fapi] - bad request: invalid id, is it a number?' });
  }
}
