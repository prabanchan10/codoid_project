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
  emailid: { type: String, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  phone: { type: Number, required: true }
});

const User = mongoose.model("User", SchemaUser);

app.use(express.json());
app.use(cors());

app.post("/api/signup", async (req, res) => {
  try {
    const { emailid, password, userName, phone } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({ emailid, password: encryptedPassword, userName, phone });
    return res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "User Creation Failed" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { emailid, password } = req.body;
    const user = await User.findOne({ emailid });
    if (!user) {
      return res.status(401).json({ message: "User Name doesn't exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "User name or password is incorrect" });
    }
    const jwtToken = jwt.sign({ emailid: user.emailid }, "Key");
    res.json({ jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
