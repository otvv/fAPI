/*
*/

import * as statusCode from '../controller/globals.js';

export const authMiddleware = (request, response, next) => {
  const authorization = request.headers.authorization;

  if (authorization && typeof(authorization) === 'string') {
    if (authorization === 'root') {
      return next();
    }
  } else {
    return response.status(statusCode.UNAUTHORIZED).json({ message: '[fapi] - unauthorized: invalid auth token' });
  }
}
