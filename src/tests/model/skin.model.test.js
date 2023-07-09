/*
*/

import { expect } from 'chai'
import sinon from 'sinon'
import { deleteSkin, findAll, findById, insertSkin, updateSkin } from '../../model/skin.model.js';

describe('[3] skin model tests', () => {
  it('[1] - skin model // test_file_with_data (all)', async () => {
    const expected = [ {
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
    }
    ];

    // TODO: mock the `read` function 
    // so then I can use a custom mocked result
    const result = await findAll();

    expect(result).to.deep.equal(expected);
  });

  it('[2] - skin model // test_file_with_data (specific id)', async () => {
    const passedSkinID = 1228;
    const expected = {
      "id": 1228,
      "name": "Temukau",
      "weapon": "M4A4",
      "team": "CT"
    };

    const result = await findById(passedSkinID);

    expect(result).to.deep.equal(expected);
  });

  it('[3] - skin model // test_file_with_data_insert', async () => {
    const payload = {
      "id": 282,
      "name": "Redline",
      "weapon": "AK-47",
      "team": "T"
    };
    const expected = 282; // same id as the payload skin id 

    // TODO: mock the `write` function
    // so the test battery doesnt modify the original skins file 
    const result = await insertSkin(payload);

    // check if the insertion id is correct
    expect(result).to.deep.equal(expected);
  });

  it('[4] - skin model // test_file_with_data_update', async () => {
    const passedSkinID = 1228;
    const payload = {
      "id": 1228,
      "name": "Printstream",
      "weapon": "M4A1-S",
      "team": "CT"
    };
    const expected = 1228; // same id as the skin that was updated 

    // TODO: mock the `write` function
    // so the test battery doesnt modify the original skins file 
    const result = await updateSkin(passedSkinID, payload);

    // check if the "changed id" is correct
    expect(result).to.deep.equal(expected);
  });

  it('[5] - skin model // test_file_with_data_removal', async () => {
    const passedSkinID = 282;
    const expected = 5; // index of the skin that got deleted

    // TODO: mock the `write` function
    // so the test battery doesnt modify the original skins file 
    const result = await deleteSkin(passedSkinID);

    // check if the "removed id" is correct
    expect(result).to.deep.equal(expected);
  });

  afterEach(() => {
    sinon.restore();
  });

});