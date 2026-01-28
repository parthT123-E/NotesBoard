import express from "express";
const app =  express();
import notesRoutes from "./routes/notesRoutes.js"
import userRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";

import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"
dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(cookieParser());
// middleware
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
}));
app.use(express.json()); //this middleware will parse the JSON bodies, lets u get access to req.body

//simple custom middleware
app.use((req,res,next) => {
console.log(`Req method is ${req.method} & Req URL is ${req.url}`)
next();
})
app.use("/api/auth", userRoutes);
app.use("/api/notes", notesRoutes)






connectDB().then(() => {
app.listen(PORT, () => {
  console.log("Server started on PORT:", PORT)
});
})



