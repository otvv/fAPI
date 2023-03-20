/*
*/

import express from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import { OK, INTERNAL_SERVER_ERROR } from './globals.js'; // TODO: get rid of this shit (BARREL it?)

// for some retarded reason I cant barrel this
import { skinRouter } from './routers/skin.router.js';
import { userRouter } from './routers/user.router.js';

const app = express();

// global middlewares
app.use(express.json());
app.use(morgan('dev'));

// routers
app.use('/skins', skinRouter);
app.use('/users', userRouter); // you can only view the content of the '/user' route if you have the access token (see: middlewares/authMiddleware.js)
                               // make sure to pass the authorization header before you make your request

// TODO: move this to its own router?
app.get('/', (_request, response) => response.status(OK).json({ message: '[fapi] - running' }));

// setup error middleware
app.use((_request, response) => response.sendStatus(INTERNAL_SERVER_ERROR)); // this will return a message when something goes wrong internally (with the API)

export default app;
