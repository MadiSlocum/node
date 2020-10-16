module.exports = {
    HOST: "t3-database.cwre8cvv6tyn.us-west-1.rds.amazonaws.com",
    PORT: 3306,
    USER: "admin",
    PASSWORD: "passwordt3",
    DB: 'courses',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    }
  };