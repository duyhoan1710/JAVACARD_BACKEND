module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  cli: {
    migrationsDir: 'src/migration',
    entitiesDir: 'src/entities',
  },
};
