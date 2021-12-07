import mongoose from 'mongoose'
const commentSchema = mongoose.Schema({
    userId: {
        type: String
    },
    postId: {
        type: String
    },
    content: {
        type: String,
        default: ''
    },
    likes: {
        type: Array,
        default: []
    },
    response: {
        type: Array,
        default: []
    }
},
    { timestamps: true })
export default mongoose.model('Comments', commentSchema)