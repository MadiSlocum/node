
module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '',
  DB: 'courses',
  dialect: 'mysql',
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
  },
};
//you can also try this with all of your localhost information