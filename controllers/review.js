const { getCarsOverview } = require("./car");
const { getUsersOverview } = require("./user");

const overview = async () => {
  const cars = await getCarsOverview();
  const users = await getUsersOverview("");

  return { cars, users };
};

module.exports = overview;
