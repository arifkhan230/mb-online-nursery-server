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
  const { searchTerm, sortBy, category, page, limit } = query as {
    searchTerm?: string;
    sortBy?: string;
    category?: string;
    page: number;
    skip: number;
    limit: number;
  };

  // !making copy of query and removing sortBy, page,skip,limit
  const queryObj = { ...query };
  const excludeFields = ["searchTerm", "sortBy", "limit", "page"];
  excludeFields.forEach((el) => delete queryObj[el]);

  //! SEARCHING FOR PRODUCT
  if (searchTerm) {
    const result = await Product.find(
      {
        $or: [
          { name: { $regex: `${searchTerm}`, $options: "i" } },
          { description: { $regex: `${searchTerm}`, $options: "i" } },
          { category: { $regex: `${searchTerm}`, $options: "i" } },
        ],
      },
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    );
    return result;
  }

  //! filtering

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

  //! pagination
  let skip = 0;
  if (page && limit) {
    skip = Number(page - 1) * Number(limit);
  }

  const result = await Product.find(queryObj, {
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  })
    .skip(skip)
    .limit(limit)
    .sort(sort);

  return result;
};

//! Getting single product
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

//! deleting  product from DB
const deleteProductToDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

//! update product from DB
const updateProductToDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const ProductServices = {
  createProductToDB,
  getAllProductSFromDb,
  getSingleProductFromDB,
  deleteProductToDB,
  updateProductToDB,
};
