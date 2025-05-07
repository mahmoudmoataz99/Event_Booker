const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId,ref: "Event",required: true },
  userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true,min: 0},
  seats: {type: Number, required: true,min: 1  },
  categories: [{ type: String}],
  createdAt: {  type: Date,default: Date.now},
  status: {type: String,enum: ["pending", "confirmed", "cancelled"],default: "confirmed"}
});

module.exports = mongoose.model("Booking", bookSchema);