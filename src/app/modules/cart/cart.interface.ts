import { Types } from "mongoose";

export type TCart = {
  _id: Types.ObjectId;
  title: string;
  category: string;
  brand: string;
  description: string;
  quantity: number;
  rating: number;
  price: number;
  image: string;
  isAvailable?: true;
};
