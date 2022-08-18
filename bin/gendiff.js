#!/usr/bin/env node

import genDiff from '../index.js';
import {program} from 'commander';

program
  .arguments('<filepath1> <filepath2>')
  .description('Two files difference')
  .option('-f, --format [type]', 'output', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.opts().format));
  })
  .version('1.0.0')
  .parse(process.argv)
;
