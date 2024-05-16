const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments:{
        type:Array,
        default:[]
    },
    author:{
        type:String,
        required:true
    } 
},{timestamps:true})

const Blog = mongoose.model('blog',blogSchema)

module.exports = Blog