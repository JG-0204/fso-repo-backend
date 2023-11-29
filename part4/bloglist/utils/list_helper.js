const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 1) return blogs[0].likes;

  return blogs.map((b) => b.likes).reduce((a, b) => a + b);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 1) {
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes,
    };
  }

  const blogLikes = blogs.map((b) => b.likes);
  const i = blogLikes.indexOf(Math.max(...blogLikes));

  return {
    title: blogs[i].title,
    author: blogs[i].author,
    likes: blogs[i].likes,
  };
};

const mostBlogs = (blogs) => {
  // arr of author
  const arr = blogs
    .map((b) => b.author)
    .filter((v, i, a) => a.indexOf(v) === i);

  // arr for author and blog count obj
  let d = [];

  arr.forEach((a) => {
    const obj = {
      author: a,
      blogs: blogs.filter((b) => b.author === a).length,
    };

    d.push(obj);
  });

  // map the arr of obj for blog property then get the index of the most blog count
  const blogCountArr = d.map((d) => d.blogs);
  const i = blogCountArr.indexOf(Math.max(...blogCountArr));

  return d[i];
};

const mostLikes = (blogs) => {
  // arr of author
  const arr = blogs
    .map((b) => b.author)
    .filter((v, i, a) => a.indexOf(v) === i);

  // arr for author and likes obj
  let d = [];

  arr.forEach((a) => {
    const likes = blogs.filter((b) => b.author === a);

    const obj = {
      author: a,
      likes: totalLikes(likes),
    };

    d.push(obj);
  });

  const likesArr = d.map((dd) => dd.likes);
  const i = likesArr.indexOf(Math.max(...likesArr));

  return d[i];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
