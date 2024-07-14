const jwt = require('jsonwebtoken');
const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require('body-parser')
const cors = require("cors")
const bcrypt = require('bcrypt')
const PORT = 3500
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET

const app =express();
app.use(express.json());
app.use(cors({origin:"http://localhost:3000"}))

mongoose.connect("mongodb+srv://alexsam:Alexsam14@cluster0.w04wli6.mongodb.net/HLC", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  medications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medications' }]
});
const User = mongoose.model('User', userSchema);

const medicationSchema = {
    drug: String,
    duration: Number,
    durationUnit: {
    type: String,
    enum: ['minutes', 'hours', 'days'],
    default: 'hours'
  },
    lastTaken: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}
const medications = mongoose.model("Medications", medicationSchema);

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log('User ID for token:', user._id)
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get('/api/reminders', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).populate('medications')
      res.json(user.medications);
    } catch (err) {
      console.error('Error fetching reminders:', err);
      res.status(500).send(err);
    }
});


app.post('/api/reminders', authenticateToken, async (req, res) => {
    try {
      const { drug, duration, durationUnit} = req.body;
      const userId = req.user.userId;

      console.log('Creating new reminder for user:', userId)

      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found for ID:', userId);
        return res.status(404).json({ message: "User not found" });
      }
      const newReminder = new medications({
        drug,
        duration,
        durationUnit: durationUnit || 'hours',
        user: userId
      });

      const savedReminder = await newReminder.save();

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { medications: savedReminder._id } },
        { new: true }
      );

      if (!updatedUser) {
        console.log('User not found for ID:', userId);
        return res.status(404).json({ message: "User not found" });
      }

      res.json(savedReminder);
    } catch (err) {
      console.error('Error creating reminder: ', err)
      res.status(500).send(err);
    }
});

app.delete('/api/reminders/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const medicationId = req.params.id;

    // Remove the medication
    await medications.findByIdAndDelete(medicationId);

    // Remove the medication reference from the user
    await User.findByIdAndUpdate(
      userId,
      { $pull: { medications: medicationId } }
    );

    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting reminder:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.listen(PORT, function(){
  (`Listening on port ${PORT}`);
})
