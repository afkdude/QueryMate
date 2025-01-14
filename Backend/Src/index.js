import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./Routes/auth.routes.js"
import openAiRoutes from './Routes/openAi.routes.js'
import chatRoutes from "./Routes/chat.routes.js"
import { connectDb } from './Config/db.js';
const app = express();


dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }

))

const PORT = process.env.PORT || 3000;





app.use('/api/auth', authRoutes);
app.use('/api/ai', openAiRoutes);
app.use('/api/chat', chatRoutes);






app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
})