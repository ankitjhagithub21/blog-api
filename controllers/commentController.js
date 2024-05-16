const Comment = require("../models/comment")
const Blog = require("../models/blog")
const User = require("../models/user")

const postComment = async (req, res) => {
    try {
        const { blogId, content } = req.body;
        const userId = req.id; 
       
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found"
            });
        }
        
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            }); 
        }
       
        const newComment = new Comment({
            user:{
                name:user.name,
                userId:user._id
            },
            content,
            blogId:blog._id
        });

        await newComment.save()
        
       
        blog.comments.push(newComment);
        

        await blog.save();
        
        res.status(201).json({
            success: true,
            message: "Comment posted successfully",
            comment: newComment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Function to delete a comment
const deleteComment = async (req, res) => {
    try {
        const { blogId, commentId } = req.params;
        const userId = req.id; // Assuming `req.id` contains the ID of the currently logged-in user
        
        // Find the user making the request
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Find the blog post
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found"
            });
        }

        // Find the comment within the blog post
        const commentIndex = blog.comments.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        // Check if the comment belongs to the user making the request
        if (blog.comments[commentIndex].user.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this comment"
            });
        }

        // Remove the comment from the comments array
        blog.comments.splice(commentIndex, 1);
        
        // Save the blog post without the deleted comment
        await blog.save();

        res.json({
            success: true,
            message: "Comment deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const editComment = async (req, res) => {
    try {
        const { blogId, commentId } = req.params;

        const userId = req.id
        const { content } = req.body;
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            }); 
        }
        
        // Find the blog post
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found"
            });
        }
        
        // Find the index of the comment in the comments array
        const commentIndex = blog.comments.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }
        
        // Update the content of the comment
        blog.comments[commentIndex].content = content;
        
        // Save the blog post with the updated comment
        await blog.save();
        
        res.json({
            success: true,
            message: "Comment updated successfully",
            comment: blog.comments[commentIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    postComment,
    deleteComment,
    editComment
}