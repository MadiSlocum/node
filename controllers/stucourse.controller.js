const db = require("../models");
const stuCourse = db.courses_for_student;
const Op = db.Sequelize.Op;

// Create and Save a new Student Course
exports.create = (req, res) => {
    if (!req.body.student_id) { 
        res.status(400).send({
            message: "Content can NOT be empty!"
        });
        return;
    }

    // Create a Student Course

    const courses_for_student = {
        id: req.body.id,
        student_id: req.body.student_id,
        semester_id: req.body.semester_id,
        course_id: req.body.course_id,
        status: req.body.status,
        grade: req.body.grade
    };

    // Save Student Course in the database
    stuCourse.create(courses_for_student)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Stu Course."
        });
    });
};

// Retrieve all Student Courses from the database.
exports.findAll = (req, res) => {
    const student_id = req.query.student_id;
    var condition = student_id ? {
        student_id: {
            [Op.like]: `%${student_id}%`
        }
    } : null;

    stuCourse.findAll({ 
        include: ["semester", "course"], 
        where: condition
       }) //include semester & course where studentid is
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving student course."
        });
    });
    
};

// Find a single Student Course with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    stuCourse.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Student Course with id=" + id
        });
    });
};

// Update a Student Course by the id 
exports.update = (req, res) => {
    const id = req.params.id;

    stuCourse.update(req.body, {
        where: {
            id: id
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Student Courses were updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Student Course with id=${id}. Maybe req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Student Course with id=" + id
        });
    });
};

// Delete a Student Course with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    stuCourse.destroy({
        where: {
            id: id
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Student Course was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Srudent Course with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Major with id=" + id
        });
    });
};

// Delete all Majors from the database.
exports.deleteAll = (req, res) => {
    stuCourse.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} Majors were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all Majors."
        });
    });
};

//used the sequelize site for help on this https://sequelize.org/v4/manual/tutorial/querying.html