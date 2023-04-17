require("dotenv").config();

module.exports = {
  "development": {
    "port": process.env.PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "db_port": process.env.DB_PORT,
    "dialect": "mariadb",
    "logging": false
  },
  "test": {
    "port": process.env.PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": "host.docker.internal",
    "db_port": process.env.DB_PORT,
    "dialect": "mariadb",
    "logging": true
  },
  "production": {
    "port": process.env.PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "db_port": process.env.DB_PORT,
    "dialect": "mysql",
    "logging": false
  }
}
