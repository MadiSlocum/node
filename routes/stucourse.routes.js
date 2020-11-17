module.exports = app => {
    const StuCourses = require("../controllers/stucourse.controller.js");
    
    var router = require("express").Router();
  
    // Create a new student course
    router.post("/", StuCourses.create);
  
    // Retrieve all Stu Courses
    router.get("/", StuCourses.findAll);
  
    // Retrieve a single Stu Course with id
    router.get("/:id", StuCourses.findOne);
  
    // Update a Stu Course with id
    router.put("/:id", StuCourses.update);
  
    // Delete a Stu Course with id
    router.delete("/:id", StuCourses.delete);
  
    app.use('/api/studentcourses', router);
};