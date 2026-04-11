const mongoose = require('mongoose');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { email } = JSON.parse(event.body);
    
    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    const RSVP = mongoose.model('RSVP', new mongoose.Schema({
      email: String,
      date: { type: Date, default: Date.now }
    }));

    await new RSVP({ email }).save();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" }, // Allows your frontend to talk to it
      body: JSON.stringify({ message: "Success" }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};