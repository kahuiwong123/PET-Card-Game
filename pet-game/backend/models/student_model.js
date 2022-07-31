const mongoose = require("mongoose")
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    nickname: {
        type: String,
    },

    code: {
        type: String,
        required: true
    },

    classes: [{
        type: String
    }],

    tests: [{
        // testSchema
    }]
})

const Student = mongoose.model("Student", studentSchema)

module.exports = Student
