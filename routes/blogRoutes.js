const express = require('express');
const multer = require('multer');
const blogRouter = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const {
    uploadBlog,
    deleteBlog,
    updateBlog,
    getAllBlogs,
    getSingleBlog
} = require('../controllers/blogController');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

blogRouter.post('/upload', upload.single('image'), verifyToken, uploadBlog);
blogRouter.delete('/:blogId', verifyToken, deleteBlog);
blogRouter.put('/:blogId', verifyToken, updateBlog);
blogRouter.get('/', getAllBlogs);
blogRouter.get('/:blogId', getSingleBlog);

module.exports = blogRouter;
