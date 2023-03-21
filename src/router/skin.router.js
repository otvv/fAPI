/*
*/

import express from "express";
import { authMiddleware } from '../middleware/auth.middleware.js';
import { checkIdMiddleware } from '../middleware/id.middleware.js';
import { checkUpdateMiddleware } from '../middleware/update.middleware.js';
import * as skinController from '../controller/skin.controller.js';

export const skinRouter = express.Router();

// CREATE
skinRouter.post('/', authMiddleware, checkUpdateMiddleware, skinController.createSkin);

// READ
skinRouter.get('/', skinController.listSkins);
skinRouter.get('/:id', checkIdMiddleware, skinController.displaySkin);

// UPDATE
skinRouter.put('/:id', checkIdMiddleware, checkUpdateMiddleware, skinController.updateSkin);

// DELETE
skinRouter.delete('/:id', authMiddleware, checkIdMiddleware, skinController.deleteSkin);
