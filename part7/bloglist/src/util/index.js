import blogService from '../services/blogs';

export const setToken = token => {
  blogService.setToken(token);
};

export const saveToLocalStorage = (objectName, object) => {
  window.localStorage.setItem(objectName, JSON.stringify(object));
};

export const loadFromLocalStorage = objectName => {
  return window.localStorage.getItem(objectName);
};

export const sortByLike = blogs => {
  if (blogs) {
    return blogs.toSorted((a, b) => b.likes - a.likes);
  }
  return blogs;
};
