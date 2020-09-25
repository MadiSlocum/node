module.exports = {
  HOST: "t3-database.cwre8cvv6tyn.us-west-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "passwordt3",
  DB: 'course',
  dialect: 'mysql',
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
  },
};

//you can also try this with all of your localhost information