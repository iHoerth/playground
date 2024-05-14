const { sequelize, Sequelize } = require('../database.js'); // Ensure this path correctly points to your Sequelize setup

const Make = sequelize.define('Make', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: Sequelize.STRING, allowNull: false }
}, {
    tableName: 'Make'
});

const ModelCar = sequelize.define('Model', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: Sequelize.STRING, allowNull: false }
}, {
    tableName: 'Model'
});

const Vehicle = sequelize.define('Vehicle', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: Sequelize.STRING, allowNull: false },
    Year: { type: Sequelize.INTEGER, allowNull: false },
    Price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    Make_ID: { type: Sequelize.INTEGER },
    Model_ID: { type: Sequelize.INTEGER }
}, {
    tableName: 'Vehicle'
});

const Sales = sequelize.define('Sales', {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    Vehicle_ID: { type: Sequelize.INTEGER },
    Sales_Date: { type: Sequelize.DATE, allowNull: false }
}, {
    tableName: 'Sales'
});

// Setting up associations
Vehicle.belongsTo(Make, { foreignKey: 'Make_ID' });
Vehicle.belongsTo(ModelCar, { foreignKey: 'Model_ID' });
Sales.belongsTo(Vehicle, { foreignKey: 'Vehicle_ID' });

module.exports = { Make, ModelCar, Vehicle, Sales };
