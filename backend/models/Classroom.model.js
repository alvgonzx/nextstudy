import sequelize from '../database/database.js';
import { DataTypes } from 'sequelize';

export const Classroom = sequelize.define(
	'Classroom',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		tableName: 'classrooms'
	}
);
