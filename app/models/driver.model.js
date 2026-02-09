const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  name: String,
  team: String,
  country: String
});

// Создаем модель
const Driver = mongoose.model("driver", DriverSchema);

// Экспортируем саму модель напрямую
module.exports = Driver;