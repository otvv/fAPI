/*
*/

import * as statusCode from '../controller/globals.js';

export const checkUpdateMiddleware = (request, response, next) => {
  const { name, team, weapon, role } = request.body;

  if (((typeof(name) === 'string') && (typeof(team) === 'string')) && ((typeof(weapon) === 'string') || (typeof(role) === 'string'))) {
    if (!name) {
      return response.status(statusCode.BAD_REQUEST).json({ message: '[fapi] - bad request: "name" key must be a string' });
    }

    if (!team) {
      return response.status(statusCode.BAD_REQUEST).json({ message: '[fapi] - bad request: "team" key must be a string' });
    }

    if (!weapon) {
      if (role) {
        return next();
      } else {
        return response.status(statusCode.BAD_REQUEST).json({ message: '[fapi] - bad request: "weapon" key must be a string' });
      }
    }
    else if (!role) {
      if (weapon) {
        return next();
      } else {
        return response.status(statusCode.BAD_REQUEST).json({ message: '[fapi] - bad request: "role" key must be a string' });
      }
    }

    return next();
  } else {
    return response.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: '[fapi] - internal error: something went wrong' });
  }
}
