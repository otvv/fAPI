/*
*/

import { UNAUTHORIZED } from "../globals.js"

export const authMiddleware = (request, response, next) => {

  const authorization = request.headers.authorization;

  if (authorization && typeof(authorization) === 'string') {

    if (authorization === 'root') {

      return next();
    }
  } else {
    return response.status(UNAUTHORIZED).json({ message: '[fapi] - unauthorized: invalid auth token' });
  }

}
