import mongoose from 'mongoose'
const postSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    title: {
        type: String,
        default: ""
    },
    desc: {
        type: String,
        default: ""
    },
    postImg: {
        type: String,
        default: ""
    },


},
    { timestamps: true }
)
export default mongoose.model('Posts', postSchema);

