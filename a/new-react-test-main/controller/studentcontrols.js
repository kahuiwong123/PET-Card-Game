const mongoose = require('mongoose');
//username: admin password: PJKFJEzRDtd9VH0w

const dburl = 'mongodb+srv://admin:PJKFJEzRDtd9VH0w@cluster0.3r9wwax.mongodb.net/?retryWrites=true&w=majority&ssl=true';
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});


const Student = require('../client/src/models/student.js');

const createStudent = (name, code, exams, classes) =>{
    const student = new Student({
        name: name ,
        code: code,
        exam: exams,
        classes: classes
      });
      student.save();
}

createStudent("John Doe1", "1A2B3C", [], ["art"]);