const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "Abrakadabra"
}));

app.use(cookieParser());

// Session: Session is data saved on the server. 
app.get("/ban", (req, res) => {
    req.session.banned = true; // Saved in session (server)
    return res.status(201).send("You are banned from this website");
});

app.get("/", (req, res) => {
    if (req.session.banned === true) {
        return res.status(403).send("You are banned, content can't be seen by banned users");
    } else {
        return res.status(200).send("Hey, here is the content");
    }
});

app.get("/unban", (req, res) => {
    if (req.session.banned === true) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Error while unbanning");
            }
            return res.status(200).send("You are unbanned");
        });
    } else {
        return res.status(401).send("You aren't banned yet.");
    }
});

//Cookies: This is the data stored on client side(browser)
//As it is sent from browser to client it is handled by res

app.get("/setAge/:age", (req, res) => {
    var age = req.params.age; // or req.query.age if you prefer query params
    res.cookie("age", age);
    return res.status(201).send("Your age is set to: " + age);
});

app.get("/access", (req, res) => {
    if (req.cookies.age && req.cookies.age >= 18) {
        return res.status(200).send("Your secret is: 990909");
    } else {
        return res.status(403).send("Users below 18 years are not allowed");
    }
});

app.get("/unsetAge", (req, res) => {
    res.clearCookie("age");
    return res.status(200).send("Your age cookie is unset");
});

app.listen(3001, () => console.log("Server is running on 3001"));
