import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import UsersRouter from "./routes/UsersRouter.js";
import ReviewRouter from "./routes/ReviewRouter.js";
import CouponRoutes from "./routes/CouponRoutes.js";
import currencyRoutes from "./routes/currencyRoutes.js";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(compression());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5000,
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

app.use(
  cors({
    origin: "https://flosun-ogqh.onrender.com",
    credentials: true,
  })
);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "*"],
        mediaSrc: ["'self'", "*"],
        imgSrc: ["'self'", "*", "data:"], // note: no quotes around data: here
        connectSrc: ["'self'", "*"],
        scriptSrc: ["'self'", "*"],
      },
    },
  })
);
app.use(cookieParser());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) =>
    console.error("Failed to connect to MongoDB:", error.message)
  );

// API routes
app.use("/api/products", productRoutes);
app.use("/api/users", UsersRouter);
app.use("/api/reviews", ReviewRouter);
// app.use("/api/cart-items", CartRoutes);
app.use("/api/coupons", CouponRoutes);
app.use("/api/currency", currencyRoutes);

// Serve frontend static files & SPA fallback
app.use(express.static(path.join(__dirname, "dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
