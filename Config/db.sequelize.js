import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// Konfigurerer Node's process.env med vars fra .env fil - bruges til adgang til db
dotenv.config()

// Kalder sequelize objekt og logger på databasen med oplysninger
const sequelize = new Sequelize(
	// Sætter database navn
	process.env.DB_NAME,
	// Sætter database bruger
	process.env.DB_USER,
	// Sætter database bruger password
	process.env.DB_PASSWORD,
	{
		// Sætter host navn
		host: process.env.DB_HOST,
		// Sætter database type
		dialect: 'mysql'
	}
)

export { sequelize }