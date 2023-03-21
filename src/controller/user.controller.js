/*
*/

import * as statusCode from '../controller/globals.js';
import * as userService from '../service/user.service.js';

export const createUser = async (request, response) => {
  const receivedData = { ...request.body };

  // insert a new user in the table
  const { type, message } = await userService.insertUser(receivedData);

  // if something goes wrong
  if (type) {
    return response.status(statusCode.INTERNAL_SERVER_ERROR).json(message);
  }

  return response.status(statusCode.CREATED).json(message);
};

export const listUsers = async (_request, response) => {
  // find all users
  const { type, message } = await userService.findAll();

  // if something goes wrong
  if (type) {
    return response.status(statusCode.INTERNAL_SERVER_ERROR).json(message);
  }

  return response.status(statusCode.OK).json(message);
};

export const displayUser = async (request, response) => {
  const { id } = request.params;

  // find user by id
  const { type, message } = await userService.findById(id);

  // if something goes wrong
  if (type) {
    return response.status(statusCode.INTERNAL_SERVER_ERROR).json(message);
  }

  return response.status(statusCode.OK).json(message);
};

export const updateUser = async (request, response) => {
  const { id } = request.params;
  const { name, team, role } = request.body;

  // update user data by its id
  const { type, message } = await userService.updateUser(id, { name, team, role });

  // if something goes wrong
  if (type) {
    return response.status(statusCode.INTERNAL_SERVER_ERROR).json(message);
  }

  return response.status(statusCode.OK).json(message);
};

export const deleteUser = async (request, response) => {
  const { id } = request.params;

  // delete user by its id
  const { type, message } = await userService.deleteUser(id);

  // if something goes wrong
  if (type) {
    return response.status(statusCode.INTERNAL_SERVER_ERROR).json(message);
  }

  return response.status(statusCode.NO_CONTENT).end(`${message}`);
};
