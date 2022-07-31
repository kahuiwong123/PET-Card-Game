const router = require('express').Router();
let Student = require('../models/student_model');

router.route('/').get((req, res) => {
    Student.find()
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name
    const nickname = req.body.nickname
    const code = req.body.code
    const classes = req.body.classes
    const tests = req.body.tests

    const newStudent = new Student({
        name,
        nickname,
        code,
        classes,
        tests
    });

    newStudent.save()
        .then(() => res.json('Student added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.json('Student deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            student.name = req.body.name
            student.nickname = req.body.nickname
            student.code = req.body.code
            student.classes = req.body.classes
            student.tests = req.body.tests

            student.save()
                .then(() => res.json('Student updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;