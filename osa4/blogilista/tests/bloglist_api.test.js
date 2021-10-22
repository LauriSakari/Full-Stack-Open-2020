const { application } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { response, map } = require('../app')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.inititialUsers)
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
describe('GETting blogs', () => {
  test('blogs are returned as json', async () => {
    const userToken = await helper.getUserToken()
    await api
      .get('/api/blogs')
      .set('Authorization', userToken)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('number of blogs in the database is correct', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(
      helper.initialBlogs.length
    )
  })

  test('id field is named as id', async () => {
    const blogs = await helper.blogsInDb()
    const oneBlog = blogs[0]
    expect(oneBlog.id).toBeDefined()
  })
  describe('POSTing blogs', () => {
    test('a new blog can be added', async () => {
      const userToken = await helper.getUserToken()
      const newBlog = {
        title: 'Kun mikään ei riitä',
        author: 'Mikko Heimonen',
        url: 'http://www.powderlove.fi',
        likes: 2,
        __v: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', userToken)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtTheEnd = await helper.blogsInDb()

      const titles = blogsAtTheEnd.map(note => note.title)

      expect(blogsAtTheEnd).toHaveLength(
        helper.initialBlogs.length + 1)
      expect(titles).toContain('Kun mikään ei riitä')
    })

    test('if likes are not given it must be 0', async () => {
      const userToken = await helper.getUserToken()

      const newBlogNoLikes = {
        title: 'New blog without likes',
        author: 'Pentti Bloggaaja',
        url: 'http://www.bloggers.fi',
        __v: 0
      }
      await api
        .post('/api/blogs')
        .set('Authorization', userToken)
        .send(newBlogNoLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtTheEnd = await helper.blogsInDb()

      const addedBlogWithoutNotes = blogsAtTheEnd.filter((blog) =>
        (blog.title === 'New blog without likes'))

      expect(addedBlogWithoutNotes[0].likes).toBeDefined()
      expect(addedBlogWithoutNotes[0].likes).toEqual(0)

    })
    const newBlogNoUrl = {
      title: 'New blog without URL',
      author: 'Pentti Bloggaaja',
      likes: 4,
      __v: 0
    }

    const newBlogNoTitle = {
      author: 'Without Title',
      url: 'http://www.bloggers.fi',
      likes: 3,
      __v: 0
    }

    test('return 400 if title and url are not defined', async () => {
      const userToken = await helper.getUserToken()

      await api.post('/api/blogs')
        .set('Authorization', userToken)
        .send(newBlogNoTitle)
        .expect(400)

      await api.post('/api/blogs')
        .set('Authorization', userToken)
        .send(newBlogNoUrl)
        .expect(400)
    })

    test('fails with status code 401 if token is not submitted', async () => {
      const newBlog = {
        title: 'Kun mikään ei riitä',
        author: 'Mikko Heimonen',
        url: 'http://www.powderlove.fi',
        likes: 2,
        __v: 0
      }

      await api.post('/api/blogs')
        .send(newBlog)
        .expect(401)
    })

    describe('POSTing users', () => {

      test('return 400 if username does not exist', async () => {
        const newUserNoUsername = {
          name: 'Teuvo Testaaja',
          password: 'salasana'
        }
        await api.post('/api/users')
          .send(newUserNoUsername)
          .expect(400)

        const usersAtTheEnd = await helper.usersInDb()
        expect(usersAtTheEnd).toHaveLength(helper.inititialUsers.length)
      })

      test('return 400 if password does not exist', async () => {
        const newUserNoPassword = {
          username: 'tepi',
          name: 'Teuvo Testaaja'
        }
        await api.post('/api/users')
          .send(newUserNoPassword)
          .expect(400)

        const usersAtTheEnd = await helper.usersInDb()
        expect(usersAtTheEnd).toHaveLength(helper.inititialUsers.length)
      })

      test('return 400 if username is alaredy in use', async () => {
        const newUserSameUsername = {
          username: 'late',
          name: 'Laurie',
          password: 'salasanat'
        }

        await api.post('/api/users')
          .send(newUserSameUsername)
          .expect(400)

        const usersAtTheEnd = await helper.usersInDb()
        expect(usersAtTheEnd).toHaveLength(helper.inititialUsers.length)
      })

      test('return 400 if username is too short', async () => {
        const newUserShortUsername = {
          username: 'la',
          name: 'Laurie',
          password: 'salasanat'
        }
        await api.post('/api/users')
          .send(newUserShortUsername)
          .expect(400)

        const usersAtTheEnd = await helper.usersInDb()
        expect(usersAtTheEnd).toHaveLength(helper.inititialUsers.length)
      })

      test('return 400 if password is too short', async () => {
        const newUserShortPassword = {
          username: 'lateksi',
          name: 'Laurie',
          password: 'pw'
        }
        await api.post('/api/users')
          .send(newUserShortPassword)
          .expect(400)

        const usersAtTheEnd = await helper.usersInDb()
        expect(usersAtTheEnd).toHaveLength(helper.inititialUsers.length)
      })

      describe('deleting', () => {
        test('succeeds with status code 204 if user id is valid', async () => {
          const userToken = await helper.getUserToken()
          const newBlog = {
            title: 'Kun mikään ei riitä',
            author: 'Mikko Heimonen',
            url: 'http://www.powderlove.fi',
            likes: 2,
            __v: 0
          }

          await api
            .post('/api/blogs')
            .set('Authorization', userToken)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

          const blogsAfterAddingNew = await helper.blogsInDb()
          expect(blogsAfterAddingNew).toHaveLength(helper.initialBlogs.length + 1)
          const titlesAfterAdding = blogsAfterAddingNew.map(blog => blog.title)
          expect(titlesAfterAdding).toContain('Kun mikään ei riitä')

          const blogs = await helper.blogsInDb()
          const blogToDelete = blogs[blogsAfterAddingNew.length - 1]

          await api.delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', userToken)
            .expect(204)
          const blogsAtTheEnd = await helper.blogsInDb()
          expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length)
          const titlesAfterDeleting = blogsAtTheEnd.map(blog => blog.title)
          expect(titlesAfterDeleting).not.toContain('Kun mikään ei riitä')
        })
      })
    })
  })
})
afterAll(() => {
  mongoose.connection.close()
})