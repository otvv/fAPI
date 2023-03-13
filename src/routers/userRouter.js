/*
*/

import express from 'express';
import { OK, CREATED, NOT_FOUND } from '../global.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkIdMiddleware } from '../middlewares/checkIDMiddleware.js';
import { checkUpdateMiddleware } from '../middlewares/checkUpdateMiddleware.js';
import { addUserData, getAllUsers } from '../utils.js';

export const userRouter = express.Router();

//
// CREATE
//
userRouter.post('/', authMiddleware, checkUpdateMiddleware, async (request, response, next) => {
  try {
    const receivedData = { ...request.body };

    // write the new data in the 'db'
    const newUserData = await addUserData(receivedData);

    return response.status(CREATED).json(newUserData);

  } catch (error) {
    return next(error); // call error middleware
  }
});

//
// READ
//
userRouter.get('/', authMiddleware, async (_request, response, next) => {
  try {
    // read users from 'db'
    const users = await getAllUsers();

    return response.status(OK).json(users);

  } catch (error) {
    return next(error);
  }
});
userRouter.get('/:id', authMiddleware, checkIdMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params;

    // read user from 'db'
    const users = await getAllUsers();

    // user found by id
    const userFound = users.find((user) => user.id === +id);

    return response.status(OK).json(userFound);

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

    // read users from 'db'
    const users = await getAllUsers();

    // find user inside the 'db' by the id from the request params (the :id from the URL)
    const userToUpdate = users.find((user) => user.id === +id); // every data (in this case the :id) received from "params" (url) is a string
                                                                // so we have to re-cast it to a number or w/e type you might need to use

    if (!userToUpdate) {
      return response.status(NOT_FOUND).json({ message: '[fapi] - user not found with specified id' });
    }

    // update user data
    userToUpdate.name = name;
    userToUpdate.team = team;
    userToUpdate.role = role;

    // change the api response with the updated users list
    return response.status(OK).json(users);

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

    // read users from 'db'
    const users = await getAllUsers();

    const arrayPosition = users.findIndex((user) => user.id === +id);
    users.splice(arrayPosition, 1);

    // send response in case everything goes well
    return response.status(OK).json(users).end();

  } catch (error) {
    return next(error);
  }
});