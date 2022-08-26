import _ from 'lodash';
const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth, mapNodes) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const result = Object.entries(data)
      .map(([key, value]) => mapNodes.unchanged({ key, value }, depth + 1));
  return `{\n${result.join('\n')}\n${indent(depth)}  }`;
};

const mapNodes = {
  root: ({ children }, depth, iter) => {
    const result = children.flatMap((node) => mapNodes[node.type](node, depth + 1, iter));
    return `{\n${result.join('\n')}\n}`;
  },
  add: (node, depth) => `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth, mapNodes)}`,
  delete: (node, depth) => `${indent(depth)}- ${node.key}: ${stringify(node.value, depth, mapNodes)}`,
  nested: ({ key, children }, depth, iter) => {
    const result = children.flatMap((node) => mapNodes[node.type](node, depth + 1, iter));
    return `${indent(depth)}  ${key}: {\n${result.join('\n')}\n${indent(depth)}  }`;
  },
  unchanged: (node, depth) => `${indent(depth)}  ${node.key}: ${stringify(node.value, depth, mapNodes)}`,
  change: (node, depth) => {
    const { key, value1, value2 } = node;
    const data1 = `${indent(depth)}- ${key}: ${stringify(value1, depth, mapNodes)}`;
    const data2 = `${indent(depth)}+ ${key}: ${stringify(value2, depth, mapNodes)}`;
    return [data1, data2];
  },
};

const renderTree = (tree) => {
  const iter = (node, depth) => mapNodes[node.type](node, depth, iter);
  return iter(tree, 0);
};

export default renderTree;
