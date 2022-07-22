const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  classes: [],
  tests: []
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

const dburl = 'mongodb+srv://user:pass@pet.hpbdy.mongodb.net/student-info?retryWrites=true&w=majority&ssl=true';
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });



// add new student
const add_new_student = (name, code, classes, test) => {
  const student = new Student({
    name : name,
    code: code,
    classes: classes,
    tests: test
  });
  console.log(name + ' has been added to the database');
  student.save();
}

add_new_student('yes', 'me', [], []);
