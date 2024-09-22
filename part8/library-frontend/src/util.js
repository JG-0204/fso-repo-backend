const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (cacheBooks) => {
    let seen = new Set();

    return cacheBooks.filter((book) => {
      let title = book.title;
      return seen.has(title) ? false : seen.add(title);
    });
  };
  cache.updateQuery(query, ({ allBooks }) => {
    return { allBooks: uniqByName(allBooks.concat(addedPerson)) };
  });
};

export default updateCache;
