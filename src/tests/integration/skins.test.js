import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js'
import Sinon from 'sinon';
import fs from 'fs';

chai.use(chaiHttp);

// STATUS CODES
const OK = 200;
const NOT_FOUND = 404;
const CREATED = 201;

// MOCKS
const mockStatus = '[fapi] - running'
const mockSkinToAdd = {
  "id": 1224,
  "name": "Wicked Slick",
  "weapon": "P2000",
  "team": "CT"
};
const mockSkinToFetch = {
  "id": 1229,
  "name": "Sakkaku",
  "weapon": "MAC-10",
  "team": "T"
}
const mockDB = JSON.stringify(
  { "skins":
  [
    {
      "id": 1228,
      "name": "Temukau",
      "weapon": "M4A4",
      "team": "CT"
    },
    {
      "id": 1221,
      "name": "Head Shot",
      "weapon": "AK-47",
      "team": "T"
    },
    {
      "id": 1222,
      "name": "Duality",
      "weapon": "AWP",
      "team": "BOTH"
    },
    {
      "id": 1229,
      "name": "Sakkaku",
      "weapon": "MAC-10",
      "team": "T"
    },
  ]
}
);

beforeEach(function () {
  Sinon.stub(fs.promises, 'readFile').resolves(mockDB);
  Sinon.stub(fs.promises, 'writeFile').resolves();
});

describe('using the method /GET in /', function () {
  it ('check if the API returns the correct status message', async function () {
    const response = await chai.request(app).get('/');

    // DEBUG PURPOSES ONLY
    //console.log('[fapi-test] - response:', response.body.message);

    expect(response.status).to.be.equal(OK);
    expect(response.body).to.haveOwnProperty('message');
    expect(response.body.message).to.be.equal(mockStatus);
  });
});

describe('using the method "/GET" in /skins', function () {
  it('check if the API returns the skin list', async function () {
    const response = await chai.request(app).get('/skins');

    // DEBUG PURPOSES ONLY
    // console.log('[fapi-test] - response:', response.body);

    expect(response.status).to.be.equal(OK);
    expect(response.body).to.be.instanceOf(Array);
  });
});

describe('using the method "/GET" in /skins/:id', function () {
  it('check if the API returns the skin by its ID', async function () {
    const response = await chai.request(app).get('/skins/1229');

    // DEBUG PURPOSES ONLY
    // console.log('[fapi-test] - response:', response.body);

    expect(response.status).to.be.equal(OK);
    expect(response.body).to.be.instanceOf(Object);
    expect(response.body).to.deep.equal(mockSkinToFetch);
  });
});

describe('using the method "/POST" in /skins', function () {
  it('check if the API returns the new skin added', async function () {
    const response = await chai.request(app).post('/skins').send(mockSkinToAdd);

    // DEBUG PURPOSES ONLY
    // console.log('[fapi-test] - response:', response.body);

    expect(response.status).to.be.equal(CREATED);
    expect(response.body).to.be.instanceOf(Object);
    expect(response.body).to.deep.equal(mockSkinToAdd);
  });
});

afterEach(function () {
  Sinon.restore();
});
