const mongoose = require("mongoose");
const Product = require("../models/product");
const allProducts = require("./allProducts");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const adminId = process.env.ADMIN_ID;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/onetwotea";

mongoose.connect(dbUrl);

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
          url: "https://res.cloudinary.com/djmmemi6j/image/upload/v1653577468/OneTwoTea/nathan-dumlao-8yBQQqH3q8Q-unsplash_cq3oio.jpg",
          filename: "OneTwoTea/nathan-dumlao-8yBQQqH3q8Q-unsplash_cq3oio",
        },
      ],
      owner: adminId,
      description:
        "It does not matter where you are from or how you feel, there is always peace in a strong cup of coffee.",
    });
    await newProduct.save();
  });
};

seedDB();
