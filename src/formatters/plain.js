const stringify = (value) => {

  if (value === null) {
    return value;
  }

  if (typeof value === 'object') {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return String(value);
};
const propertyName = (property, pathParents) => [...pathParents, property].join('.');


const mapNodes = {
  root: ({ children }, path, iter) => children.flatMap((node) => iter(node, path, iter)),
  add: (node, path) => `Property '${propertyName(node.key, path)}' was added with value: ${stringify(node.value)}`,
  nested: ({ key, children }, path, iter) => children.flatMap((node) => iter(node, [...path, key])),
  delete: (node, path) => `Property '${propertyName(node.key, path)}' was removed`,
  change: ({ key, value1, value2 }, path) => {
    const name = propertyName(key, path);
    return `Property '${name}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
  },
  unchanged: () => [],
};


const renderPlain = (tree) => {
  const iter = (node, currentPath) => mapNodes[node.type](node, currentPath, iter);
  return iter(tree, []).join('\n');
};

export default renderPlain;
