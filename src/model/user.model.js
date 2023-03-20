import { read, write } from './read.js';

const CURRENT_USER_PATH = '/src/data/users.json';

export const findAll = async () => {
  const file = await read(CURRENT_USER_PATH);

  return file.users;
};

export const findById = async (userId) => {
  const file = await findAll();

  const userFound = file.find((user) => user.id === +userId);
  // every data (in this case the :id) received from the url is a string
  // so we have to change it to a int number or w/e type you might need to use.

  // TODO: move this to the service layer
  if (!userFound) {
    return { message: '[fapi] - user not found with the specified id' };
  }

  return userFound;
};

export const insertUser = async (payload) => {
  const file = await findAll();

  // TODO: 'id' auto increment
  const parsedData = JSON.stringify({ "users": [...file, payload] });

  await write(CURRENT_USER_PATH, parsedData);

  // return "insertionId"
  return JSON.parse(parsedData).users.at(-1).id;
};

export const updateUser = async (userId, payload) => {
  const file = await findById(userId);

  // edit user with received payload info
  file.name = payload.name;
  file.team = payload.team;
  file.role = payload.role;

  // return "changed id"
  return +userId;
};

export const deleteUser = async (userId) => {
  const file = await findAll();

  // feel free to change this (even tho its not recommended)
  const ELEMENTS_TO_REMOVE = 1;

  // TODO: check if the user that we want to delete exists first
  const userToDelete = file.findIndex((user) => user.id === +userId);

  // get "removed id" from DELETE operation
  const removedId = (userToDelete + 1);

  file.splice(userToDelete, ELEMENTS_TO_REMOVE);

  // parsed data
  const parsedData = JSON.stringify({ "users": [...file] });
  await write(CURRENT_USER_PATH, parsedData);

  return removedId;
};
