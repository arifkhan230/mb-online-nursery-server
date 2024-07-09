import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

//* creating new product
const createProduct = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await ProductServices.createProductToDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Added Successfully",
    data: result,
  });
});

//* Getting all products
const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductSFromDb();

  sendResponse(res, {
    success: result?.length ? true : false,
    statusCode: result?.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result?.length
      ? "Retrieved Products Successfully"
      : "no data found",
    data: result?.length ? result : [],
  });
});

//* deleting product
const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductToDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Deleted Successfully",
    data: result,
  });
});

//* updating  product
const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const paylaod = req.body;
  const result = await ProductServices.updateProductToDB(id, paylaod);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Updated Successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
};
