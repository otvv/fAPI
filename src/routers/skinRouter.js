/*
*/

import express from "express";
import { addSkinData, getAllSkins } from "../utils.js";
import { CREATED, OK, NOT_FOUND } from '../global.js';
import { checkIdMiddleware } from "../middlewares/checkIDMiddleware.js";
import { checkUpdateMiddleware } from "../middlewares/checkUpdateMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const skinRouter = express.Router();

//
// CREATE
//
skinRouter.post('/', authMiddleware, checkUpdateMiddleware, async (request, response, next) => {
  try {
    const receivedData = { ...request.body };

    // write the new data in the 'db'
    const newSkinData = await addSkinData(receivedData);

    return response.status(CREATED).json(newSkinData);

  } catch (error) {
    return next(error); // call error middleware
  }
});

//
// READ
//
skinRouter.get('/', async (_request, response, next) => {
  try {
    // read skins from 'db'
    const skins = await getAllSkins();

    return response.status(OK).json(skins);

  } catch (error) {
    return next(error);
  }
});
skinRouter.get('/:id', checkIdMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params;

    // read skins from 'db'
    const skins = await getAllSkins();

    // skin found by id
    const skinsFound = skins.find((skin) => skin.id === +id);

    return response.status(OK).json(skinsFound);

  } catch (error) {
    return next(error);
  }
});

//
// UPDATE
//
skinRouter.put('/:id', checkIdMiddleware, checkUpdateMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, team, weapon } = request.body;

    // read skins from 'db'
    const skins = await getAllSkins();

    // find skin inside the 'db' by the id from the request params (the :id from the URL)
    const skinToUpdate = skins.find((skin) => skin.id === +id); // every data (in this case the :id) received from "params" (url) is a string
                                                                 // so we have to re-cast it to a number or w/e type you might need to use

    if (!skinToUpdate) {
      return response.status(NOT_FOUND).json({ message: '[fapi] - skin not found with specified id' });
    }

    // update skin data
    skinToUpdate.name = name;
    skinToUpdate.team = team;
    skinToUpdate.weapon = weapon;

    // change the api response with the updated skins list
    return response.status(OK).json(skins);

  } catch (error) {
    return next(error);
  }
});

//
// DELETE
//
skinRouter.delete('/:id', authMiddleware, checkIdMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params;

    // read skins from 'db'
    const skins = await getAllSkins();

    const arrayPosition = skins.findIndex((skin) => skin.id === +id);
    skins.splice(arrayPosition, 1);

    // send response in case everything goes well
    return response.status(OK).json(skins).end();

  } catch (error) {
    return next(error);
  }
});