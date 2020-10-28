module.exports = (sequelize, Sequelize) => {
    const Advisor = sequelize.define("advisor", {
      advisor_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      dept: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      }
    }, {
      tableName: 'advisor'
    });
    return Advisor;
  };