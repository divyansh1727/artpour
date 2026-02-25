import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Karan Aujla Phone Case",
    price: 600,
    description: "customisable",
    discount: 50,
  },
  {
    name: "Spiritual Polaroid",
    price: 300,
    description: "Fridge magnet, dashboard decor, Customisable",
  },
  {
    name: "Personal Polaroid",
    price: 300,
    description: "Fridge magnet, dashboard decor, Customisable",
  },
  {
    name: "Hamper",
    price: 500,
    description: "customisable",
  },
  {
    name: "Birthday Hamper",
    price: 500,
    description: "customisable",
  },
  { name: "Rakhi", price: 90, bulkPrice: 50, discount: 20 },
  { name: "Customised Photo holder", price: 650, discount: 5 },
  { name: "Customised Photo keychain", price: 250 },
  { name: "Customised Phone Cover", price: 250 },
  { name: "Seashell keychain", price: 300 },
  { name: "Phone Cover", price: 250 },
  { name: "Phone Charm", price: 200 },
  { name: "Kitchen Resin Tray", price: 1200 },
  { name: "Bookmark", price: 200 },
  { name: "Keychain", price: 250 },
  { name: "Dashboard Decor", price: 100 },
  { name: "Love Letter", price: 100 },
  { name: "Galaxy Wall Clock", price: 3000 },
  { name: "Hair barrette clips", price: 200 },
  { name: "Om wall hanging", price: 1800 },
  { name: "Alphabet Keychain", price: 200, description: "customisable" },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany(); // clears old data
    await Product.insertMany(products);

    console.log("🌱 Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();