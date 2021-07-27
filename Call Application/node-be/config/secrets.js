module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: process.env.DB_PASSWORD || '',
    DB: "plivoCallRecord",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    authId: 'MAYTK1MDK0Y2VJYJLKZT',
    authToken: 'ZmVkNzMzMGNiMmZjODc4YjdkMDdlZmViZGQxMTQ3',
};