import axios from "axios";
import express, { Request, Response } from "express";
import { authenticateToken } from "../middlewares/authMiddelware";
import * as dotenv from 'dotenv';

const router = express.Router();
dotenv.config();
// Microservice URL
const DASHBOARD_MICROSERVICE = process.env.DASHBOARD_SERVICE_URL;

// Protected Route to Call Microservice
router.post("/addToDashboard", authenticateToken, async (req: Request, res: Response):Promise<any> => {
  try {
    const response = await axios.post(DASHBOARD_MICROSERVICE+'/api/pin/pinStock', {
        ...req.body
    },
    {
      headers: {
        Authorization: `Bearer ${req.header("Authorization")?.split(" ")[1]}`, // Forward token
        "Content-Type": "application/json",
      }
    });

    // Return the microservice's response to the client
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.message || "Error calling microservice",
    });
  }
});

router.get("/getPinnedStocks", authenticateToken, async (req: Request, res: Response):Promise<any> => {
  try {
    console.log("HIT 1")
    const response = await axios.get(DASHBOARD_MICROSERVICE+`/api/pin/getPinnedStocks?user_id=${req.query.user_id}`,
    {
      headers: {
        Authorization: `Bearer ${req.header("Authorization")?.split(" ")[1]}`, // Forward token
        "Content-Type": "application/json",
      }
    });

    // Return the microservice's response to the client
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: error.message || "Error calling microservice",
    });
  }
});

export default router;
