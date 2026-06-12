import { connect, disconnect } from "../db/mongo";
import Product from "../model/Products";

const seed = async (): Promise<void> => {
  console.log("Seeding database...");
  await connect();
  console.log("Connected to MongoDB");
  await Product.deleteMany({});
  console.log("Cleared existing products");
  await Product.create({
    name: "Levi's 501 Original Fit Jeans",
    price: 69.99,
    category: "clothing",
    specs: {
      material: "100% cotton denim",
      weight_oz: 12.5,
      fit: "straight",
      rise: "mid",
      closure: "button fly",
    },
    variants: [
      { color: "stonewash", size: "32x32", sku: "LV-501-SW-3232" },
      { color: "stonewash", size: "34x32", sku: "LV-501-SW-3432" },
      { color: "raw indigo", size: "32x32", sku: "LV-501-RI-3232" },
      { color: "raw indigo", size: "34x34", sku: "LV-501-RI-3434" },
    ],
    images: ["s3://...stonewash-front.jpg", "s3://...stonewash-back.jpg"],
  });

  await Product.create({
    name: "Sony WH-1000XM5",
    category: "headphones",
    price: 349.99,
    specs: {
      driver_size_mm: 30,
      frequency_hz: [4, 40000],
      noise_cancelling: true,
      battery_hours: 30,
      connectivity: ["Bluetooth 5.2", "3.5mm jack"],
    },
    variants: [
      { color: "black", sku: "WH-BLK" },
      { color: "silver", sku: "WH-SLV" },
    ],
    images: ["s3://...black.jpg"],
  });

  await Product.create({
    name: "Merino Wool Sweater",
    category: "knitwear",
    price: 89.0,
    specs: {
      material: "100% merino wool",
      weight_gsm: 200,
      care: ["hand wash cold", "do not tumble dry"],
    },
    variants: [
      { size: "M", color: "navy", sku: "MW-M-NVY" },
      { size: "L", color: "oatmeal", sku: "MW-L-OAT" },
    ],
    images: ["s3://...navy.jpg"],
  });

  console.log("Seeding completed");
  await disconnect();
  console.log("Disconnected from MongoDB");
}

seed().catch((err) => {
  console.error("Error seeding database:", err);
  // process.exit(1);
});
