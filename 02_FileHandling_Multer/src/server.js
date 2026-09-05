const express = require("express");
const multer = require("multer");
const path = require('path')

const { uploadFile } = require("./services/fileService");

const app = express();

app.use(express.json());
//basic
// const upload = multer({
//     dest: "uploads/"
// });

//Intermideate: using memory(RAM)
const storage = multer.memoryStorage();

//Advance: using DiskStorage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + file.originalname);
//     }
// });

const upload = multer({
    storage,
    limits: {
        fileSize: 1 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        console.log("MIME TYPE:", file.mimetype);
        console.log("ORIGINAL NAME:", file.originalname);

        //Basic user can manipulate file extensions
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === ".png" || ext === ".jpeg") {
            cb(null, true);
        } else {
            cb(new Error("Only PNG and JPEG Images are allowed"));
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

                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({
                        msg: "Only files under 1 MB are allowed"
                    });
                }

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
    }, async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    msg: "File is required"
                });
            }

            await uploadFile(req.file);

            res.status(201).json({
                msg: "File uploaded successfully",
                file: req.file.originalname
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Upload failed"
            })
        };


    });


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});