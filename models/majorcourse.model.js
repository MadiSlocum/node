module.exports = (sequelize, Sequelize) => {
    const MajorCourse = sequelize.define("majorcourse", {
      pair_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      major_id: {
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      }
      
    }, {
      tableName: 'major_courses'
    });
    return MajorCourse;
  };