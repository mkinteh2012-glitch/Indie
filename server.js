const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// YOUR CONNECTION STRING
const MONGO_URI = 'mongodb+srv://mkinteh2012_db_user:TKvc2AkWVs9MxyyO@indie.wrclk52.mongodb.net/indie_rsvps?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ DATABASE CONNECTED'))
    .catch(err => console.log('❌ CONNECTION ERROR:', err));

const rsvpSchema = new mongoose.Schema({
    email: String,
    date: { type: Date, default: Date.now }
});

const RSVP = mongoose.model('RSVP', rsvpSchema);

app.post('/api/rsvp', async (req, res) => {
    try {
        const newRSVP = new RSVP({ email: req.body.email });
        await newRSVP.save();
        console.log("New Signup Saved:", req.body.email);
        res.status(200).json({ message: "Success" });
    } catch (err) {
        res.status(500).json({ message: "Error" });
    }
});

app.listen(3000, () => console.log('🚀 SERVER READY ON PORT 3000'));    