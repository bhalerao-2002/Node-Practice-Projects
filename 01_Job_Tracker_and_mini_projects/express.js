const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} and ${req.url}`);
    next();
})

app.get("/", (req, res) => {
    res.send("Welcome to Rushi's Express server")
})

app.get("/profile/:id", (req, res) => {
    res.send(`Here your profile ${req.params.id}, Amigo 🎃`)
})

app.listen(3000, () => console.log("Server is listening on http://localhost:3000/"))