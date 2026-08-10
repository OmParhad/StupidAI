import { Router, type Request, type Response } from "express";
import { generateStupidAnswer } from "../services/stupiedAi.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Please provide a message.",
      });
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length === 0) {
      return res.status(400).json({
        error: "Message cannot be empty.",
      });
    }

    if (trimmedMessage.length > 4000) {
      return res.status(400).json({
        error: "Message is too long. Maximum is 4000 characters.",
      });
    }

    const answer = await generateStupidAnswer(trimmedMessage);

    return res.json({
      answer,
    });
  } catch (error) {
    console.error("Chat error:", error);

    return res.status(500).json({
      error: "The stupidity engine has malfunctioned.",
    });
  }
});

export default router;