module.exports = app => {
    const Majors = require("../controllers/major.controller.js");
    
    var router = require("express").Router();
  
    // Create a new Course
    router.post("/", Majors.create);
  
    // Retrieve all Majors
    router.get("/", Majors.findAll);
  
    // Retrieve a single Course with id
    router.get("/:id", Majors.findOne);
  
    // Update a Course with id
    router.put("/:id", Majors.update);
  
    // Delete a Course with id
    router.delete("/:id", Majors.delete);
  
    // Delete all Majors
    router.delete("/", Majors.deleteAll);
  
    app.use('/api/majors', router);
};