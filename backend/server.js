import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import UsersRouter from "./routes/UsersRouter.js";
import ReviewRouter from "./routes/ReviewRouter.js";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";

const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, //5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser()); //to access cookies in node.js
app.use(compression());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
  });

app.use("/api/products", productRoutes);
app.use("/api/users", UsersRouter);
app.use("/api/reviews", ReviewRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
