import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import UsersRouter from "./routes/UsersRouter.js";
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
  });

app.use("/api/products", productRoutes);
app.use('/api/users', UsersRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
