module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
      id: {
        type: Sequelize.INTEGER,
        primarykey: true,
        autoIncrement: true
      },
      dept: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.CHAR
      },
      hours: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    }, {
      tableName: 'course'
    });
    return Course;
  };