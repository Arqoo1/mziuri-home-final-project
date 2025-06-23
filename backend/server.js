import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import UsersRouter from "./routes/UsersRouter.js";
import ReviewRouter from "./routes/ReviewRouter.js";
// import CartRoutes from "./routes/CartRoutes.js"; //all crud operations (for cart)
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import CouponRoutes from './routes/CouponRoutes.js';
import currencyRoutes from './routes/currencyRoutes.js';
const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 5000, 
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
app.use(cookieParser()); 

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
// app.use("/api/cart-items",   CartRoutes); 
app.use('/api/coupons', CouponRoutes);
app.use('/api/currency', currencyRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
