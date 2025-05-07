const express = require('express');
const router = express.Router();
const User = require('../Models/UserModel');

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
 const { email, password } = req.body;

 try {
   const user = await User.findOne({ email });
   if (!user) {
     return res.status(400).json({ message: 'Invalid email or password' });
   }

   if (user.password !== password) {
     return res.status(400).json({ message: 'Invalid email or password' });
   }

   return res.status(200).json({ 
     message: 'Login successful', 
     user: {
       id: user._id,
       email: user.email,
       role: user.role,
       name: user.username 
     }
   });
 } catch (err) {
   res.status(500).json({ message: err.message });
 }
});

module.exports = router;
