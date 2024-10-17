/**
 * Genera una lista de enlaces entre nodos basados en la relación `parentId`.
 *
 * @param {Array} nodes - Array de nodos, donde cada nodo tiene un `id` y un `parentId`.
 * @returns {Array} - Array de enlaces, donde cada enlace tiene un `id`, `from` y `to`.
 *
 * Un enlace conecta un nodo hijo (to) con su nodo padre (from) usando `parentId`.
 */
export function generateLinks(nodes) {
  const links = [];

  nodes.forEach((node) => {
    if (node.parentId) {
      links.push({
        id: `${node.parentId}-${node.id}`,
        from: node.parentId,
        to: node.id,
        visible: node.visible,
      });
    }
  });

  return links;
}
