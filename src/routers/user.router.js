/*
*/

import express from 'express';
import { OK, CREATED, NO_CONTENT } from '../globals.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { checkIdMiddleware } from '../middlewares/id.middleware.js';
import { checkUpdateMiddleware } from '../middlewares/update.middleware.js';
import * as userService from '../service/user.service.js';

export const userRouter = express.Router();

//
// CREATE
//
userRouter.post('/', authMiddleware, checkUpdateMiddleware, async (request, response, next) => {
  try {
    const receivedData = { ...request.body };

    // insert a new user in the table
    const payload = await userService.insertUser(receivedData);

    return response.status(CREATED).json(payload.message);
  } catch (error) {
    return next(error);
  }
});

//
// READ
//
userRouter.get('/', authMiddleware, async (_request, response, next) => {
  try {
    // find all users
    const payload = await userService.findAll();

    return response.status(OK).json(payload.message);
  } catch (error) {
    return next(error);
  }
});
userRouter.get('/:id', authMiddleware, checkIdMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params;

    // find user by id
    const payload = await userService.findById(id);

    return response.status(OK).json(payload.message);
  } catch (error) {
    return next(error);
  }
});

//
// UPDATE
//
userRouter.put('/:id', authMiddleware, checkIdMiddleware, checkUpdateMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, team, role } = request.body;

    // update user by its id
    const payload = await userService.updateUser(id, { name, team, role });

    return response.status(OK).json(payload.message);
  } catch (error) {
    return next(error);
  }
});

//
// DELETE
//
userRouter.delete('/:id', authMiddleware, checkIdMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params;

    // delete user by its id
    const payload = await userService.deleteUser(id);

    return response.status(NO_CONTENT).end(`${payload.message}`);
  } catch (error) {
    return next(error);
  }
});
