/*
*/

//
import express from 'express';

const app = express();
app.use(express.json());

// STATUS CODES
const OK = 200;
const NOT_FOUND = 404;
const CREATED = 201;

// test data
const testSkins = [
  {
    id: 1228,
    name: 'Temukau',
    wapon: 'M4A4',
    team: 'CT',
  },
  {
    id: 1221,
    name: 'Head Shot',
    wapon: 'AK-47',
    team: 'T',
  },
  {
    id: 1222,
    name: 'Duality',
    wapon: 'AWP',
    team: 'BOTH',
  },
  {
    id: 1229,
    name: 'Sakkaku',
    wapon: 'MAC-10',
    team: 'T',
  },
];

app.get('/', (_request, response) => response.status(OK).json({ message: '[fapi] - running' }));

// CREATE
app.post('/skins', (request, response) => {
  const newData = { ...request.body };
  // add data from body
  testSkins.push(newData);

  response.status(CREATED).json({ testSkins: newData });
});

// READ
app.get('/skins', (_request, response) => response.status(OK).json({ testSkins }));

// UPDATE
app.put('/skins/:id', (request, response) => {
  const { id } = request.params;
  const { name, team, weapon } = request.body;

  // find skin inside the 'global' array by the id from the request params
  const updateSkins = testSkins.find((skin) => skin.id === +id); // every data received from "params" is a string
                                                                // so we have to "convert" it to a number or w/e data you might need
  if (!updateSkins) {
    response.status(NOT_FOUND).json({ message: '[fapi] - skin not found' });
  }

  // update data
  updateSkins.name = name;
  updateSkins.team = team;
  updateSkins.wapon = weapon;

  // change the api response with the found skin
  response.status(OK).json({ updateSkins });
});

// DELETE
app.delete('/skins/:id', (request, response) => {
  const { id } = request.params;

  const arrayPosition = testSkins.findIndex((skin) => skin.id === +id);
  testSkins.splice(arrayPosition, 1);

  // send response in case everything goes well
  response.status(OK).end();
});

export default app;
