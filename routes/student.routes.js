module.exports = app => {
    const Students = require("../controllers/student.controller.js");
    
    var router = require("express").Router();
  
    // Create a new Student
    router.post("/", Students.create);
  
    // Retrieve all Studentss
    router.get("/", Students.findAll);
  
    // Retrieve a single Student with id
    router.get("/:student_id", Students.findOne);
  
    // Update a Student with id
    router.put("/:student_id", Students.update);
  
    // Delete a Student with id
    router.delete("/:student_id", Students.delete);
  
    // Delete all Studentss
    router.delete("/", Students.deleteAll);
  
    //  app.use('/api/students', router);
    app.use('/api/students', router);
};