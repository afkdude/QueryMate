import express from 'express'; 
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser"; 
import cores from "cors";
import authRoutes from "./Routes/auth.routes.js"
import openAiRoutes from './Routes/openAi.routes.js'
import { connectDb } from './Config/db.js';
const app = express(); 


dotenv.config(); 
app.use(express.json());
app.use(cookieParser()); 


const PORT = process.env.PORT || 3000;





app.use('/api/auth', authRoutes);
app.use('/api/ai', openAiRoutes); 





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb(); 
})