import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../index';

const filenameUrl = fileURLToPath(import.meta.url);
const dirname = path.dirname(filenameUrl);

const testList = [
  // 'yaml',
  'json',
];

const getFixturePath = (filename) => path.join(dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const result = readFixture('expectedStylish');

describe('gendiff', () => {
  test.each(testList)('gendiff %s', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);
    expect(genDiff(filepath1, filepath2)).toEqual(result);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(result);
  });
});
