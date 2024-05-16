const express = require('express');
const blogRouter = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const {
    uploadBlog,
    deleteBlog,
    updateBlog,
    getAllBlogs,
    getSingleBlog
} = require('../controllers/blogController');



blogRouter.post('/upload',verifyToken, uploadBlog);
blogRouter.delete('/:blogId', verifyToken, deleteBlog);
blogRouter.put('/:blogId', verifyToken, updateBlog);
blogRouter.get('/', getAllBlogs);
blogRouter.get('/:blogId', getSingleBlog);

module.exports = blogRouter;
