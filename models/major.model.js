module.exports = (sequelize, Sequelize) => {
    const Major = sequelize.define("major", {
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
      tableName: 'major'
    });
    return Major;
  };