export default function (prev: Object, obj: { mutation: Object, node: { id: Number } }): any {
  const symbol = Object.keys(prev)[0]
  const prevObjs = Object.values(prev)[0]

  switch (obj.mutation) {
    case "CREATED": {
      const newAuthor = obj.node;
      // Don't double add the author
      if (prevObjs.some((x: { id: Number; }) => x.id === newAuthor.id)) {
        return prev;
      } else {
        // Author not found, add it
        return Object.assign({}, prev, {
          [symbol]: [newAuthor, ...prevObjs]
        });
      }
    }
    case "UPDATED": {
      const updatedAuthor = obj.node;
      // Replace previous author with updated one
      return Object.assign({}, prev, {
        [symbol]: prevObjs.map((x: { id: Number; }) =>
          x.id === updatedAuthor.id
            ? updatedAuthor
            : x
        )
      });
    }
    case "DELETED": {
      const deletedAuthor = obj.node;
      // Delete author
      return Object.assign({}, prev, {
        [symbol]: prevObjs.filter(
          (x: { id: Number; }) => x.id !== deletedAuthor.id
        )
      });
    }
    default:
      return prev;
  }
}