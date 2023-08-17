import sequelize from '../database/database.js';
import { Classroom } from './Classroom.model.js';
import { DataTypes } from 'sequelize';

export const Exam = sequelize.define(
	'Exam',
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
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		classroom_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Classroom,
				key: 'id'
			}
		},
		mark: {
			type: DataTypes.FLOAT,
			allowNull: true
		}
	},
	{
		tableName: 'exams'
	}
);
