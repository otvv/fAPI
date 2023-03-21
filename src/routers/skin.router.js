/*
*/

import express from "express";
import { OK, CREATED, NO_CONTENT } from '../globals.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { checkIdMiddleware } from '../middlewares/id.middleware.js';
import { checkUpdateMiddleware } from '../middlewares/update.middleware.js';
import * as skinService from '../service/skin.service.js';

export const skinRouter = express.Router();

//
// CREATE
//
skinRouter.post('/', authMiddleware, checkUpdateMiddleware, async (request, response, next) => {
  try {
    const receivedData = { ...request.body };

    // insert a new skin in the table
    const payload = await skinService.insertSkin(receivedData);

    return response.status(CREATED).json(payload.message);
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
    const payload = await skinService.findAll();

    return response.status(OK).json(payload.message);
  } catch (error) {
    return next(error);
  }
});
skinRouter.get('/:id', checkIdMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params;

    // find skin by id
    const payload = await skinService.findById(id);

    return response.status(OK).json(payload.message);
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

    // update skin data by its id
    const payload = await skinService.updateSkin(id, { name, team, weapon });

    return response.status(OK).json(payload.message);
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

    // delete skin by its id
    const payload = await skinService.deleteSkin(id);

    return response.status(NO_CONTENT).end(`${payload.message}`);
  } catch (error) {
    return next(error);
  }
});
