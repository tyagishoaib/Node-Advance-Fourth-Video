// const mongoose = require('mongoose');
// const requireLogin = require('../middlewares/requireLogin');
// const redis = require('redis');
// const util = require('util');

// const Blog = mongoose.model('Blog');

// // Create Redis client once
// const redisUrl = 'redis://127.0.0.1:6379';
// const client = redis.createClient(redisUrl);
// client.get = util.promisify(client.get);

// module.exports = app => {
//   app.get('/api/blogs/:id', requireLogin, async (req, res) => {
//     const blog = await Blog.findOne({
//       _user: req.user.id,
//       _id: req.params.id
//     });

//     res.send(blog);
//   });

//   app.get('/api/blogs', requireLogin, async (req, res) => {
//     // do we have any cached data in redis which match this query
//     const cachedBlogs = await client.get(req.user.id);

//     // if yes then respond to the request immedietly and return the cached data
//     if (cachedBlogs) {
//       console.log("serving this from cache");
//       return res.send(JSON.parse(cachedBlogs));
//     }
// // if no then repond the request and update the cache  to store the data
//     const blogs = await Blog.find({ _user: req.user.id });

//     console.log("serving this from Mongo DB");
//     res.send(blogs);
//     client.set(req.user.id, JSON.stringify(blogs));
//   });

//   app.post('/api/blogs', requireLogin, async (req, res) => {
//     const { title, content } = req.body;

//     const blog = new Blog({
//       title,
//       content,
//       _user: req.user.id
//     });

//     try {
//       await blog.save();
//       res.send(blog);
//     } catch (err) {
//       res.send(400, err);
//     }
//   });
// };