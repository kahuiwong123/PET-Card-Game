// const express = require('express');
// const app = express();


const mongoose = require('mongoose');


const dburl = 'mongodb+srv://user:pass@pet.hpbdy.mongodb.net/teacher-login?retryWrites=true&w=majority&ssl=true';
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});

const Teacher = require('./models/teacher.js')

const teacher = new Teacher({
  username: 'teachertest',
  password: 'password'
});
teacher.save();

// app.listen(43132);

// app.use((req, res) =>{
//   console.log(req.socket.localPort);
//   console.log(req.socket.remotePort);
// });
