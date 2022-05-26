const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  size: String,
  price: Number,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
ProductSchema.path("images")
  .schema.virtual("thumbnail")
  .get(function () {
    return this.url.replace("/upload", "/upload/w_200,h_200,c_fill");
  });
ProductSchema.path("images")
  .schema.virtual("cardImage")
  .get(function () {
    return this.url.replace("/upload", "/upload/ar_4:3,c_fill");
  });
ProductSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Product", ProductSchema);
