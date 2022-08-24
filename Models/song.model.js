import { sequelize } from '../Config/db.sequelize.js'
import { DataTypes, Model } from 'sequelize'

// Skriver ny klasse og udvider den med SQ's Model klasse
class SongModel extends Model {}

// Initialiserer model
SongModel.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'Ikke navngivet'
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	artist_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'song', // Model (tabel) navn
	freezeTableName: true, // Lås tabelnavne til ental
	underscored: true, // Brug underscore istedet for camelcase
	createdAt: false, // Undlad createdAt felt
	updatedAt: false //Undlad updatedAt felt
})

export default SongModel