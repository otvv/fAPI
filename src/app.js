/*
*/

import express from 'express';
import 'express-async-errors';
import * as statusCode from './controller/globals.js';

import { skinRouter } from './router/skin.router.js';
import { userRouter } from './router/user.router.js';

const app = express();

// global middleware
app.use(express.json());

// routers
app.use('/skins', skinRouter);
app.use('/users', userRouter); // you can only view the content of the '/user' route if you have the access token (see: middlewares/authMiddleware.js)
                               // make sure to pass the authorization header before you make your request

// root
app.get('/', (_request, response) => response.status(statusCode.OK).json({ message: '[fapi] - running' }));

export default app;
