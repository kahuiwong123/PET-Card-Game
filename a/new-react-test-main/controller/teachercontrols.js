const mongoose = require('mongoose');
//username: admin password: PJKFJEzRDtd9VH0w

const dburl = 'mongodb+srv://admin:PJKFJEzRDtd9VH0w@cluster0.3r9wwax.mongodb.net/?retryWrites=true&w=majority&ssl=true';
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});


const Teacher = require('../client/src/models/teacher.js');

const createTeacher = (username, password) =>{
    const teacher = new Teacher({
        username: username ,
        password: password ,
        students: []
      });
      teacher.save();
}

createTeacher("user", "pass");