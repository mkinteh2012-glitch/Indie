const mongoose = require('mongoose');

exports.handler = async (event, context) => {
  console.log("--- Function Started ---");

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { email } = JSON.parse(event.body);
    console.log("Target Email:", email);

    // Check if URI exists
    if (!process.env.MONGO_URI) {
      console.error("CRITICAL ERROR: MONGO_URI is missing in Netlify settings!");
      throw new Error("Database URI is missing");
    }

    // Database Connection
    if (mongoose.connection.readyState !== 1) {
      console.log("Connecting to MongoDB Atlas...");
      await mongoose.connect(process.env.MONGO_URI);
    }

    // Define Schema (Make sure this matches your local version)
    const rsvpSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      date: { type: Date, default: Date.now }
    });

    // This line prevents "OverwriteModelError"
    const RSVP = mongoose.models.RSVP || mongoose.model('RSVP', rsvpSchema);

    const newRSVP = new RSVP({ email });
    await newRSVP.save();

    console.log("SUCCESS: Email saved to Atlas.");
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "RSVP_SUCCESSFUL" }),
    };

  } catch (error) {
    console.error("DETAILED ERROR:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};