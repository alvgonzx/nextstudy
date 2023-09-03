import { sequelize } from '../database/database.js';
import { DataTypes } from 'sequelize';

const Task = sequelize.define('Task', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	task: {
		type: DataTypes.STRING,
		allowNull: false
	},
	classroom_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	completed: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
});

export default Task;