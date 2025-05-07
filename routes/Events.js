const express = require("express");
const router = express.Router();
const Event = require("../Models/EventModel");

// Create a new event
router.post("/", async (req, res) => {
  const {
    name,
    date,
    time,
    location,
    image,
    description,
    price,
    availableSeats,
    categories,
  } = req.body;
  try {
    const newEvent = new Event({
      name,
      date,
      time,
      location,
      image,
      description,
      price,
      availableSeats,
      categories,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single event by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an event
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    date,
    time,
    location,
    image,
    description,
    price,
    availableSeats,
    categories,
  } = req.body;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update event details
    event.name = name || event.name;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;
    event.image = image || event.image;
    event.description = description || event.description;
    event.price = price || event.price;
    event.availableSeats = availableSeats || event.availableSeats;
    event.categories = categories || event.categories;

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an event
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
