import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import * as dotenv from 'dotenv';

const router = express.Router();
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post("/register", async (req: Request, res: Response):Promise<any> => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req: Request, res: Response):Promise<any> => {
  if(!JWT_SECRET) {
    console.error("No JWT Found");
    res.status(400).json({ error: "JWT Not Found" });
    return;
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
