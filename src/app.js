/*
*/

import express from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import { OK, INTERNAL_SERVER_ERROR } from './global.js'; // TODO: get rid of this shit (BARREL it?)

// for some retarded reason I cant barrel this
import { skinRouter } from './routers/skinRouter.js';
import { userRouter } from './routers/userRouter.js';

const app = express();

// global middlewares
app.use(express.json());
app.use(morgan('dev'));

// routers
app.use('/skins', skinRouter);
app.use('/users', userRouter); // you can only view the content of the '/user' route if you have the access token (see: middlewares/authMiddleware.js)
                               // make sure to pass the authorization header token before you make your request

// TODO: move this to a new router?
app.get('/', (_request, response) => response.status(OK).json({ message: '[fapi] - running' }));

// error middleware
app.use((_request, response) => response.sendStatus(INTERNAL_SERVER_ERROR)); // generic error message when something goes wrong internaly (with the API)

export default app;
