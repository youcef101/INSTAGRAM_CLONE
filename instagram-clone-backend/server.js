import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import postRouter from './routes/post.js'
import userRouter from './routes/user.js'
import commentRouter from './routes/comment.js'
import { upload } from './upload.js'



dotenv.config();
//app config
const app = express();
const port = process.env.PORT || 8001
//Middlewares
app.use(express.json());
app.use(Cors());
//DB config
const connection_url = process.env.MONGO_URL;
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,

})
    .then(console.log('connected to mongoDB !!!'))
    .catch(err => console.log(err));


//API Endpoints
app.get('/', (req, res) => {
    res.status(200).send('HELLO YOUCEF ARE YOU OK iam from instagramm!!!');
})

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);
app.use('/api/post', postRouter);

//public image for upload
app.use('/public', express.static('public'));

app.post('/api/upload', upload, (req, res) => {
    res.status(200).send('file upload')
})
//Listener
app.listen(port, () => {
    console.log(`listening on localhost:${port}`);
})