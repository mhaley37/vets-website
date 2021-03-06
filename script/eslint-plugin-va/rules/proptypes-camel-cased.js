const MESSAGE =
  'The PropTypes library is capitalized, but the class property needs to be camel cased';
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: MESSAGE,
      category: 'best practices',
      recommended: true,
    },
  },
  create: context => ({
    MemberExpression: node => {
      if (node.property.name === 'PropTypes') {
        context.report({
          node,
          message: MESSAGE,
        });
      }
    },
  }),
};
