const db = require("../models");
const Major = db.major;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: majors } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, majors, totalPages, currentPage };
  };


// Create and Save a new Major
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can NOT be empty!"
        });
        return;
    }

    // Create a Major
    const major = {
        major_id: req.body.major_id,
        major_name: req.body.major_name,
        dept: req.body.dept,
        hours: req.body.hours,
    };

    // Save Major in the database
    Major.create(major)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Major."
        });
    });
};

// Retrieve all Majors from the database.
exports.findAll = (req, res) => {
    const { page, size } = req.query;

    const {limit, offset } = getPagination(page, size);

    Major.findAndCountAll({ limit:limit, offset:offset })
    
    .then(data => {

        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Majors."
        });
    });
    
};

// Find a single Major with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Major.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Major with id=" + id
        });
    });
};

// Update a Major by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Major.update(req.body, {
        where: {
            major_id: id
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Major was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Major with id=${id}. Maybe Major was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Major with id=" + id
        });
    });
};

// Delete a Major with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Major.destroy({
        where: {
            major_id: id
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Major was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Major with id=${id}. Maybe Major was not found!`
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
    Major.destroy({
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