const mongoose = require("mongoose");
const Product = require("../models/product");
const allProducts = require("./allProducts");

mongoose.connect("mongodb://localhost:27017/onetwotea");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Product.deleteMany({});
  allProducts.map(async (product) => {
    const newProduct = new Product({
      name: product.name,
      size: product.size,
      price: product.price,
      images: [
        {
          url: "https://res.cloudinary.com/djmmemi6j/image/upload/v1653530707/OneTwoTea/photo-1504630083234-14187a9df0f5_mgpazu.jpg",
          filename: "OneTwoTea/photo-1504630083234-14187a9df0f5_mgpazu",
        },
      ],
      owner: "6288e744b7e404e639e5f8f0",
      description:
        "It does not matter where you are from or how you feel, there is always peace in a strong cup of coffee.",
    });
    await newProduct.save();
  });
};

seedDB();
