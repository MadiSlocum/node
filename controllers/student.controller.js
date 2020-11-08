const db = require("../models");
const Student = db.student;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: students } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, students, totalPages, currentPage };
  };


// Create and Save a new Student
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can NOT be empty!"
        });
        return;
    }

    // Create a Student
    const student = {
        student_id: req.body.student_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        major: req.body.major,
        advisor_id: req.body.advisor_id,
        graduation_date: req.body.graduation_date,
        email: req.body.email,
    };

    // Save Student in the database
    Student.create(student)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Student."
        });
    });
};

// Retrieve all Student from the database.
exports.findAll = (req, res) => {
    const { page, size } = req.query;

    const {limit, offset } = getPagination(page, size);

    Student.findAndCountAll({ limit:limit, offset:offset })

    
    .then(data => {

        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Students."
        });
    });
    
};

// Find a single Student with an id
exports.findOne = (req, res) => {
    const student_id = req.params.student_id;

    Student.findByPk(student_id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Student with id=" + student_id
        });
    });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
    const student_id = req.params.student_id;

    Student.update(req.body, {
        where: {
            student_id: student_id
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Student was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Student with id=${student_id}. Maybe Student was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Student with id=" + student_id
        });
    });
};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
    const student_id = req.params.student_id;

    Student.destroy({
        where: {
            student_id: student_id
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Student was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Student with id=${student_id}. Maybe Student was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Student with id=" + student_id
        });
    });
};

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} Students were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all Students."
        });
    });
};