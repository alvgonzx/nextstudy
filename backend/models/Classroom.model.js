import { sequelize } from '../database/database.js';
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
		},
		professor_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		professor_email: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}
);
