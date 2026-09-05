const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, "db.json");

//Read File
//1. Sync method
// const data = fs.readFileSync(filepath, "utf-8");
// // console.log(data);

// //2. Async Method
// fs.readFile(filepath, "utf-8", (err, data) => {
//     if (err) throw err;
//     console.log(JSON.parse(data));
// })

//Write in file
const user1data = {
    "username" : "user1",
    "age": 73,
    "gender": "female"
}

fs.writeFile(filepath, JSON.stringify(user1data, null, 2), (err)=> {
    if(err) throw err;
    console.log("Written file Async way");
});