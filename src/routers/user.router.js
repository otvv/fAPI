/*
*/

import express from 'express';
import { OK, CREATED, NO_CONTENT } from '../globals.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkIdMiddleware } from '../middlewares/checkIdMiddleware.js';
import { checkUpdateMiddleware } from '../middlewares/checkUpdateMiddleware.js';
import * as userModel from '../model/user.model.js';

export const userRouter = express.Router();

//
// CREATE
//
userRouter.post('/', authMiddleware, checkUpdateMiddleware, async (request, response, next) => {
  try {
    // insert a new user in the table
    const receivedPayload = { ...request.body };

    const createdId = await userModel.insertUser(receivedPayload);

    return response.status(CREATED).json({ createdId: createdId });
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
    const users = await userModel.findAll();

    return response.status(OK).json(users);
  } catch (error) {
    return next(error);
  }
});
userRouter.get('/:id', authMiddleware, checkIdMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params;

    // find user by id
    const user = await userModel.findById(id);

    return response.status(OK).json(user);
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

    // update user by id
    const changedId = await userModel.updateUser(id, { name, team, role });

    // change the api response with updated user id
    return response.status(OK).json({ changedId: changedId });
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

    // delete user by id
    const removedId = await userModel.deleteUser(id);

    // change the api response with the removed user id
    return response.status(NO_CONTENT).end(`removedId: ${removedId}`);
  } catch (error) {
    return next(error);
  }
});
