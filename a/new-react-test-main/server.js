const express = require('express');
const mongoose = require('mongoose');
//username: admin password: PJKFJEzRDtd9VH0w

const dburl = 'mongodb+srv://admin:PJKFJEzRDtd9VH0w@cluster0.3r9wwax.mongodb.net/?retryWrites=true&w=majority&ssl=true';
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

const port = 5000;

app.get('/', (req, res) =>{
});
// app.get('/api/students', (req, res) =>{

// });
const Teacher = require('./client/src/models/teacher');

app.get('/api/teachers', (req, res) =>{
    Teacher.find().then((result) =>{
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
});

const Student = require('./client/src/models/student');

app.get('/api/students', (req, res) =>{
    Student.find().then((result) =>{
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
});



app.listen(port, () =>{
    console.log(`server started on port ${port}`)
});
