const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.options("*", cors);

const db = require("./models");
db.sequelize.sync();


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


require("./routes/course.routes")(app);
require("./routes/semester.routes")(app);
require("./routes/major.routes")(app);
require("./routes/majorcourse.routes")(app);
require("./routes/advisors.routes")(app);
require("./routes/student.routes")(app);
require("./routes/stucourse.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
