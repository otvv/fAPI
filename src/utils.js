import fs from 'fs/promises';
import path, { join } from 'path';

// current file path
const CURRENT_SKIN_PATH = '/src/files/skins.json';
const CURRENT_USER_PATH = '/src/files/users.json';
const DIR_NAME = path.resolve(path.dirname(''));

const readFile = async (path) => {
  try {
    // read file and parse it
    const readContent = await fs.readFile(join(DIR_NAME, path), 'utf-8');

    // convert parsed file into a valid OBJECT
    const parsedData = JSON.parse(readContent);

    return parsedData;
  } catch (e) {
    throw e;
  }
}

export const getAllSkins = async () => {
  // read file
  const file = await readFile(CURRENT_SKIN_PATH);

  return file.skins;
}

export const getAllUsers = async () => {
  // read file
  const file = await readFile(CURRENT_USER_PATH);

  return file.users;
}

export const addSkinData = async (newData) => {
  // read file first
  const file = await readFile(CURRENT_SKIN_PATH);

  const newSkinData = JSON.stringify({"skins": [...file.skins, newData]});

  // write new skin info into file
  await fs.writeFile(join(DIR_NAME, CURRENT_SKIN_PATH), newSkinData);

  return newData;
}

export const addUserData = async (newData) => {
  // read file first
  const file = await readFile(CURRENT_USER_PATH);

  const newUserData = JSON.stringify({"users": [...file.users, newData]});

  // write new skin info into file
  await fs.writeFile(join(DIR_NAME, CURRENT_USER_PATH), newUserData);

  return newData;
}
