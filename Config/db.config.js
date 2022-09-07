import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

/**
 * Simpelt eksempel på en config fil 
 * Bruges sammen med almindelige SQL modeller
 */

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT	
})

db.connect()

export default db



