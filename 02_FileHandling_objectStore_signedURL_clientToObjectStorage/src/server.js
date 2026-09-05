const express = require("express");
const path = require('path')

const { createUploadUrl } = require("./services/fileService");

const app = express();

app.use(express.json());

app.post("/api/files/upload-url", async (req, res) => {
    try {

        const { filename, contentType } = req.body;

        if (!filename || !contentType) {
            return res.status(400).json({
                msg: "Filename and contentType are required"
            });
        }

        const result = await createUploadUrl(filename, contentType);

        res.status(201).json({
            msg: "File uploaded successfully",
            data: { result }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Could not generate upload URL. Try Again :("
        });
    };


});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});