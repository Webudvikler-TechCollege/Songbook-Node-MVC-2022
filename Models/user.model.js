import { sequelize } from '../Config/db.sequelize.js'
import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt'

// Skriver ny klasse og udvider den med SQ's Model klasse
class UserModel extends Model {}

// Initialiserer model
UserModel.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	firstname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
}, {
	sequelize, // Sequelize objekt
	modelName: 'user', // Model (tabel) navn
	freezeTableName: true, // Lås tabelnavne til ental
	underscored: true, // Brug underscore istedet for camelcase
	createdAt: true, // Undlad createdAt felt
	updatedAt: true, //Undlad updatedAt felt
	// Hooks til hash af password i create/update situationer
	hooks: {
		// Create
		beforeCreate: async (user, options) => {
			user.password = await createHash(user.password)
		},
		// Update
		beforeUpdate: async (user, options) => {
			user.password = await createHash(user.password)
		}
	}

})

/**
 * Funktion til at kryptere en string med
 * @param {String} string 
 * @returns Hashed string
 */
const createHash = async string => {
	const salt = await bcrypt.genSalt(10);
	const hashedString = await bcrypt.hash(string, salt)
	return hashedString;
}

export default UserModel