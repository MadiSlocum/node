module.exports = (sequelize, Sequelize) => {
    const Student= sequelize.define("students", {
      student_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING,
      },
      major: {
        type: Sequelize.STRING,
      },
      advisor_id: {
        type: Sequelize.STRING,
      },
      graduation_date: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.INTEGER
      }
    }, {
      tableName: 'students'
    });
    return Student;
  };