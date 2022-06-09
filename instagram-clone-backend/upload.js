import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },

    filename: (req, file, cb) => {
        cb(null, req.body.filename);

    }
});

export const upload = multer({ storage }).single('file');
