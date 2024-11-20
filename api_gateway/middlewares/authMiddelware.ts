import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken:any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    if(JWT_SECRET) {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.body.user = decoded;
      next();
    } else {
      console.log("NOT JWT")
      return;
    }
    
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
