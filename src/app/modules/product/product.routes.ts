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
router.delete("/:id", ProductController.deleteProduct);
router.put(
  "/:id",
  validateRequest(ProductValidation.productUpdateValidationSchema),
  ProductController.updateProduct
);

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getSingleProduct);

export const ProductRoutes = router;
