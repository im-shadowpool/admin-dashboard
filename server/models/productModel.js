import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
    },
    supply: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

export default Products;
