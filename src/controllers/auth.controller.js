import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.sendStatus(401);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.sendStatus(401);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ message: "Email already registered" });
  }

  await User.create({ email, password });

  res.status(201).json({ message: "User registered successfully" });
};

