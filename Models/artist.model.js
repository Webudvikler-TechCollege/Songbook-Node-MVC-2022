import { sequelize } from '../Config/db.sequelize.js'
import { DataTypes, Model } from 'sequelize'

// Skriver ny klasse og udvider den med SQ's Model klasse
class ArtistModel extends Model {}

// Initialiserer model
ArtistModel.init({
	// Definerer felt egenskaber
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'Ikke navngivet'
	}
}, {
	sequelize, // Sequelize objekt
	modelName: 'artist', // Model (tabel) navn
	freezeTableName: true, // Lås tabelnavne til ental
	underscored: true, // Brug underscore istedet for camelcase
	createdAt: true, // Undlad createdAt felt
	updatedAt: true //Undlad updatedAt felt

})

export default ArtistModel