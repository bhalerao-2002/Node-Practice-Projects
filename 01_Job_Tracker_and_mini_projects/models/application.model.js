const mongoose = require('mongoose');


//Mongoose works as 
// 1. Create Schema (definition of stucture)
// 2. From Schema we create Model
// 3. We use Model to do CRUD

//1. Create Schema
const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Applied"
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    version: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


//2. Create Model

const Job = mongoose.model("job", jobSchema);

//Export module so will use in controllers
module.exports = Job;

//Commands in CLI mongosh
// 1. show dbs
// 2. use <db_name>
// 3. show collections
// 4. db.<collection_name>.find({}) :- Search all
// 5. 
