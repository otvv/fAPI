/*
*/

import * as statusCode from '../controller/globals.js';
import * as skinService from '../service/skin.service.js';

export const createSkin = async (request, response) => {
  const receivedData = { ...request.body };

  // insert a new skin in the table
  const { type, message } = await skinService.insertSkin(receivedData);

  // if something goes wrong
  if (type) {
    return response.status(statusCode.INTERNAL_SERVER_ERROR).json(message);
  }

  return response.status(statusCode.CREATED).json(message);
};

export const listSkins = async (_request, response) => {
  // find all skins
  const { type, message } = await skinService.findAll();

  // if something goes wrong
  if (type) {
    return response.status(statusCode.INTERNAL_SERVER_ERROR).json(message);
  }

  return response.status(statusCode.OK).json(message);
};

export const displaySkin = async (request, response) => {
  const { id } = request.params;

  // find skin by id
  const { type, message } = await skinService.findById(id);

  // if something goes wrong
  if (type) {
    return response.status(statusCode.INTERNAL_SERVER_ERROR).json(message);
  }

  return response.status(statusCode.OK).json(message);
};

export const updateSkin = async (request, response) => {
  const { id } = request.params;
  const { name, team, weapon } = request.body;

  // update skin data by its id
  const { type, message } = await skinService.updateSkin(id, { name, team, weapon });

  // if something goes wrong
  if (type) {
    return response.status(statusCode.INTERNAL_SERVER_ERROR).json(message);
  }

  return response.status(statusCode.OK).json(message);
};

export const deleteSkin = async (request, response) => {
  const { id } = request.params;

  // delete skin by its id
  const { type, message } = await skinService.deleteSkin(id);

  // if something goes wrong
  if (type) {
    return response.status(statusCode.INTERNAL_SERVER_ERROR).json(message);
  }

  return response.status(statusCode.NO_CONTENT).end(`${message}`);
};
