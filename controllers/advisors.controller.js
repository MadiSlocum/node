const db = require("../models");
const Advisor = db.advisor;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: advisors } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, advisors, totalPages, currentPage };
  };


// Create and Save a new Advisor
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can NOT be empty!"
        });
        return;
    }

    // Create an Advisor
    const advisor = {
        advisor_id: req.body.advisor_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dept: req.body.dept,
        email: req.body.email
    };

    // Save advisor in the database
    Advisor.create(advisor)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Advisor."
        });
    });
};

// Retrieve all Advisors from the database.
exports.findAll = (req, res) => {
    const { page, size } = req.query;

    const {limit, offset } = getPagination(page, size);

    Advisor.findAndCountAll({ limit:limit, offset:offset })
    
    .then(data => {

        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Advisors."
        });
    });
    
};

// Find a single Advisor with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Advisor.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Advisor with id=" + id
        });
    });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Advisor.update(req.body, {
        where: {
            advisor_id: id
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Advisor was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Advisor with id=${id}. Maybe Advisor was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Advisor with id=" + id
        });
    });
};


// Delete an Advisor with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Advisor.destroy({
        where: {
            advisor_id: id
        }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Advisor was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Advisor with id=${id}. Maybe Advisor was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Advisor with id=" + id
        });
    });
};

// Delete all Advisors from the database.
exports.deleteAll = (req, res) => {
    Advisor.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} Advisors were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all Advisors."
        });
    });
};