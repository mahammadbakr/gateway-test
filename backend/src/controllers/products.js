const Product = require("../models/product");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      create product
// @route     /api/v1/products/
// @access    Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, data: product });
});

// @desc      Update product
// @route     /api/v1/products/:productId
// @access    Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProduct)
    return next(
      new ErrorResponse(`No product found with id ${req.params.productId}`, 404)
    );

  res.status(200).json({ success: true, data: updatedProduct });
});

// @desc      Delete Product
// @route     /api/v1/products/:productId
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.productId);

  if (!deletedProduct)
    return next(
      new ErrorResponse(`No product found with id ${req.params.productId}`, 404)
    );

  await District.deleteMany({ productId: req.params.productId })

  res.status(200).json({ success: true, deleted: deletedProduct });
});


// @desc      get products
// @route     /api/v1/products/
// @access    public
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.send(res.advancedResults);
});
