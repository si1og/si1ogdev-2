import mysql from 'mysql2/promise'

export default mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'photo_user',
  password: 'photo_pass',
  database: 'photos_db',
  connectionLimit: 5,
})