const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNvbGVpbCIsImlkIjoiNjU3NDNkYmZlZTJiYmNhNGI5ZmM2YzYxIiwiaWF0IjoxNzAyMTE2ODI5fQ.9KEMZ_f6-3pH_pLxb0EioJwImNeHbpLl8PhCybsktu4';

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.sampleBlogs);
}, 10000);

describe('database contain blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000);

  test('blog unique identifier is named id', async () => {
    const response = await api.get('/api/blogs').set('Authorization', token);

    const arr = response.body;

    expect(Object.keys(arr[0]).find(e => e === 'id')).toBeDefined();
  }, 10000);

  test('return status code 201 when searching for blogs id', async () => {
    const blogs = await helper.blogsInDb();

    const blog = { ...blogs[0] };

    const newBlog = await api
      .get(`/api/blogs/${blog.id}`)
      .set('Authorization', token);

    expect(newBlog.status).toBe(201);
    expect(newBlog.body).toEqual(blog);
  }, 10000);

  test('check if blog can be updated', async () => {
    const blogs = await helper.blogsInDb();

    const blog = {
      title: blogs[0].title,
      author: blogs[0].author,
      url: blogs[0].url,
      likes: 100,
      id: blogs[0].id,
    };

    const newBlog = await api
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', token)
      .send(blog);

    expect(newBlog.body.likes).toBe(blog.likes);
  }, 10000);
});

describe('adding new blogs', () => {
  test('new blog can be added', async () => {
    const newBlog = {
      title: 'A Title',
      author: 'An Author',
      url: 'A URL',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const dbBlogs = await helper.blogsInDb();
    expect(dbBlogs).toHaveLength(helper.sampleBlogs.length + 1);
  }, 10000);

  test('blog likes default to 0 if missing', async () => {
    const newBlog = {
      title: 'A Title ssss',
      author: 'An Authossssr',
      url: 'A URL',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs').set('Authorization', token);
    const keys = Object.keys(response.body[response.body.length - 1]);

    expect(keys).toContain('likes');
  });

  test('return status code 400 if blog title or url is missing', async () => {
    const newBlog = {
      author: 'an author',
      likes: 0,
      url: 'url',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400);
  }, 10000);

  test('return 401 when token is missing', async () => {
    const newBlog = {
      title: 'A Title',
      author: 'An Author',
      url: 'A URL',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', '')
      .send(newBlog)
      .expect(401);
  });
});

describe('tests for users', () => {
  test('returns an error when an invalid user is being added', async () => {
    const invalidUser = {
      username: 'sss',
      name: 'ssss',
      password: 'ss',
    };

    const response = await api
      .post('/api/users')
      .set('Authorization', token)
      .send(invalidUser)
      .expect(400);

    expect(Object.keys(response.body)).toContain('error');
  });

  test('invalid users are not created', async () => {
    let userDb = await helper.usersInDb();

    const prevLength = userDb.length;

    const invalidUser = {
      username: 'ss',
      name: 'ssss',
      password: 'ss',
    };

    await api.post('/api/users').set('Authorization', token).send(invalidUser);

    const currLength = userDb.length;

    expect(currLength).toEqual(prevLength);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
