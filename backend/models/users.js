import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide an username"],
    unique: [true, "username should be unique"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "email is already registered"],
  },
  password: {
    type: String,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  wishlist: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export default mongoose.model("Users", UsersSchema);
