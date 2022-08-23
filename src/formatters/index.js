import formatStylish from './stylish.js';

const formatters = {
  stylish: formatStylish,
};

export default (tree, type) => {
  const format = formatters[type];
  return format(tree);
};
