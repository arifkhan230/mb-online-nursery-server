import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controller";

const router = Router();

router.post(
  "/create-product",
  validateRequest(ProductValidation.productValidationSchema),
  ProductController.createProduct
);

export const ProductRoutes = router;
