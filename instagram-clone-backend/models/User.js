import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,

    },
    lastName: {
        type: String,
        require: true,

    },
    fullName: {
        type: String,

    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profileImg: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
},
    { timestamps: true }
)
export default mongoose.model('User', userSchema)