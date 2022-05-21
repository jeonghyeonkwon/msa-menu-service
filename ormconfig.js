module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
