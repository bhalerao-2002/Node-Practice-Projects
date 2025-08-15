const express = require("express");

const app = express();

let users = [
    {
        id: 0,
        name: "John",
        kidneys: [
            "healthy"
        ]
    }
];

app.get("/", (req, res) => {
    res.send("Hey, this is landing page")
});

app.post("/addKidney", (req, res) => {
    let id = req.query.id;
    if (!users[id]) {
        return res.status(404).send("Unable to find user with id: " + id);
    }
    if (users[id].kidneys.length == 1) {
        users[id].kidneys.push("healthy");
        console.log(users[id]);
        return res.status(201).send("Hey" + users[id].name + ", Your kidney is sucessfully added");
    } else {
        return res.status(400).send("Hey" + users[id].name + ", Pleased to inform that you have both healthy kidnies. No need for addition.");
    }
})

app.delete("/user", (req, res) => {
    const id = req.query.id;
    if (!users[id]) {
        return res.status(404).send("Unable to find user with id:" + id);
    }
    users = users.filter((user) => user.id !== id);
    return res.status(200).send("User with id " + id + " is deleted");
})

app.listen(3001, console.log("App is listening on port 3000"));