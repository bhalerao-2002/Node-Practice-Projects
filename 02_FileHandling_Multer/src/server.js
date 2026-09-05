const express = require("express");
const multer = require("multer");
const path = require('path')

const app = express();

app.use(express.json());
//basic
// const upload = multer({
//     dest: "uploads/"
// });
//Advance:
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        console.log("MIME TYPE:", file.mimetype);
        console.log("ORIGINAL NAME:", file.originalname);

        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === ".txt") {
            cb(null, true);
        } else {
            cb(new Error("Only .txt files are allowed"));
        }
    }
});




app.get("/", (req, res) => {
    res.json({
        message: "File Upload Lab"
    });
});

app.post("/api/files",
    (req, res, next) => {
        upload.single("file")(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({
                    msg: err.message
                });
            }

            if (err) {
                return res.status(400).json({
                    msg: err.message
                });
            }

            next();
        });
    }, (req, res) => {
        console.log(req.file);

        res.json({
            msg: "File uploaded successfully",
            file: req.file
        });
    });


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});