import Sequelize from 'sequelize';

export const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './database/database.sqlite',
	logging: false
});

export const authenticate = async () => {
	try {
		await sequelize.authenticate();
		console.log('Database connected');
	} catch (error) {
		console.error('Error connecting database:', error);
	}
};
