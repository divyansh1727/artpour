import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import ordersRoute from "./routes/orders.js";
import chatRoutes from "./routes/chat.js"; // 👈 1. Import your new chat route!

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error(err));

// routes
app.use("/api/products", productRoutes);
app.use("/api/orders", ordersRoute);
app.use("/api", chatRoutes); // 👈 2. Mount it here so it creates /api/chat!

app.get("/", (req, res) => {
  res.send("Pourbykay backend running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});