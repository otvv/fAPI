import { read, write } from './read.js';

const CURRENT_SKIN_PATH = '/src/data/skins.json';

export const findAll = async () => {
  const file = await read(CURRENT_SKIN_PATH);

  return file.skins;
};

export const findById = async (skinId) => {
  const file = await findAll();

  const skinFound = file.find((skin) => skin.id === +skinId);
  // every data (in this case the :id) received from the url is a string
  // so we have to change it to a int number or w/e type you might need to use.

  // TODO: move this to the service layer
  if (!skinFound) {
    return { message: '[fapi] - skin not found with the specified id' };
  }

  return skinFound;
};

export const insertSkin = async (payload) => {
  const file = await findAll();

  // TODO: 'id' auto increment
  const parsedData = JSON.stringify({ "skins": [...file, payload] });

  await write(CURRENT_SKIN_PATH, parsedData);

  // return "insertionId"
  return JSON.parse(parsedData).skins.at(-1).id;
};

export const updateSkin = async (skinId, payload) => {
  const file = await findById(skinId);

  // edit skin with received payload info
  file.name = payload.name;
  file.team = payload.team;
  file.weapon = payload.weapon;

  // return "changed id"
  return +skinId;
};

export const deleteSkin = async (skinId) => {
  const file = await findAll();

  // feel free to change this (even tho its not recommended)
  const ELEMENTS_TO_REMOVE = 1;

  // TODO: check if the skin that we want to delete exists first
  const skinToDelete = file.findIndex((user) => user.id === +userId);

  // get "removed id" from DELETE operation
  const removedId = (skinToDelete + 1);

  file.splice(skinToDelete, ELEMENTS_TO_REMOVE);

  // parsed data
  const parsedData = JSON.stringify({ "skins": [...file] });
  await write(CURRENT_SKIN_PATH, parsedData);

  return removedId;
};
