const { model, Schema } = require("mongoose");

const shippingSchema = new Schema(
  {
    arrivalDate: {
      type: String,
      trim: true,
    },
    newLocation: {
      type: String,
      trim: true,
    },
    barcode: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    
  },
  { timestamps: true }
);

module.exports = model("Shipping", shippingSchema);
