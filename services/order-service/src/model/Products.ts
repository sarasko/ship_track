import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, trim: true },
  category: { type: String, trim: true },
  price: { type: Number, min: 0 },
  specs: Schema.Types.Mixed,
  variants: [
    {
      color: { type: String, trim: true },
      size: { type: String, trim: true },
      sku: { type: String, trim: true },
    },
  ],
  images: [String],
  lastUpdated: { type: Date, default: Date.now },
});

productSchema.pre("save", async function () {
  this.lastUpdated = new Date();
});

productSchema.pre("findOneAndUpdate", async function () {
  this.set({ lastUpdated: new Date() });
});

productSchema.pre("updateOne", async function () {
  this.set({ lastUpdated: new Date() });
});

productSchema.pre("updateMany", async function () {
  this.set({ lastUpdated: new Date() });
});

const Product = model("Product", productSchema);

export default Product;
