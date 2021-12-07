import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
const router = express.Router();
router.get('/', async (req, res) => {
    res.status(200).send('hello from auth route !!!')
})

//register
router.post('/register', async (req, res) => {
    try {
        let salt = await bcrypt.genSalt(10);
        let hash_password = await bcrypt.hash(req.body.password, salt);
        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hash_password,
            password_confirm: req.body.password_confirm
        }
        let password = req.body.password;
        let password_confirm = req.body.password_confirm
        let username = await User.findOne({ username: req.body.username });
        let email = await User.findOne({ email: req.body.email });
        if (password.length < 8) {
            res.status(400).send('password must contain minimum 8 caracter !!!')
        } else if (password != password_confirm) {
            res.status(400).send('password didnt match !!!')
        } else if (username) {
            res.status(400).send('username already exists !!!')
        } else if (email) {
            res.status(400).send('you already have an account with this email !!!')
        } else {
            await User.create(newUser);
            res.status(201).send('your account has been created successfully !!!')
        }


    } catch (err) {
        res.status(500).send(err)
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            let password = await bcrypt.compare(req.body.password, user.password);
            if (password) {
                res.status(200).send(`Hello ${user.username} !!!`)
            } else {
                res.status(400).send('password didnt match !!!')
            }
        } else {
            res.status(400).send(`user with this email ${req.body.email} does not exists !!!`)
        }

    } catch (err) {
        res.status(500).send(err);
    }
})

export default router