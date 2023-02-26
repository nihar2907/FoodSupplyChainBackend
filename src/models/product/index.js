const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    previousLocation: {
      type: Array,
      trim: true,
    },
    currentLocation: {
      type: Object,
      trim: true,
    },
    variety: {
      type: String,
      trim: true,
    },
    unitQuantityType: {
      type: String,
      trim: true,
    },
    unitQuantity: {
      type: Number,
      trim: true,
    },
    unitPrice: {
      type: String,
    },
    productionDate: {
      type: String,
      trim: true,
    },
    placeOfOrigin: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    misc: {
      type: Object,
      trim: true,
    },
    expirationDate: {
      type: String,
      trim: true,
    },
    componentProductIds: {
      type: Array,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    batchQuantity: {
      type: String,
      trim: true,
    },
    barcode: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
