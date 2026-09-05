const express = require("express");
const mongoose = require("mongoose");

const app = express();

//connection with MongoDB, this will return promise so need to handle that.
mongoose.connect("mongodb://127.0.0.1:27017/jobTrackerProjectPrac")
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log("MongoDB connection Failed with error : ", err));


const applicationRouter = require("./routes/application.route.js")
const userRouter = require("./routes/user.route.js")

app.use(express.json());


app.get('/', (req, res) => {
    res.send("Welcome to Job Tracker dashboard");
})

app.use('/application', applicationRouter)
app.use('/user', userRouter)



// 404 and Error handler should be at end always.
app.use((req, res) => {
    res.status(404).json({ "status": "false", "msg": "route dont exist" });
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ "status": "false", "msg": "Internal Server Error" });
})

app.listen(5000, () => {
    console.log("Server is listening on http://localhost:5000/")
})