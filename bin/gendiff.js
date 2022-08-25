#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index';

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output', 'stylish')
  .version('1.0.0')
  .parse(process.argv);

const { args } = program;
const { format } = program.opts();

console.log(genDiff(args[0], args[1], format));
