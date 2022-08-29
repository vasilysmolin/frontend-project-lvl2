import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

export default (tree, type) => {
  const format = formatters[type];
  return format(tree);
};
