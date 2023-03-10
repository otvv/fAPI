/*
*/

import express from 'express';
import { addSkinData, getAllSkins } from './utils.js'

const app = express();
app.use(express.json());

// STATUS CODES
const OK = 200;
const NOT_FOUND = 404;
const CREATED = 201;

app.get('/', (_request, response) => response.status(OK).json({ message: '[fapi] - running' }));

// CREATE
app.post('/skins', async (request, response) => {
  const receivedData = { ...request.body };

  console.log('[fapi] - BODY returned:', receivedData);

  // write the new data in the 'db'
  const newSkinData = await addSkinData(receivedData);

  response.status(CREATED).json(newSkinData);

  // DEBUG PURPOSES ONLY
  // console.log('[fapi] - POST returned:', newSkinData);
});

// READ
app.get('/skins', async (_request, response) => {
  // read skins from 'db'
  const skins = await getAllSkins();

  response.status(OK).json(skins);

  // DEBUG PURPOSES ONLY
  // console.log('[fapi] - GET returned:', skins);
});

app.get('/skins/:id', async (request, response) => {
  const { id } = request.params;

  // read skins from 'db'
  const skins = await getAllSkins();

  // skin found by parsed id
  const skinsFound = skins.find((skin) => skin.id === +id);

  response.status(OK).json(skinsFound);

  // DEBUG PURPOSES ONLY
  // console.log('[fapi] - GET returned:', skinsFound);
});

// UPDATE
app.put('/skins/:id', async (request, response) => {
  const { id } = request.params;
  const { name, team, weapon } = request.body;

  // read skins from 'db'
  const skins = await getAllSkins();

  // find skin inside the 'db' by the id from the request params (the :id from the URL)
  const skinsToUpdate = skins.find((skin) => skin.id === +id); // every data (in this case the :id) received from "params" (url) is a string
                                                              // so we have to re-cast it to a number or w/e type you might need to use
  if (!skinsToUpdate) {
    response.status(NOT_FOUND).json({ message: '[fapi] - skin not found' });
  }

  // update found skin data
  skinsToUpdate.name = name;
  skinsToUpdate.team = team;
  skinsToUpdate.weapon = weapon;

  // change the api response with the found skin
  response.status(OK).json({ skinsToUpdate });

  // DEBUG PURPOSES ONLY
  // console.log('[fapi] - PUT returned:', skinsToUpdate);
});

// DELETE
app.delete('/skins/:id', (request, response) => {
  const { id } = request.params;

  const arrayPosition = testSkins.findIndex((skin) => skin.id === +id);
  testSkins.splice(arrayPosition, 1);

  // send response in case everything goes well
  response.status(OK).end();

  // DEBUG PURPOSES ONLY
  //console.log('[fapi] - DELETE removed an item at pos:', arrayPosition);
});

export default app;
