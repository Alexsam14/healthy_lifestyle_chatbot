const express = require("express");
const mongoose = require("mongoose")
const { CourierClient } = require('@trycourier/courier');
const cron = require('node-cron');
require("dotenv").config()

const app = express();

mongoose.connect("mongodb+srv://alexsam:Alexsam14@cluster0.w04wli6.mongodb.net/HLC", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
  // Note: We're not including a medications field here
});

const User = mongoose.model('User', userSchema);

const medicationSchema = new mongoose.Schema({
    drug: String,
    duration: Number,
    durationUnit: {
      type: String,
      enum: ['minutes', 'hours', 'days'],
      default: 'hours'
    },
    lastTaken: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const medications = mongoose.model("Medications", medicationSchema);

function getDurationInMilliseconds(duration, unit) {
  switch(unit) {
    case 'minutes':
      return duration * 60 * 1000;
    case 'hours':
      return duration * 60 * 60 * 1000;
    case 'days':
      return duration * 24 * 60 * 60 * 1000;
    default:
      return duration * 60 * 60 * 1000; // default to hours
  }
}

courierAuthToken=process.env.SMS_API_KEY
const courier = new CourierClient({ authorizationToken: courierAuthToken });

async function sendReminders() {
  try {
    const now = new Date();
    const medications_ = await medications.find().populate('user', 'email');

    for (const medication of medications_) {
      const durationMs = getDurationInMilliseconds(medication.duration, medication.durationUnit);
      const timeSinceLastTaken = medication.lastTaken ? now - medication.lastTaken : Infinity;

      if (timeSinceLastTaken >= durationMs && medication.user) {  
        await courier.send({
          message: {
            to: {
              email: medication.user.email,
            },
            template: 'YH6T73A42P4BQDHQVXKGCTF5W6KD',
            data: {
              drug: medication.drug,
              duration: medication.duration,
              durationUnit: medication.durationUnit
            },
          },
        });

      // Update the lastTaken time
      medication.lastTaken = now;
      await medication.save();
      }
    }
   } catch (error) {
    console.error('Error sending reminders:', error);
  } 
}


cron.schedule('* * * * *', () => {
    sendReminders().catch(console.error);
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Email server running on port ${PORT}`));