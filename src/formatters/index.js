import formatStylish from './stylish';
import formatPlain from './plain';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

export default (tree, type) => {
  const format = formatters[type];
  return format(tree);
};
