import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: String,
  discount: Number,
  bulkPrice: Number,
  offer: String,

  // 👇 make optional
  image: String,
  images: [String],
});

export default mongoose.model("Product", productSchema);