/*
*/

import express from "express";
import { CREATED, OK, NO_CONTENT } from '../globals.js';
import { checkIdMiddleware } from '../middlewares/checkIdMiddleware.js';
import { checkUpdateMiddleware } from '../middlewares/checkUpdateMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import * as skinModel from '../model/skin.model.js';

export const skinRouter = express.Router();

//
// CREATE
//
skinRouter.post('/', authMiddleware, checkUpdateMiddleware, async (request, response, next) => {
  try {
    const receivedPayload = { ...request.body };

    // insert a new skin in the table
    const createdId = await skinModel.insertSkin(receivedPayload);

    return response.status(CREATED).json({ createdId: createdId });
  } catch (error) {
    return next(error); // call error middleware
  }
});

//
// READ
//
skinRouter.get('/', async (_request, response, next) => {
  try {
    // find all skins
    const skins = await skinModel.findAll();

    return response.status(OK).json(skins);
  } catch (error) {
    return next(error);
  }
});
skinRouter.get('/:id', checkIdMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params;

    // find user by id
    const skin = await skinModel.findById(id);

    return response.status(OK).json(skin);
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

    // update skin by id
    const changedId = await skinModel.updateSkin(id, { name, team, weapon });

    // change the api response with the updated skin id
    return response.status(OK).json({ changedId: changedId });
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

    // delete skin by id
    const removedId = await skinModel.deleteSkin(id);

    // change the api response with the removed skin id
    return response.status(NO_CONTENT).end(`removedId: ${removedId}`);
  } catch (error) {
    return next(error);
  }
});
