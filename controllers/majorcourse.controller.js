const db = require("../models");
const MajorCourse = db.majorcourse;
const Op = db.Sequelize.Op;

// Create and Save a new MajorCourse
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can NOT be empty!"
        });
        return;
    }

    // Create a MajorCourse
    const majorcourse = {
        pair_id: req.body.pair_id,
        major_id: req.body.major_id,
        id: req.body.id
    };

    // Save MajorCourse in the database
    MajorCourse.create(majorcourse)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Course."
        });
    });
};

// Retrieve all MajorCourses from the database.
exports.findAll = (req, res) => {
    const id = req.query.course;
    var condition = id ? {
        id: {
        [Op.like]: `%${id}%`
        }
    } : null;

    MajorCourse.findAll({include:["course", "major"], where: condition })
    
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving courses for the major."
        });
    });
    
};

// Find a single Course with an id
exports.findOne = (req, res) => {
    const pair_id = req.params.pair_id;

    MajorCourse.findByPk(pair_id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Course with id=" + id
        });
    });
};

// Update a Course by the id in the request
exports.update = (req, res) => {
    const pair_id = req.params.id;

    MajorCourse.update(req.body, {
        where: {
            pair_id: pair_id
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Course was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update MajorCourse with id=${pair_id}. Maybe Course was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating MajorCourse with id=" + pair_id
        });
    });
};

// Delete a MajorCourse with the specified id in the request
exports.delete = (req, res) => {
    const pair_id = req.params.id;

    MajorCourse.destroy({
        where: {
            pair_id: pair_id
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "MajorCourse was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete MajorCourse with id=${pair_id}. Maybe Course was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete MajorCourse with id=" + pair_id
        });
    });
};

// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? {
        id: {
        [Op.like]: `%${id}%`
        }
    } : null;
    MajorCourse.destroy({
        where: {condition},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} Courses were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all courses."
        });
    });
};