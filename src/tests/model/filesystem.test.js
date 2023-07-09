/*
*/

import { expect } from 'chai'
import { join } from 'path';
import sinon from 'sinon'
import fs from 'fs/promises'
import { read, write, CUR_DIR_NAME } from '../../model/filesystem.js';

const VALID_FILE_PATH = 'src/tests/model/mocks/valid.json';
const EMPTY_FILE_PATH = 'src/tests/model/mocks/empty.json';
const INVALID_FILE_PATH = 'src/tests/model/mocks/invalid.json';
const VALID_FILE_WRITE_PATH = 'src/tests/model/mocks/test.txt';


describe('[1] filesystem driver tests', () => {
  it('[1] - filesystem driver // test_valid_json_file', async () => {
    const expected = {
      id: 1,
      name: "User 1",
      role: "lead",
      team: "f"
    };

    sinon.stub(fs, 'readFile').resolves(JSON.stringify(expected));
    const result = await read(VALID_FILE_PATH);

    expect(result).to.deep.equal(expected);
  });

  it('[2] - filesystem driver // test_empty_json_file', async () => {
    const expected = {};

    sinon.stub(fs, 'readFile').resolves(JSON.stringify(expected));
    const result = await read(EMPTY_FILE_PATH);

    expect(result).to.deep.equal(expected);
  });

  it('[3] - filesystem driver // test_invalid_json_content', async () => {
    const expected = {
      name: "User 1"
    }
    sinon.stub(fs, 'readFile').resolves(JSON.stringify(expected));
    try {
      await read(INVALID_FILE_PATH);
    } catch (e) {
      expect(e).to.be.an.instanceOf(Error);
      expect(e.message).to.equal('Unexpected token i in JSON at position 0');
    }
  });

  it('[4] - filesystem driver // test_write_success', async () => {
    const payload = 'This is a test';

    await write(VALID_FILE_WRITE_PATH, payload);
    const readContent = await fs.readFile(join(CUR_DIR_NAME, VALID_FILE_WRITE_PATH), 'utf-8');

    expect(readContent).to.equal(payload);
  });

  it('[5] - filesystem driver // test_write_empty_payload_success', async () => {
    const payload = '';

    await write(VALID_FILE_WRITE_PATH, payload);
    const readContent = await fs.readFile(join(CUR_DIR_NAME, VALID_FILE_WRITE_PATH), 'utf-8');

    expect(readContent).to.equal(payload);
  });

  afterEach(() => {
    sinon.restore();
  });
});
