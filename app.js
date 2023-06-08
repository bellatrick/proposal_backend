const express = require("express");
const twilio = require("twilio");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_number = process.env.TWILIO_NUMBER;
const destinationPhoneNumber = process.env.MY_NUMBER;
app.use(express.json());
app.use(cors());

// Handle the request to initiate the SOS
app.post("/send-message", async (req, res) => {
  const client = twilio(accountSid, authToken);
  try {
    // Send an SMS message
    await client.messages.create({
      body: messageBody,
      from: twilio_number,
      to: destinationPhoneNumber,
    });

    // Alternatively, send a WhatsApp message
    await client.messages.create({
      body: messageBody,
      from: `whatsapp:${twilio_number}`,
      to: `whatsapp:${destinationPhoneNumber}`,
    });

    console.log("Twilio message sent successfully");
  } catch (error) {
    console.error("Failed to send the Twilio message:", error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
