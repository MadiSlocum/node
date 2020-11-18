module.exports = (sequelize, Sequelize) => {
    const StuCourse = sequelize.define("coursesforstudent", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      student_id: {
        type: Sequelize.INTEGER,
       
      },
      semester_id: {
        type: Sequelize.INTEGER,
        
      },
      course_id: {
        type: Sequelize.INTEGER,
        
      },
      status: {
        type: Sequelize.STRING
      },
      grade: {
        type: Sequelize.STRING
      }
    }, {
      tableName: 'courses_for_student'
    });
    return StuCourse;
  };

  //grade because we are getting a new grade
  //status because we are getting a new status of completion
  //id because we need to make a new course plan