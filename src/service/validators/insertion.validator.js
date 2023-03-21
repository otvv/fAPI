/*
*/

export const validateSkinInsertion = (data) => {
  const { name, weapon, team } = data;

  const NAME_MIN_CHARS = 3;
  const NAME_MAX_CHARS = 35;
  const TEAM_MAX_CHARS = 2;
  const TEAM_MIN_CHARS = 1;
  const WEAPON_MIN_CHARS = 3;
  const WEAPON_MAX_CHARS = 35;

  if ((name.length < NAME_MIN_CHARS) || (name.length > NAME_MAX_CHARS))  {
    return { type: 'BAD_REQUEST', message: '[fapi] - bad request: "name" is missing or invalid' };
  }

  if ((team.length < TEAM_MIN_CHARS) || (team.length > TEAM_MAX_CHARS)) {
    return { type: 'BAD_REQUEST', message: '[fapi] - bad request: "team" is missing or invalid' };
  }

  if ((weapon.length < WEAPON_MIN_CHARS) || (weapon.length > WEAPON_MAX_CHARS)) {
    return { type: 'BAD_REQUEST', message: '[fapi] - bad request: "weapon" is missing or invalid' };
  }

  // if everything is up to standards
  return { type: null, message: '' };
};

export const validateUserInsertion = (data) => {
  const { name, role, team } = data;

  const NAME_MIN_CHARS = 3;
  const NAME_MAX_CHARS = 35;
  const TEAM_MAX_CHARS = 35;
  const TEAM_MIN_CHARS = 1;
  const ROLE_MIN_CHARS = 3;
  const ROLE_MAX_CHARS = 35;

  if ((name.length < NAME_MIN_CHARS) || (name.length > NAME_MAX_CHARS))  {
    return { type: 'BAD_REQUEST', message: '[fapi] - bad request: "name" is missing or invalid' };
  }

  if ((team.length < TEAM_MIN_CHARS) || (team.length > TEAM_MAX_CHARS)) {
    return { type: 'BAD_REQUEST', message: '[fapi] - bad request: "team" is missing or invalid' };
  }

  if ((role.length < ROLE_MIN_CHARS) || (role.length > ROLE_MAX_CHARS)) {
    return { type: 'BAD_REQUEST', message: '[fapi] - bad request: "role" is missing or invalid' };
  }

  // if everything is up to standards
  return { type: null, message: '' };
};
