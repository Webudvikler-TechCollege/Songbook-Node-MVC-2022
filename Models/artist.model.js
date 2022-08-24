import { sequelize } from '../Config/db.sequelize.js'
import { DataTypes, Model } from 'sequelize'

class ArtistModel extends Model {}

ArtistModel.init({
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
	sequelize,
	modelName: 'artist',
	freezeTableName: true,
	underscored: true,
	createdAt: false,
	updatedAt: false
})

export default ArtistModel