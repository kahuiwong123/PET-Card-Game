const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  code:{
    type: String,
    required: true
  },
  exams: [],
  classes: []
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;