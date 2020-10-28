module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dept: {
      type: Sequelize.STRING,
    },
    course_number: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.INTEGER
    },
    hours: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    when_off: {
      type: Sequelize.STRING
    }
  }, {
    tableName: 'course'
  });
  return Course;
};