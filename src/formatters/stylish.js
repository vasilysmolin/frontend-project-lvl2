const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const mapNodes = {
  root: ({ children }, depth, iter) => {
    const result = children.flatMap((node) => mapNodes[node.type](node, depth + 1, iter));
    return `{\n${result.join('\n')}\n}`;
  },
  add: (node, depth) => `${indent(depth)}+ ${node.key}: ${node.value}`,
  delete: (node, depth) => `${indent(depth)}- ${node.key}: ${node.value}`,
  unchange: (node, depth) => `${indent(depth)}  ${node.key}: ${node.value}`,
  change: (node, depth) => {
    const { key, value1, value2 } = node;
    const data1 = `${indent(depth)}- ${key}: ${value1}`;
    const data2 = `${indent(depth)}+ ${key}: ${value2}`;
    return [data1, data2];
  },
};

const renderTree = (tree) => {
  const iter = (node, depth) => mapNodes[node.type](node, depth, iter);
  return iter(tree, 0);
};

export default renderTree;
