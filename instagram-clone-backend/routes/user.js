import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { upload } from '../upload.js'
const router = express.Router();
router.get('/', async (req, res) => {
    res.status(200).send('hello from user route !!!')
})
//get all users
router.get('/all', async (req, res) => {
    try {
        let user = await User.find();
        res.status(200).send(user)

    } catch (err) {
        res.status(500).send(err)
    }
})
//edit user info

router.put('/:id/info/edit', async (req, res) => {

    try {
        await User.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).send(`your account updated successfully !!!`);
    } catch (err) {
        res.status(500).send(err)
    }

})
//edit user profile photo
router.route('/:id/photo/edit').put(upload, async (req, res) => {
    const url = req.protocol + "://" + req.get('host') + "/public/uploads/"
    try {

        await User.findByIdAndUpdate(req.params.id, { profileImg: url + req.file.filename });
        res.status(200).send(`your account profile photo updated successfully !!!`);
    } catch (err) {
        res.status(500).send(err)
    }

})

//edit user password
router.put('/:id/password/change', async (req, res) => {
    let user = await User.findById(req.params.id);
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                await user.updateOne({ password: req.body.password });
                res.status(200).send('your password has been changed successfully !!!')
            } catch (err) {
                res.status(500).send(err);
            }
        }
    } else {
        res.status(400).send('you can update only your account !!!')
    }


})

//delete user
router.delete('/:id/delete', async (req, res) => {
    try {
        if (req.body.userId === req.params.id) {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).send('your account has been deleted successfully !!!')

        } else {
            res.status(400).send('you can delete only your account  !!!')
        }

    } catch (err) {
        res.status(500).send(err);
    }
})

//get user by id
router.get('/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.status(200).send(user)

    } catch (err) {
        res.status(500).send(err);
    }
})

//follow && unfollow user
router.post('/:id/follow', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        let current_user = await User.findById(req.body.userId)
        if (req.body.userId !== req.params.id) {
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await current_user.updateOne({ $push: { followings: req.params.id } });
                res.status(200).send(`${current_user.username} you are follow ${user.username}  !!!`)
            } else {
                res.status(400).send(`you alredy followed ${user.username}`)
                // await user.updateOne({ $pull: { followers: req.body.userId } });
                // await current_user.updateOne({ $pull: { followings: req.params.id } });
                // res.status(200).send(`${current_user.username} you are unfollow ${user.username}  !!!`)
            }

        } else {
            res.status(400).send('You can not follow yourself !!!')
        }

    } catch (err) {
        res.status(500).send(err);
    }
})

//get user followers
router.get('/:id/followers', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        //user followers id except the followers when user is following to her !!!!
        let b = user.followers.filter(id => user.followings.indexOf(id) < 0);
        //user followers info !!!
        let user_followers = await Promise.all(
            b.map(followerId => {
                return User.findById(followerId);
            })
        )

        res.status(200).send(user_followers);


    } catch (err) {
        res.status(500).send(err);
    }
})

//get user followings
router.get('/:id/followings', async (req, res) => {
    try {

        let user = await User.findById(req.params.id);
        let user_followings = await Promise.all(
            user.followings.map(followingId => {
                return User.findById(followingId);
            })
        )
        res.status(200).send(user_followings);


    } catch (err) {
        res.status(500).send(err);
    }
})

//get user profile
router.get('/:fullName/profile', async (req, res) => {
    try {
        let user = await User.findOne({ fullName: req.params.fullName });
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

//get not followers and not followings users

router.get('/suggestion/:userId/all', async (req, res) => {
    try {

        let all_users = await User.find()
        //let result_final = all_users.find(user => user._id !== req.params.userId)
        let result = all_users.filter(user => user._id != req.params.userId
            && !user.followers.includes(req.params.userId)
            && !user.followings.includes(req.params.userId))

        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
})



export default router