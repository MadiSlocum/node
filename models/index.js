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
db.semester = require("./semester.model.js")(sequelize, Sequelize);
db.major = require("./major.model.js")(sequelize, Sequelize);
db.majorcourse = require("./majorcourse.model.js")(sequelize, Sequelize);
db.advisor = require("./advisors.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);

db.course.hasMany(db.majorcourse, {
  as: 'majorcourse',
  foreignKey: 'id'
});
db.majorcourse.belongsTo(db.course, {
  foreignKey: 'id'
});
db.major.hasMany(db.majorcourse, {
  as: 'majorcourse',
  foreignKey: 'major_id'
});
db.majorcourse.belongsTo(db.major, {
  foreignKey: 'major_id'
});
module.exports = db;