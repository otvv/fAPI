/*
*/

import * as skinModel from '../model/skin.model.js';
import { validateId } from './validators/id.validator.js';
import { validateSkinInsertion } from './validators/insertion.validator.js';

export const findAll = async () => {
  const skins = await skinModel.findAll();

  return { type: null, message: skins };
};

export const findById = async (skinId) => {
  // in case the id validator throws an error, returns an invalid payload
  const error = validateId(skinId);
  if (error.type) {
    return error;
  }

  // find skin by its id
  const skin = await skinModel.findById(skinId);

  if (!skin) {
    return { type: 'NOT_FOUND', message: '[fapi] - skin not found with the specified id' };
  }

  return { type: null, message: skin };
};

export const insertSkin = async (payload) => {
  const { id, name, weapon, team } = payload;

  // in case the id validator throws an error, returns an invalid payload
  const errorId = validateId(id);
  if (errorId.type) {
    return errorId;
  }

  // in case the insertion validator throws an error, returns an invalid payload
  const error = validateSkinInsertion({ name, weapon, team });
  if (error.type) {
    return error;
  }

  const addedSkinId = await skinModel.insertSkin({ id, name, weapon, team });

  return { type: null, message: addedSkinId };
};

export const updateSkin = async (skinId, payload) => {
  const { name, weapon, team } = payload;
  // in case the id validator throws an error, returns an invalid payload
  const errorId = validateId(skinId);
  if (errorId.type) {
    return errorId;
  }

  // in case the insertion validator throws an error, returns an invalid payload
  const error = validateSkinInsertion({ name, weapon, team });
  if (error.type) {
    return error;
  }

  const updatedSkinId = await skinModel.updateSkin(skinId, payload);

  return { type: null, message: updatedSkinId };
};

export const deleteSkin = async (skinId) => {
  // in case the id validator throws an error, returns an invalid payload
  const error = validateId(skinId);
  if (error.type) {
    return error;
  }

  const deletedSkinId = await skinModel.deleteSkin(skinId);

  return { type: null, message: deletedSkinId };
}
