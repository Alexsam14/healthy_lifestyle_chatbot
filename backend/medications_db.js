const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require('body-parser')

const app =express();
app.use(bodyparser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://alexsam:Alexsam14@cluster0.w04wli6.mongodb.net/HLC", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});


const medicationSchema = {
    drug: String,
    duration: Number
}

const medications = mongoose.model("Medications", medicationSchema);


app.get('/api/reminders', async (req, res) => {
    try {
      const reminders = await medications.find();
      res.json(reminders);
    } catch (err) {
      res.status(500).send(err);
    }
});


app.post('/api/reminders', async (req, res) => {
    const newReminder = new medications(req.body);
    try {
      const savedReminder = await newReminder.save();
      res.json(savedReminder);
    } catch (err) {
      res.status(500).send(err);
    }
});

app.delete('/api/reminders/:id', async (req, res) => {
    try {
      await medications.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send(err);
    }
});

app.listen(3500, function(){
    console.log("Server is running on port 3500");
})
