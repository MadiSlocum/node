module.exports = (sequelize, Sequelize) => {
    const Semester = sequelize.define("semesters", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      semester_name: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      }
      
    }, {
      tableName: 'semesters'
    });
    return Semester;
  };