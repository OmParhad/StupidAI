import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import chatRouter from "./routes/chat.js";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,

  handler: (req, res) => {
    console.log("🚨 RATE LIMIT HIT:", req.ip);

    res.status(429).json({
      error: "Too much stupidity. Please try again later. 🍌",
    });
  },
});

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to Stupid AI 🍌",
    status: "The stupidity engine is operational.",
  });
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "alive",
    message: "Stupid AI is thinking incorrectly.",
  });
});

app.use("/api/chat", chatRateLimiter, chatRouter);

app.listen(PORT, () => {
  console.log(
    ` Stupid AI backend running on http://localhost:${PORT}`
  );
});