const db = require("../models");
const Semester = db.semester;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: semesters } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, semesters, totalPages, currentPage };
  };


// Create and Save a new Semester
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can NOT be empty!"
        });
        return;
    }

    // Create a Semester
    const semester = {
        semester_id: req.body.semester_id,
        semester_name: req.body.semester_name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
    };

    // Save Semester in the database
    Semester.create(semester)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log (err.errors);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Semester."
        
        });
    });
};

// Retrieve all Semesters from the database.
exports.findAll = (req, res) => {
    const { page, size } = req.query;

    const {limit, offset } = getPagination(page, size);

    Semester.findAndCountAll({ limit:limit, offset:offset })
    
    .then(data => {

        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Semesters."
        });
    });
    
};

// Find a single Semester with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Semester.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Semester with id=" + id
        });
    });
};

// Update a Semester by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Semester.update(req.body, {
        where: {
            semester_id: id
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Semester was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Semester with id=${id}. Maybe Semester was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Semester with id=" + id
        });
    });
};

// Delete a Semester with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Semester.destroy({
        where: {
            semester_id: id
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Semester was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Semester with id=${id}. Maybe Semester was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Semester with id=" + id
        });
    });
};

// Delete all Semesters from the database.
exports.deleteAll = (req, res) => {
    Semester.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} Semesters were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all Semesters."
        });
    });
};