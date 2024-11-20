import axios from "axios";
import express, { Request, Response } from "express";
import { authenticateToken } from "../middlewares/authMiddelware";
import * as dotenv from 'dotenv';

const router = express.Router();
dotenv.config();
// Microservice URL
const DASHBOARD_MICROSERVICE = process.env.DASHBOARD_SERVICE_URL;
// const DASHBOARD_MICROSERVICE = 'http://localhost:5010';

// Protected Route to Call Microservice
router.post("/addToDashboard", authenticateToken, async (req: Request, res: Response):Promise<any> => {
  try {
    const response = await axios.post(DASHBOARD_MICROSERVICE+'/api/stocks/addToDashboard', {
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
      error:error
    });
  }
});

router.get("/getDashboardStocks", authenticateToken, async (req: Request, res: Response):Promise<any> => {
  try {
    const response = await axios.get(DASHBOARD_MICROSERVICE+`/api/stocks/getDashboardStocks?user_id=${req.query.user_id}`,
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
      error:error
    });
  }
});

export default router;
