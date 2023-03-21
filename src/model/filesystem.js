/*
*/

import fs from 'fs/promises';
import path, { join } from 'path';

// CUR_DIR_NAME
const CUR_DIR_NAME = path.resolve(path.dirname(''));

export const read = async (filePath) => {
  try {
    // read file and parse it
    const readContent = await fs.readFile(join(CUR_DIR_NAME, filePath), 'utf-8');

    // convert parsed file into a valid OBJECT
    const parsedData = JSON.parse(readContent);

    return parsedData;
  } catch (e) {
    throw e;
  }
};

export const write = async (filePath, payload) => {
  try {
    // write payload into desired file
    await fs.writeFile(join(CUR_DIR_NAME, filePath), payload);
  } catch (e) {
    throw e;
  }
};
