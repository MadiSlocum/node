module.exports = (sequelize, Sequelize) => {
    const Student= sequelize.define("students", {
      major_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      major_name: {
        type: Sequelize.STRING
      },
      dept: {
        type: Sequelize.STRING,
      },
      hours: {
        type: Sequelize.INTEGER
      }
    }, {
      tableName: 'students'
    });
    return Student;
  };