const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { postComment,deleteComment,editComment } = require('../controllers/commentController');
const commentRouter = express.Router();


commentRouter.post("/add",verifyToken,postComment)
commentRouter.delete("/delete/:blogId/:commentId",verifyToken,deleteComment)


module.exports = commentRouter