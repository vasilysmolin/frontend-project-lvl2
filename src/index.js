import fs from 'fs';
import path from 'path';

import builder from './builder.js';
import formats from './formatters/index.js';
import parse from './parsers.js';

const fullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), getFormat(filepath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fullPath1 = fullPath(filepath1);
  const fullPath2 = fullPath(filepath2);
  const data1 = getData(fullPath1);
  const data2 = getData(fullPath2);
  const tree = builder(data1, data2);
  return formats(tree, format);
};

export default genDiff;
