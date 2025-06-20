import jwt from "jsonwebtoken";
import Users from "../models/users.js";
import bcrypt from "bcrypt";
import { mailSender, sendContactMail } from "../utils/mailSender.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const usernameExists = await Users.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ err: "Username is already in use" });
    }

    const emailExists = await Users.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ err: "Email is already in use" });
    }

    const isEmail = email.includes("@");
    if (!isEmail) {
      return res.status(400).json({ err: "Email should contain @" });
    }

    const hashedPassword = await bcrypt.hash(
      password + process.env.BCRYPT_PEPPER,
      11
    );

    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      data: newUser,
      token,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const isEmail = usernameOrEmail.includes("@");

    let user;
    if (isEmail) {
      user = await Users.findOne({ email: usernameOrEmail });
    } else {
      user = await Users.findOne({ username: usernameOrEmail });
    }

    if (!user) {
      return res.status(404).json({ err: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      password + process.env.BCRYPT_PEPPER,
      user.password
    );
    console.log("Password valid?", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ err: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      data: user,
      token,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ data: "User has logged out" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const getToken = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ err: "No token provided" });

    const token = authHeader.split(" ")[1];
    res.json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware

    const userData = await Users.findById(userId).select("-password");
    if (!userData) return res.status(404).json({ err: "User not found" });

    res.status(200).json({ data: userData });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

export const forgotPasswordUser = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Email is incorrect!" });
    }

    const access_token = jwt.sign(
      { id: user._id },
      process.env.JWT_RESET_PASS_SECRET_KEY,
      { expiresIn: "15m" }
    );
    const url = `http://localhost:5173/reset-password/${access_token}`;

    await mailSender(process.env.MAIL_SENDER_EMAIL, email, url);

    res.status(200).json({ msg: "Check your email for further instructions" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const resetPasswordUser = async (req, res) => {
  try {
    const { password, confirm_password } = req.body;
    const token = req.header("Authorization");

    const decoded = jwt.verify(token, process.env.JWT_RESET_PASS_SECRET_KEY);
    const userId = decoded.id;

    const hashedPassword = await bcrypt.hash(
      password + process.env.BCRYPT_PEPPER,
      11
    );

    await Users.findOneAndUpdate(
      { _id: userId },
      {
        password: hashedPassword,
      }
    );

    console.log(decoded);

    res.status(200).json({ msg: "Password successfully changed!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

export const contact = async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    console.log(req.body);
    await sendContactMail(email, subject, message);

    res.status(200).json({ msg: "Email has sent!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

export const updateUserCart = async (req, res) => {
  try {
    const userId = req.user.id; // assuming auth middleware sets req.user
    const newCart = req.body.cart; // expecting cart array sent in request body

    if (!Array.isArray(newCart)) {
      return res.status(400).json({ message: "Cart must be an array" });
    }

    // Find user by ID and update cart
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { cart: newCart },
      { new: true }
    ).select("cart"); // select only cart to return

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ cart: updatedUser.cart });
  } catch (error) {
    console.error("Error updating user cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUserWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { wishlist } = req.body;

    if (!Array.isArray(wishlist)) {
      return res.status(400).json({ err: "Wishlist must be an array" });
    }

    const user = await Users.findByIdAndUpdate(
      userId,
      { wishlist },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    res.json({
      message: "Wishlist updated successfully",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({ err: "Failed to update wishlist" });
  }
};
