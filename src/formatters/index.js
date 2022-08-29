import formatStylish from './stylish';
import formatPlain from './plain';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
};

export default (tree, type) => {
  const format = formatters[type];
  return format(tree);
};
