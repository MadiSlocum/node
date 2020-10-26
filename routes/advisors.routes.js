module.exports = app => {
    const Advisor = require("../controllers/advisors.controller.js");
    
    var router = require("express").Router();
  
    // Create a new Advisor
    router.post("/", Advisor.create);
  
    // Retrieve all Advisors
    router.get("/", Advisor.findAll);
  
    // Retrieve a single Advisor with id
    router.get("/:id", Advisor.findOne);
  
    // Update a Advisor with id
    router.put("/:id", Advisor.update);
  
    // Delete an Advisor with id
    router.delete("/:id", Advisor.delete);

  
    app.use('/api/advisor', router);
}; 