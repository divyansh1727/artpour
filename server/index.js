import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error(err));

// routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Pourbykay backend running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});