import { sequelize } from '../database/database.js';
import { DataTypes } from 'sequelize';

const Exam = sequelize.define('Exam', {
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
		allowNull: false
	},
	mark: {
		type: DataTypes.FLOAT,
		allowNull: true
	}
});

export default Exam;
