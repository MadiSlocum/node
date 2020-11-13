const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    timestamps: false
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.course = require("./course.model.js")(sequelize, Sequelize);
db.semesters = require("./semester.model.js")(sequelize, Sequelize);
db.major = require("./major.model.js")(sequelize, Sequelize);
db.majorcourse = require("./majorcourse.model.js")(sequelize, Sequelize);
db.advisor = require("./advisors.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.courses_for_student = require("./stucourse.model.js")(sequelize, Sequelize);

db.course.hasMany(db.majorcourse, {
  as: 'majorcourse',
  foreignKey: 'id'
});

db.major.hasMany(db.majorcourse, {
  as: 'majorcourse',
  foreignKey: 'major_id'
});
db.majorcourse.belongsTo(db.major, {
  foreignKey: 'major_id'
});
//db.courses_for_student.belongsTo(db.semesters, {
  //foreignKey: 'semester'
//});
db.courses_for_student.belongsTo(db.student, {
  foreignKey: 'student_id'
});
db.student.hasMany(db.courses_for_student, {
  as: 'courses_for_student',
  foreignKey: 'student_id'
});
db.courses_for_student.belongsTo(db.course, {
  foreignKey: 'course_id' 
});
db.semesters.hasMany(db.courses_for_student, {
  as: 'courses_for_student',
  foreignKey: 'semester_id' 
});

db.course.hasMany(db.courses_for_student, {
  as: 'courses_for_student',
  foreignKey: 'course_id'
});

module.exports = db;

//sequelize relationships found at https://sequelize.org/master/manual/assocs.html