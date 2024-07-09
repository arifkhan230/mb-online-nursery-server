import { TProduct } from "./product.interface";
import { Product } from "./product.model";

//* creating new product to DB
const createProductToDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

//* getting all product from DB
const getAllProductSFromDb = async () => {
  const result = await Product.find();
  return result;
};

//* deleting  product from DB
const deleteProductToDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

//* update product from DB
const updateProductToDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const ProductServices = {
  createProductToDB,
  deleteProductToDB,
  getAllProductSFromDb,
  updateProductToDB,
};
