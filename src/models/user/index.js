const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    mobile: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["FARMER", "MANUFACTURER", "DISTRIBUTOR", "RETAILER", "CONSUMER"],
      default: "CONSUMER",
    },
    phoneOtp: Number,
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
