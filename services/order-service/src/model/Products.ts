import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  _id: String,
  name: String,
  category: String,
  price: Number,
  specs: [Schema.Types.Mixed],
  variants: [{
    color: String,
    size: String,
    sku: String,
  }],
  images: [String],
});

const Product = model("Product", productSchema);

export default Product;
