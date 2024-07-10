import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import { SortOrder } from "mongoose";

//* creating new product to DB
const createProductToDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

//* getting all product from DB
const getAllProductSFromDb = async (query: Record<string, unknown>) => {
  const { searchTerm, sortBy, category } = query as {
    searchTerm?: string;
    sortBy?: string;
    category?: string;
  };

  // !making copy of query and removing sortBy
  const filterQuery = { ...query };
  delete filterQuery.sortBy;

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

  //! SORTING PRODUCTS
  const sort: { [key: string]: SortOrder } = {};

  if (sortBy) {
    const sortFields: string[] = sortBy.split(",");

    sortFields.forEach((field: string) => {
      const [key, order] = field.split(":");
      sort[key] = order === "desc" ? -1 : 1;
    });
  }

  const result = await Product.find(filterQuery).sort(sort);

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
