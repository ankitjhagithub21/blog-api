const Blog = require('../models/blog');
const User = require('../models/user');


//upload blog
const uploadBlog = async (req, res) => {
    try {
        const { title, content,image } = req.body;
        const userId = req.id;
        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            })
        }

        // Create a new blog post
        const newBlog = new Blog({
            title,
            content,
            image,
            author:user.name,
            user: userId
        });

        await newBlog.save()


        res.status(201).json({
            success: true,
            message: "Blog post uploaded successfully",
            blog: newBlog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

//delete blog
const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const userId = req.id; 
        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            })
        }

        
        // Check if the blog post exists and is associated with the authenticated user

        const blog = await Blog.findOneAndDelete({ _id: blogId, user: userId });
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found or you don't have permission to delete it"
            });
        }
        
        
        res.status(200).json({
            success: true,
            message: "Blog post deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//update blog
const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const userId = req.id; 
        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            })
        }

        const { title, content} = req.body;

        if(!title || !content){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        
        // Find the blog post and check if it belongs to the authenticated user
        let blog = await Blog.findOne({ _id: blogId, user: userId });
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found or you don't have permission to update it"
            });
        }
        
        blog.title = title;
        blog.content = content;
       
        await blog.save();
        
        res.status(200).json({
            success: true,
            message: "Blog post updated successfully",
            blog
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//get all blogs

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        if(!blogs){
            return res.status(404).json({
                success:false,
                message:"Blog not found."
            })
        }
        res.status(200).json({
            success: true,
            message: "All blogs fetched successfully",
            blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//get single blog
const getSingleBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId;

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    uploadBlog,
    deleteBlog,
    updateBlog,
    getAllBlogs,
    getSingleBlog,
};