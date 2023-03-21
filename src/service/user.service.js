/*
*/

import * as userModel from '../model/user.model.js';
import { validateId } from './validators/id.validator.js';
import { validateUserInsertion } from './validators/insertion.validator.js';

export const findAll = async () => {
  const users = await userModel.findAll();

  return { type: null, message: users };
};

export const findById = async (userId) => {
  // in case the id validator throws an error, returns an invalid payload
  const error = validateId(userId);
  if (error.type) {
    return error;
  }

  // find user by its id
  const user = await userModel.findById(userId);

  if (!user) {
    return { type: 'NOT_FOUND', message: '[fapi] - user not found with the specified id' };
  }

  return { type: null, message: user };
};

export const insertUser = async (payload) => {
  const { id, name, role, team } = payload;

  // in case the id validator throws an error, returns an invalid payload
  const errorId = validateId(id);
  if (errorId.type) {
    return errorId;
  }

  // in case the insertion validator throws an error, returns an invalid payload
  const error = validateUserInsertion({ name, role, team });
  if (error.type) {
    return error;
  }

  const addedUserId = await userModel.insertUser({ id, name, role, team });

  return { type: null, message: addedUserId };
};

export const updateUser = async (userId, payload) => {
  const { name, role, team } = payload;
  // in case the id validator throws an error, returns an invalid payload
  const errorId = validateId(userId);
  if (errorId.type) {
    return errorId;
  }

  // in case the insertion validator throws an error, returns an invalid payload
  const error = validateUserInsertion({ name, role, team });
  if (error.type) {
    return error;
  }

  const updatedUserId = await userModel.updateUser(userId, payload);

  return { type: null, message: updatedUserId };
};

export const deleteUser = async (userId) => {
  // in case the id validator throws an error, returns an invalid payload
  const error = validateId(userId);
  if (error.type) {
    return error;
  }

  const deletedUserId = await userModel.deleteUser(userId);

  return { type: null, message: deletedUserId };
}
