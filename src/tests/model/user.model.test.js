/*
*/

import { expect } from 'chai'
import sinon from 'sinon'
import { deleteUser, findAll, findById, insertUser, updateUser } from '../../model/user.model.js';

describe('[2] user model tests', () => {
  it('[1] - user model // test_file_with_data (all)', async () => {
    const expected = [{
      "id": 1,
      "name": "User 1",
      "role": "lead",
      "team": "f"
    },
    {
      "id": 2,
      "name": "User 2",
      "role": "lead",
      "team": "f"
    },
    {
      "id": 3,
      "name": "User 3",
      "role": "dev",
      "team": "xs"
    },
    {
      "id": 4,
      "name": "User 4",
      "role": "dev",
      "team": "xs"
    }
    ];

    // TODO: mock the `read` function 
    // so then I can use a custom mocked result
    const result = await findAll();

    expect(result).to.deep.equal(expected);
  });

  it('[2] - user model // test_file_with_data (specific id)', async () => {
    const passedUserID = 1;
    const expected = {
      "id": 1,
      "name": "User 1",
      "role": "lead",
      "team": "f"
    };

    const result = await findById(passedUserID);

    expect(result).to.deep.equal(expected);
  });

  it('[3] - user model // test_file_with_data_insert', async () => {
    const payload = {
      "id": 5,
      "name": "User 5",
      "role": "dev",
      "team": "xs"
    };
    const expected = 5; // same id as the payload user id 

    // TODO: mock the `write` function
    // so the test battery doesnt modify the original users file 
    const result = await insertUser(payload);

    // check if the insertion id is correct
    expect(result).to.deep.equal(expected);
  });

  it('[4] - user model // test_file_with_data_update', async () => {
    const passedUserID = 1;
    const payload = {
      "id": 1,
      "name": "Tester",
      "role": "qa",
      "team": "f"
    };
    const expected = 1; // same id as the user who got updated 

    // TODO: mock the `write` function
    // so the test battery doesnt modify the original users file 
    const result = await updateUser(passedUserID, payload);

    // check if the "changed id" is correct
    expect(result).to.deep.equal(expected);
  });

  it('[5] - user model // test_file_with_data_removal', async () => {
    const passedUserID = 5;
    const expected = 5; // index of the user who got deleted

    // TODO: mock the `write` function
    // so the test battery doesnt modify the original users file 
    const result = await deleteUser(passedUserID);

    // check if the "removed id" is correct
    expect(result).to.deep.equal(expected);
  });

  afterEach(() => {
    sinon.restore();
  });

});