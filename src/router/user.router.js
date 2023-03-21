/*
*/

import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { checkIdMiddleware } from '../middleware/id.middleware.js';
import { checkUpdateMiddleware } from '../middleware/update.middleware.js';
import * as userController from '../controller/user.controller.js';

export const userRouter = express.Router();

// CREATE
userRouter.post('/', authMiddleware, checkUpdateMiddleware, userController.createUser);

// READ
userRouter.get('/', authMiddleware, userController.listUsers);
userRouter.get('/:id', authMiddleware, checkIdMiddleware, userController.displayUser);

// UPDATE
userRouter.put('/:id', authMiddleware, checkIdMiddleware, checkUpdateMiddleware, userController.updateUser);

// DELETE
userRouter.delete('/:id', authMiddleware, checkIdMiddleware, userController.deleteUser);
