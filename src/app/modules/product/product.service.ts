import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductToDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

export const ProductServices = {
  createProductToDB,
};
