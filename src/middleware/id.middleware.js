/*
*/

import * as statusCode from '../controller/globals.js';

export const checkIdMiddleware = (request, response, next) => {
  const { id } = request.params;

  if (!isNaN(id)) {
    return next();
  } else {
    return response.status(statusCode.BAD_REQUEST).json({ message: '[fapi] - bad request: "id" must be a number' });
  }
}
