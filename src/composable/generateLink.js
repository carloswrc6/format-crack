export function generateLinks (nodes){
  console.log('generateLinks')
  const links = [];

  nodes.forEach((node) => {
    console.log('en el for generateLinks', node)

      if (node.parentId) {
        console.log('add generateLinks')

          links.push({
              id: `${node.parentId}-${node.id}`,
              from: node.parentId,
              to: node.id,
          });
      }
  });

  return links;
};