var express = require("express");
var router = express.Router();

function validate(course) {
  var errorMessage = "[";

  if (course.id == null || course.id.length == 0) {
    errorMessage +=
      '{"attributeName":"id" , "message":"Must have id"}';
  }
  if (course.dept == null || course.dept.length == 0) {
    errorMessage +=
      '{"attributeName":"dept", "message":"Must have department name"}';
  }
  if (course.course_number == null || course.course_number.length == 0) {
    errorMessage +=
      '{"attributeName":"course_number" , "message":"Must have course number"}';
  }
  if (course.level == null || course.level.length == 0) {
    errorMessage += '{"attributeName":"level" , "message":"Must have level"}';
  }
  if (course.hours == null || course.hours.length == -1) {
    errorMessage += '{"attributeName":"hours" , "message":"Must have hours"}';
  }
  if (course.name == null || course.name.length == 0) {
    errorMessage += '{"attributeName":"name" , "message":"Must have name"}';
  }
  errorMessage += "]";
  return errorMessage;
}


/* http://localhost:8080/courseapi/courses/.  THIS LISTS ALL INFO*/

router.get('/', function(req, res, next) {
  var offset;
  var limit;
  if (req.query.page == null) offset = 0;
  else offset = parseInt(req.query.page);
  if (req.query.per_page == null) limit = 200;
  else limit = parseInt(req.query.per_page);
  res.locals.connection.query(
    "SELECT * FROM course",
    [limit, offset],
    function(error, results, fields) {
      if (error) {
        res.status = 500;
        res.send(JSON.stringify({ status: 500, error: error, response: null }));
        //If there is error, we send the error in the error section with 500 names
      } else {
        res.status = 200;
        res.send(JSON.stringify(results));
        //If there is no error, all is good and response is 200OK.
      }
      res.locals.connection.end();
    }
  );
});


/* http://localhost:8080/courseapi/courses/3149  THIS LISTS ALL INFO ON ONE COURSE ID*/
router.get("/:id", function(req, res, next) {
  var id = req.params.id;
  res.locals.connection.query("SELECT * FROM course WHERE id=?", id, function(error, results, fields) {
    if (error) {
      res.status = 500;
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
      //If there is error, we send the error in the error section with 500 names
    } else {
      res.status = 200;
      res.send(JSON.stringify(results));
      //If there is no error, all is good and response is 200OK.
    }
    res.locals.connection.end();
  });
});



router.put("/:id", function(req, res, next) {
  var id = req.params.id;
  var course = req.body;
  let errorMessage = validate(course);
  if (errorMessage.length > 2) {
    res.status = 406;
    res.send(errorMessage);
  } else {
    res.locals.connection.query(
      "UPDATE course SET ? WHERE id=?",
      [req.body, id],
      function(error, results) {
        if (error) {
          res.status = 500;
          res.send(JSON.stringify({ status: 500, error: error, response: null }));
          //If there is error, we send the error in the error section with 500 names
        } else {
          res.status = 200;
          res.send(JSON.stringify(results));
          //If there is no error, all is good and response is 200OK.
        }
        res.locals.connection.end();
      }
    );
  }
});
router.post("/", function(req, res, next) {
  var course = req.body;
  let errorMessage = validate(course);
  if (errorMessage.length > 2) {
    res.status = 406;
    res.send(errorMessage);
  } else {
    res.locals.connection.query(
      "INSERT INTO course SET ? ",
      req.body,
      function(error, results) {
        if (error) {
          res.status = 500;
          res.send(
            JSON.stringify({ names: 500, error: error, response: null })
          );
          //If there is error, we send the error in the error section with 500 names
        } else {
          res.status = 200;
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

/* Works perfectly to delete a specific id of a course. DEL: localhost:8080/courseapi/courses/3148*/

router.delete("/:id", function(req, res, next) {
  var id = req.params.id;
  res.locals.connection.query("DELETE FROM course WHERE id=?", id, function(error, results) {
    if (error) {
      res.status = 500;
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
      //If there is error, we send the error in the error section with 500 names
    } else {
      res.status = 200;
      res.send(JSON.stringify({ status: 200, error: null, response: results }));
      //If there is no error, all is good and response is 200OK.
    }
    res.locals.connection.end();
  });
});
module.exports = router;
