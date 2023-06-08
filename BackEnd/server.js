const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 5000;

mongoose.connect("mongodb://127.0.0.1:27017/User", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const SchemaUser = new mongoose.Schema({
  email_id: { type: String, required: true },
  pass: { type: String, required: true },
  userName: { type: String, required: true },
  phone: { type: Number, required: true },
});

const User = mongoose.model("User", SchemaUser);

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  try {
    const { email_id, pass, userName, phone } = req.body;
    const encryptedPassword = await bcrypt.hash(pass, 10);
    await User.create({ email_id, pass: encryptedPassword, userName, phone });
    return res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "User Creation Failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email_id, pass } = req.body;
    const user = await User.findOne({ email_id });
    if (!user) {
      return res.status(401).json({ message: "User Name doesn't exist" });
    }
    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "User name or password is incorrect" });
    }
    const jwt_token = jwt.sign({ email_id: user.email_id }, "Key");
    res.json({ jwt_token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
