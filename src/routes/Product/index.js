const express = require("express");
const router = express.Router();

const { newProduct, findProduct, shipping } = require("../../controllers/Product/index");

//  Post Requests
router.post("/create", newProduct);
router.post("/shipProduct", shipping);

// Get Requests
router.get("/:id", findProduct);

module.exports = router;
