import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: true }))

import multer from 'multer';
// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(undefined, './uploads')
    },

    filename: function (req, file, cb) {
        console.log(file.originalname)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const uniqueFileName = `${uniqueSuffix}__${file.originalname}`;
        cb(null, uniqueFileName)
    }
})


function fileFilter(req, file, cb) {
    const validTypes = ["image/png", "image/jpeg", "image/svg+xml"];

    if (!validTypes.includes(file.mimetype)) {
        cb(new Error("File type not allowed" + file.mimetype), false);
    } else {
        cb(null, true);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 20 * 1024 * 1024
    }, fileFilter
})


app.post('/form', (req, res) => {
    console.log(req.body)
    delete req.body.password;
    res.send(req.body)
});

app.post("/fileform", upload.single('file'), (req, res) => {
    console.log(req.body)
    res.send({})
})

const PORT = Number(process.env.PORT || 8080)
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));