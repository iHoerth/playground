const { faker } = require("@faker-js/faker");
const { Make, ModelCar, Vehicle, Sales } = require("./Models/Models");
const { sequelize } = require("./database"); // Adjust the path if necessary

async function generateData() {
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log("All tables have been dropped and recreated successfully.");
    })
    .catch((err) => {
      console.error("Error dropping and recreating tables:", err);
    });
  try {
    // Inserta datos para Make
    for (let i = 0; i < 10; i++) {
      await Make.create({
        Name: faker.company.name(),
      });
    }

    // Inserta datos para ModelCar
    for (let i = 0; i < 10; i++) {
      await ModelCar.create({
        Name: faker.commerce.productName(),
      });
    }

    // Inserta datos para Vehicle
    const makes = await Make.findAll();
    const models = await ModelCar.findAll();

    for (let i = 0; i < 20; i++) {
      await Vehicle.create({
        Name: faker.commerce.productName(),
        Year: faker.date.past({ years: 10 }).getFullYear(),
        Price: faker.commerce.price({
          min: 5500,
          max: 12000,
          dec: 0,
          symbol: "$",
        }),
        Make_ID: makes[Math.floor(Math.random() * makes.length)].ID,
        Model_ID: models[Math.floor(Math.random() * models.length)].ID,
      });
    }

    // Inserta datos para Sales
    const vehicles = await Vehicle.findAll();

    for (let i = 0; i < 20; i++) {
      await Sales.create({
        Vehicle_ID: vehicles[Math.floor(Math.random() * vehicles.length)].ID,
        Sales_Date: faker.date.between({
          from: "2020-01-01T00:00:00.000Z",
          to: "2030-01-01T00:00:00.000Z",
        }),
      });
    }

    console.log("Data has been populated successfully!");
  } catch (error) {
    console.error("Failed to populate data:", error);
  }
}

generateData();
