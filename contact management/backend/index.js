const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/contactsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Contact schema
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phoneNumber: String,
  company: String,
  jobTitle: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// POST: Add new contact
app.post("/contacts", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).send(newContact);
  } catch (err) {
    res.status(400).send({ error: "Error creating contact: " + err.message });
  }
});

// GET: Retrieve all contacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (err) {
    res.status(500).send({ error: "Error fetching contacts" });
  }
});

// PUT: Update a specific contact
app.put("/contacts/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedContact);
  } catch (err) {
    res.status(400).send({ error: "Error updating contact" });
  }
});

// DELETE: Remove a contact
app.delete("/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: "Error deleting contact" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
