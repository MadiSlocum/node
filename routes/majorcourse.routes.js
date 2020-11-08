module.exports = app => {
    const MajorCourses = require("../controllers/majorcourse.controller.js");
    
    var router = require("express").Router();
  
    // Create a new Course
    router.post("/", MajorCourses.create);
  
    // Retrieve all courses for a Major
    router.get("/", MajorCourses.findAll);
  
    // Retrieve a single Course with id
    router.get("/:id", MajorCourses.findOne);
  
    // Update a Course with id
    router.put("/:id", MajorCourses.update);
  
    // Delete a Course with id
    router.delete("/:id", MajorCourses.delete);
  
    // Delete all Majors
    router.delete("/", MajorCourses.deleteAll);
  
    app.use('/api/majorcourses', router);
};