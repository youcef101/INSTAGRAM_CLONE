import express from 'express'
import Comment from '../models/Comment.js'
import Post from '../models/Post.js';
const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).send('hello from comment route !!!')
})
router.post('/add', async (req, res) => {
    try {
        let newComment = {
            userId: req.body.userId,
            postId: req.body.postId,
            content: req.body.content
        }
        await Comment.create(newComment);
        res.status(201).send('Your comment added successfully !!!')

    } catch (err) {
        res.status(500).send(err)
    }
})

//edit comment
router.put('/:id/edit', async (req, res) => {
    try {
        let comment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).send('comment has been updated successfully !!!')

    } catch (err) {
        res.status(500).send(err)
    }
})

//delete comment
router.delete('/:id/delete', async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).send('comment has been deleted successfully !!!')
    } catch (err) {
        res.status(500).send(err)
    }
})

//get post all comment
router.get('/:postId/all', async (req, res) => {
    try {
        let current_post = await Post.findById(req.params.postId);
        let comment_post = await Comment.find({ postId: current_post._id });
        res.status(200).send(comment_post);

    } catch (err) {
        res.status(500).send(err);
    }
})

export default router