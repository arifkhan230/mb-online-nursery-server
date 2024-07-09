import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

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

export const ProductController = {
  createProduct,
};
