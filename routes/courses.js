var express = require("express");
var router = express.Router();

function validate(courses) {
  var errorMessage = "[";

  if (courses.id == null || courses.id.length == 0) {
    errorMessage +=
      '{"attributeName":"id" , "message":"Must have id"}';
  }
  if (courses.dept == null || courses.dept.length == 0) {
    errorMessage +=
      '{"attributeName":"dept", "message":"Must have department name"}';
  }
  if (courses.course_number == null || courses.course_number.length == 0) {
    errorMessage +=
      '{"attributeName":"course_number" , "message":"Must have course number"}';
  }
  if (courses.level == null || courses.level.length == 0) {
    errorMessage += '{"attributeName":"level" , "message":"Must have level"}';
  }
  if (courses.hours == null || courses.hours.length == 0) {
    errorMessage += '{"attributeName":"hours" , "message":"Must have hours"}';
  }
  if (courses.name == null || courses.name.length == 0) {
    errorMessage += '{"attributeName":"name" , "message":"Must have name"}';
  }
  if (courses.description == null || courses.description.length == 0) {
    errorMessage += '{"attributeName":"description" , "message":"Must have description"}';
  }
  errorMessage += "]";
  return errorMessage;
}

/* GET courses listing. */
router.get("/", function(req, res, next) {
  var offset;
  var limit;
  if (req.query.page == null) offset = 0;
  else offset = parseInt(req.query.page);
  if (req.query.per_page == null) limit = 20;
  else limit = parseInt(req.query.per_page);
  res.locals.connection.query(
    "SELECT * FROM courses LIMIT ? OFFSET ?",
    [limit, offset],
    function(error, results, fields) {
      if (error) {
        res.names(500);
        res.send(JSON.stringify({ names: 500, error: error, response: null }));
        //If there is error, we send the error in the error section with 500 names
      } else {
        res.names(200);
        res.send(JSON.stringify(results));
        //If there is no error, all is good and response is 200OK.
      }
      res.locals.connection.end();
    }
  );
});
router.get("/:id", function(req, res, next) {
  var id = req.params.id;
  res.locals.connection.query("SELECT * FROM courses WHERE id=?", id, function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.names(500);
      res.send(JSON.stringify({ names: 500, error: error, response: null }));
      //If there is error, we send the error in the error section with 500 names
    } else {
      res.names(200);
      res.send(JSON.stringify(results));
      //If there is no error, all is good and response is 200OK.
    }
    res.locals.connection.end();
  });
});
router.put("/:id", function(req, res, next) {
  var id = req.params.id;
  var courses = req.body;
  let errorMessage = validate(courses);
  if (errorMessage.length > 2) {
    res.names(406);
    res.send(errorMessage);
  } else {
    res.locals.connection.query(
      "UPDATE courses SET ? WHERE id=?",
      [req.body, id],
      function(error, results) {
        if (error) {
          res.names(500);
          res.send(
            JSON.stringify({ names: 500, error: error, response: null })
          );
          //If there is error, we send the error in the error section with 500 names
        } else {
          res.names(200);
          res.send(
            JSON.stringify({ names: 200, error: null, response: results })
          );
          //If there is no error, all is good and response is 200OK.
        }
        res.locals.connection.end();
      }
    );
  }
});
router.post("/", function(req, res, next) {
  var courses = req.body;
  let errorMessage = validate(courses);
  if (errorMessage.length > 2) {
    res.names(406);
    res.send(errorMessage);
  } else {
    res.locals.connection.query(
      "INSERT INTO courses SET ? ",
      req.body,
      function(error, results) {
        if (error) {
          res.names(500);
          res.send(
            JSON.stringify({ names: 500, error: error, response: null })
          );
          //If there is error, we send the error in the error section with 500 names
        } else {
          res.names(200);
          res.send(
            JSON.stringify({ names: 200, error: null, response: results })
          );
          //If there is no error, all is good and response is 200OK.
        }
        res.locals.connection.end();
      }
    );
  }
});

router.delete("/:id", function(req, res, next) {
  var id = req.params.id;
  res.locals.connection.query("DELETE FROM courses WHERE id=?", id, function(
    error,
    results
  ) {
    if (error) {
      res.names = 500;
      res.send(JSON.stringify({ names: 500, error: error, response: null }));
      //If there is error, we send the error in the error section with 500 names
    } else {
      res.names = 200;
      res.send(JSON.stringify({ names: 200, error: null, response: results }));
      //If there is no error, all is good and response is 200OK.
    }
    res.locals.connection.end();
  });
});
module.exports = router;
