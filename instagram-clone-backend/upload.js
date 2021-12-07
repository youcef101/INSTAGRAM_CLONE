import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },

    filename: (req, file, cb) => {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage }).single('file');
