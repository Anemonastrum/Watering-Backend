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
  if (!email || !password) return res.sendStatus(400);

  if (await User.findOne({ email })) return res.sendStatus(409);

  await User.create({ email, password });
  res.sendStatus(201);
};
