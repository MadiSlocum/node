module.exports = (sequelize, Sequelize) => {
    const Student= sequelize.define("students", {
      student_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false
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
        type: Sequelize.INTEGER,
      },
      graduation_date: {
        type: Sequelize.DATE,
      },
      email: {
        type: Sequelize.STRING
      }
    }, {
      tableName: 'students'
    });
    return Student;
  };