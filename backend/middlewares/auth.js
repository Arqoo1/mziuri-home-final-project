import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; 
  console.log("AUTH HEADER:", authHeader);

  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("TOKEN VERIFIED:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT VERIFY FAILED:", err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};
