/*
*/

import { BAD_REQUEST } from "../global.js";

export const checkUpdateMiddleware = (request, response, next) => {
  const { name, team, weapon, role } = request.body;

  // bad request dictionary
  const badRequestDictionary = {
    name: '[fapi] - bad request: "name" key is missing or empty',
    team: '[fapi] - bad request: "team" key is missing or empty',
    weapon: '[fapi] - bad request: "weapon" key is missing or empty',
    role: '[fapi] - bad request: "role" key is missing or empty',
    invalid: '[fapi] - bad request: invalid insertion data, they all must be a string'
  };

  if (((typeof(name) === 'string') && (typeof(team) === 'string')) && ((typeof(weapon) === 'string') || (typeof(role) === 'string'))) {

    if (!name) {
      return response.status(BAD_REQUEST).json({ message: badRequestDictionary['name'] });
    }

    if (!team) {
      return response.status(BAD_REQUEST).json({ message: badRequestDictionary['team'] });
    }

    if (!weapon) {

      if (role) {
        return next();
      } else {
        return response.status(BAD_REQUEST).json({ message: badRequestDictionary['weapon']});
      }

    }
    else if (!role) {

      if (weapon) {
        return next();
      } else {
        return response.status(BAD_REQUEST).json({ message: badRequestDictionary['role'] });
      }
    }

    return next();
  } else {
    return response.status(BAD_REQUEST).json({ message: badRequestDictionary['invalid'] });
  }
}
