import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./routes/chat.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to Stupid GPT 🧠🍌",
    status: "The stupidity engine is operational.",
  });
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "alive",
    message: "Stupid GPT is thinking incorrectly.",
  });
});

app.use("/api/chat", chatRouter);

app.listen(PORT, () => {
  console.log(
    `🧠 Stupid GPT backend running on http://localhost:${PORT}`
  );
});