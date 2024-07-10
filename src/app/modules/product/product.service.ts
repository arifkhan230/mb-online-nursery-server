import { TProduct } from "./product.interface";
import { Product } from "./product.model";

//* creating new product to DB
const createProductToDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

//* getting all product from DB
const getAllProductSFromDb = async (query: Record<string, unknown>) => {
  // const query: Record<string, unknown> = {};
  const { searchTerm } = query;
  const { category } = query;

  //! SEARCHING FOR PRODUCT
  if (searchTerm) {
    const result = await Product.find({
      $or: [
        { name: { $regex: `${searchTerm}`, $options: "i" } },
        { description: { $regex: `${searchTerm}`, $options: "i" } },
        { category: { $regex: `${searchTerm}`, $options: "i" } },
      ],
    });
    return result;
  }

  if (category) {
    query.category = category;
  }
  const result = await Product.find(query).sort({ price: -1 });
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
