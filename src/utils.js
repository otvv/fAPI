import fs from 'fs/promises';
import path, { join } from 'path';

// current file path
const CURRENT_PATH = '/src/files/skins.json';

const readSkinsFile = async () => {

  try {
    const __dirname = path.resolve(path.dirname(''));
    // read file and parse it
    const readContent = await fs.readFile(join(__dirname, CURRENT_PATH), 'utf-8');

    // convert parsed file into a valid OBJECT
    const skins = JSON.parse(readContent);

    return skins;
  } catch (e) {
    throw e;
  }
}

export const getAllSkins = async () => {
  // read file
  const file = await readSkinsFile();

  // return correct data
  return file.skins;
}

export const addSkinData = async (newData) => {
  const __dirname = path.resolve(path.dirname(''));
  // read file first
  const file = await readSkinsFile();

  const newSkinData = JSON.stringify({"skins": [...file.skins, newData]});

  // write new skin info into file
  await fs.writeFile(join(__dirname, CURRENT_PATH), newSkinData);

  // DEBUG PURPOSES ONLY
  // console.log('[fapi] - newSkinData:', newSkinData);

  return newData;
}
