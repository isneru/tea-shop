const { productSchema, reviewSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const Product = require("./models/product");
const Review = require("./models/review");
const User = require("./models/user");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isAdmin = async (req, res, next) => {
  const admin = await User.find({ username: "neru" });
  if (req.user && !req.user._id.equals(admin[0]._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect("/products");
  }
  next();
};

module.exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/products/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isReviewOwner = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/products/${id}`);
  }
  next();
};
