/*
*/

import { BAD_REQUEST } from "../globals.js";

export const checkIdMiddleware = (request, response, next) => {
  const { id } = request.params;

  if (!isNaN(id)) {
    return next();
  } else {
    return response.status(BAD_REQUEST).json({ message: '[fapi] - "id" must be a number' });
  }
}
