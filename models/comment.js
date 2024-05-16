const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        name:String,
        userId:mongoose.Schema.Types.ObjectId,  
               
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true
    }

   
},{timestamps:true})

const Comment = mongoose.model('comment',commentSchema)

module.exports = Comment