const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: false },
  description: { type: String },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  categories: { type: Array, ref: "Category" },
});

module.exports = mongoose.model("Event", eventSchema);
