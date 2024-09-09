export function generateLinks (nodes){
  console.log('generateLinks')
  const links = [];

  nodes.forEach((node) => {
    console.log('en el for generateLinks', node)

      if (node.idParent) {
        console.log('add generateLinks')

          links.push({
              id: `${node.idParent}-${node.id}`,
              from: node.idParent,
              to: node.id,
          });
      }
  });

  return links;
};