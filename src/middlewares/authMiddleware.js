/*
*/

import { UNAUTHROZIED } from "../global.js"

export const authMiddleware = (request, response, next) => {

  const authorization = request.headers.authorization;

  // DEBUG PURPOSES ONLY
  console.log('[fapi] - authorization token used', authorization);

  if (authorization && typeof(authorization) === 'string') {

    // DEBUG PURPOSES ONLY
    console.log('[fapi] - auth token requirements met');

    if (authorization === 'root') {

      // DEBUG PURPOSES ONLY
      console.log('[fapi] - auth token accepted');

      return next();
    }
  } else {
    return response.status(UNAUTHROZIED).json({ message: '[fapi] - unauthorized: invalid auth token' });
  }

}
