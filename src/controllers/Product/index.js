const Product = require("../../models/product/index");
const Shipping = require("../../models/product/shipping");
// --------------------- create new product ---------------------------------

exports.newProduct = async (req, res, next) => {
  try {
    const { name, unitQuantity, unitPrice, barcode } = req.body;
    const createNewProduct = new Product({
      name,
      unitQuantity,
      unitPrice,
      barcode,
    });
    // save new Product Details
    const details = await createNewProduct.save();
    res.status(200).json({
      type: "success",
      message: "New Product added",
      data: details,
    });
  } catch (error) {
    next(error);
  }
};

// --------------- find product -------------------------
exports.findProduct = async (req, res, next) => {
  try {
    const { id: barcode } = req.params;
    const productDetail = await Product.findOne({ barcode });
    if (!productDetail) {
      next({ status: 400, message: "Invalid Product Id" });
      return;
    }
    
    res.status(201).json({
      type: "success",
      message: "Product Details",
      data: productDetail,
    });
    // generate otp
  } catch (error) {
    next(error);
  }
};

// --------------- shipping details -------------------------
exports.shipping = async (req, res, next) => {
  try {
    const { arrivalDate, newLocation, barcode, name } = req.body;
    const productDetail = await Product.findOne({ barcode });
    
    if (!productDetail) {
      next({ status: 400, message: "Invalid Product Details"});
      return;
    }
    const shippingDetails = new Shipping({
      name,
      newLocation,
      arrivalDate,
      barcode,
    });
    const details = await shippingDetails.save();
    res.status(200).json({
      type: "success",
      message: "Product Details",
      data: details
    });

  } catch (error) {
    next(error);
  }
};