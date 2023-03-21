/*
*/

export const validateId = (id) => {
  const MIN_ID = 0;
  const MAX_ID = 99999; // theres no way this api is going to be big enough that it will require a skin or a user id that big

  if ((id < MIN_ID)) {
    return { type: 'BAD_REQUEST', message: '[fapi] - bad request: "id" must not be a negative number' }
  }

  if ((id > MAX_ID)) {
    return { type: 'BAD_REQUEST', message: '[fapi] - bad request: "id" is too big' }
  }

  // if everything is up to standards
  return { type: null, message: '' };
};
