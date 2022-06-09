import express from 'express'
import Post from '../models/Post.js'
import User from '../models/User.js'
import { upload } from '../upload.js'
const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).send('hello from post route !!!')
})


//create post 
router.post('/add', async (req, res) => {

    try {
        let newPost = {
            userId: req.body.userId,
            title: req.body.title,
            desc: req.body.desc,
            postImg: req.body.postImg
        }
        await Post.create(newPost);
        res.status(201).send('your post created successfully !!!')


    } catch (err) {
        res.status(500).send(err)
    }
})

//get timeline posts
router.get('/:userId/timeline/all', async (req, res) => {
    try {
        let current_user = await User.findById(req.params.userId);
        let user_posts = await Post.find({ userId: current_user._id });
        let followings_posts = await Promise.all(
            current_user.followings.map(followingsId => {
                return Post.find({ userId: followingsId });
            })
        )
        res.status(200).send(user_posts.concat(...followings_posts));

    } catch (err) {
        res.status(500).send(err);
    }
})

//get post user info
router.get('/:id/user/info', async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        let post_user_info = await User.findById(post.userId)
        res.status(200).send(post_user_info);

    } catch (err) {
        res.status(500).send(err);
    }
})

//get user posts
router.get('/:userId/all', async (req, res) => {
    try {
        const result = await Post.find({ userId: req.params.userId })
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
    }
})

export default router